module.exports = function(grunt) {
    [
        'grunt-contrib-uglify',
        'grunt-contrib-concat',
        'grunt-contrib-jshint',
        'grunt-cafe-mocha',
        'grunt-jsdoc'
    ].forEach(grunt.loadNpmTasks, grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '// five.js library v<%= pkg.version %>\n' +
                        '// licensed under LGPL 3.0 license\n' +
                        '// built <%= grunt.template.today("yyyy-mm-dd") %>\n\n'
            },
            build: {
                src: 'dist/five.js',
                dest: 'dist/five.min.js'
            }
        },

        concat: {
            options: {
                separator: '\n\n',
                banner: '// five.js library v<%= pkg.version %>\n' +
                        '// licensed under LGPL 3.0 license\n' +
                        '// built <%= grunt.template.today("yyyy-mm-dd") %>\n\n'
            },
            dist: {
                src: ['src/wrapper-start.js', 'src/five.js', 'src/lib/*.js', 'src/wrapper-end.js'],
                dest: 'dist/five.js'
            }
        },

        jshint: {
            source: ['src/five.js', 'src/lib/*.js'],
            examples: 'examples/**/*.js',
            qa: ['test/*.js', 'Gruntfile.js']
        },

        cafemocha: {
            all: {
                src: 'test/*.js',
                options: {
                    ui: 'tdd',
                    reporter: 'progress'
                }
            }
        },

        jsdoc: {
            dist: {
                src: ['src/five.js', 'src/lib/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.registerTask('build', ['concat', 'uglify', 'jsdoc']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['cafemocha']);
    grunt.registerTask('qa', ['lint', 'test']);
    grunt.registerTask('default', ['build', 'qa']);
};