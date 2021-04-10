<template>
	<div class="flex">
		<Link block type="secondary" :to="previous">Previous</Link>
		<Link block :to="next" :disabled="disabled">Next</Link>
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
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
})
</script>