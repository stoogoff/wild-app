<template>
	<Screen>
		<Navbar>
			<template #title>Injury</template>
		</Navbar>
		<div class="p-4">
			<MarkdownContent content="characters/injury" />
			<Validate :value="aspect" :rules="rules.aspect" v-slot="{ error, message }">
				<TextArea label="Aspect" v-model="aspect" :error="error" :message="message" />
			</Validate>
			<Button type="primary" block @click="save" :disabled="!canContinue">Save</Button>
		</div>
	</Screen>
</template>
<script>
import Vue from 'vue'
import { required, validateBatch } from '~/utils/validators'

export default Vue.component('Injury', {
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