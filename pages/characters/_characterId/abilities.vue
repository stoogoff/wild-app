<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/abilities" />
			<div class="md:grid grid-cols-2 gap-4 mb-6">
				<ability-edit
					title="Diplomat"
					:value="character.abilities.Diplomat"
					:options="options"
					@input="toggleAbility('Diplomat', $event)"
				>
					The Diplomat Ability is used whenever the character is talking, negotiating, charming, empathising, or understanding someone.
				</ability-edit>
				<ability-edit
					title="Guardian"
					:value="character.abilities.Guardian"
					:options="options"
					@input="toggleAbility('Guardian', $event)"
				>
					Guardian comes into play most often when the character is in a physical conflict - shooting, defending, protecting, and fighting.
				</ability-edit>
				<ability-edit
					title="Rogue"
					:value="character.abilities.Rogue"
					:options="options"
					@input="toggleAbility('Rogue', $event)"
				>
					Whenever your character is doing something remotely sneaky or underhanded, then Rogue is used.
				</ability-edit>
				<ability-edit
					title="Scholar"
					:value="character.abilities.Scholar"
					:options="options"
					@input="toggleAbility('Scholar', $event)"
				>
					The Scholar Ability is used whenever you are doing something that involves information.
				</ability-edit>
				<ability-edit
					title="Visionary"
					:value="character.abilities.Visionary"
					:options="options"
					@input="toggleAbility('Visionary', $event)"
				>
					Visionary is a highly creative Ability used whenever your character is making, crafting, planning or creating something.
				</ability-edit>
			</div>
			<step-buttons
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
			await this.$store.dispatch('character/save', this.character)
			done()
		},
	},
}

</script>