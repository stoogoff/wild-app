<template>
	<main>
		<Loading v-if="$fetchState.pending" />
		<section v-else>
			<MarkdownContent :content="contentPath" />
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

		this.cards = await this.$store.getters['deck/getSuit'](params.suit)
	},
	fetchOnServer: false,

	data() {
		return {
			cards: [],
		}
	},

	computed: {
		contentPath() {
			const { params } = this.$nuxt.context

			return `tarot/${params.suit}`
		}
	},
})
</script>
