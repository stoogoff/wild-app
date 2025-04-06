<template>
	<main>
		<h1>Dream Master Reference</h1>
		<section class="flex">
			<article class="md:w-8/12">
				<card-filter :value="cards" label="Search Cards" @input="updateGrid" />
				<card-grid :cards="filteredCards" />

				<div class="panel">
					<h2>Attributes</h2>
					<div class="grid grid-cols-2">
						<div>
							<h3>Control</h3>
							<p>Control is about physical dexterity, coordination, accuracy and control.</p>
						</div>
						<div>
							<h3>Strength</h3>
							<p>Strength is all about physical strength, power, force and endurance.</p>
						</div>
						<div>
							<h3>Focus</h3>
							<p>Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.</p>
						</div>
						<div>
							<h3>Passion</h3>
							<p>Passion is all about determination, mental force, emotional strength and imagination.</p>
						</div>
					</div>
				</div>
				<div class="panel">
					<h2>Abilities</h2>
					<div class="grid grid-cols-2">
						<div>
							<h3>Diplomat</h3>
							<p>The Diplomat Ability is used whenever the character is talking, negotiating, charming, empathising, or understanding someone.</p>
						</div>
						<div>
							<h3>Guardian</h3>
							<p>Guardian comes into play most often when the character is in a physical conflict - shooting, defending, protecting, and fighting.</p>
						</div>
						<div>
							<h3>Rogue</h3>
							<p>Whenever your character is doing something remotely sneaky or underhanded, then Rogue is used.</p>
						</div>
						<div>
							<h3>Scholar</h3>
							<p>The Scholar Ability is used whenever you are doing something that involves information.</p>
						</div>
						<div>
							<h3>Visionary</h3>
							<p>Visionary is a highly creative Ability used whenever your character is making, crafting, planning or creating something.</p>
						</div>
					</div>
				</div>

			</article>
			<aside class="hidden md:block w-3/12 ml-10">
				<menu-button
					type="primary"
					block
					outlined
					@click="drawCards"
					:items="drawCardsItems"
					position="top"
				>
					Draw Cards
				</menu-button>
				<div
					v-for="(cards, index) in drawn"
					:key="`drawn_${index}`"
					class="pb-3 mb-3 border-b border-gray-300"
				>
					<card-grid :cards="cards" />
					<div class="flex justify-end mt-3">
						<button-action small outlined type="warning" @click="removeCards(index)">Remove</button-action>
					</div>
				</div>
				<button-action v-if="drawn.length > 1" outlined small block type="warning" @click="removeAllCards">Remove All</button-action>
			</aside>
		</section>
	</main>
</template>
<script>

import range from 'lodash/range'
import { deck } from'~/state'

const MAX_DRAWN = 10

export default {
	fetch() {
		this.cards = deck.all()
	},

	data() {
		return {
			cards: [],
			drawn: [],
			filteredCards: [],
		}
	},

	computed: {
		drawCardsItems() {
			return range(1, 6).map(num => ({ text: `Draw ${num}`, key: num }))
		},
	},

	methods: {
		drawCards(num) {
			this.drawn = [ deck.draw(num), ...this.drawn].splice(0, MAX_DRAWN)
		},

		removeCards(remove) {
			this.drawn = [ ...this.drawn.filter((cards, index) => index !== remove) ]
		},

		removeAllCards() {
			this.drawn = []
		},

		updateGrid(newCards) {
			this.filteredCards = newCards.length === this.cards.length ? [] : newCards
		},
	},
}
</script>
<style scoped>
.panel {
	@apply pb-6 mb-6 border-b border-gray-300 last:border-0;
}
</style>