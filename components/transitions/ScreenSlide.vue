<template>
	<slide-up>
		<div class="w-full h-full fixed block inset-0 bg-white overflow-x-scroll z-40 pt-12">
			<slot />
		</div>
	</slide-up>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ScreenSlide', {})
</script>
