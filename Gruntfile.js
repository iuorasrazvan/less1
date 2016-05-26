module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
     
      css: {
        src: ['src/css/**/*.css'],
        dest: 'dest/css/<%= pkg.name %>style.css'
      },
	  
	  js: {
        src: ['src/js/**/*.js'],
        dest: 'dest/js/<%= pkg.name %>script.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
	  
	  css: {
        files: {
          'dest/css/<%= pkg.name %>.min.js': ['<%= concat.css.dest %>']
        }
      },
     
	  js: {
        files: {
          'dest/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js', 'test/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);
  
  grunt.registerTask('js', ['concat:js', 'uglify:js']);
  
  grunt.registerTask('css', ['concat:css']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};