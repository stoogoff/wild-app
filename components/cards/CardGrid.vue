<template>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
		<div :key="`card_${card.id}`" v-for="card in cards">
			<Card :card="card" />
			<Button
				block
				@click="$emit('click', card)"
				:type="selected && selected.id === card.id ? 'success' : 'secondary'"
			>
				Use Card
			</Button>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardGrid', {
	props: {
		cards: {
			type: Array,
			required: true,
		},
		selected: {
			type: Object,
			default: null,
		}
	},
})

</script>