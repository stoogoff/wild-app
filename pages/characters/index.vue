<template>
	<main>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<markdown-content content="characters/index" />
			<div class="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				<article
					:key="`character_${character.id}`"
					v-for="(character, idx) in characters"
					class="border-b border-gray-300 last:border-b-0 md:border-0 relative mb-4 "
				>
					<nuxt-link :to="`/characters/${character.id}`">
						<character-image :character="character" />
						<h2>{{ character.name || `Unnamed character (${character.id})` }}</h2>
						<p v-if="character.background" class="mb-4 text-lg leading-relaxed text-gray-800">{{ character.background }}</p>
						<span class="absolute right-2 top-2"><icon-action type="primary" outlined icon="book-open" /></span>
					</nuxt-link>
				</article>
			</div>
		</section>
		<link-action block type="primary" to="/characters/new">New Character</link-action>
	</main>
</template>
<script>

import sortBy from 'lodash/sortBy'
import { character } from '~/state'

export default {
	layout: 'image',

	async fetch() {
		this.characters = sortBy(await character.all(), 'name')
	},

	data() {
		return {
			characters: [],
		}
	},
}
</script>
