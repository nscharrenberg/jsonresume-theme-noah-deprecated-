module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "assets/css/app.css": "assets/scss/app.scss"
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    nospawn: true
                }
            },
            pug: {
                files: ['index.pug', 'pug/*.pug', 'pug/components/*.pug'],
                tasks: ['exec:compile_pug'],
                options: {
                    nospawn: true,
                    livereload: true,
                }
            },
        },
        exec: {
            run_server: {
                cmd: "node serve.js"
            },
            build_index: {
                cmd: "node render.js"
            },
            compile_pug: {
                cmd: 'pug -c index.pug --out tpl && echo module.exports = { renderResume: template }; >> ./tpl/index.js'
            }
        },
        copy: {
            resumejson: {
                cwd: './',
                src: [ 'resume.json' ],
                dest: './node_modules/resume-schema',
                expand: true
            },
            build: {
                cwd: './assets/css',
                src: [ 'theme.css' ],
                dest: './build/assets/css',
                expand: true
            },
            favicon: {
                cwd: './',
                src: [ 'favicon.ico' ],
                dest: './build/',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ 'build' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['exec']);
    grunt.registerTask('build', [
        /* Uncomment this item once you've created your own resume.json file
           in the project root.  This will use your own data to build your site.
         */
        // 'copy:resumejson',
        'clean',
        'copy:build',
        'less',
        'exec:build_index', //,
        /* Uncomment this item (and the comma above) if you add a favicon.ico
           in the project root. You'll also need to uncomment the <link...> tag
           at the top of resume.template.
         */
        // 'copy:favicon'
    ]);
    grunt.registerTask('serve', [
        'sass',
        'exec:compile_pug',
        'exec:run_server'
    ]);
    grunt.registerTask('compile:pug', ['exec:compile_pug']);
};
