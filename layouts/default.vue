<template>
	<div>
		<Navbar />
		<section class="relative py-16 ">
			<div class="container mx-auto md:px-4">
				<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl sm:rounded-lg pb-8">
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
	name: 'DefaultLayout',

	async fetch() {
		const characters = await this.$store.dispatch('character/fetch')
		const images = characters.map(character => character.image).filter(img => !!img)

		console.log(images)

		if(images.length > 0)	{
			await this.$store.dispatch('image/fetch', images)
		}
	},
	fetchOnServer: false,
}

</script>