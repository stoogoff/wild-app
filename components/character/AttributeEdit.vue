<template>
	<section>
		<h2>{{ title }}</h2>
		<p><slot /></p>
		<text-input
			v-model="editingValue"
			:label="title"
			:error="error"
			:message="errorMessage"
			@input="$emit('input', $event)"
		/>
	</section>
</template>
<script>
import Vue from 'vue'
import { ATTRIBUTE_MIN, ATTRIBUTE_STARTING_MAX } from '~/utils/config'

export default Vue.component('AttributeEdit', {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			editingValue: this.value
		}
	},

	computed: {
		error() {
			return isNaN(this.editingValue) || this.editingValue < ATTRIBUTE_MIN || this.editingValue > ATTRIBUTE_STARTING_MAX
		},

		errorMessage() {
			return this.error ? `Attributes must be between ${ATTRIBUTE_MIN} and ${ATTRIBUTE_STARTING_MAX}` : ''
		},
	},
})
</script>