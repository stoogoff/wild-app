<template>
	<div class="flex">
		<Button block @click="previousClick" v-if="previous">Previous</Button>
		<Link block :to="exit" v-else>Exit</Link>
		<Button block type="primary" :disabled="disabled" @click="nextClick">{{ label }}</Button>
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
		label: {
			type: String,
			default: 'Next',
		},
	},

	computed: {
		exit() {
			return this.next.substring(0, this.next.lastIndexOf('/'))
		},
	},

	methods: {
		async previousClick() {
			this.$emit('click', () => {
				this.$router.push(this.previous)
			})
		},

		async nextClick() {
			this.$emit('click', () => {
				this.$router.push(this.next)
			})
		}
	},
})
</script>