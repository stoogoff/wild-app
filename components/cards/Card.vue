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
				<h2 class="text-center">{{ card.title }}</h2>
				<div>
					<div><strong>Key Meaning:</strong> {{ keyMeaning }}</div>
					<div><strong>Other Meanings:</strong> {{ otherMeanings }}</div>
				</div>
				<div>
					<div><strong>Key Reversed Meaning:</strong> {{ keyReversedMeaning }}</div>
					<div><strong>Other Reversed Meanings:</strong> {{ otherReversedMeaning }}</div>
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

export default Vue.component('Card', {
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


/*
	&>div
		width: 290px
		height: 453px
		transition: transform 0.8s
		transform-style: preserve-3d

	&.flipped>div
		transform: rotateY(180deg)

	.card-front, .card-back
		@apply bg-white
		@apply w-full h-full
		@apply absolute
		backface-visibility: hidden

	.card-back
		@apply bg-blue-500
		@apply p-10
		transform: rotateY(180deg)
*/

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
		@apply absolute top-0 right-0
		transform: rotateY(180deg)

</style>