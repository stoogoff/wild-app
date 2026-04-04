<template>
	<img v-if="image !== null" :src="image" class="block w-full mb-4 p-1 border border-gray-300 rounded-xl" />
</template>
<script>
import Vue from 'vue'
import { image } from '~/state'

export default Vue.component('CharacterImage', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	async fetch() {
		if(this.character.image) {
			const loaded = await image.byPath(this.character.image)

			if(loaded)	{
				this.image = loaded.url
			}
		}
	},

	data() {
		return {
			image: null,
		}
	},
})
</script>