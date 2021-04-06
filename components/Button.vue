<template>
	<button :class="classList" :disabled="disabled" @click="$emit('click')">
		<slot />
	</button>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Button', {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'primary',
		},
		block: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		classList() {
			let classList = ['btn']

			if(this.block === true) {
				classList.push('block w-full')
			}

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
