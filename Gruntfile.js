module.exports = function(grunt) {
  var jsFiles = [
    'Gruntfile.js',
    'app.js',
    'lib/**/*.js',
    'routes/**/*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        // Set force to true to report JSHint errors but not fail the task
        force: true
      },
      all: jsFiles
    },
    express: {
      options: {
        script: 'app.js'
      },
      dev: {
        options: {
          node_env: 'development'
        }
      }
    },
    watch: {
      jshint: {
        files: jsFiles,
        tasks: [ 'jshint:all' ]
      },
      express: {
        files: jsFiles,
        tasks: [ 'express:dev', 'delay' ],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('server', [ 'jshint:all', 'express:dev', 'watch' ]);

  grunt.registerTask('delay', 'Delay for express restart', function() {
    setTimeout(this.async(), 1000);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
};
