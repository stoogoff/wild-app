<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/attributes" />
			<div class="md:flex mb-6">
				<article class="md:w-8/12">
					<alert-view :type="alertType">Points remaining: {{ remaining }}</alert-view>
					<div class="md:grid grid-cols-2 gap-4">
						<attribute-edit
							title="Control"
							v-model="character.attributes.Control"
							:remaining="remaining"
						>
							Control is about physical dexterity, coordination, accuracy and control.
						</attribute-edit>
						<attribute-edit
							title="Strength"
							v-model="character.attributes.Strength"
							:remaining="remaining"
						>
							Strength is all about physical strength, power, force and endurance.
						</attribute-edit>
						<attribute-edit
							title="Focus"
							v-model="character.attributes.Focus"
							:remaining="remaining"
						>
							Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.
						</attribute-edit>
						<attribute-edit
							title="Passion"
							v-model="character.attributes.Passion"
							:remaining="remaining"
						>
							Passion is all about determination, mental force, emotional strength and imagination.
						</attribute-edit>
					</div>
				</article>
				<progress-view :character="character" />
			</div>
			<step-buttons
				:next="`/characters/${character.id}/abilities`"
				:previous="`/characters/${character.id}/shadow`"
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import {
	ATTRIBUTE_MAX,
	ATTRIBUTE_MIN,
	ATTRIBUTES_STARTING,
} from '~/utils/config'
import { character } from '~/state'

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
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
		attrs() {
			return [
				this.character.attributes.Control,
				this.character.attributes.Strength,
				this.character.attributes.Focus,
				this.character.attributes.Passion
			]
		},
	
		canContinue() {
			return this.remaining === 0 && this.allValid
		},

		allValid() {
			return this.attrs.filter(a => a >= ATTRIBUTE_MIN && a <= ATTRIBUTE_MAX).length === this.attrs.length
		},

		remaining() {
				return ATTRIBUTES_STARTING - this.attrs.map(n => parseInt(n)).filter(n => !isNaN(n)).reduce((a, c) => a + c, 0)
		},

		alertType() {
			if(this.remaining === 0) return 'success'
			if(this.remaining < 0) return 'warning'

			return 'primary'
		},
	},

	methods: {
		async save(done) {
			await character.save(this.character)
			done()
		},
	},
}

</script>

