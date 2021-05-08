<template>
	<div>
		<main-nav />
		<section class="relative py-16 ">
			<div class="container mx-auto md:px-4 max-w-screen-lg">
				<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl sm:rounded-lg pb-8">
					<Nuxt />
				</div>
			</div>
		</section>
		<responsive-debug />
	</div>
</template>
<script>
	
export default {
	name: 'DefaultLayout',

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