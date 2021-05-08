<template>
	<img v-if="image !== null" :src="image" class="block w-full mb-4 p-1 border border-gray-300 rounded-xl" />
</template>
<script>
import Vue from 'vue'

export default Vue.component('CharacterImage', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	async fetch() {
		if(this.character.image) {
			const image = await this.$store.getters['image/byPath'](this.character.image)

			if(image)	{
				this.image = image.url
			}
		}
		/*else if(this.character.persona.card) {
			const card = await this.$store.getters['deck/getCard'](this.character.persona.card)

			this.image = `/img/cards/${card.image}`
		}*/
	},
	fetchOnServer: false,

	data() {
		return {
			image: null,
		}
	},
})
</script>