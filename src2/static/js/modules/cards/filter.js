
export default {
	data: {
		filter: '',
	},

	clearFilter() {
		this.data.filter = ''
	},

	applyFilter(evt, scope) {
		this.data.filter = evt.target.value
	}
}
