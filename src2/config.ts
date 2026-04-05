
export const PORT = 8000
export const PATH = {
	PAGES: '/src2/pages',
	STATIC: '/src2/static',
}

export const BASE_MODEL = {
	title: '',

	pageTitle: function(): string {
		if(this.title) {
			return `${this.title} | WILD App`
		}

		return 'WILD App'
	},


	imagePath: function(path: string): string {
		return IMAGE_URL + path
	},
}

export const IMAGE_URL = ''
