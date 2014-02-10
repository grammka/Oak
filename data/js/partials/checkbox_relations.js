var CheckBoxRelation = function (options) {
	var o = $.extend({
		root: null,
		mainItemClass: null,
		itemClass: null,
		onToggleMainItem: null,
		onSelectItem: null
	}, options);

	if (
		!o.mainItemClass ||
			!o.itemClass
		) return;



	$(o.root).on('click.clickRelation', o.mainItemClass, function () {
		var isMainChecked   = $(this).hasClass('checked'),
			dataCheckbox    = $(this).attr('data-checkbox-relation'),
			$items          = $(o.itemClass +'[data-checkbox-relation='+ dataCheckbox +']'),
			$items          = isMainChecked ? $items.filter(function () { return !$(this).hasClass('checked') }) : $items;

		$items.click();
	});

	if (o.root && typeof o.itemClass === 'string') {
		$(o.root).on('click.clickRelation', o.itemClass, function (e, data) {
			clickItem.bind(this)(e, data);
		});
	} else if (!o.root) {
		$(o.itemClass).on('click.clickRelation', function (e, data) {
			clickItem.bind(this)(e, data);
		});
	} else {
		console.error('Передан неверный тип элемента');
	}

	function clickItem (e, data) {
		var dataCheckbox  = $(this).attr('data-checkbox-relation'),
			$mainItem     = $(o.mainItemClass +'[data-checkbox-relation='+ dataCheckbox +']'),
			$items        = $(o.itemClass +'[data-checkbox-relation='+ dataCheckbox +']'),
			$checkedItems = $items.filter(function () { return $(this).hasClass('checked') });

		if ($checkedItems.length == $items.length) {
			$mainItem.addClass('checked');
		} else {
			$mainItem.removeClass('checked');
		}

		if (o.onSelectItem) {
			o.onSelectItem($(this), $items, $checkedItems);
		}
	}
};