<template>
	<main>
		<Loading v-if="$fetchState.pending" />
		<section v-else>
			<h1>{{ suit.title }}</h1>
			<nuxt-content :document="suit" />
			<hr />
			<Card :key="card.id" :card="card" v-for="card in cards" />
		</section>
	</main>
</template>
<script>
import Vue from 'vue'

export default Vue.component('name', {
	async fetch() {
		const { params } = this.$nuxt.context

		this.suit = await this.$content(`tarot/${params.suit}`).fetch()
		this.cards = await this.$store.getters['deck/getSuit'](params.suit)
	},
	fetchOnServer: false,

	data() {
		return {
			suit: null,
			cards: [],
		}
	}
})
</script>
