<template>
	<section>
		<h2>{{ title }}</h2>
		<p class="md:h-12"><slot /></p>
		<validate-field :value="editingValue" :rules="rules" v-slot="{ error, message }">
			<text-input
				v-model="editingValue"
				:label="title"
				:error="error"
				:message="message"
				@input="$emit('input', $event)"
			/>
			<aside v-if="!error" class="md:hidden message" :class="messageClass">{{ remaining }} points remaining</aside>
		</validate-field>
	</section>
</template>
<script>
import Vue from 'vue'
import { ATTRIBUTE_MIN, ATTRIBUTE_STARTING_MAX } from '~/utils/config'
import { required, numeric, minVal, maxVal } from '~/utils/validators'

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
		remaining: {
			type: [String, Number],
			required: true,
		},
	},

	data() {
		return {
			editingValue: this.value
		}
	},

	computed: {
		messageClass() {
			return this.remaining <= 0 ? 'warning' : 'success'
		},

		rules() {
			return [required(), numeric(), minVal(ATTRIBUTE_MIN), maxVal(ATTRIBUTE_STARTING_MAX)]
		},
	},
})
</script>