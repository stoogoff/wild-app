<template>
	<section class="mb-6">
		<h2>{{ title }}</h2>
		<p class="md:h-12"><slot /></p>
		<div class="grid grid-cols-2 gap-4">
			<text-input
				:label="title"
				:value="value"
				disabled
			/>
			<div class="pt-7">
				<button-group
					:value="value"
					:options="mappedOptions"
					@input="$emit('input', $event)"
				/>
		</div>
		</div>
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