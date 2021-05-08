<template>
	<div class="content">
		<loading-spinner v-if="$fetchState.pending" />
		<nuxt-content :document="text" v-else />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MarkdownContent', {
	props: {
		content: {
			type: String,
			required: true,
		},
	},

	async fetch() {
		this.text = await this.$content(this.content).fetch()
	},

	data() {
		return {
			text: '',
		}
	},
})
</script>