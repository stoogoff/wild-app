<template>
	<section>
		<h1>4: Abilities</h1>
		<p>There are five Abilities which reflect the characters talents, skills and training. These Abilities are <strong>Diplomat</strong>, <strong>Guardian</strong>, <strong>Rogue</strong>, <strong>Scholar</strong> and <strong>Visionary</strong>. Again, these are scored between {{ ABILITY_MIN }} and {{ ABILITY_MAX }}. You begin by deciding which Ability is your strongest ({{ ABILITY_STRONG }}), your weakest ({{ ABILITY_WEAK }}), your second strongest ({{ ABILITY_MID }}) and then giving the remaining two Abilities the score of {{ ABILITY_REST }}.</p>
		<Ability
			title="Diplomat"
			:value="editingCharacter.abilities.Diplomat"
			:options="options"
			@input="toggleAbility('Diplomat', $event)"
		>
			<p>The Diplomat Ability is used whenever the character is talking, negotiating, charming, empathising, or understanding someone.</p>
		</Ability>
		<Ability
			title="Guardian"
			:value="editingCharacter.abilities.Guardian"
			:options="options"
			@input="toggleAbility('Guardian', $event)"
		>
			<p>Guardian comes into play most often when the character is in a physical conflict - shooting, defending, protecting, and fighting.</p>
		</Ability>
		<Ability
			title="Rogue"
			:value="editingCharacter.abilities.Rogue"
			:options="options"
			@input="toggleAbility('Rogue', $event)"
		>
			<p>Whenever your character is doing something remotely sneaky or underhanded, then Rogue is used.</p>
		</Ability>
		<Ability
			title="Scholar"
			:value="editingCharacter.abilities.Scholar"
			:options="options"
			@input="toggleAbility('Scholar', $event)"
		>
			<p>The Scholar Ability is used whenever you are doing something that involves information.</p>
		</Ability>
		<Ability
			title="Visionary"
			:value="editingCharacter.abilities.Visionary"
			:options="options"
			@input="toggleAbility('Visionary', $event)"
		>
			<p>Visionary is a highly creative Ability used whenever your character is making, crafting, planning or creating something.</p>
		</Ability>
		<Stepper
			:next="`/characters/${character.id}/aspects`"
			:previous="`/characters/${character.id}/attributes`"
			:disabled="!allChosen"
			@click="save"
		/>
	</section>
</template>
<script>

import CharacterCreation from '~/mixins/CharacterCreation'
import {
	ABILITY_MAX,
	ABILITY_MID,
	ABILITY_MIN,
	ABILITY_REST,
	ABILITY_SPREAD,
	ABILITY_STRONG,
	ABILITY_WEAK,
} from '~/utils/config'

export default {
	mixins: [CharacterCreation],

	computed: {
		ABILITY_MIN() {
			return ABILITY_MIN
		},

		ABILITY_MAX() {
			return ABILITY_MAX
		},

		ABILITY_STRONG() {
			return ABILITY_STRONG
		},

		ABILITY_WEAK() {
			return ABILITY_WEAK
		},

		ABILITY_MID() {
			return ABILITY_MID
		},

		ABILITY_REST() {
			return ABILITY_REST
		},

		chosen() {
			return Object.values(this.editingCharacter.abilities).filter(attr => !!attr)
		},

		allChosen() {
			return this.options.filter(opt => opt.disabled).length === 3
		},

		options() {
			return Object.keys(ABILITY_SPREAD).map(
				value => ({
					value,
					text: ABILITY_SPREAD[value],
					disabled: this.chosen.includes(ABILITY_SPREAD[value])
			}))
		},
	},

	methods: {
		toggleAbility(attr, value) {
			if(this.editingCharacter.abilities[attr] === ABILITY_SPREAD[value]) {
				this.editingCharacter.abilities[attr] = ABILITY_REST
			}
			else {
				this.editingCharacter.abilities[attr] = ABILITY_SPREAD[value]
			}
		},

		save() {
			this.$store.commit('character/update', {
				id: this.editingCharacter.id,
				abilities: {
					...this.editingCharacter.abilities
				},
			})
		},
	},
}

</script>