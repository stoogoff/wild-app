<template>
	<section>
		<h1>3. Attributes</h1>

		<p>There are four Attributes which reflect how strong physically and emotionally you are, and how in control you are both physically and mentally. These Attributes are <strong>Control</strong>, <strong>Focus</strong>, <strong>Passion</strong> and <strong>Strength</strong>. They are rated between {{ ATTRIBUTE_MIN }} and {{ ATTRIBUTE_MAX }}, and you can allocate {{ ATTRIBUTES_STARTING }} points between them. Attributes have a starting maximum value of {{ ATTRIBUTE_STARTING_MAX }}</p>
		<h3 :class="remainingClass">Points remaining: {{ remaining }}</h3>
		<AttributeEdit
			title="Control"
			v-model="editingCharacter.attributes.Control"
		>
			Control is about physical dexterity, coordination, accuracy and control.
		</AttributeEdit>
		<AttributeEdit
			title="Strength"
			v-model="editingCharacter.attributes.Strength"
		>
			Strength is all about physical strength, power, force and endurance.
		</AttributeEdit>
		<AttributeEdit
			title="Focus"
			v-model="editingCharacter.attributes.Focus"
		>
			Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.
		</AttributeEdit>
		<AttributeEdit
			title="Passion"
			v-model="editingCharacter.attributes.Passion"
		>
			Passion is all about determination, mental force, emotional strength and imagination.
		</AttributeEdit>
		<Stepper
			:next="`/characters/${character.id}/abilities`"
			:previous="`/characters/${character.id}/shadow`"
			:disabled="remaining !== 0 || notAllValid"
		/>
	</section>
</template>
<script>

import CharacterCreation from '~/mixins/CharacterCreation'
import {
	ATTRIBUTE_MAX,
	ATTRIBUTE_MIN,
	ATTRIBUTES_STARTING,
	ATTRIBUTE_STARTING_MAX,
} from '~/utils/config'

export default {
	mixins: [CharacterCreation],

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
				this.editingCharacter.attributes.Control,
				this.editingCharacter.attributes.Strength,
				this.editingCharacter.attributes.Focus,
				this.editingCharacter.attributes.Passion
			]
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
			this.$store.commit('character/update', {
				id: this.editingCharacter.id,
				attributes: {
					...this.editingCharacter.attributes
				},
			})
		},
	},
}

</script>

