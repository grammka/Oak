$.fn.hightLightFilter = function (options) {

	var $highlight          = $('<span class="b-filter-highlight"></span>'),
			$highlightWrapper   = $('<span class="b-filter-highlight__wrapper"></span>'),
			$oldItems           = [],
			o                   = $.extend({
				root: null,
				item: null,
				selectFullWord: false
			}, options);

	if (!o.item) return;

	var $root = $(o.root || document);



	$(this).on('keyup', function () {
		var filterVal   = $(this).val().toLowerCase(),
				$items      = $root.find(o.item);

		if ($oldItems.length) {
			$.each($oldItems, function () {
				$(this).replaceWith($(this).html().replace(/(<.+?>)/g, ''));
			});
		}

		$oldItems = [];

		if (filterVal.length < 3) return;

		if (!filterVal || (/\s+/).test(filterVal)) return;

		$items.each(function () {
			if ($(this).is(':hidden')) return;

			var $textNodes = $(this).contents().filter(function() { return this.nodeType === 3; });

			$textNodes.each(function () {
				var text        = $(this).text().toLowerCase(),
						$container  = $highlightWrapper.clone();

				if (text.indexOf(filterVal) < 0) return;

				if (text == filterVal || o.selectFullWord) {
					$(this).replaceWith($container.append($highlight.clone().html($(this).text())));
				} else {
					var textArr = $(this).text().split();

					for (var i=0; i<textArr.length; i++) {
						$container.append($highlight.clone().html(textArr[i])).append(filterVal);
					}

					$(this).replaceWith($container);
				}

				$oldItems.push($container);
			});
		});
	});

};