<template>
	<div>
		<Navbar />
		<Nuxt />
		<Debug />
	</div>
</template>
<script>
	
export default {
	async fetch() {
		await this.$store.dispatch('character/fetch')
	},
	fetchOnServer: false,
}

</script>