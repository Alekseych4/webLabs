var timeoutId;

var slideshow = function(tag) {

	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + 
			"tags=" + tag + "&format=json&jsoncallback=?";

	var displayMessage = function (messageIndex) {

		var changeImg = function (items, listIndex) {
			if (listIndex < items.length) {
				var $img = $("<img>").attr("src", items[listIndex].media.m).hide();
				$("main .photos").empty();
				$("main .photos").append($img);
				$img.fadeIn();
				listIndex += 1;
			} else{
				listIndex = 0;
			}

			timeoutId = setTimeout(function(){
				changeImg(items, listIndex);
			}, 3000);
		}
		
		$.getJSON(url, function (flickrResponse) {
			console.log(messageIndex);
			
			changeImg(flickrResponse.items, 0);
		});
		
	};
	displayMessage(0);
}

var main = function () {
	"use strict"; 
	var tag = "";
	var $inputLabel = $("<p>").text("Введите тег для темы слайд-шоу: "),
		$input = $("<input>").addClass("tag"), 				
		$button = $("<button>").text("Поиск");

	$button.on("click", function () {
		var tag = "";
		tag = $input.val();
		
		$input.val("");
		if (tag !== "") {
			clearTimeout(timeoutId);
			$("main .photos").empty();
			slideshow(tag);
		}
	});
	$("main .content").append($inputLabel).append($input).append($button); 
	// console.log(tag);
};
$(document).ready(main);