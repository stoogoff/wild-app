<template>
	<div
		:class="{ 'flipped': flipped }"
		class="card-display"
		@click="flipped = !flipped"
	>
		<h2 class="text-center">{{ card.title }}</h2>
		<div>
			<img class="card-front" :src="`/img/cards/${card.image}`" />
			<aside class="card-back">
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

</script>