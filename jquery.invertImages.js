/*!
 * jQuery Invert Images
 * Licensed under the MIT license
 * Author: @shekhardesigner
 * Version: 1.0.2
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Shekhar Sharma
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

 ;(function ($, window, document, undefined) {

    var defaults = {
        svgWidth: 20,
		svgHeight: 20,
		svgImage: 1,
		svgSource: "",
		svgContent: "",
		cssFilters: false,
		destroy: false
    };

    function InvertImages(elm, options) {
        this.element = elm;
		this.$elm = $(elm);

        this.options = $.extend({}, defaults, options) ;

        this._defaults = defaults;

		if(this.options.destroy){
			 this.destroy();
			 return false;
		};
		
        this.init();
    }

    InvertImages.prototype = {

        //Build SVG and Append
        init: function () {
		
            this.options.cssFilters = this.cssSupport("cssfilters");
            
            if (this.options.cssFilters) return false;
			
			this.options.svgWidth = this.$elm.width();
			this.options.svgHeight = this.$elm.height();
			this.options.svgSource = this.$elm.attr('src');

			this.options.svgContent = '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot_' + this.options.svgImage + '" class="tile-image '+this.$elm[0].className+' " viewBox="0 0 ' + this.options.svgWidth + ' ' + this.options.svgHeight + '" width="' + this.options.svgWidth + '" height="' + this.options.svgHeight + '">';
			this.options.svgContent += '<defs>';
			this.options.svgContent += '<filter id="filtersPicture_' + this.options.svgImage + '" >';
			this.options.svgContent += '<feComposite result="inputTo_' + this.options.svgImage + '" in="SourceGraphic" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" />';
			this.options.svgContent += '<feColorMatrix in="SourceGraphic" type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>';
			this.options.svgContent += '</feComponentTransfer>';

			this.options.svgContent += '</filter>';
			this.options.svgContent += '</defs>';
			this.options.svgContent += '<image filter="url(\'#filtersPicture_' + this.options.svgImage + '\')" x="0" y="0" width="' + this.options.svgWidth + '" height="' + this.options.svgHeight + '" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + this.options.svgSource + '" />';
			this.options.svgContent += '</svg>';

			this.$elm.addClass('hide');

			this.$elm.after(this.options.svgContent);
			this.options.svgImage++;
			$("html").addClass("inverted");
        },

        //Check CSS Support using Modernizr
        cssSupport: function (prop) {
		    if (Modernizr && Modernizr[prop]) return true;
		    return false;
        },
		
        //Destroy the SVG Built
		destroy: function(elm, options){
			this.$elm.removeClass('hide');
			$(this.$elm).next().remove();
			$("html").removeClass("inverted");
		}
    };

    $.fn.invertImages = function (options) {
        return this.each(function () {
			$.data(this, "invertImages", new InvertImages(this, options));
        });
    };

})( jQuery, window, document );
