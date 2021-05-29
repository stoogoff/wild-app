<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<markdown-content content="characters/finish" />
			<div class="md:flex mb-6">
				<article class="md:w-8/12 md:grid grid-cols-2 gap-4">
					<div>
						<text-input label="Name" v-model="character.name" />
						<text-area label="Background" v-model="character.background" />
					</div>
					<div>
						<label class="label">Image</label>
						<file-drop-zone :accept="['image/*']" @input="setImage" />
						<div v-if="image">
							<image-upload :file="image" @delete="removeImage" />
						</div>
					</div>
				</article>
				<progress-view :character="character" />
			</div>
			<step-buttons
				:next="`/characters/${character.id}`"
				:previous="`/characters/${character.id}/aspects`"
				:disabled="!character.name"
				@click="save"
				label="Finish"
			/>
		</section>
	</main>
</template>
<script>

import { character, image } from '~/state'

export default {
	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)

		if(this.character.image) {
			this.image = await image.byPath(this.character.image)
		}

		this.loading = false
	},

	data() {
		return {
			loading: false,
			character: null,
			image: null,
		}
	},

	methods: {
		setImage(files) {
			if(files && files.length > 0) {
				this.image = files[0]
			}
		},

		removeImage() {
			this.image = null
		},

		async save(done) {
			this.loading = true
			// save an image
			if(this.image) {
				const imageUrl = await image.save(
					this.character.id,
					this.image
				)

				this.character.image = imageUrl
			}
			// delete an existing image
			else if(this.character.image) {
				await image.delete(this.character.image)

				delete this.character.image
			}

			await character.save(this.character)

			this.loading = false
			done()
		},
	},
}

</script>