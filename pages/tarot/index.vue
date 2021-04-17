<template>
	<main>
		<h1>The Tarot Deck</h1>
		<Loading v-if="$fetchState.pending" />
		<section v-else :key="suit.id" v-for="suit in suits">
			<h2>
				<nuxt-link :to="suit.path">{{ suit.title }}</nuxt-link>
			</h2>
		</section>
	</main>	
</template>
<script>

export default  {
	async fetch() {
		this.suits = await this.$content('tarot').only(['title']).fetch()
	},
	fetchOnServer: false,

	data() {
		return {
			suits: [],
		}
	}
}

</script>