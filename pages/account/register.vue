<template>
	<main class="py-12">
		<LoadingOverlay v-if="loading" />
		<div v-else>
			<h1>Register</h1>
			<Alert type="warning" v-if="error">There was an error creating your account. Please try again or trying loggin in.</Alert>
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
			<div class="flex">
				<Link block type="primary" outlined to="/account/login">Login</Link>
				<Button block type="primary" :disabled="!canContinue" @click="register">Register</Button>
			</div>
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
			error: false,
			loading: false,
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
		async register() {
			this.loading = true

			try {
				await this.$store.dispatch('auth/register', {
					email: this.email,
					password: this.password,
				})

				this.$router.push('/')
			}
			catch(error) {
				this.error = true
			}

			this.loading = false
		},
	},
}
</script>