module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlbuild: {
            dist: {
                src: 'source/html/index.html',
                dest: 'dist/',
                options: {
                    beautify: true,
                    relative: true,
                    basePath: false,
                    scripts: {
                        'main': [
                            'js/*.js',
                        ]
                    },
                    styles: {
                        'main': [
                            'styles/*.css'
                        ]
                    },
                    sections: {
                        layout: {
                            // includes name of the module and the path
                            header: 'source/modules/header/html/index.html',
                            hello: 'source/modules/hello/html/index.html',
                            footer: 'source/modules/footer/html/index.html'
                        }
                    }
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path to be copied
                    {expand: true, flatten: true, src: ['source/files/*'], dest: 'dist/files/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['source/json/*'], dest: 'dist/json/', filter: 'isFile'}
                ],
            },
        },

        concat: {
            global: {
                src: ['source/js/*.js', 'source/modules/**/js/*.js'],
                dest: 'dist/js/global.js'
            },
            plugins: {
                src: [
                    // includes plugins files within path
                    'source/bower_components/jquery/dist/jquery.min.js'
                ],
                dest: 'dist/js/plugins.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/js/global.min.js': ['dist/js/global.js'],
                    'dist/js/plugins.min.js': ['dist/js/plugins.js'],
                }
            }
        },

        sass_import: {
            options: {},
            dist: {
                files: {
                    'source/styles/imports/modules.scss': 'source/modules/**/css/*.scss'
                }
            }
        },

        sass: {
            dist: {
                files: {
                    // includes sass files within path
                    'dist/styles/global.css': 'source/styles/global.scss',
                    'dist/styles/csswizardry-grids.css': 'source/bower_components/csswizardry-grids/csswizardry-grids.scss'
                }
            }
        },

        watch: {
            css: {
                files: ['source/modules/**/css/*.scss', 'source/styles/*.scss', 'source/styles/**/*.scss'],
                tasks: ['sass_import', 'sass', 'copy']
            },
            src: {
                files: ['source/modules/**/html/*.html', 'source/html/*.html'],
                tasks: ['htmlbuild', 'htmlmin']
            },
            scripts: {
                files: ['source/js/*.js', 'source/modules/**/js/*.js'],
                tasks: ['concat', 'uglify']
            }
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "dist/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "dist"
                    }
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass-import');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.registerTask('dev',['sass_import', 'sass', 'concat', 'uglify', 'copy', 'htmlbuild', 'htmlmin', 'browserSync', 'watch']);
}