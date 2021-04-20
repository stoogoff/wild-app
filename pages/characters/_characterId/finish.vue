<template>
	<main>
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/finish" />
			<label class="label">Image</label>
			<FileDropZone :accept="['image/*']" @input="" />
			<TextInput label="Name" v-model="character.name" :error="character.name == ''" message="Required" />
			<TextArea label="Background" v-model="character.background" />
			<hr />
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