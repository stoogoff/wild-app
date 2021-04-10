<template>
	<div>
		<p>Some blurb about creating a character.</p>
		<Loading v-if="$fetchState.pending" />
		<section v-else>
			<ol class="m-3">
				<li :key="`character_${character.id}`" v-for="(character, idx) in characters">
					<nuxt-link :to="`/characters/${character.id}`">
						<a className="text-blue-600 underline">{{ character.name || `Unnamed character (${character.id})` }}</a>
					</nuxt-link>
				</li>
			</ol>
		</section>
		<Link class="btn" to="/characters/new">New Character</Link>
	</div>
</template>
<script>
import Vue from 'vue'

export default {
	async fetch() {
		this.characters = await this.$store.dispatch('character/fetch')
	},

	data() {
		return {
			characters: []
		}
	},
}
</script>