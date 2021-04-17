<template>
	<section>
		<h1>2. Shadow</h1>
		<p>The next card in the WILD Tarot drawn gives you some ideas what is holding you back, or getting in your way. This is your Shadow.</p>
		<p>Use the button to draw some cards to inspire your character and use for your shadow.</p>
		<Card :card="selectedCard" v-if="selectedCard !== null" />
		<Button @click="drawCard">Draw</Button>
		<TextInput
			label="Shadow"
			v-model="shadow"
			:disabled="selectedCard === null"
		/>
		<hr/>
		<Stepper
			:next="`/characters/${character.id}/attributes`"
			:previous="`/characters/${character.id}/persona`"
			:disabled="shadow === ''"
			@click="save"
		/>
	</section>
</template>
<script>

import CharacterCreation from '~/mixins/CharacterCreation'

export default {
	mixins: [CharacterCreation],

	data() {
		return {
			selectedCard: null,
			shadow: '',
		}
	},

	methods: {
		async drawCard() {
			const cards = await this.$store.dispatch('deck/draw', 1)

			this.selectedCard = cards[0]
		},

		save() {
			this.$store.commit('character/update', {
				id: this.editingCharacter.id,
				shadow: {
					card: this.selectedCard.id,
					text: this.shadow,
				}
			})
		},
	},
}

</script>