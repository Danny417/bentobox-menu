/*jslint node: true */
"use strict";
module.exports = function(grunt) {
  
  grunt.initConfig({
	// get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    
	// configure uglify to minify js files -------------------------------------
    uglify: {
	  options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      dist: {
        files: {
          'dist/resources/js/main.min.js': [ 'tmp/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    },
    
    html2js: {
      dist: {
        src: [ 'src/**/*.html' ],
        dest: 'tmp/templates.js'
      }
    },
    
    clean: {
      temp: {
        src: [ 'tmp' ]
      },
      dist: {
        src: [ 'dist' ]
      }
    },
    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ 'src/**/*.js', 'tmp/*.js' ],
        dest: 'tmp/app.js'
      }
    },
     // use jshint-stylish to make our errors look and read good
    jshint: {
	  options: {
        reporter: require('jshint-stylish')
      },
      all: [ 'Gruntfile.js', 'src/*.js', 'src/**/*.js']
    },
    
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080
        }
      }
    },
    
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'src/*.js', 'src/**/*.js', '*.html', 'src/**/*.less' ],
        tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'less:dev', 'cssmin', 'clean:temp' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'src/*.js', 'src/**/*.js', '*.html', 'src/**/*.less' ],
        tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'less:dist', 'cssmin', 'clean:temp', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    },
    
    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          src: [ '*.html', 'dist/resources/**/*.js', 'dist/resources/**/*.css', 'libs/**', 'bower_components/**' ]
        }]
      }
    },
    
	// compile less stylesheets to css -----------------------------------------
    less: {
      dev: {
        options: {
          paths: [ "src/resources/less" ]
        },
        files: {
          "dist/resources/css/style.css": "src/resources/less/*.less"
        }
      },
      dist: {
        options: {
          paths: [ "src/resources/less" ],
          cleancss: true
        },
        files: {
          "dist/resources/css/style.css": "src/resources/less/*.less"
        }
      }
    },
    
	// configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/resources/css/style.min.css': 'src/resources/css/**/*.css'
        }
      }
    },
	
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      junit: {
        singleRun: true,
        reporters: ['junit', 'coverage']
      },
      continuous: {
        singleRun: false,
        autoWatch: true
      }
    }
  });
  
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('dev', [ 'clean:dist', 'connect:server', 'watch:dev' ]);
  grunt.registerTask('test', [ 'clean:dist', 'jshint', 'karma:continuous' ]);
  grunt.registerTask('junit', [ 'clean:dist', 'jshint', 'karma:junit' ]);
  grunt.registerTask('minified', [ 'clean:dist', 'connect:server', 'watch:min' ]);
  grunt.registerTask('package', [ 'clean:dist', 'jshint', 'karma:junit', 'html2js:dist', 'concat:dist',
    'uglify:dist', 'less:dist', 'cssmin', 'clean:temp', 'compress:dist' ]);
};
