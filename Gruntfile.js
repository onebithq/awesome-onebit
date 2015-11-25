var _ = require('underscore');

module.exports = function(grunt) {
  grunt.initConfig({
    deadlink: {
      options: {
        logAll: true,
        filter: function(content) { // `function` or `regular expressions` to take a link. default is markdown.
            var expressions = [
              /\[[^\]]*\]\((http[s]?:\/\/[^\) ]+)/g,  //[...](<url>)
              /\[[^\]]*\]\s*:\s*(http[s]?:\/\/.*)/g,  //[...]: <url>
            ];
            var result = [];
            _.forEach(expressions, function(expression) {
              var match = expression.exec(content);
              while(match != null) {
                result.push(match[1]);
                match = expression.exec(content);
              }
            });
            return result; // Return array of link.
        }
      },
      target: {
        src: [ "*.md", "*.markdown" ] // glob pattern. files path that include links to checking.
      },
    },
  });
  grunt.loadNpmTasks('grunt-deadlink');
  grunt.registerTask('test', ['deadlink:target']);
}
