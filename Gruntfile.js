module.exports = function(grunt) {
  grunt.initConfig({
    nightwatch: {
      options: {

        // Need to ensure that we have all the right target hiearchy to add to
        // globals.
        test_settings: {
          default: {
            exclude: doAuthenticated(),

            // Assign some global variables values from the command line. Using
            // grunt.options.
            globals: {
              authentication: {
                userName: grunt.option('user'),
                pW: grunt.option('pw')
              }
            }
          }
        }
      }
    },
    selenium_standalone: {
      options: {

        // Turns off selenium_standalone when done.
        stopOnExit: true,
      },
      default: {
      },
    },
  });

  // Checks if we have user creds, if so, do all the tests.
  function doAuthenticated() {
    if (grunt.option('user') && grunt.option('pw')) {

      // Exclude none.
      return '';
    }
  }

  // Add selenium task.
  grunt.loadNpmTasks('grunt-selenium-standalone');

  // Add nightwatch task.
  grunt.loadNpmTasks('grunt-nightwatch');

  // Create a tests task that starts the selenium server, and runs nightwatch.
  grunt.registerTask('tests', ['selenium_standalone:default:start',
  'nightwatch']);
};
