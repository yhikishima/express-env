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
        script: 'app.js',
        livereload: true
      },
      dev: {
        options: {
          node_env: 'development'
        }
      }
    },

  // HTML生成
    assemble: {
      options: {
        flatten: true,
        data: ['data/*'],
        partials: ['views/partials/*.hbs']
      },

      compile: {
        expand: true,
        cwd: 'views/',
        src: [
          '**/*.hbs',
        ],
        dest: 'public/'
      }
    },

    wget: {
      baseUrl: {
        options: {
          baseUrl: 'http://localhost:3000'
        },
        src: [
          'index.html'
        ],
        dest: '/'
      }
    },

    watch: {
      jshint: {
        files: jsFiles,
        tasks: [ 'jshint:all' ]
      },
      hbs: {
        files: 'views/**/*.hbs',
        helpers: 'views/helpers/*.js',
        options: {
          livereload: true
        }
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

  grunt.registerTask('build', [ 'express:dev', 'wget', 'watch' ]);

  grunt.registerTask('delay', 'Delay for express restart', function() {
    setTimeout(this.async(), 1000);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-wget');
};
