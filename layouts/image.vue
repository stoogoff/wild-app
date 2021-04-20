<template>
	<div>
		<Navbar transparent />
		<section class="relative block" style="height: 500px">
			<div id="cover-image" class="absolute top-0 w-full h-full bg-center bg-cover">
				<span class="w-full h-full absolute opacity-50 bg-black"></span>
			</div>
			<div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style="height: 70px">
				<svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
					<polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100" ></polygon>
				</svg>
			</div>
		</section>
		<section class="relative py-16 bg-gray-300">
			<div class="container mx-auto md:px-4">
				<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl sm:rounded-lg -mt-80">
					<Nuxt />
				</div>
			</div>
		</section>
		<Footer />
		<Debug />
	</div>
</template>
<script>
	
export default {
	name: 'ImageLayout',

	async fetch() {
		const characters = await this.$store.dispatch('character/fetch')
		const images = characters.map(character => character.image).filter(img => !!img)

		if(images.length > 0)	{
			await this.$store.dispatch('image/fetch', images)
		}
	},
	fetchOnServer: false,
}

</script>