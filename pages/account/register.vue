<template>
	<main class="py-12">
		<h1>Register</h1>
		<p>Your password must be at least eight characters long and contain one:</p>
		<ul class="list">
			<li :class="{ 'text-green-600': hasUpper }">Uppercase letter</li>
			<li :class="{ 'text-green-600': hasLower }">Lowercase letter</li>
			<li :class="{ 'text-green-600': hasNumber }">Number</li>
			<li :class="{ 'text-green-600': hasSpecial }">Special character</li>
		</ul>
		<Validate :value="email" :rules="rules.email" v-slot="{ error, message }">
			<TextInput label="Email Address" v-model="email" :error="error" :message="message" />
		</Validate>
		<Validate :value="password" :rules="rules.password" v-slot="{ error, message }">
			<PasswordInput label="Password" v-model="password" :error="error" :message="message" />
		</Validate>
		<Validate :value="confirmPassword" :rules="rules.confirmPassword" v-slot="{ error, message }">
			<PasswordInput label="Confirm Password" v-model="confirmPassword" :error="error" :message="message" />
		</Validate>
		<div class="flex justify-end">
			<Button :disabled="!canContinue" @click="signup">Register</Button>
		</div>
	</main>
</template>
<script>

import { required, email, min, specialChar, uppercase, lowercase, numbers, validate, validateBatch } from '~/utils/validators'

export default {
	data() {
		return {
			email: '',
			password: '',
			confirmPassword: '',
		}
	},

	computed: {
		hasUpper() {
			return validate([ uppercase() ], this.password).length === 0
		},

		hasLower() {
			return validate([ lowercase() ], this.password).length === 0
		},

		hasNumber() {
			return validate([ numbers() ], this.password).length === 0
		},

		hasSpecial() {
			return validate([ specialChar() ], this.password).length === 0
		},


		rules() {
			return {
				email: [required(), email()],
				password: [required(), min(8), uppercase(), lowercase(), numbers(), specialChar()],
				confirmPassword: [required(), value => value === this.password || 'Password and confirm password must match']
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword,
			})
		},
	},

	methods: {
		signup() {

		},
	},
}
</script>