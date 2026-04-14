
export default {
	data: {
		filter: '',
	},

	clearFilter() {
		this.data.filter = ''
	},

	applyFilter(evt, context) {
		this.data.filter = evt.target.value
	}
}
