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
		<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			<card-view :key="`card_${card.id}`" v-for="card in cards" :card="card" />
			<div>
				<attributes-view :values="character.attributes" :injuries="injuries" />
			</div>
		</div>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import { drawCards } from '~/state/deck'

export default Vue.component('RecoveryDraw', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	fetch() {
		const cards = drawCards(3)

		this.cards = cards.map(card => ({ ...card, isReversed: false }))
	},

	data() {
		return {
			cards: [],
		}
	},

	computed: {
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