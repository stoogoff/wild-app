<template>
	<section>
		<h1>1. Persona</h1>
		<p>Define who your character is, determine the basic concept for who they are. Who they are and what they are like. This involves choosing a card from the WILD Tarot deck that best signifies your character.</p>
		<p>Use the button to draw some cards to inspire your character and use for your persona.</p>
		<CardGrid
			:cards="cards"
			:selected="selectedCard"
			@click="toggleSelectedCard"
		/>
		<Button @click="drawCards">Draw</Button>
		<TextInput
			label="Persona"
			v-model="persona"
			:disabled="selectedCard === null"
		/>
		<hr/>
		<Stepper
			:next="`/characters/${character.id}/shadow`"
			:disabled="selectedCard === null || persona === ''"
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
			cards: [],
			persona: '',
			selectedCard: null,
		}
	},

	methods: {
		toggleSelectedCard(card) {
			if(this.selectedCard && this.selectedCard.id === card.id) {
				this.selectedCard = null
			}
			else {
				this.selectedCard = card
			}
		},

		async drawCards() {
			this.cards = await this.$store.dispatch('deck/draw', 5)
		},

		save() {
			this.$store.commit('character/update', {
				id: this.editingCharacter.id,
				persona: {
					card: this.selectedCard.id,
					text: this.persona,
				}
			})
		},
	},
}

</script>
