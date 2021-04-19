<template>
	<div>
		<Navbar />
		<section class="relative py-16 ">
			<div class="container mx-auto md:px-4">
				<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl sm:rounded-lg py-8">
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
	async fetch() {
		await this.$store.dispatch('character/fetch')
	},
	fetchOnServer: false,
}

</script>