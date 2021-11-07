<template>
	<transition name="slide-up" mode="out-in" appear>
		<div class="w-full h-full fixed block inset-0 bg-white overflow-x-scroll z-40 pt-12">
			<slot />
		</div>
	</transition>
</template>
<style>
.slide-up-enter-active, .slide-up-leave-active {
	transition: transform .5s;
}

.slide-up-enter-to, .slide-up-leave {
	transform: translateY(0);
}

.slide-up-enter, .slide-up-leave-to {
	transform: translateY(100%);
}
</style>