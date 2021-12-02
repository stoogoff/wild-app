<template>
	<div class="md:flex mb-6 pb-6 border-b border-gray-300">
		<article class="md:w-8/12">
			<h2 class="mb-2">{{ title }}</h2>
			<div class="md:grid grid-cols-2 gap-4">
				<slot />
			</div>
		</article>
		<aside class="hidden md:block md:w-3/12 ml-8">
			<p class="mt-14">{{ sidebar }}</p>
		</aside>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ColumnView', {
	props: {
		title: {
			type: String,
			required: true,
		},
		sidebar: {
			type: String,
			required: true,
		},
	},
})
</script>