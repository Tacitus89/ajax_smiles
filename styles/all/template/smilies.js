(function($) { // Avoid conflicts with other libraries

	'use strict';

	
	$.fn.ajax_smilies = function(start)  {
		
		if (start === undefined) {
			start = 0;
		}
		
		//exist the smiley box?
		if ( $('#smiley-box').length ) {
			
			//switch the smiley-box with message-box
			$('#smiley-box').insertAfter('#message-box');
			//delete all smilies
			$('#smiley-box > a').remove();
			//delete all pagination
			$('#smiley-box .pagination').remove();
		
			$.get( "./posting.php", { mode: "smilies", start: start }, function( data ) {			
				var html = $(data)
				//call every smilies
				html.find(".inner a").each(function(index, element) {
					var smiley = $(element);
					//get the onclick attribute
					var onclick = smiley.attr("onclick");
					//delete and replace the onclick-functions
					onclick = onclick.replace("initInsertions(); ", "");
					onclick = onclick.replace(", true, true);", ", true);");
					//set the new onclick-function
					smiley.attr("onclick", onclick);
					
					if(index > 1)
					{
						//position of all other smilies after the last smiley
						smiley.insertAfter('#smiley-box > a:last');
					}
					else
					{
						//position of the first smiley
						smiley.insertAfter('#smiley-box br:first');
					}
				});
				
				//adding pagination
				html.find('.pagination').insertBefore('.bbcode-status');
				
				//set the new attribute to all pagination links
				$('#smiley-box .pagination a').each(function(index, element) {
					var patt = new RegExp(/posting\.php\?mode=smilies.*start=(\d*)/g);
					var str = $(element).attr("href");
					//get the start number from link
					var res = patt.exec(str);
					
					var page = 0;
					if(res != null)
					{
						page = res[1];
					}
					
					//set the new attribute
					$(element).attr("href", "#").attr("onclick", "$.fn.ajax_smilies("+ page +"); return false;");
				});
			});
		};
	}
	
	//run the function at beginning
	$.fn.ajax_smilies();

})(jQuery); // Avoid conflicts with other libraries