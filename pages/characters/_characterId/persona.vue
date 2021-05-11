<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/persona" />
			<div class="md:flex mb-6">
				<article class="md:w-8/12">
					<card-grid
						:cards="cards"
						:selected="character.persona.card"
						v-slot="{ card }"
					>
						<icon-action
							@click="toggleSelectedCard(card)"
							:type="isSelected(card) ? 'success' : ''"
							icon="check"
							:outlined="!isSelected(card)"
						/>
					</card-grid>

					<div class="mt-2 mb-4">
						<button-action type="primary" :outlined="hasDrawn" block @click="drawCards">Draw</button-action>
					</div>
					<text-input
						label="Persona"
						v-model="character.persona.text"
						:disabled="character.persona.card === null"
					/>
				</article>
				<progress-view :character="character" />
			</div>
			<step-buttons
				:next="`/characters/${character.id}/shadow`"
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import { drawCards, getCardById } from '~/state/deck'

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)

		if(this.character.persona.card) {
			this.cards = [ { ...getCardById(this.character.persona.card) } ]
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
		},

		hasDrawn() {
			return this.cards.length > 0
		}
	},

	methods: {
		isSelected(card) {
			return this.character.persona.card && this.character.persona.card === card.id
		},

		toggleSelectedCard(card) {
			if(this.character.persona.card && this.character.persona.card === card.id) {
				this.character.persona.card = null
			}
			else {
				this.character.persona.card = card.id
				this.character.persona.reversed = card.isReversed
			}
		},

		drawCards() {
			this.loading = true
			this.cards = drawCards(5)
			this.loading = false
		},

		async save(done) {
			await this.$store.dispatch('character/save', this.character)
			done()
		},
	},
}

</script>
