$.fn.parsley.defaults.animateDuration = 0;
$.fn.parsley.defaults.successClass = '';

$.fn.parsley.defaults.messages = {
	defaultMessage: 'Неверный формат',
	type: {
		email:      'Неверный формат email',
		url:        'Неверный формат url',
		urlstrict:  'Неверный формат url',
		number:     'Неверный формат числа',
		digits:     'Неверный формат digits',
		dateIso:    'Неверный формат даты (ГГГГ-MM-ДД)',
		alphanum:   'Необходимо ввести альфачисло',
		phone:      'Неверный формат номера телефона'
	},
	notnull:        'Заполните поле',
	notblank:       'Заполните поле',
	required:       'Обязательное поле',
	regexp:         'Неверный формат',
	min:            'Значение не должно быть меньше, чем %s',
	max:            'Значение не должно быть больше, чем %s',
	range:          'Значение должно быть между %s и %s',
	minlength:      'Значение не может быть меньше %s символов',
	maxlength:      'Значение не может быть больше %s символов',
	rangelength:    'Длина текста должна быть не меньше %s и не больше %s символов',
	mincheck:       'Вы должны выбрать не меньше %s значений',
	maxcheck:       'Вы должны выбрать не больше %s значений',
	rangecheck:     'Количество выбранных значений должно быть между %s и %s',
	equalto:        'Это значение должно быть таким же'
};

$.fn.parsley.defaults.errors.container = function (element) {
	var $container = element.parent().find('.b-error-label');
	if ($container.length === 0) {
		$container = $("<div class='b-error-label b-error-label_right'></div>").insertBefore(element);
	}
	return $container;
};

$.fn.parsley.defaults.listeners.onFieldError = function (elem) {
	elem.parent().removeClass('b-input__wrapper_success');
};

$.fn.parsley.defaults.listeners.onFieldSuccess = function (elem) {
	elem.parent().addClass('b-input__wrapper_success');
};




var ParsleyMethods = {

	setContainer: function (position) {
		return function (element) {
			var $container = element.parent().find('.b-error-label');
			if ($container.length === 0) {
				$container = $("<div class='b-error-label b-error-label_'+ position></div>").insertBefore(element);
			}
			return $container;
		}
	}

};