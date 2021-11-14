<template>
	<screen-slide>
		<nav-bar>
			<template #title>Recover</template>
			<template #buttons>
				<nav-button icon="close" @click="close" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<nav-item icon="close" @click="close">Close</nav-item>
			</div>
		</nav-bar>
		<card-grid :cards="cards">
			<template #panel>
				<div class="px-2 pt-8">
					<h3>Recovery</h3>
					<ul v-if="modifications.length > 0">
						<li :key="`mod_${index}`" v-for="(mod, index) in modifications">
							{{ mod }}
						</li>
					</ul>
					<p v-else>You recover nothing this time.</p>
				</div>
			</template>
		</card-grid>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import deck from '~/state/deck'

export default Vue.component('RecoveryDraw', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	fetch() {
		const cards = deck.draw(3)

		this.cards = cards.map(card => ({ ...card, isReversed: false }))
	},

	data() {
		return {
			cards: [],
		}
	},

	computed: {
		modifications() {
			let mods = []
			let injuries = { ...this.character.injuries }
			let difference = {}

			this.cards.forEach(card => {
				if(card.suit in injuries) {
					if(!(card.suit in difference)) {
						difference[card.suit] = 0
					}

					difference[card.suit] += isNaN(card.value) ? 10 : parseInt(card.value)
				}
			})

			Object.keys(difference).forEach(key => {
				mods.push(`+${difference[key]} to ${key}`)
			})

			return mods
		},

		injuries() {
			let injuries = { ...this.character.injuries }

			// anything at zero is automatically increased to 1
			Object.keys(injuries).forEach(attr => {
				if(injuries[attr] === 0) {
					injuries[attr] = 1
				}
			})

			// add value of any minor arcana to the injured attribute up to max value
			this.cards.forEach(card => {
				if(card.suit in injuries) {
					injuries[card.suit] += isNaN(card.value) ? 10 : parseInt(card.value)
				}
			})

			// remove any injury which is now greater than its starting value
			Object.keys(injuries).forEach(attr => {
				if(injuries[attr] >= this.character.attributes[attr]) {
					delete injuries[attr]
				}
			})

			return injuries
		},
	},

	methods: {
		close() {
			this.$emit('close', this.injuries)
		},
	},
})
</script>