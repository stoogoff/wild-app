<template>
	<text-input label="Filter" v-model="filterText" @input="filter">
		<template #append>
			<span class="text-gray-300 hover:text-gray-500 cursor-pointer" @click="clear()">
				<icon-view icon="close" />
			</span>
		</template>
	</text-input>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardFilter', {
	props: {
		value: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			filterText: '',
		}
	},

	methods: {
		filter() {
			const filterText = this.filterText.toLowerCase()

			const filteredCards = this.value.filter(
				card => card.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(filterText) != -1 || card.value == filterText
			)

			this.$emit('input', filteredCards)
		},

		clear() {
			this.filterText = ''
			this.filter()
		}
	},
})
</script>