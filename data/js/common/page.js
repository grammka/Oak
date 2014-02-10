var CommonPage = {

	vars: {
		popup: [],
		notifierTimer: null,
        sideBarInContentClass: 'with_sidebar',
        sideBarInContent: 0
    },

	methods: {

		showNotifier: function (text, type, liveTime) {
			CommonPage.methods.hideNotifier();

			if (CommonPage.vars.notifierTimer)
				clearTimeout(CommonPage.vars.notifierTimer);

			CommonPage.elems.$notifierText.html(text);
			CommonPage.elems.$notifier.addClass(type).show();

			if (liveTime)
				CommonPage.vars.notifierTimer = setTimeout(CommonPage.methods.hideNotifier, liveTime);
		},

		hideNotifier: function () {
			CommonPage.elems.$notifier.removeClass('error success').hide();

			// TODO переписать убирание success
			$('.b-input__wrapper_success').removeClass('b-input__wrapper_success');
		},


		compileTpl: function (data, tpl) {
			var templateHtml    = CommonPage.tpls[tpl].html(),
				template        = Handlebars.compile(templateHtml);

			return template(data);
		},


		showPopup: function () {
		    $(this).show();
			CommonPage.elems.$shadowOverlay.show();
			CommonPage.vars.popup = $(this);
		},

		hidePopup: function () {
			CommonPage.elems.$shadowOverlay.hide();
			if (CommonPage.vars.popup.length) CommonPage.vars.popup.hide();
		},


		focusInput: function () {
		    $(this).parent().addClass('focused');
		},

		blurInput: function () {
			$(this).parent().removeClass('focused');
		},

		toggleCheckbox: function () {
			$(this).toggleClass('checked');
		},


        checkSidebarPosition: function () {
	        if (!CommonPage.elems.$sidebarWrapper.length) return;

            var winWidth = $(window).width();

            if (!CommonPage.vars.sideBarInContent && winWidth < 1170) {
                CommonPage.elems.$wrapper.addClass(CommonPage.vars.sideBarInContentClass);
                CommonPage.elems.$content.prepend(CommonPage.elems.$sidebar);

                CommonPage.vars.sideBarInContent = 1;
            } else if (CommonPage.vars.sideBarInContent && winWidth >= 1170) {
                CommonPage.elems.$wrapper.removeClass(CommonPage.vars.sideBarInContentClass);
                CommonPage.elems.$sidebarWrapper.prepend(CommonPage.elems.$sidebar);

                CommonPage.vars.sideBarInContent = 0;
            }
        }

	},

	setMethods: function () {

		this.methods.checkSidebarPosition();

		this.vars.scroller = new Scroller({
			root:       '#js-b-body',
			scroller:   '#js-b-body__scrollable',
			track:      '#js-b-body__scrollable__track',
			bar:        '#js-b-body__scrollable__bar'
		});

		this.elems.$notifierCloseBtn.on('click', function () {
			CommonPage.methods.hideNotifier();
		});

		this.elems.$shadowOverlay.on('click', function () {
			CommonPage.methods.hidePopup();
		});

		$(document).on('focus', CommonPage.elems.input, function () {
			CommonPage.methods.focusInput.bind(this)();
		});

		$(document).on('blur', CommonPage.elems.input, function () {
			CommonPage.methods.blurInput.bind(this)();
		});

		$(document).on('click', CommonPage.elems.checkbox, function () {
			CommonPage.methods.toggleCheckbox.bind(this)();
		});

		$(document).on('click', CommonPage.elems.checkbox +' input', function (e) {
			e.stopPropagation();
		});

		$(document).on('click', CommonPage.elems.checkbox +' a', function (e) {
			e.stopPropagation();
		});

        $(window).on('resize', function () {
			CommonPage.methods.checkSidebarPosition();
        });

	},

	init: function () {
		this.elems = {
			$notifier:          $('#js-b-notifier'),
			$notifierText:      $('#js-b-notifier__text'),
			$notifierCloseBtn:  $('#js-b-notifier__close-btn'),

			$shadowOverlay:     $('#js-b-shadow-overlay'),
            $sidebarWrapper:    $('#js-b-sidebar__wrapper'),
            $sidebar:           $('#js-b-sidebar'),
            $wrapper:           $('#js-b-wrapper'),
            $content:           $('#js-b-content'),

			input:              '.js-b-input',
			checkbox:           '.js-b-checkbox'
		};

		this.tpls = {
			testsListItem: $('#js-tpl-test')
		};

		this.setMethods();
	}

};