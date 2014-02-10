Number.prototype.degree = function () {
	return this * Math.PI / 180;
};

$.fn.serializeObject = function() {
	var i, data = {},
			$inputs = $(this).find(':input');

	for (i = 0; i < $inputs.length; i++) {
		var val,
				$input  = $($inputs[i]),
				name    = $input.attr('name');

		if (name) {
			if ($input.attr('type') == 'checkbox') {
				val = (Number($input[0].checked));
			} else {
				val = $input.val();

				if (!val) return;
			}

			if (name.indexOf(':') >= 0) {
				var obj         = {},
						nameData    = name.split(':');

				obj[nameData[1]] = val;
				data[nameData[0]].push(obj);

			} else {
				data[name] = val;
			}
		}

	}

	return data;
};


var urlQuery = function () {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}();




function rotatedDrawImage (ctx, image, fromX, fromY, angle) {
	ctx.save();
	ctx.translate(fromX + image.width / 2, fromY + image.height / 2);
	ctx.rotate(angle.degree());
	ctx.translate(-(fromX + image.width / 2), -(fromY + image.height / 2));
	ctx.drawImage(image, fromX, fromY);
	//ctx.restore();
}

function isScrolledIntoView (elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

function ajaxRequest (ajaxData) {
    $.ajax({
    	url: ajaxData.url,
    	data: ajaxData.data || null,
    	type: ajaxData.type || 'POST',
    	dataType: ajaxData.dataType || 'json',
    	success: function (data) {
    		if (data.error) {
			    if (ajaxData.onError) {
				    ajaxData.onError(data.error);
			    } else {
				    console.error(data.error);
			    }
    		} else if (data.result) {
			    if (ajaxData.onSuccess) {
				    ajaxData.onSuccess(data.result);
			    } else {
				    console.log(data.result);
			    }
    		}
    	}
    });
}