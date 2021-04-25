<template>
	<div class="relative inline-block" @mouseover="show" @mouseleave="hide" @keydown.enter="toggle">
		<Button v-bind="$attrs" :disabled="disabled">
			<div class="inline-flex items-center justify-between">
				<span class="flex-shrink-0"><slot /></span>
				<svg fill="currentColor" viewBox="0 0 20 20" class="flex-shrink-0 w-5 h-5 ml-1">
					<path :class="{ 'rotate-180': isVisible }" class="transition duration-300 ease-in-out origin-center transform" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</div>
		</Button>
		<transition
			enter-active-class="transition duration-300 ease-out transform"
			enter-class="translate-y-3 scale-95 opacity-0"
			enter-to-class="translate-y-0 scale-100 opacity-100"
			leave-active-class="transition duration-150 ease-in transform"
			leave-class="translate-y-0 opacity-100"
			leave-to-class="translate-y-3 opacity-0"
		>
			<div v-show="isVisible" class="absolute pt-2 z-10 bottom-14">
				<div class="relative py-1 bg-white border border-gray-200 rounded-md shadow-md">
					<div class="relative">
						<span
							:key="`menu_item_${item.key}`"
							v-for="item in items"
							class="block w-full px-4 py-2 font-medium text-gray-700 whitespace-no-wrap hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out cursor-pointer"
							@click="$emit('click', item.key)"
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
		// { key: String, title: String }[]
		items: {
			type: Array,
			default: [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isVisible: false
		}
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
			if(this.isVisible) this.hide()
			else this.show()
		},
	},
})
</script>