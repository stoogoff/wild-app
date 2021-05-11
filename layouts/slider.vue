<template>
	<div>
		<main-nav />
		<Nuxt />
	</div>
</template>
<script>
	
export default {
	name: 'SliderLayout',

	/*async fetch() {
		const characters = await this.$store.dispatch('character/fetch')
		const images = characters.map(character => character.image).filter(img => !!img)

		if(images.length > 0)	{
			await this.$store.dispatch('image/fetch', images)
		}
	},
	fetchOnServer: false,*/
}

</script>