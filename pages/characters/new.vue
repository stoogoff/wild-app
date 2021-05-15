<template>
	<main>
		<markdown-content content="characters/creation" />
		<button-action block type="primary" @click="createCharacter">Start</button-action>
	</main>
</template>
<script>

import { character } from '~/state'

export default {
	layout: 'image',

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

			const newCharacter = await character.create()

			redirect(`/characters/${newCharacter.id}/persona`)
			this.loading = false
		},
	},
}
</script>