var CommonPage = {

	vars: {
		popup: [],
		notifierTimer: null,
        sideBarInContentClass: 'with_sidebar',
        sideBarInContent: 0
    },

	methods: {

		

	},

	setMethods: function () {

		this.vars.scroller = new Scroller({
			root:       '#js-b-body',
			scroller:   '#js-b-body__scrollable',
			track:      '#js-b-body__scrollable__track',
			bar:        '#js-b-body__scrollable__bar'
		});


	},

	init: function () {
		this.elems = {

		};

		this.tpls = {

		};

		this.setMethods();
	}

};