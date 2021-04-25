<template>
	<main class="py-12">
		<LoadingOverlay v-if="loading" />
		<div v-else>
			<h1>Login</h1>
			<Alert type="warning" v-if="error">Your email address or password wasn’t recognised. Please try again.</Alert>
			<Validate :value="email" :rules="rules.email" v-slot="{ error, message }">
				<TextInput label="Email Address" v-model="email" :error="error" :message="message" />
			</Validate>
			<Validate :value="password" :rules="rules.password" v-slot="{ error, message }">
				<PasswordInput label="Password" v-model="password" :error="error" :message="message" />
			</Validate>
			<div class="flex">
				<Link block type="primary" outlined to="/account/register">Register</Link>
				<Button block type="primary" :disabled="!canContinue" @click="login">Login</Button>
			</div>
		</div>
	</main>
</template>
<script>

import { required, email, validateBatch } from '~/utils/validators'

export default {
	data() {
		return {
			email: '',
			password: '',
			error: false,
			loading: false,
		}
	},

	computed: {
		rules() {
			return {
				email: [required(), email()],
				password: [required()],
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				email: this.email,
				password: this.password,
			})
		},
	},

	methods: {
		async login() {
			this.loading = true

			try {
				await this.$store.dispatch('auth/login', {
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