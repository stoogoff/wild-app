<template>
	<main>
		<section class="flex">
			<article class="md:w-8/12">
				<markdown-content content="home" />
			</article>
			<aside class="hidden md:block w-3/12">
				<loading-spinner v-if="$fetchState.pending" />
				<card-single v-else :card="card" />
			</aside>
		</section>
	</main>
</template>

<script>

export default {
	layout: 'image',

	async fetch() {
		const cards = this.cards = await this.$store.dispatch('deck/draw', 1)

		this.card = cards[0]
	},

	data() {
		return {
			card: null,
		}
	},
}
</script>
