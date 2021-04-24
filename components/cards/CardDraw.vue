<template>
	<transition name="slide-up">
		<div class="w-full h-full fixed block inset-0 bg-white overflow-x-scroll z-40">
			<div class="bg-gray-600 p-2 text-white flex">
				<Button :disabled="!canPush" @click="push">Push</Button>
				<h3 class="uppercase text-lg text-center flex-grow">{{ totalSuccesses }} Success{{ totalSuccesses === 1 ? '' : 'es' }}</h3>
				<IconButton icon="close" outlined @click="$emit('close')" />
			</div>
			<CardGrid
				:cards="cards"
				v-slot="{ card }"
			>
				<span class="marker" :class="isSuccessful(card) ? 'success' : 'fail'">
					<Icon :icon="icon(card)" />
				</span>
			</CardGrid>
		</div>
	</transition>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardDraw', {
	props: {
		number: {
			type: Number,
			required: true,
		},
		character: {
			type: Object,
			required: true,
		},
		attribute: {
			type: String,
			required: true,
		},
		ability: {
			type: String,
			required: true,
		},
	},

	async fetch() {
		this.cards = await this.$store.dispatch('deck/draw', this.number)
	},

	data() {
		return {
			cards: [],
		}
	},

	computed: {
		totalSuccesses() {
			return this.cards.map(card => this.successes(card)).reduce((acc, val) => acc + val, 0)
		},

		canPush() {
			return this.cards.map(card => this.successes(card)).filter(value => value === 0).length > 0
		},
	},

	methods: {
		successes(card) {
			let successes = 0
			let numericValue = parseInt(card.value)
			const tn = parseInt(this.character.attributes[this.attribute]) + parseInt(this.character.abilities[this.ability])

			// court card matches ability used
			if(card.value === this.ability) {
				successes++
				numericValue = 10
			}

			// numeric value of cards is less than or equal to stats
			if(numericValue <= tn) {
				successes++
			}

			// suit matches attribute used
			if(card.suit === this.attribute) {
				successes++
			}

			return successes
		},

		isSuccessful(card) {
			return this.successes(card) > 0
		},

		icon(card) {
			const successes = this.successes(card)

			if(successes === 0) {
				return 'close'
			}
			else if(successes === 1) {
				return 'check'
			}

			return 'check-all'
		},

		close() {
			this.$emit('close')
		},

		async push() {
			// redraw failed cards only
			let cards = await Promise.all(
				this.cards.map(
					card => this.isSuccessful(card)
						? Promise.resolve(card)
						: this.$store.dispatch('deck/draw', 1)
				)
			)

			this.cards = cards.flat()
			this.$emit('push', this.attribute)
		},
	},
})
</script>
<style scoped lang="sass">
.marker
	@apply inline-block p-1 rounded-full border mt-4 mr-1

	&.success
		@apply bg-control-lighter

	&.fail
		@apply bg-passion-lighter

.success
	@apply text-control-dark border-control-dark

.fail
	@apply text-passion-dark border-passion-dark

</style>