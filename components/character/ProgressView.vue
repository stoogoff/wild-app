<template>
	<aside class="hidden md:block md:w-3/12 ml-8">
		<h3>Progress</h3>
		<section v-if="character.name">
			<strong>Name:</strong> {{ character.name }}
		</section>
		<section v-if="character.persona.text">
			<h4>Persona</h4>
			<div class="mb-2">{{ character.persona.text }}</div>
			<div v-if="persona"><small>{{ persona.title }}<em v-if="character.persona.reversed"> (reversed)</em></small></div>
		</section>
		<section v-if="character.shadow.card">
			<h4>Shadow</h4>
			<div class="mb-2">{{ character.shadow.text }}</div>
			<div v-if="shadow"><small>{{ shadow.title }}<em v-if="character.shadow.reversed"> (reversed)</em></small></div>
		</section>
		<section v-if="hasAttributes">
			<h4>Attributes</h4>
			<dl>
				<dt>Control:</dt><dd>{{ character.attributes.Control }}</dd>
				<dt>Focus:</dt><dd>{{ character.attributes.Focus }}</dd>
				<dt>Passion:</dt><dd>{{ character.attributes.Passion }}</dd>
				<dt>Strength:</dt><dd>{{ character.attributes.Strength }}</dd>
			</dl>
		</section>
		<section v-if="hasAbilities">
			<h4>Abilities</h4>
			<dl>
				<dt>Diplomat:</dt><dd>{{ character.abilities.Diplomat }}</dd>
				<dt>Guardian:</dt><dd>{{ character.abilities.Guardian }}</dd>
				<dt>Rogue:</dt><dd>{{ character.abilities.Rogue }}</dd>
				<dt>Scholar:</dt><dd>{{ character.abilities.Scholar }}</dd>
				<dt>Visionary:</dt><dd>{{ character.abilities.Visionary }}</dd>
			</dl>
		</section>
		<section v-if="character.aspects.length">
			<h4>Aspects</h4>
			<ul class="list">
				<li
					:key="`aspect_${idx}`"
					v-for="(aspect, idx) in character.aspects"
					v-if="aspect.text"
				>
					{{ aspect.text }}	
				</li>
			</ul>
		</section>
	</aside>
</template>
<script>
import Vue from 'vue'
import { ATTRIBUTES_STARTING } from '~/utils/config'
import { getCardById } from '~/state/deck'

export default Vue.component('ProgressView', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	fetch() {
			if(this.character.persona.card) {
				this.persona = this.getCard(this.character.persona.card)
			}

			if(this.character.shadow.card) {
				this.shadow = this.getCard(this.character.shadow.card)
			}
	},

	data() {
		return {
			persona: null,
			shadow: null,
		}
	},

	computed: {
		hasAttributes() {
			return Object.values(this.character.attributes).map(val => parseInt(val)).reduce((acc, val) => acc + val, 0) === ATTRIBUTES_STARTING
		},

		hasAbilities() {
			return Object.values(this.character.abilities).filter(val => parseInt(val) !== 2).length > 0
		},
	},

	methods: {
		getCard(card) {
			return { ...getCardById(this.character.persona.card) }
		}
	},
})
</script>
<style scoped>
h3, h4 {
	@apply uppercase text-gray-400;
}
h3 {
	@apply text-lg;
}
section {
	@apply mb-2 pb-2 border-b border-gray-300 last:border-0;
}
dl {
	@apply grid grid-cols-4;
}
dt {
	@apply font-bold;
}
dd {
	@apply pl-4;
}
</style>