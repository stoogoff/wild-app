<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/aspects" />
			<div class="md:flex mb-6">
				<article class="md:w-8/12">
					<div class="md:grid grid-cols-2 gap-4">
						<div :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
							<text-input :label="`Aspect ${idx + 1}`" v-model="character.aspects[idx].text">
								<template #append>
									<span class="text-gray-300 hover:text-red-500 cursor-pointer" @click="removeAspect(idx)">
										<icon-view icon="close" />
									</span>
								</template>
							</text-input>
						</div>
					</div>
					<div class="mt-2 mb-6">
						<button-action type="primary" :outlined="hasEnough" block @click="addAspect" :disabled="!canAdd">Add</button-action>
					</div>
				</article>
				<progress-view :character="character" />
			</div>
			<step-buttons
				:next="`/characters/${character.id}/finish`"
				:previous="`/characters/${character.id}/abilities`"
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import OwnedCharacter from '~/mixins/OwnedCharacter'
import { ASPECTS_MIN, ASPECTS_MAX, DEFAULT_ASPECT } from '~/utils/config'
import { character } from '~/state'

export default {
	mixins: [ OwnedCharacter ],

	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
		this.loading = false
	},

	data() {
		return {
			loading: false,
			character: null,
		}
	},

	computed: {
		canAdd() {
			return this.character.aspects.length < ASPECTS_MAX
		},

		hasEnough() {
			return this.character.aspects.length >= ASPECTS_MIN
		},

		canContinue() {
			return this.character.aspects.filter(aspect => !!aspect).length >= ASPECTS_MIN
		},
	},

	methods: {
		addAspect() {
			this.character.aspects = [ ...this.character.aspects, { ...DEFAULT_ASPECT } ]
		},

		removeAspect(toRemove) {
			this.character.aspects = this.character.aspects.filter((_a, idx) => idx !== toRemove)
		},

		async save(done) {
			this.character.aspects = this.character.aspects.filter(aspect => aspect.text !== '')

			await character.save(this.character)
			done()
		},
	},
}

</script>