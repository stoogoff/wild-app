<template>
	<screen-slide>
		<nav-bar>
			<template #title>
				{{ totalSuccesses }} Success{{ totalSuccesses === 1 ? '' : 'es' }}
			</template>
			<template #buttons>
				<nav-button icon="refresh" :disabled="!canPush" @click="push" />
				<nav-button icon="close" @click="$emit('close')" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<nav-item icon="refresh" :disabled="!canPush" @click="push">Push</nav-item>
				<nav-item icon="close" @click="$emit('close')">Close</nav-item>
			</div>
		</nav-bar>
		<card-grid
			:cards="cards"
			v-slot="{ card }"
		>
			<span class="marker" :class="isSuccessful(card) ? 'success' : 'fail'">
				<icon-view :icon="icon(card)" />
			</span>
		</card-grid>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import { getTargetNumber, getCurrentAttribute } from '~/utils/character'

export default Vue.component('SkillCheckDraw', {
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
			targetNumber: 0,
		}
	},

	computed: {
		totalSuccesses() {
			return this.cards.map(card => this.successes(card)).reduce((acc, val) => acc + val, 0)
		},

		canPush() {
			return getCurrentAttribute(this.character, this.attribute) > 0 && this.cards.map(card => this.successes(card)).filter(value => value === 0).length > 0
		},
	},

	methods: {
		successes(card) {
			if(this.targetNumber === 0) {
				this.targetNumber = getTargetNumber(this.character, this.attribute, this.ability)
			}

			let successes = 0
			let numericValue = parseInt(card.value)

			// court card matches ability used
			if(card.value === this.ability) {
				successes++
				numericValue = 10
			}

			// numeric value of cards is less than or equal to stats
			if(numericValue <= this.targetNumber) {
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

		async push() {
			const tn = this.targetNumber

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

			this.targetNumber = tn
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