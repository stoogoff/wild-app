<template>
	<div>
		<main-nav />
		<section class="relative py-16 bg-gray-300">
			<div class="container mx-auto md:px-4 max-w-screen-lg">
				<div class="relative flex flex-col py-8 bg-white w-full mb-6 shadow-xl sm:rounded-lg pb-8">
					<Nuxt />
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	
export default {
	name: 'DefaultLayout',
}

</script>