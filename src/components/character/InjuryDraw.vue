<template>
	<screen-slide>
		<nav-bar>
			<template #title>Injury</template>
		</nav-bar>
		<div class="p-4">
			<markdown-content content="characters/injury" />
			<validate-field :value="aspect" :rules="rules.aspect" v-slot="{ error, message }">
				<text-area label="Aspect" v-model="aspect" :error="error" :message="message" />
			</validate-field>
			<button-action type="primary" block @click="save" :disabled="!canContinue">Save</button-action>
		</div>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import { required, validateBatch } from '~/utils/validators'

export default Vue.component('InjuryDraw', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			aspect: ''
		}
	},

	computed: {
		rules() {
			return {
				aspect: [required()],
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				aspect: this.aspect,
			})
		},
	},

	methods: {
		save() {
			this.$emit('save', this.aspect)
		},
	},
})
</script>