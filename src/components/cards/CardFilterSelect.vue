<template>
	<div>
		<div class="flex">
			<div class="w-10/12"><card-filter :value="cards" @input="updateGrid" /></div>
			<div class="w-1/12 mt-9 ml-4"><check-box v-model="selected.reversed" label="Reversed" /></div>
		</div>
		<card-grid :cards="filteredCards">
			<template #card="{ card }">
				<icon-action
					@click="selectCard(card)"
					:type="isSelected(card) ? 'success' : ''"
					icon="check"
					:outlined="!isSelected(card)"
				/>
			</template>
		</card-grid>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardFilterSelect', {
	props: {
		cards: {
			type: Array,
			required: true,
		},
		selected: {
			type: Object,
			default: null,
		},
	},

	data() {
		let filteredCards = []

		if(this.selected) {
			filteredCards = [ ...this.cards.filter(card => card.id === this.selected.card).map(card => ({ ...card, isReversed: this.selected.reversed })) ]
		}

		return {
			filteredCards,
		}
	},

	watch: {
		'selected.reversed'() {
			this.filteredCards = this.filteredCards.map(card => ({ ...card, isReversed: this.selected.reversed }))
		},
	},

	methods: {
		isSelected(card) {
			return this.selected && this.selected.card === card.id
		},

		selectCard(card) {
			this.$emit('input', card)
		},

		updateGrid(newCards) {
			this.filteredCards = newCards.length === this.cards.length ? [] : newCards.map(card => ({ ...card, isReversed: this.selected.reversed }))
		},
	},
})
</script>