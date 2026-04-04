module.exports = {
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				control: {
					lighter: '#e0f0d5',
					light: '#c1e0ac',
					DEFAULT: '#a3d182',
					dark: '#84c159',
					darker: '#65b22f',
				},
				focus: {
					lighter: '#cdcdf9',
					light: '#9b9bf3',
					DEFAULT: '#686aec',
					dark: '#3638e6',
					darker: '#0406E0',
				},
				passion: {
					lighter: '#f1cccc',
					light: '#e39999',
					DEFAULT: '#d66666',
					dark: '#c83333',
					darker: '#BA0000',
				},
				strength: {
					lighter: '#fdf7d8',
					light: '#faeeb1',
					DEFAULT: '#f8e68a',
					dark: '#f5dd63',
					darker: '#f3d53c',
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
