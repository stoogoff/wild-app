<template>
	<div class="flex justify-center py-4 flex-wrap">
		<div
			:key="`${attr}_${idx}`"
			v-for="(attr, idx) in Object.keys(values).sort()"
			class="attr"
			:class="attr.toLowerCase()"
		>
			<span v-if="play" class="absolute -top-2 -right-2">
				<icon-action
					icon="check"
					:outlined="!isSelected(attr)"
					:type="isSelected(attr) ? 'success' : ''"
					@click="selectAttr(attr)" />
			</span>
			<span class="text-xl font-bold block tracking-wide text-gray-700">
				{{ values[attr] }}
				<span v-if="hasInjury(attr)">({{ injuries[attr] }})</span>
			</span>
			<span class="text-sm text-gray-500 uppercase">{{ attr }}</span>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AttributesView', {
	props: {
		value: {
			type: String,
			default: null,
		},
		values: {
			type: Object,
			required: true,
		},
		injuries: {
			type: Object,
			default: null,
		},
		play: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		hasInjury(attr) {
			return this.injuries !== null && attr in this.injuries
		},

		isSelected(attr) {
			return this.value === attr
		},

		selectAttr(attr) {
			this.$emit('input', this.isSelected(attr) ? null : attr)
		},
	},
})

</script>
<style scoped>

.attr {
	@apply bg-center bg-no-repeat bg-contain w-28  mr-4 mb-4 p-3 text-center relative;
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