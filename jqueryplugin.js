(function ($) {
$.fn.jqplugin = function(data) {
    var test = "Working";
    //return test;
	this.text(test);
	//$('#lblid').text('not');
	$.fn.jqplugin.defaults = {
		name:'',
		Age:'',
		Location:'',
		Single:''
	};
	var newdata = $.extend({},$.fn.jqplugin.defaults,data);
	alert(JSON.stringify(newdata));
	$.fn.jqplugin.testdata = "Working";
	$.fn.jqplugin.newfn = function(){
		alert('Working');
	}
	// return newdata;
}
})(jQuery);
