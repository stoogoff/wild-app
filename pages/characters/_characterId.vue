<template>
	<main>
		<Loading v-if="$fetchState.pending" />
		<nuxt-child v-else :character="character" />
	</main>
</template>
<script>

export default {
	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	mounted() {
		console.log('mounted::_characterId')
	},
}

</script>