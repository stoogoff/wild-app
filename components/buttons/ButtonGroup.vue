<template>
	<div class="btn-group">
		<Button :key="`${opt.value}_${idx}`" v-for="(opt, idx) in options"
			:disabled="opt.disabled"
			:type="opt.value === value ? 'success' : 'primary'"
			@click="$emit('input', opt.value)"
		>
			{{ opt.text || opt.value }}
		</Button>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ButtonGroup', {
	props: {
		value: {
			type: String,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
	},
})
</script>