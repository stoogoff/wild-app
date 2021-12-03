<template>
	<div
		class="relative"
		:class="{
			'block w-full': block,
			'inline-block': !block,
		}"
		@mouseover="show"
		@mouseleave="hide"
		@keydown.enter="toggle"
	>
		<button-action v-bind="$attrs" block :disabled="disabled">
			<div class="inline-flex items-center justify-between">
				<span class="flex-shrink-0"><slot /></span>
				<svg fill="currentColor" viewBox="0 0 20 20" class="flex-shrink-0 w-5 h-5 ml-1">
					<path :class="{ 'rotate-180': isVisible }" class="transition duration-300 ease-in-out origin-center transform" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</div>
		</button-action>
		<transition
			enter-active-class="transition duration-300 ease-out transform"
			enter-class="translate-y-3 scale-95 opacity-0"
			enter-to-class="translate-y-0 scale-100 opacity-100"
			leave-active-class="transition duration-150 ease-in transform"
			leave-class="translate-y-0 opacity-100"
			leave-to-class="translate-y-3 opacity-0"
		>
			<div v-show="isVisible" :class="`absolute pt-2 z-10 w-full ${positionClass}`">
				<div class="relative py-1 bg-white border border-gray-200 rounded-md shadow-md">
					<div class="relative">
						<span
							:key="`menu_item_${item.key}`"
							v-for="item in items"
							class="menu-item"
							:class="{ 'disabled': item.disabled }"
							@click="clickHandler(item)"
						>
							{{ item.text }}
						</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MenuButton', {
	props: {
		/*
		{
			key: String,
			title: String,
			click?: Function
			disabled?: Boolean = false
		}[]
		*/
		items: {
			type: Array,
			default: [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		block: {
			type: Boolean,
			default: false,
		},
		position: {
			type: String,
			default: 'bottom',
		},
	},

	data() {
		return {
			isVisible: false
		}
	},

	computed: {
		positionClass() {
			return this.position === 'bottom' ? 'bottom-14' : 'top-12'
		},
	},

	methods: {
		show() {
			if(!this.disabled) {
				this.isVisible = true
			}
		},

		hide() {
			this.isVisible = false
		},

		toggle() {
			if(this.isVisible) {
				this.hide()
			}
			else {
				this.show()
			}
		},

		clickHandler(item) {
			if(item.click) {
				item.click()
			}
			else {
				this.$emit('click', item.key)
			}

			this.hide()
		},
	},
})
</script>
<style scoped>
.menu-item {
	@apply block w-full px-4 py-2  whitespace-nowrap;
	@apply font-medium text-gray-700;
	@apply transition duration-300 ease-in-out cursor-pointer;
	@apply hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:ring;
}

.menu-item.disabled {
	@apply text-gray-300 hover:text-gray-300 focus:text-gray-300 focus:shadow-none hover:bg-white;
}

</style>