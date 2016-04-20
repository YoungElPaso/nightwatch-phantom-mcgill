module.exports = function(grunt) {
  grunt.initConfig({
    nightwatch: {},
    selenium_standalone: {
      options: {

        // Turns off selenium_standalone when done.
        stopOnExit: true,
      },
      default: {
      },
    },
  });

  // Add selenium task.
  grunt.loadNpmTasks('grunt-selenium-standalone');

  // Add nightwatch task.
  grunt.loadNpmTasks('grunt-nightwatch');

  // Create a tests task that starts the selenium server, and runs nightwatch.
  grunt.registerTask('tests', ['selenium_standalone:default:start',
  'nightwatch']);
};
