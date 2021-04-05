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
<style lang="sass">
@layer components
	.btn
		@apply font-sans
		@apply font-bold uppercase text-sm
		@apply px-6 py-3
		@apply mr-1 mb-1
		@apply rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150

		&.disabled
			@apply bg-gray-300
			@apply text-gray-400
			@apply cursor-default
			@apply hover:shadow

		&.enabled
			@apply hover:shadow-lg
			@apply cursor-pointer

		&.primary
			@apply bg-blue-600
			@apply text-blue-50
			@apply hover:bg-blue-800

		&.secondary
			@apply bg-gray-400
			@apply text-gray-900
			@apply hover:text-white
			@apply hover:bg-gray-600

		&.success
			@apply bg-green-600
			@apply text-green-50
			@apply hover:bg-green-800

		&.warning
			@apply bg-red-600
			@apply text-red-50
			@apply hover:bg-red-800

	.btn-group
		.btn
			@apply rounded-none

			&:first-child
				@apply rounded-l-md

			&:last-child
				@apply rounded-r-md
</style>
