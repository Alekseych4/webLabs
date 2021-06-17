var main = function (toDoObjects) {
	"use strict";

	var comments = [];


	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	var todosByTag = function () {
		let tags = [];

		toDoObjects.forEach(el => {
			el.tags.forEach(tag => {
				if (!tags.includes(tag)) {
					tags.push(tag);
				}
			});
		});

		var tagObj = tags.map(tag => {
			var toDosWithTag = [];
			toDoObjects.forEach(item => {
				if (item.tags.includes(tag)) {
					toDosWithTag.push(item.description);
				}
			});

			return {"name": tag, "toDos": toDosWithTag};
		});

		return tagObj;
	}


	$(".tabs a span").toArray().forEach(function (element) {

		$(element).on("click", function () {

			var $element = $(element), 
			$content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
				
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);

			} else if ($element.parent().is(":nth-child(3)")) {

				todosByTag.forEach(function (tag) {
					var $tagName = $("<h2>").text(tag.name), $content = $("<ul>");

					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});


			} else if ($element.parent().is(":nth-child(4)")) {
				$content = $("<div class=\"note\"> " +
								"<p>Введите название заметки:</p>" +
								"<input type=\"text\">" + 
								"<button>Сохранить</button>" +
							"</div>");

				$("main .content").append($content);

				$content.find("button").on("click", function(){
					let input_tag = $content.find("input");
					toDos.push(input_tag.val());
					input_tag.val("")
				});
			} else if ($element.parent().is(":nth-child(5)")) {

				$content = $(
					"<div class=\"comment-input\"> " +
						"<p>Введите комментарий:</p>" +
						"<input type=\"text\">" +
						"<button>Сохранить</button>" +
					"</div>"
					);

				var $comments = $(
					"<div class=\"comments\">" +
						"</div>"
					);

				$("main .content").append($content);
				$("main .content").append($comments);

				var commentAdding = function () {
					
					let $input_tag = $content.find("input");
					let date = new Date();

					let color = "gainsboro";

					if (date.getSeconds() % 2 == 0) {
						color = "lavender";
					} else if(date.getSeconds() % 3 == 0)
						color = "red";

					let $new_comment = $("<div class=\"comment\" style=\"margin: 5px; border-radius: 6px; " +
						"padding: 5px; background: " + color + ";\">" + 
						"<p class=\"text\" style=\"display: inline-block; width:60%;\"></p>" +
						"<p class=\"time\" style=\"display: inline-block;width:40%;\"></p>" +
						"</div>"
						);

					let $text = $new_comment.find("p.text");
					let $time = $new_comment.find("p.time");

					if ($input_tag.val() == "") 
						return;
					
					$text.text($input_tag.val());
					$input_tag.val("");

					$time.text(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "  " + date.getDate() + "." 
						+  date.getMonth() + "." + date.getFullYear());

					$new_comment.hide();
					$comments.append($new_comment);
					$new_comment.fadeIn();
				}

				$content.find("button").on("click", commentAdding);
				$content.find("input").on("keypress", function(key) {
					console.log(key.which);
    				if(key.which == 13) {
       	 				commentAdding();
					}
				});

			}


		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
	$.getJSON("../res/todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});
