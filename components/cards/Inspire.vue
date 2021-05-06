<template>
	<Screen>
		<Navbar>
			<template #title>Inspire</template>
			<template #buttons>
				<NavButton icon="close" @click="close" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<NavItem icon="close" @click="close">Close</NavItem>
			</div>
		</Navbar>
		<Loading v-if="$fetchState.pending" />
		<CardFlip v-else :card="card" />
	</Screen>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Inspire', {
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