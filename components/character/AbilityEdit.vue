<template>
	<section class="mb-6">
			<h2>{{ title }}</h2>
			<slot />
			<text-input
				:label="title"
				:value="value"
				disabled
			/>
			<button-group
				:value="value"
				:options="mappedOptions"
				@input="$emit('input', $event)"
			/>
		</section>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AbilityEdit', {
	props: {
		title: {
			type: String,
			required: true,
		},

		value: {
			type: [String, Number],
			required: true,
		},

		options: {
			type: Array,
			required: true,
		},
	},

	computed: {
		mappedOptions() {
			return this.options.map(opt => ({
				...opt,
				disabled: opt.text === this.value ? false : opt.disabled,
				type: opt.text === this.value ? 'success' : 'primary',
			}))
		},
	},
})

</script>