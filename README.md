Invert Images
===========

Invert White Images to Black using SVG, targeted for IE10 as CSS3 Filters replacement.

###Dependencies
 - [Modernizr](http://modernizr.com/download/#-inlinesvg-svg-shiv-cssclasses-prefixes-css_filters) with CSS Filters and Prefixed  detection enabled.
 - jQuery 1.x

###Browser Support
- Internet Explorer 10
- Chrome/Firefox Supports CSS3 filter


###Demo
 - [Working Demo](http://shekhardesigner.github.io/InvertImages/)
 - Blog post(coming soon!)

###How-To
Call the `invertImages()` function inside DOM ready to the target image(s).

```javascript
	//Initialize
	$(function () {
	    $("img").invertImages();
	});
	
	//Destroy
	$(function () {
	    $("img.toDestroy").invertImages('destroy');
	});


###Change Log
  - Version 1.0.0 - First authord.
  - Version 1.0.2 - Updating with Bower/NPM updates, configured grunt.
