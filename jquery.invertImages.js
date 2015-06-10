/*!
 * jQuery Invert Images
 * Licensed under the MIT license
 * Author: @shekhardesigner
 * Version: 1.0.4
 */

 ;(function ($, window, document, undefined) {

    var defaults = {
        svgWidth: 20,
		svgHeight: 20,
		idHash: "",
		svgSource: "",
		svgContent: "",
		rootElm: "html",
		rootFlag: "inverted"
    };

    function InvertImages(elm, options) {
		this.$elm = $(elm);

        this.options = $.extend({}, defaults, options);
        this.options.idHash += Math.floor((Math.random() * 100 )) + new Date().getSeconds() + new Date().getMilliseconds();
		
        this.init();
    }

    InvertImages.prototype = {

        //Build SVG and Append
        init: function () {

			var $elm = this.$elm,
				opts = this.options;
			
			opts.svgWidth = $elm.width();
			opts.svgHeight = $elm.height();
			opts.svgSource = $elm.attr("src");

			opts.svgContent = '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot_' + opts.idHash + '" class="'+$elm[0].className+' " viewBox="0 0 ' + opts.svgWidth + ' ' + opts.svgHeight + '" width="' + opts.svgWidth + '" height="' + opts.svgHeight + '">';
			opts.svgContent += '<defs>';
			opts.svgContent += '<filter id="filtersPicture_' + opts.idHash + '" >';
			opts.svgContent += '<feComposite result="inputTo_' + opts.idHash + '" in="SourceGraphic" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" />';
			opts.svgContent += '<feColorMatrix in="SourceGraphic" type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>';
			opts.svgContent += '</feComponentTransfer>';
			opts.svgContent += '</filter>';
			opts.svgContent += '</defs>';
			opts.svgContent += '<image filter="url(\'#filtersPicture_' + opts.idHash + '\')" x="0" y="0" width="' + opts.svgWidth + '" height="' + opts.svgHeight + '" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + opts.svgSource + '" />';
			opts.svgContent += '</svg>';

			$elm.addClass("hide");

			this.$elm.after(opts.svgContent);
			$(opts.rootElm).addClass(opts.rootFlag);
        },
		
        //Destroy the SVG Built
		destroy: function(){
			var $elm = this.$elm,
				opts = this.options;
			
			$(opts.rootElm).removeClass(opts.rootFlag);
			
			$elm.removeClass("hide").removeData("cj.invertImages").next("svg").remove();
		}
    };

    $.fn.invertImages = function (options) {
    	//If CSS3 Filter is available in browser, no point invoking this plugin. Lets go back.
        if (Modernizr && Modernizr.cssfilters) return;
        
        return this.each(function () {
        	var $this = $(this),
        		data = $(this).data("cj.invertImages"),
        		option = typeof options === "object" ? options : {};

    		if(!data) $.data(this, "cj.invertImages", new InvertImages(this, option));
    		if(data && typeof options === "string") data[options]();

        });
    };

})(jQuery, window, document);
