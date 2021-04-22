<template>
	<main>
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/persona" />
			<CardGrid
				:cards="cards"
				:selected="character.persona.card"
				@click="toggleSelectedCard"
			/>
			<Button @click="drawCards">Draw</Button>
			<TextInput
				label="Persona"
				v-model="character.persona.text"
				:disabled="character.persona.card === null"
			/>
			<hr/>
			<Stepper
				:next="`/characters/${character.id}/shadow`"
				:disabled="!canContinue"
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

		if(this.character.persona.card) {
			this.cards = [ { ...await this.$store.getters['deck/getCard'](this.character.persona.card) } ]
			this.cards[0].isReversed = this.character.persona.reversed
		}

		this.loading = false
	},
	fetchOnServer: false,

	data() {
		return {
			loading: false,
			character: null,
			cards: [],
		}
	},

	computed: {
		canContinue() {
			return this.character.persona.card !== null && this.character.persona.text !== ''
		}
	},

	methods: {
		toggleSelectedCard(card) {
			if(this.character.persona.card && this.character.persona.card === card.id) {
				this.character.persona.card = null
			}
			else {
				this.character.persona.card = card.id
				this.character.persona.reversed = card.isReversed
			}
		},

		async drawCards() {
			this.loading = true
			this.cards = await this.$store.dispatch('deck/draw', 5)
			this.loading = false
		},

		async save(done) {
			await this.$store.commit('character/update', this.character)
			done()
		},
	},
}

</script>
