<template>
	<div class="btn-group">
		<button-action :key="`${opt.value}_${idx}`" v-for="(opt, idx) in options"
			:disabled="opt.disabled"
			:type="opt.type || (opt.value === value ? 'success' : 'primary')"
			@click="$emit('input', opt.value)"
		>
			{{ opt.text || opt.value }}
		</button-action>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ButtonGroup', {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
	},
})
</script>