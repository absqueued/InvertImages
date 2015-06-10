"use strict";

module.exports = function (grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.initConfig({

		uglify: {
			options: {
				mangle: true,
				sourceMap: true,
				preserveComments: 'some'
			},
			dist: {
				files: {
					'jquery.invertImages.min.js': ['jquery.invertImages.js']
				}
			}
		},

		watch: {
			js: {
				files: 'jquery.invertImages.js',
				tasks: ['uglify']
			}
		}

	});

	grunt.registerTask('default', ['uglify']);
};