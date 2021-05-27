<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/shadow" />
			<div class="md:flex mb-6">
				<article class="md:w-8/12">
					<loading-spinner v-if="loading" />
					<card-grid
						v-else-if="selectedCard !== null"
						:cards="[selectedCard]"
						:selected="selectedCard"
						v-slot="{ card }"
					>
					</card-grid>
					<div class="mt-2 mb-4">
						<button-action type="primary" block :outlined="hasDrawn" @click="drawCard">Draw</button-action>
					</div>
					<text-input
						label="Shadow"
						v-model="character.shadow.text"
						:disabled="selectedCard === null"
					/>
				</article>
				<progress-view :character="character" />
			</div>
			<step-buttons
				:next="`/characters/${character.id}/attributes`"
				:previous="`/characters/${character.id}/persona`"
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import { deck, character } from '~/state'

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)

		if(this.character.shadow.card) {
			this.selectedCard = { ...deck.byId(this.character.shadow.card) }
			this.selectedCard.isReversed = this.character.shadow.reversed
		}

		this.loading = false
	},

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
		drawCard() {
			this.loading = true
			this.selectedCard = deck.drawOne()
			this.loading = false
		},

		async save(done) {
			await character.save({
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