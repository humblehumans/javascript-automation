'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist']
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/stylesheets/',
          src: ['main.scss'],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
      css: {
        src: [
          'bower_components/html5-boilerplate/dist/css/normalize.css',
          'bower_components/html5-boilerplate/dist/css/main.css',
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'dist/assets/css/main.css'
        ],
        dest: 'dist/assets/css/app.css'
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'src/assets/scripts/main.js'
        ],
        dest: 'dist/assets/js/app.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/app.min.js': ['dist/assets/js/app.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/assets/img/'
        }]
      }
    },

    copy: {
      files: {
        cwd: 'src',
        src: '**/*.html',
        dest: 'dist',
        expand: true,
        options: {
          process: function(content, srcpath) {
            return grunt.template.process(content);
          }
        }          
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass', 'concat:css'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'concat:js'],
        options: {
          spawn: false
        }
      },
      index: {
        files: ['src/index.html'],
        tasks: ['copy:index'],
        options: {
          spawn: false
        }
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'sass', 'jshint', 'concat', 'uglify', 'imagemin', 'copy']);

};