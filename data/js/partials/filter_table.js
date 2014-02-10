var FilterTable = function (options) {

	var o = $.extend({
		input: null,
		row: null,
		cell: null
	}, options);

	if (
		!o.input ||
		!o.row ||
		!o.cell
	) return;

	$(o.input).on('keyup', function () {
		var val = $(this).val();

		$(o.row).show();

		if (!val || /\s+/.test(val)) return;

		$(o.row).filter(function () {
			var $cells = $(this).find(o.cell);

		    return !($cells.filter(function () {
			    return $(this).html().indexOf(val) > 0;
		    })).length;
		}).hide();
	});

};