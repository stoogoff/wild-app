<template>
	<transition name="slide-up" mode="out-in" appear>
		<div class="w-full h-full fixed block inset-0 bg-white overflow-x-scroll z-40 pt-12">
			<slot />
		</div>
	</transition>
</template>
