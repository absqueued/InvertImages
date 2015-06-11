Invert Images
===========

**Version 1.0.4**

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
  1. Add `jquery.invertImages.min.js` to your HTML.
  2. Call the `invertImages()` function inside DOM ready to the target image(s).

```javascript
	//Initialize
	$(function () {
	    $("img").invertImages();
	});
	
	//Destroy
	$(function () {
	    $("img.toDestroy").invertImages('destroy');
	});
```

###Other Options
| Option | Default Value | Description | 
|---|---|---|
| rootElm | html | Root element where you wish a flag/class to be added once plugin convert image using SVG|
| rootFlag | inverted | A class to be added on `rootElm`.


###Change Log
  - **Version 1.0.0** - First authord.
  - **Version 1.0.2** - Updating with Bower/NPM updates, configured grunt.
  - **Version 1.0.3** - Destroy option to be passed as string. Garbage cleared (_default was of no use - removed. Destroy actually removes the stored data()); Added more CSS in `.invert-it` class because now more browsers supports the CSS Filters.
  - **Version 1.0.4**	 - Heavy optimization, local option object. No plugin invocation if CSS3 filter exists. Minified only 2KB now.
