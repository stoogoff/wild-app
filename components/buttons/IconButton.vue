<template>
	<button :class="classList" :disabled="disabled" @click="$emit('click')">
		<Icon :icon="icon" />
	</button>
</template>
<script>
import Vue from 'vue'

export default Vue.component('IconButton', {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'primary',
		},
		icon: {
			type: String,
			required: true,
		},
	},

	computed: {
		classList() {
			let classList = ['btn-icon']

			if(this.disabled === true) {
				classList.push('disabled')
			}
			else {
				classList.push('enabled')
				classList.push(this.type)
			}

			return classList.join(' ')
		},
	}
})
</script>