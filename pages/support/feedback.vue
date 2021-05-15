<template>
	<main>
		<section class="md:flex">
			<article class="md:w-8/12">
				<markdown-content content="support/feedback" />
				<ul class="divide-y">
					<li :key="row.id" v-for="row in existingFeedback" class="py-4">
						<p>On <time :datetime="row.date">{{ row.date | date }}</time> you wrote:</p>
						<p class="text-xl mb-0">{{ row.description }}</p>
						<div v-if="row.response" class="mt-2">
							<p>On <time :datetime="row.date">{{ row.responseDate | date }}</time> the team responded with:</p>
							<p class="text-xl mb-0">{{ row.response }}</p>
						</div>
					</li>
				</ul>
			</article>
			<aside class="md:w-3/12">
				<loading-spinner v-if="loading" />
				<div v-else>
					<alert-view type="warning" v-if="error">Your email address or password wasn’t recognised. Please try again.</alert-view>
					<validate-field :value="feedback" :rules="rules.feedback" v-slot="{ error, message }">
						<text-area label="Feedback" v-model="feedback" :error="error" :message="message" />
					</validate-field>
					<div class="flex">
						<button-action block type="primary" :disabled="!canContinue" @click="save">Save</button-action>
					</div>
				</div>
			</aside>
		</section>
	</main>
</template>
<script>

import sortBy from 'lodash/sortBy'
import { required, validateBatch } from '~/utils/validators'
import { feedback } from '~/state'

export default {
	layout: 'image',

	async fetch() {
		this.loading = true

		await feedback.fetch()

		try {
			this.existingFeedback = sortBy(feedback.all(), 'date').reverse()
		}
		catch(error) {
			console.log(error)
		}

		this.loading = false
	},

	data() {
		return {
			existingFeedback: [],
			feedback: '',
			error: false,
			loading: false,
		}
	},

	computed: {
		rules() {
			return {
				feedback: [required()],
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				feedback: this.feedback,
			})
		},
	},

	methods: {
		async save() {
			this.loading = true

			try {
				await feedback.create(this.feedback)
				this.$fetch()
				this.feedback = ''
			}
			catch(error) {
				this.error = true
			}

			this.loading = false
		},
	},
}
</script>