<template>
	<div class="flex justify-center py-4 flex-wrap">
		<div
			:key="`${attr}_${idx}`"
			v-for="(attr, idx) in Object.keys(values)"
			class="attr"
			:class="attr.toLowerCase()"
		>
			<span class="text-xl font-bold block tracking-wide text-gray-700">{{ values[attr] }}</span>
			<span class="text-sm text-gray-500 uppercase">{{ attr }}</span>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AttributesView', {
	props: {
		values: {
			type: Object,
			required: true,
		}
	},
})

</script>
<style scoped>

.attr {
	@apply bg-center bg-no-repeat bg-contain w-28  mr-4 mb-4 p-3 text-center;
}

.control {
	background-image: url(/img/cards/control.svg);
}

.passion {
	background-image: url(/img/cards/passion.svg);
}

.strength {
	background-image: url(/img/cards/strength.svg);
}

.focus {
	background-image: url(/img/cards/focus.svg);
}

</style>