<template>
	<main>
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/shadow" />
			<Loading v-if="loading" />
			<Card :card="selectedCard" v-else-if="selectedCard !== null" />
			<Button @click="drawCard">Draw</Button>
			<TextInput
				label="Shadow"
				v-model="character.shadow.text"
				:disabled="selectedCard === null"
			/>
			<hr/>
			<Stepper
				:next="`/characters/${character.id}/attributes`"
				:previous="`/characters/${character.id}/persona`"
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

		if(this.character.shadow.card) {
			this.selectedCard = await this.$store.getters['deck/getCard'](this.character.shadow.card)
		}

		this.loading = false
	},
	fetchOnServer: false,

	data() {
		return {
			loading: false,
			character: null,
			selectedCard: null,
		}
	},

	computed: {
		canContinue() {
			return this.character.shadow.text !== ''
		},
	},

	methods: {
		async drawCard() {
			this.loading = true

			const cards = await this.$store.dispatch('deck/draw', 1)

			this.selectedCard = cards[0]
			this.loading = false
		},

		async save(done) {
			await this.$store.commit('character/update', {
				...this.character,
				shadow: {
					card: this.selectedCard.id,
					text: this.character.shadow.text,
				}
			})

			done()
		},
	},
}

</script>