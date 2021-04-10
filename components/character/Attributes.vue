<template>
	<div class="flex justify-center pb-4 flex-wrap">
		<div class="mr-4 p-3 text-center" :key="`${attr}_${idx}`" v-for="(attr, idx) in Object.keys(values)">
			<span class="text-xl font-bold block tracking-wide text-gray-700">{{ values[attr] }}</span
			><span class="text-sm text-gray-500 uppercase">{{ attr }}</span>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Attributes', {
	props: {
		values: {
			type: Object,
			required: true,
		}
	},
})

</script>
