<template>
	<main class="pt-12 relative">
		<Loading v-if="loading || character === null" />
		<section v-else>
			<h1>3. Attributes</h1>

			<p>There are four Attributes which reflect how strong physically and emotionally you are, and how in control you are both physically and mentally. These Attributes are <strong>Control</strong>, <strong>Focus</strong>, <strong>Passion</strong> and <strong>Strength</strong>. They are rated between {{ ATTRIBUTE_MIN }} and {{ ATTRIBUTE_MAX }}, and you can allocate {{ ATTRIBUTES_STARTING }} points between them. Attributes have a starting maximum value of {{ ATTRIBUTE_STARTING_MAX }}</p>
			<h3 :class="remainingClass">Points remaining: {{ remaining }}</h3>
			<AttributeEdit
				title="Control"
				v-model="character.attributes.Control"
			>
				Control is about physical dexterity, coordination, accuracy and control.
			</AttributeEdit>
			<AttributeEdit
				title="Strength"
				v-model="character.attributes.Strength"
			>
				Strength is all about physical strength, power, force and endurance.
			</AttributeEdit>
			<AttributeEdit
				title="Focus"
				v-model="character.attributes.Focus"
			>
				Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.
			</AttributeEdit>
			<AttributeEdit
				title="Passion"
				v-model="character.attributes.Passion"
			>
				Passion is all about determination, mental force, emotional strength and imagination.
			</AttributeEdit>
			<Stepper
				:next="`/characters/${character.id}/abilities`"
				:previous="`/characters/${character.id}/shadow`"
				:disabled="remaining !== 0 || notAllValid"
			/>
		</section>
	</main>
</template>
<script>

import {
	ATTRIBUTE_MAX,
	ATTRIBUTE_MIN,
	ATTRIBUTES_STARTING,
	ATTRIBUTE_STARTING_MAX,
} from '~/utils/config'

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
		ATTRIBUTE_MIN() {
			return ATTRIBUTE_MIN
		},
		ATTRIBUTE_MAX() {
			return ATTRIBUTE_MAX
		},
		ATTRIBUTES_STARTING() {
			return ATTRIBUTES_STARTING
		},
		ATTRIBUTE_STARTING_MAX() {
			return ATTRIBUTE_STARTING_MAX
		},

		attrs() {
			return [
				this.character.attributes.Control,
				this.character.attributes.Strength,
				this.character.attributes.Focus,
				this.character.attributes.Passion
			]
		},
	
		canContinue() {
			return this.remaining === 0 && this.notAllValid
		},

		notAllValid() {
			return this.attrs.filter(a => a >= ATTRIBUTE_MIN && a <= ATTRIBUTE_MAX).length !== this.attrs.length
		},

		remaining() {
				return ATTRIBUTES_STARTING - this.attrs.map(n => parseInt(n)).filter(n => !isNaN(n)).reduce((a, c) => a + c, 0)
		},

		remainingClass() {
			return this.remaining < 0 ? 'text-red-500' : 'text-green-500'
		},

		save() {
			this.$store.commit('character/update', this.character)
		},
	},
}

</script>

