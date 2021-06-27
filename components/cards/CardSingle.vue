<template>
	<div>
		<div class="relative">
			<div @click="viewCard = card">
				<card-view :card="card" />
			</div>
			<span class="absolute top-0 right-0">
				<slot v-bind:card="card" />
			</span>
		</div>
		<overlay-fade v-if="viewCard">
			<div class="relative p-5">
				<card-flip :card="viewCard" />
				<span class="absolute top-1 right-1"><icon-action icon="close" outlined @click="viewCard = null" /></span>
			</div>
		</overlay-fade>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardSingle', {
	props: {
		card: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			viewCard: null
		}
	},
})

</script>