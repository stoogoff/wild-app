<template>
	<screen-slide>
		<nav-bar>
			<template #title>Inspire</template>
			<template #buttons>
				<nav-button icon="close" @click="close" />
			</template>
			<div class="hidden md:flex md:flex-row md:ml-auto relative">
				<nav-item icon="close" @click="close">Close</nav-item>
			</div>
		</nav-bar>
		<div class="flex justify-center">
			<card-flip :card="card" />
		</div>
	</screen-slide>
</template>
<script>
import Vue from 'vue'
import deck from '~/state/deck'

export default Vue.component('InspireDraw', {
	fetch() {
		this.card = deck.drawOne()
	},

	data() {
		return {
			card: null,
		}
	},

	methods: {
		close() {
			this.$emit('close')
		},
	},
})
</script>