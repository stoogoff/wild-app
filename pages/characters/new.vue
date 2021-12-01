<template>
	<main>
		<markdown-content content="characters/creation" />
		<div class="flex">
			<button-action block type="primary" @click="walkthrough">Walkthrough</button-action>
			<button-action block @click="add">Add</button-action>
		</div>
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
		async create(suffix) {
			const { redirect } = this.$nuxt.context

			this.loading = true

			const newCharacter = await character.create()

			redirect(`/characters/${newCharacter.id}/${suffix}`)
			this.loading = false
		},

		async walkthrough() {
			this.create('persona')
		},

		async add() {
			this.create('add')
		},
	},
}
</script>