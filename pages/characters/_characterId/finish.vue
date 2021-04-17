<template>
	<section>
		<h1>6. Finishing Touches</h1>
		<p>By now, you’ll have filled in the character sheet with Attributes, Abilities and Aspects. All that remains are the finishing touches. While some of these are not immediately important, they make them a more complete person. Give them a name, a bit of a background if you have one in mind, and what you imagine they look like.</p>
		<TextInput label="Name" v-model="editingCharacter.name" />
		<TextArea label="Background" v-model="editingCharacter.background" />
		<Stepper
			:next="`/characters`"
			:previous="`/characters/${character.id}/aspects`"
			:disabled="!character.name"
		/>
	</section>
</template>
<script>

export default {
	methods: {
		save() {
			this.$store.commit('character/update', {
				id: this.editingCharacter.id,
				name: this.editingCharacter.name,
				background: this.editingCharacter.background,
			})
		}
	},
}

</script>