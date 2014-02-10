var Scroller = function (elems) {

	var self = this;

	this.scroller = baron(elems);

	this.update = function (time) {
		setTimeout(function () {
			self.scroller.update();
		}, time | 0);
	}

    this.updateSize = function (
        $wrapper, $scrollablePart,
        param,  // width / height
        bound   // разница между враппером и скроллируемой частью при которой скролл должен пропасть
    ) {
        var bound = bound || 0;

        $(this.scroller[0].bar).show();

        var scrollerHeight  = $scrollablePart[0]['scroll'+ (param.charAt(0).toUpperCase() + param.slice(1))], // $scrollablePart[0]  ['scroll' + 'Height / Width']
            wrapperHeight   = $wrapper[param]();

        if (scrollerHeight - wrapperHeight - bound <= 0) {
            $(this.scroller[0].bar).hide();
        } else {
            $(this.scroller[0].bar).show();
            this.update();
        }
    }

};