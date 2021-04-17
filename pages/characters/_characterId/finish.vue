<template>
	<main class="pt-12 relative">
		<Loading v-if="loading || character === null" />
		<section v-else>
			<h1>6. Finishing Touches</h1>
			<p>By now, you’ll have filled in the character sheet with Attributes, Abilities and Aspects. All that remains are the finishing touches. While some of these are not immediately important, they make them a more complete person. Give them a name, a bit of a background if you have one in mind, and what you imagine they look like.</p>
			<TextInput label="Name" v-model="character.name" />
			<TextArea label="Background" v-model="character.background" />
			<Stepper
				:next="`/characters/${character.id}`"
				:previous="`/characters/${character.id}/aspects`"
				:disabled="!character.name"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)
		this.loading = false
	},
	fetchOnServer: false,

	data() {
		return {
			loading: false,
			character: null,
		}
	},

	methods: {
		save() {
			this.$store.dispatch('character/save', this.character)
		}
	},
}

</script>