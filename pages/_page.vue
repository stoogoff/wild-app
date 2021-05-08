<template>
	<main>
		<markdown-content :content="content" />
	</main>
</template>
<script>
export default {
	layout: 'image',

	computed: {
		content() {
			const { params } = this.$nuxt.context

			return params.page
		}
	}
}
</script>