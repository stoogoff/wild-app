<template>
	<main>
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/abilities" />
			<Ability
				title="Diplomat"
				:value="character.abilities.Diplomat"
				:options="options"
				@input="toggleAbility('Diplomat', $event)"
			>
				<p>The Diplomat Ability is used whenever the character is talking, negotiating, charming, empathising, or understanding someone.</p>
			</Ability>
			<Ability
				title="Guardian"
				:value="character.abilities.Guardian"
				:options="options"
				@input="toggleAbility('Guardian', $event)"
			>
				<p>Guardian comes into play most often when the character is in a physical conflict - shooting, defending, protecting, and fighting.</p>
			</Ability>
			<Ability
				title="Rogue"
				:value="character.abilities.Rogue"
				:options="options"
				@input="toggleAbility('Rogue', $event)"
			>
				<p>Whenever your character is doing something remotely sneaky or underhanded, then Rogue is used.</p>
			</Ability>
			<Ability
				title="Scholar"
				:value="character.abilities.Scholar"
				:options="options"
				@input="toggleAbility('Scholar', $event)"
			>
				<p>The Scholar Ability is used whenever you are doing something that involves information.</p>
			</Ability>
			<Ability
				title="Visionary"
				:value="character.abilities.Visionary"
				:options="options"
				@input="toggleAbility('Visionary', $event)"
			>
				<p>Visionary is a highly creative Ability used whenever your character is making, crafting, planning or creating something.</p>
			</Ability>
			<hr />
			<Stepper
				:next="`/characters/${character.id}/aspects`"
				:previous="`/characters/${character.id}/attributes`"
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import { ABILITY_SPREAD, ABILITY_REST } from '~/utils/config'

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)
		this.loading = false
	},
	fetchOnServer: false,

	data() {
		return {
			loading: false,
			character: null,
		}
	},

	computed: {
		chosen() {
			return Object.values(this.character.abilities).filter(attr => !!attr)
		},

		canContinue() {
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
			if(this.character.abilities[attr] === ABILITY_SPREAD[value]) {
				this.character.abilities[attr] = ABILITY_REST
			}
			else {
				this.character.abilities[attr] = ABILITY_SPREAD[value]
			}
		},

		async save(done) {
			await this.$store.commit('character/update', this.character)
			done()
		},
	},
}

</script>