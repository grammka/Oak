var Header = {

	vars: {},

	elems: {},

	methods: {



	},

	setMethods: function () {

		this.elems.$headerRadialProgress.knob({
			width: 60,
			height: 60,
			className: 'b-container__header__progress',
			thickness: 0.1,
			bgColor: 'transparent',
			displayInput: false,
			readOnly: true
		});

	},

	init: function () {
		this.elems = {
			$headerRadialProgress:      $('#js-b-container__header__progress'),
			$headerRadialProgressVal:   $('#js-b-container__header__progress__value')
		};

		this.setMethods();
	}

};