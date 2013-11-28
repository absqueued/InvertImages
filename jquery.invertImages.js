/*!
 * jQuery Invert Images
 * Licensed under the MIT license
 * Author: @shekhardesigner
 * On: November 28, 2013
 */

 ;(function ($, window, document, undefined) {

    var defaults = {
            svgWidth: 20,
			svgHeight: 20,
			svgImage: 1,
			svgSource: "",
			svgContent: "",
			cssSupport: false,
			destroy: false
        };

    function InvertImage(elm, options) {
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

    InvertImage.prototype = {

        init: function() {
		
			//future extension to check css support and then only process with SVG
			//this.options.cssSupport = this.cssSupport('filter');
			
			this.options.svgWidth = this.$elm.width();
			this.options.svgHeight = this.$elm.height();
			this.options.svgSource = this.$elm.attr('src');

			this.options.svgContent = '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot_' + this.options.svgImage + '" class="tile-image" viewBox="0 0 ' + this.options.svgWidth + ' ' + this.options.svgHeight + '" width="' + this.options.svgWidth + '" height="' + this.options.svgHeight + '">';
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

        },

        //Future extension, to detect CSS support. If supported  then prevent SVG processing.
		cssSupport: function(prop) {
			var div = document.createElement('div'),
				vendors = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'],  
				vendorsLen = vendors.length;  
			  
			if ((prop in div.style)) return true;

			prop = prop.replace(/^[a-z]/, function(val) {  
			 return val.toUpperCase();  
			});  

			while(vendorsLen--) {  
				if ( vendors[vendorsLen] + prop in div.style ) {  
					return true;  
				}   
			}  
			return false;  
        },
		
		destroy: function(elm, options){
			this.$elm.removeClass('hide');
			$(this.$elm.next()).remove();
		}
    };

    $.fn.invertImages = function (options) {
        return this.each(function () {
			$.data(this, "invertImages", new InvertImage(this, options));
        });
    };

})( jQuery, window, document );
