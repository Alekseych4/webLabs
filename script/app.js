var main = function () {
	"use strict";

	var comments = [];

	var toDos = [
		"Закончить писать эту книгу",
		"Вывести Грейси на прогулку в парк",
		"Ответить на электронные письма",
		"Подготовиться к лекции в понедельник",
		"Обновить несколько новых задач",
		"Купить продукты"
	];

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
			} else if ($element.parent().is(":nth-child(4)")) {
				$content = $(
					"<div class=\"comment-input\"> " +
						"<p>Введите комментарий:</p>" +
						"<input type=\"text\">" +
						"<button>Сохранить</button>" +
					"</div>"
					);

				var $comments = $(
					"<div class=\"comments\"></div>"
					);

				$("main .content").append($content);
				$("main .content").append($comments);

				$content.find("button").on("click", function (event) {
					let $input_tag = $content.find("input");
					let $new_comment = $("<p>");

					$new_comment.text($input_tag.val());
					$input_tag.val("");

					$comments.append($new_comment);
				});

			}


		});
	});

	$(".tabs a:first-child span").trigger("click");
};


$(document).ready(main);