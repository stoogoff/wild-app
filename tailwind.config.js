module.exports = {
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				focus: {
					lighter: '#e7e6f1',
					light: '#c3c1db',
					DEFAULT: '#8883b8',
					dark: '#3e358c',
					darker: '#110671',
				},
				strength: {
					lighter: '#fffbe8',
					light: '#fff5c6',
					DEFAULT: '#ffeb8e',
					dark: '#ffde48',
					darker: '#ffd61d',
				},
				control: {
					lighter: '#e6efea',
					light: '#c1d8cb',
					DEFAULT: '#83b198',
					dark: '#368058',
					darker: '#076331',
				},
				passion: {
					lighter: '#fbe5e5',
					light: '#f6bfbf',
					DEFAULT: '#ed8080',
					dark: '#e23030',
					darker: '#db0000',
				},
			},
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
			borderWidth: ['last']
		},
	},
	plugins: [],
}
