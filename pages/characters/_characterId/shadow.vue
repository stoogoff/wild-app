<template>
	<main class="pt-12 relative">
		<Loading v-if="loading || character === null" />
		<section v-else>
			<h1>2. Shadow</h1>
			<p>The next card in the WILD Tarot drawn gives you some ideas what is holding you back, or getting in your way. This is your Shadow.</p>
			<p>Use the button to draw some cards to inspire your character and use for your shadow.</p>
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

		save() {
			this.$store.commit('character/update', {
				...this.character,
				shadow: {
					card: this.selectedCard.id,
					text: this.character.shadow.text,
				}
			})
		},
	},
}

</script>