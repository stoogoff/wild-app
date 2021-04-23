<template>
	<div
		:class="{ 'flipped': flipped }"
		class="card-display"
		@click="flipped = !flipped"
	>
		<div class="card">
			<img
				class="card-front"
				:class="{ 'transform rotate-180': card.isReversed }"
				:src="`/img/cards/${card.image}`"
			/>
			<aside class="card-back">
				<div class="bg-white bg-opacity-80 px-6 py-10 text-lg h-full">
					<h2 class="text-center mb-4 text-3xl" :class="colour">
						{{ card.title }}
					</h2>
					<div class="text-center mb-2">&nbsp;<em v-if="card.isReversed">reversed</em>&nbsp;</div>
					<div class="my-4 py-4 border-b border-gray-300"><strong>Key Meaning:</strong> <em>{{ keyMeaning }}</em></div>
					<div class="my-4 py-4 border-b border-gray-300"><strong>Other Meanings:</strong> <em>{{ otherMeanings }}</em></div>
					<div class="my-4 py-4 border-b border-gray-300"><strong>Key Reversed Meaning:</strong> <em>{{ keyReversedMeaning }}</em></div>
					<div class="my-4 py-4"><strong>Other Reversed Meanings:</strong> <em>{{ otherReversedMeaning }}</em></div>
				</div>
			</aside>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import head from 'lodash/head'
import tail from 'lodash/tail'

/*

Card format

{
	"_original": "Ace of Coins",
	"title": "Controlled Visionary",
	"suit": "Control",
	"meanings": ["Pleasure", "Bliss", "Prosperity", "Perfection"],
	"reversed": ["Corruption", "Wasted Money", "Arguments", "Dissatisfaction"],
	"image": "control/01-ace-of-coins.jpg"
},
*/

export default Vue.component('CardFlip', {
	props: {
		card: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			flipped: false,
		}
	},

	computed: {
		colour() {
			return `text-${this.card.suit.toLowerCase()}`
		},

		keyMeaning() {
			return head(this.card.meanings)
		},
		otherMeanings() {
			return tail(this.card.meanings).join(', ')
		},
		keyReversedMeaning() {
			return head(this.card.reversed)
		},
		otherReversedMeaning() {
			return tail(this.card.reversed).join(', ')
		},
	},
})

</script>
<style scoped lang="sass">

.card-display
	transition: transform 0.8s
	transform-style: preserve-3d
	@apply relative

	&.flipped
		transform: rotateY(180deg)

	.card-front, .card-back
		@apply w-full h-full
		backface-visibility: hidden

	.card-back
		@apply absolute top-0 right-0 bg-white p-6 bg-contain
		background-image: url(/img/cards/card-back.png)
		transform: rotateY(180deg)

</style>