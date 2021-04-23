<template>
	<main>
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/shadow" />
			<Loading v-if="loading" />
			<CardFlip :card="selectedCard" v-else-if="selectedCard !== null" />
			<div class="mt-2 mb-4">
				<Button type="primary" block :outlined="hasDrawn" @click="drawCard">Draw</Button>
			</div>
			<TextInput
				label="Shadow"
				v-model="character.shadow.text"
				:disabled="selectedCard === null"
			/>
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
			this.selectedCard = { ...await this.$store.getters['deck/getCard'](this.character.shadow.card) }
			this.selectedCard.isReversed = this.character.shadow.reversed
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

		hasDrawn() {
			return this.selectedCard !== null
		}
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
					reversed: this.selectedCard.isReversed,
				}
			})

			done()
		},
	},
}

</script>