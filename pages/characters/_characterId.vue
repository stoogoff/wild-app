<template>
	<main>
		<Loading v-if="$fetchState.pending && character === null" />
		<nuxt-child v-else :character="character" />
	</main>
</template>
<script>

import cloneDeep from 'lodash/cloneDeep'

export default {
	async fetch() {
		const { params } = this.$nuxt.context
		const character = await this.$store.getters['character/byId'](params.characterId)

		this.character = cloneDeep(character)
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	mounted() {
		console.log('_characterId::mounted', this.character)
	},
}

</script>