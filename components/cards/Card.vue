<template>
	<img
		:class="{ 'transform rotate-180': card.isReversed }"
		:src="`/img/cards/${card.image}`"
	/>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Card', {
	props: {
		card: {
			type: Object,
			required: true,
		},
	},
})
</script>