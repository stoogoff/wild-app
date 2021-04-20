<template>
	<main>
		<h1>The Tarot Deck</h1>
		<Loading v-if="$fetchState.pending" />
		<figure v-else :key="suit.id" v-for="suit in suits" class="group border border-gray-300 rounded-md p-3 mb-4">
			<nuxt-link :to="suit.path" class="flex flex-col items-center">
				<img v-if="suit.image" :src="`/img/cards/${suit.image}`" class="mb-4" />
				<figcaption class="text-xl uppercase text-gray-500">
					{{ suit.title }}
				</figcaption>
			</nuxt-link>
		</figure>
	</main>	
</template>
<script>

import { sortByProperty } from '~/utils/list'

export default  {
	async fetch() {
		this.suits = (await this.$content('tarot').only(['title', 'sort', 'image']).fetch()).sort(sortByProperty('sort'))
	},
	fetchOnServer: false,

	data() {
		return {
			suits: [],
		}
	}
}

</script>