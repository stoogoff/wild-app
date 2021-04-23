<template>
	<main>
		<MarkdownContent content="characters/creation" />
		<Button block type="primary" @click="createCharacter">Start</Button>
	</main>
</template>
<script>

export default {
	data() {
		return {
			loading: false,
			character: null,
		}
	},

	methods: {
		async createCharacter() {
			const { redirect } = this.$nuxt.context

			this.loading = true

			const character = await this.$store.dispatch('character/create')

			redirect(`/characters/${character.id}/persona`)
			this.loading = false
		},
	},
}
</script>