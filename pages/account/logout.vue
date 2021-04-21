<template>
	<LoadingOverlay />
</template>
<script>

export default {
	async mounted() {
		await this.$store.dispatch('auth/logout')
		this.$router.push('/')
	},
}

</script>