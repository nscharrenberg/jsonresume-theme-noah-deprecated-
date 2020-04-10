function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"index.pug":"|\u003C!DOCTYPE html\u003E\r\nhtml(lang=\"en\")\r\n    head\r\n        meta(charset=\"utf-8\")\r\n        meta(http-equiv=\"X-UA-Compatible\", content=\"IE=edge\")\r\n        meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\r\n        title= resume.basics.name\r\n        include pug\u002Fstylesheets.pug\r\n\r\n    body(itemscope, itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\")\r\n        div#app\r\n            main.template-resume\r\n                include pug\u002Fprofile.pug\r\n                include pug\u002Fcomponents.pug\r\n\r\n        include pug\u002Fscripts.pug\r\n","pug\\stylesheets.pug":"link(rel=\"stylesheet\", href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.13.0\u002Fcss\u002Fall.min.css\")\r\nstyle!= css\r\n","pug\\profile.pug":"mixin render_profiles(profiles)\r\n    ul(class=\"social\")\r\n        each profile in profiles\r\n            li(class=profile.network)\r\n                a(\r\n                    href=profile.url,\r\n                    target=\"_blank\",\r\n                    title= resume.basics.name + \" on \" + profile.network,\r\n                    )\r\n                    i(class='fab fa-'+profile.network)\r\n\r\n\r\nsection.resume-header.bg-icon-plane\r\n    .container\r\n        .row\r\n            .col-lg-8.mx-md-auto\r\n                h1(itemprop=\"name\")=resume.basics.name\r\n\r\n                p(\r\n                    class=\"subtitle\"\r\n                    itemprop=\"jobTitle\"\r\n                    )=resume.basics.label\r\n\r\n                img(\r\n                    class=\"user_profile\"\r\n                    src=resume.basics.picture,\r\n                    alt=resume.basics.name,\r\n                    itemprop=\"image\")\r\n\r\n                +render_profiles(resume.basics.top_five_profiles)\r\n\r\nsection.contactBar\r\n    .container\r\n        .row.contacts\r\n            if resume.basics.website\r\n                .col-md\r\n                    span\r\n                        i(class=\"fas fa-link contactIcon\")\r\n\r\n                    p\r\n                        a(href=resume.basics.website)=resume.basics.website\r\n\r\n            if resume.basics.email\r\n                .col-md.light\r\n                    span\r\n                        i(class=\"far fa-envelope-open contactIcon\")\r\n\r\n                    p\r\n                        a(href='mailto:'+resume.basics.email)=resume.basics.email\r\n\r\n            if resume.basics.phone\r\n                .col-md.light\r\n                    span\r\n                        i(class=\"fas fa-phone contactIcon\")\r\n\r\n                    p\r\n                        a(href='tel:' + resume.basics.phone)=resume.basics.phone\r\n\r\n            if resume.basics.computed_location\r\n                .col-md\r\n                    span\r\n                        i(class=\"fas fa-map-marker-alt contactIcon\")\r\n\r\n                    p=resume.basics.computed_location\r\n","pug\\components.pug":"","pug\\scripts.pug":"script(src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.13.0\u002Fjs\u002Fall.min.js\")\r\nscript.\r\n    WebFontConfig = {\r\n        google: {families: ['Lato:300,400,700:latin']}\r\n    };\r\n    (function () {\r\n        var wf = document.createElement('script');\r\n        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +\r\n            ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';\r\n        wf.type = 'text\u002Fjavascript';\r\n        wf.async = 'true';\r\n        var s = document.getElementsByTagName('script')[0];\r\n        s.parentNode.insertBefore(wf, s);\r\n    })();\r\n"};
;var locals_for_with = (locals || {});(function (css, resume) {;pug_debug_line = 1;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chtml lang=\"en\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.13.0\u002Fcss\u002Fall.min.css\"\u002F\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + (null == (pug_interp = css) ? "" : pug_interp) + "\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 10;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cbody" + (pug_attr("itemscope", true, true, false)+" itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\"") + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cdiv id=\"app\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmain class=\"template-resume\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\profile.pug";
pug_mixins["render_profiles"] = pug_interp = function(profiles){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cul class=\"social\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\profile.pug";
// iterate profiles
;(function(){
  var $$obj = profiles;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var profile = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cli" + (pug_attr("class", pug_classes([profile.network], [true]), false, false)) + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", profile.url, true, false)+" target=\"_blank\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(['fab fa-'+profile.network], [true]), false, false)) + "\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var profile = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cli" + (pug_attr("class", pug_classes([profile.network], [true]), false, false)) + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", profile.url, true, false)+" target=\"_blank\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(['fab fa-'+profile.network], [true]), false, false)) + "\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
};
;pug_debug_line = 13;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Csection class=\"resume-header bg-icon-plane\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-lg-8 mx-md-auto\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ch1 itemprop=\"name\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cp class=\"subtitle\" itemprop=\"jobTitle\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.label) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"user_profile\""+pug_attr("src", resume.basics.picture, true, false)+pug_attr("alt", resume.basics.name, true, false)+" itemprop=\"image\"") + "\u002F\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\profile.pug";
pug_mixins["render_profiles"](resume.basics.top_five_profiles);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Csection class=\"contactBar\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"row contacts\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\profile.pug";
if (resume.basics.website) {
;pug_debug_line = 36;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci class=\"fas fa-link contactIcon\"\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 41;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", resume.basics.website, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.website) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 43;pug_debug_filename = "pug\\profile.pug";
if (resume.basics.email) {
;pug_debug_line = 44;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md light\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 46;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci class=\"far fa-envelope-open contactIcon\"\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 48;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 49;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", 'mailto:'+resume.basics.email, true, false)) + "\u003E";
;pug_debug_line = 49;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 51;pug_debug_filename = "pug\\profile.pug";
if (resume.basics.phone) {
;pug_debug_line = 52;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md light\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 54;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci class=\"fas fa-phone contactIcon\"\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 56;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 57;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", 'tel:' + resume.basics.phone, true, false)) + "\u003E";
;pug_debug_line = 57;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.phone) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 59;pug_debug_filename = "pug\\profile.pug";
if (resume.basics.computed_location) {
;pug_debug_line = 60;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 62;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Ci class=\"fas fa-map-marker-alt contactIcon\"\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 64;pug_debug_filename = "pug\\profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.computed_location) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.13.0\u002Fjs\u002Fall.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "WebFontConfig = {";
;pug_debug_line = 4;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 4;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    google: {families: ['Lato:300,400,700:latin']}";
;pug_debug_line = 5;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 5;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "};";
;pug_debug_line = 6;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 6;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "(function () {";
;pug_debug_line = 7;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 7;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    var wf = document.createElement('script');";
;pug_debug_line = 8;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +";
;pug_debug_line = 9;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "        ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';";
;pug_debug_line = 10;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 10;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    wf.type = 'text\u002Fjavascript';";
;pug_debug_line = 11;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 11;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    wf.async = 'true';";
;pug_debug_line = 12;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 12;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    var s = document.getElementsByTagName('script')[0];";
;pug_debug_line = 13;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 13;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    s.parentNode.insertBefore(wf, s);";
;pug_debug_line = 14;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 14;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "})();\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"resume" in locals_for_with?locals_for_with.resume:typeof resume!=="undefined"?resume:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}module.exports = { renderResume: template }; 