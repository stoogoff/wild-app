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

import { getCounter, increment, decrement } from '~/store/counter'
import deck from'~/state/deck'

export default {
	layout: 'image',

	fetch() {
		this.card = deck.drawOne()
	},

	data() {
		return {
			card: null,
		}
	},
}
</script>
