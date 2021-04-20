<template>
	<div class="flex">
		<Link block type="secondary" :to="previous" v-if="previous">Previous</Link>
		<Link block type="secondary" to="/" v-else>Exit</Link>
		<Button block :disabled="disabled" @click="nextClick">Next</Button>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Stepper', {
	props: {
		next: {
			type: String,
			required: true,
		},
		previous: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		async nextClick() {
			await this.$emit('click')
			this.$router.push(this.next)
		}
	},
})
</script>