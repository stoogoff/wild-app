<template>
	<screen-slide>
		<nav-bar>
			<template #title>Inspire</template>
			<template #buttons>
				<nav-button icon="close" @click="close" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<nav-item icon="close" @click="close">Close</nav-item>
			</div>
		</nav-bar>
		<loading-spinner v-if="$fetchState.pending" />
		<card-flip v-else :card="card" />
	</screen-slide>
</template>
<script>
import Vue from 'vue'

export default Vue.component('InspireDraw', {
	async fetch() {
		const cards = await this.$store.dispatch('deck/draw', 1)

		this.card = cards[0]
	},

	data() {
		return {
			card: null,
		}
	},

	methods: {
		close() {
			this.$emit('close')
		},
	},
})
</script>