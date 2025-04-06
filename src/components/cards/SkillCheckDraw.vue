<template>
	<screen-slide>
		<nav-bar>
			<template #title>
				Skill Check
			</template>
			<template #buttons>
				<nav-button icon="close" @click="$emit('close')" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<nav-item icon="close" @click="$emit('close')">Close</nav-item>
			</div>
		</nav-bar>
		<section class="px-6 py-3 md:text-center">Making a <strong>{{ attribute }} ({{ attributeValue }})</strong> and <strong>{{ ability }} ({{ abilityValue }})</strong> skill check.</section>
		<card-grid :cards="cards">
			<template #card="{ card }">
				<span class="marker" :class="isSuccessful(card) ? 'success' : 'fail'">
					<icon-view :icon="icon(card)" />
				</span>
			</template>
			<template #panel>
				<div class="px-2 pt-8">
					<h3>Results</h3>
					<p>{{ totalSuccesses }} Success{{ totalSuccesses === 1 ? '' : 'es' }}</p>
					<button-action small :disabled="!canPush" @click="push">Push</button-action>
					<button-action small @click="redraw">Redraw</button-action>
					<p>Pushing a draw lets you redraw failed cards but will damage your <strong>{{ attribute }}</strong> attribute by 1 point.</p>
				</div>
			</template>
		</card-grid>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import { getTargetNumber, getCurrentAttribute, getAbility } from '~/utils/character'
import deck from '~/state/deck'

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

	fetch() {
		this.cards = deck.draw(this.number)
	},

	data() {
		return {
			cards: [],
			targetNumber: 0,
		}
	},

	computed: {
		attributeValue() {
			return getCurrentAttribute(this.character, this.attribute)
		},

		abilityValue() {
			return getAbility(this.character, this.ability)
		},

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

			// major arcana are never successes
			if(card.suit === 'Major Arcana') {
				return 0
			}

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

		// push the draw, damaging attributes and only drawing failed cards
		push() {
			const tn = this.targetNumber

			// redraw failed cards only
			this.cards = this.cards.map(card => this.isSuccessful(card) ? card : deck.drawOne())
			this.$emit('push', this.attribute)

			this.targetNumber = tn
		},

		redraw() {
			this.$fetch()
		}
	},
})
</script>
<style scoped>
.marker {
	@apply inline-block p-1 rounded-full border mt-4 mr-1;
}

.marker.success {
	@apply bg-control-lighter;
}

.marker.fail {
	@apply bg-passion-lighter;
}

.success {
	@apply text-control-dark border-control-dark;
}
.fail {
	@apply text-passion-dark border-passion-dark;
}

</style>