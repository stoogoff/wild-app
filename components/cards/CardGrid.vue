<template>
	<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
		<div :key="`card_${card.id}`" v-for="card in cards" class="relative">
			<div @click="viewCard=card">
				<Card :card="card" />
			</div>
			<span class="absolute top-0 right-0">
				<slot v-bind:card="card" />
			</span>
		</div>
		<Overlay v-if="viewCard">
			<CardFlip :card="viewCard" />
			<span class="absolute top-1 right-1"><IconButton icon="close" outlined @click="viewCard = null" /></span>
		</Overlay>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardGrid', {
	props: {
		cards: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			viewCard: null
		}
	},
})

</script>