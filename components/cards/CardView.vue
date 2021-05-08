<template>
	<loading-spinner v-if="$fetchState.pending" />
	<img
		v-else
		:class="{ 'transform rotate-180': actualCard.isReversed }"
		:src="`/img/cards/${actualCard.image}`"
	/>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardView', {
	props: {
		card: {
			type: Object,
			default: null,
		},
		cardName: {
			type: String,
			default: null,
		},
		reversed: {
			type: Boolean,
			default: false,
		},
	},

	async fetch() {
		if(this.cardName) {
			this.actualCard = { ...await this.$store.getters['deck/getCard'](this.cardName) }
			this.actualCard.isReversed = this.reversed
		}
	},

	data() {
		return {
			actualCard: { ...this.card },
		}
	},
})
</script>