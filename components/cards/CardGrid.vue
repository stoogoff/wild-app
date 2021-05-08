<template>
	<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
		<div :key="`card_${card.id}`" v-for="card in cards" class="relative">
			<div @click="viewCard=card">
				<card-view :card="card" />
			</div>
			<span class="absolute top-0 right-0">
				<slot v-bind:card="card" />
			</span>
		</div>
		<overlay-fade v-if="viewCard">
			<card-flip :card="viewCard" />
			<span class="absolute top-1 right-1"><icon-action icon="close" outlined @click="viewCard = null" /></span>
		</overlay-fade>
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