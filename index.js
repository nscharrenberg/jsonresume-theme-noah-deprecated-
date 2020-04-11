const fs = require('fs');

const _ = require('underscore');
const utils = require('jsonresume-themeutils');
const moment = require('moment');
const markdown = require('markdown-it')({
    breaks: true
}).use(require('markdown-it-abbr'));

const { renderResume } = require('./tpl/index');

utils.setConfig({ date_format: 'MMM, YYYY' });

function sort(a, b, key, date1 = false, direction = '<', alternativeKey = undefined, date2 = false) {
    let result = 0;

    if(date1) {
        if(a[key] !== undefined) {
            a[key] = moment(a[key], 'YYYY-MM-DD');
        }

        if(b[key] !== undefined) {
            b[key] = moment(b[key], 'YYYY-MM-DD');
        }
    }

    if(alternativeKey === undefined) {
        if(a[key] === undefined) {
            result = -1;
        } else if (b[key] === undefined) {
            result = 1;
        } else {
            if(eval(a[key] + direction + b[key])) {
                result = 1;
            } else if(eval(b[key] + direction + a[key])) {
                result = -1;
            } else {
                result = 0;
            }
        }
    } else {
        if(a[key] === undefined && b[key] === undefined) {
            result = sort(a, b, alternativeKey, date2);
        } else if(a[key] === undefined) {
            result = -1;
        } else if (b[key] === undefined) {
            result = 1;
        } else {
            if(eval(a[key] + direction + b[key])) {
                result = 1;
            } else if(eval(b[key] + direction + a[key])) {
                result = -1;
            } else if (a[key] === b[key]) {
                result = sort(a, b, alternativeKey, date2);
            } else {
                result = 0;
            }
        }
    }

    return result;
}

function render(resume) {
    const addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
    const addressValues = addressAttrs.map(key => resume.basics.location[key]);
    const css = fs.readFileSync(__dirname + '/assets/css/app.css', 'utf-8');
    const js = fs.readFileSync(__dirname + '/assets/js/app.js', 'utf-8');

    resume.basics.picture = utils.getUrlForPicture(resume);
    resume.basics.summary = convertMarkdown(resume.basics.summary);
    resume.basics.computed_location = _.compact(addressValues).join(', ');

    if (resume.languages) {
        resume.basics.languages = _.pluck(resume.languages, 'language').join(', ');
    }

    _(resume.basics.profiles).forEach(p => {
        const label = p.network.toLowerCase();

        p.url = utils.getUrlForProfile(resume, label);
        p.label = label;
    });

    resume.basics.top_five_profiles = resume.basics.profiles.slice(0, 5);
    resume.basics.remaining_profiles = resume.basics.profiles.slice(5);

    _(resume.work).sort((a, b) => sort(a, b, 'endDate', true, '<', 'startDate', true));

    _(resume.work).forEach(work_info => {
        const start_date = moment(work_info.startDate, 'YYYY-MM-DD');
        const end_date = moment(work_info.endDate, 'YYYY-MM-DD');
        const can_calculate_period = start_date.isValid() && end_date.isValid();

        if (can_calculate_period) {
            work_info.duration = moment.duration(start_date.diff(end_date)).humanize();
        }

        if (start_date.isValid()) {
            work_info.startDate = utils.getFormattedDate(start_date);
        }

        if (end_date.isValid()) {
            work_info.endDate = utils.getFormattedDate(end_date);
        }

        work_info.summary = convertMarkdown(work_info.summary);
    });

    _(resume.projects).sort((a, b) => sort(a, b, 'endDate', true, '<', 'startDate', true));

    _(resume.projects).forEach(work_info => {
        const start_date = moment(work_info.startDate, 'YYYY-MM-DD');
        const end_date = moment(work_info.endDate, 'YYYY-MM-DD');
        const can_calculate_period = start_date.isValid() && end_date.isValid();

        if (can_calculate_period) {
            work_info.duration = moment.duration(start_date.diff(end_date)).humanize();
        }

        if (start_date.isValid()) {
            work_info.startDate = utils.getFormattedDate(start_date);
        }

        if (end_date.isValid()) {
            work_info.endDate = utils.getFormattedDate(end_date);
        }

        work_info.summary = convertMarkdown(work_info.summary);

        work_info.highlights = _(work_info.highlights)
            .map(highlight => convertMarkdown(highlight));
    });

    _(resume.skills).forEach(skill_info => {
        const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];

        if (skill_info.level) {
            skill_info.skill_class = skill_info.level.toLowerCase();
            skill_info.level = capitalize(skill_info.level.trim());
            skill_info.display_progress_bar = _.contains(levels, skill_info.level);
        }
    });

    _(resume.education).sort((a, b) => sort(a, b, 'endDate', true, '<', 'startDate', true));

    _(resume.education).forEach(education_info => {
        ['startDate', 'endDate'].forEach(type => {
            const date = education_info[type];

            if (date) {
                education_info[type] = utils.getFormattedDate(date);
            }
        });
    });

    _(resume.awards).forEach(a => {
        const date = a.date;

        a.summary = convertMarkdown(a.summary);

        if (date) {
            a.date = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    _(resume.volunteer).forEach(v => {
        v.summary = convertMarkdown(v.summary);

        ['startDate', 'endDate'].forEach(type => {
            const date = v[type];

            if (date) {
                v[type] = utils.getFormattedDate(date);
            }
        });

        v.highlights = _(v.highlights).map(convertMarkdown);
    });

    _(resume.publications).forEach(p => {
        const date = p.releaseDate;

        p.summary = convertMarkdown(p.summary);

        if (date) {
            p.releaseDate = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    _(resume.references).forEach(r => {
        r.reference = convertMarkdown(r.reference);
    });

    return renderResume({
        resume: resume,
        floating_nav_items: getFloatingNavItems(resume),
        css: css,
        js: js,
        _: _
    });
}

function interpolate(object, keyPath) {
    const keys = keyPath.split('.');

    return keys.reduce((res, key) => (res || {})[key], object);
}

function capitalize(str) {
    if (str) {
        str = str.toString();
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }

    return str;
}

function convertMarkdown(str) {
    if (str != null) {
        return markdown.render(str);
    }
}

function getFloatingNavItems(resume) {
    const floating_nav_items = [
        {label: 'About', target: 'about', icon: 'board', requires: 'basics.summary'},
        {label: 'Work Experience', target: 'work-experience', icon: 'office', requires: 'work'},
        {label: 'Projects', target: 'projects', icon: 'office', requires: 'projects'},
        {label: 'Skills', target: 'skills', icon: 'tools', requires: 'skills'},
        {label: 'Education', target: 'education', icon: 'graduation-cap', requires: 'education'},
        {label: 'Awards', target: 'awards', icon: 'trophy', requires: 'awards'},
        {label: 'Volunteer Work', target: 'volunteer-work', icon: 'child', requires: 'volunteer'},
        {label: 'Publications', target: 'publications', icon: 'newspaper', requires: 'publications'},
        {label: 'Interests', target: 'interests', icon: 'heart', requires: 'interests'},
        {label: 'References', target: 'references', icon: 'thumbs-up', requires: 'references'}
    ];

    return _(floating_nav_items).filter(item => {
        const value = interpolate(resume, item.requires);
        return !_.isEmpty(value);
    });
}

module.exports = { render };
