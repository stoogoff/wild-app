<template>
	<div v-if="!$fetchState.pending">
		<section>
			<p v-if="character.description">{{ character.description }}</p>
		</section>
		<section>
			<h3>Attributes</h3>
			<ul>
					<li :key="`${attr}_${idx}`" v-for="(attr, idx) in Object.keys(character.attributes)">
						<strong>{{ attr }}:</strong> {{ character.attributes[attr] }}
					</li>
			</ul>
		</section>
		<section>
			<h3>Abilities</h3>
			<ul>
					<li :key="`${attr}_${idx}`" v-for="(attr, idx) in Object.keys(character.abilities)">
						<strong>{{ attr }}:</strong> {{ character.abilities[attr] }}
				</li>
			</ul>
		</section>
	</div>
</template>
<script>

export default {
	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)
		console.log(this.character)
	},

	data() {
		return {
			character: null,
		}
	},
}

</script>