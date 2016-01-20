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
          'dist/main.min.js': [ 'tmp/main.js' ]
        },
        options: {
          mangle: false
        }
      }
    },
    
    html2js: {
      dist: {
        src: [ 'src/views/*.html' ],
        dest: 'tmp/templates.js'
      }
    },
    
	htmlmin: {                                     
	  dist: {                                      
		options: {                                 
		  removeComments: true,
		  collapseWhitespace: true
		},
		files: {                                   
		  'dist/default.html': 'src/default.html',     // 'destination': 'source'
		  'dist/error.html': 'src/error.html'
		}
	  }
	},
	
    clean: {
      tmp: {
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
        dest: 'tmp/main.js'
      }
    },
     // use jshint-stylish to make our errors look and read good
    jshint: {
	  options: {
        reporter: require('jshint-stylish')
      },
      all: [
	    'Gruntfile.js', 
		'src/*.js', 
		'src/**/*.js',
		'!src/js/libs/*.js',
		'!src/js/plugins/*.js'
	  ]
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
          src: [ 'dist/**', 'src/img/**', 'src/fonts/**', 'src/flash/**' ]
        }]
      }
    },
    
	// compile less stylesheets to css -----------------------------------------
    less: {
      dev: {
        options: {
          paths: [ "src/less" ]
        },
        files: {
          "tmp/less.css": "src/less/*.less"
        }
      },
      dist: {
        options: {
          paths: [ "src/less" ],
          cleancss: true
        },
        files: {
          "tmp/less.css": "src/less/*.less"
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
          'dist/style.min.css': ['src/**/*.css', 'tmp/*.css']
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
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('dev', [ 'clean:dist', 'connect:server', 'watch:dev' ]);
  grunt.registerTask('test', [ 'clean:dist', 'jshint', 'karma:continuous' ]);
  grunt.registerTask('junit', [ 'clean:dist', 'jshint', 'karma:junit' ]);
  grunt.registerTask('minified', [ 'clean:dist', 'connect:server', 'watch:min' ]);
  grunt.registerTask('package', [ 'clean', 'jshint', 'karma:junit', 'html2js:dist', 'concat:dist',
    'uglify:dist', 'less:dist', 'cssmin', 'htmlmin:dist', 'compress:dist' ]);
};
