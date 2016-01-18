/*jslint node: true */
"use strict";

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: [ 'jasmine' ],
    files: [
      'src/**/*.js',
      'tests/**/*.js',
      'src/**/*.html'
    ],
    preprocessors: {
      'src/**/*.html': 'ng-html2js',
      'src/**/*.js': ['coverage']
    },
    junitReporter: {
      outputFile: 'results/TEST-units.xml',
      suite: ''
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'results/',
      subdir: '.'
    },
    reporters: [ 'progress' ],
    colors: true,
    autoWatch: false,
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-junit-reporter',
      'karma-coverage'
    ]
  });
};
