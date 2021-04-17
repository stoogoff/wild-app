<template>
	<div>
		<h1>5: Aspects</h1>
		<p>Choose a handful of Aspects that help to define your characters strengths and weaknesses. Aspects are simple phrases that, if applicable to a situation, make the task easier or harder. Characters usually start with two or three.</p>
		<p>Some example aspects:</p>
		<ul class="list">
			<li>Devilishly Handsome</li>
			<li>Quick Tempered</li>
			<li>Overly Cautious</li>
			<li>Stickler for Detail</li>
			<li>Superstitious</li>
			<li>Addictive Personality</li>
			<li>Likes a Drink</li>
			<li>Afraid of Spiders</li>
			<li>Hates Guns</li>
			<li>Can’t Drive</li>
			<li>Allergic to Dogs</li>
		</ul>
		<div>
			<Button @click="addAspect" :disabled="!canAdd">Add</Button>

			<div :key="`aspect_${idx}`" v-for="(aspect, idx) in editingCharacter.aspects">
				<TextInput :label="`Aspect ${idx + 1}`" v-model="editingCharacter.aspects[idx]" >
					<template #append>
						<span class="text-gray-300 hover:text-red-500 cursor-pointer" @click="removeAspect(idx)">
							<Icon icon="close" />
						</span>
					</template>
				</TextInput>
			</div>
		</div>
		<Stepper
			:next="`/characters/${character.id}/finish`"
			:previous="`/characters/${character.id}/abilities`"
			:disabled="!aspectsSet"
		/>
	</div>
</template>
<script>

import CharacterCreation from '~/mixins/CharacterCreation'
import { ASPECTS_MIN, ASPECTS_MAX } from '~/utils/config'

export default {
	mixins: [CharacterCreation],

	computed: {
		canAdd() {
			return this.editingCharacter.aspects.length < ASPECTS_MAX
		},

		aspectsSet() {
			return this.editingCharacter.aspects.filter(aspect => !!aspect).length >= ASPECTS_MIN
		},
	},

	methods: {
		addAspect() {
			this.editingCharacter.aspects = [ ...this.editingCharacter.aspects, '' ]
		},

		removeAspect(toRemove) {
			this.editingCharacter.aspects = this.editingCharacter.aspects.filter((_a, idx) => idx !== toRemove)
		}
	},
}

</script>