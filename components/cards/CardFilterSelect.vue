<template>
	<div>
		<card-filter :value="cards" @input="updateGrid" />
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
			type: String,
			default: null,
		},
	},

	data() {
		return {
			filteredCards: [],
		}
	},

	methods: {
		isSelected(card) {
			return this.selected && this.selected === card.id
		},

		selectCard(card) {
			this.$emit('input', card)
		},

		updateGrid(newCards) {
			this.filteredCards = newCards.length === this.cards.length ? [] : newCards
		},
	},
})
</script>