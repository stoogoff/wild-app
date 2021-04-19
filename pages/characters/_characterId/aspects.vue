<template>
	<main class="pt-12 relative">
		<Loading v-if="loading || character === null" />
		<section v-else>
			<MarkdownContent content="characters/aspects" />
			<div>
				<Button @click="addAspect" :disabled="!canAdd">Add</Button>

				<div :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
					<TextInput :label="`Aspect ${idx + 1}`" v-model="character.aspects[idx]" >
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
				:disabled="!canContinue"
				@click="save"
			/>
		</section>
	</main>
</template>
<script>

import { ASPECTS_MIN, ASPECTS_MAX } from '~/utils/config'

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
		canAdd() {
			return this.character.aspects.length < ASPECTS_MAX
		},

		canContinue() {
			return this.character.aspects.filter(aspect => !!aspect).length >= ASPECTS_MIN
		},
	},

	methods: {
		addAspect() {
			this.character.aspects = [ ...this.character.aspects, '' ]
		},

		removeAspect(toRemove) {
			this.character.aspects = this.character.aspects.filter((_a, idx) => idx !== toRemove)
		},

		save() {
			this.$store.commit('character/update', this.character)
		},
	},
}

</script>