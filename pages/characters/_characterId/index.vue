<template>
	<div class="mt-12">
		<h1 class="text-4xl text-center font-semibold leading-normal mb-2 text-gray-800 mb-2">{{ character.name }}</h1>

		<section>
			<h2>Aspects</h2>
				<div class="my-2 text-gray-700" :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
					{{ aspect }}
				</div>
		</section>
		<section>
			<h2>Attributes</h2>

			<div class="flex justify-center py-4 lg:pt-4 pt-8">
				<div class="mr-4 p-3 text-center" :key="`${attr}_${idx}`" v-for="(attr, idx) in Object.keys(character.attributes)">
					<span class="text-xl font-bold block tracking-wide text-gray-700">{{ character.attributes[attr] }}</span
					><span class="text-sm text-gray-500 uppercase">{{ attr }}</span>
				</div>
			</div>
		</section>
		<section>
			<h2>Abilities</h2>
			<div class="flex justify-center py-4 lg:pt-4 pt-8">
				<div class="mr-4 p-3 text-center" :key="`${attr}_${idx}`" v-for="(attr, idx) in Object.keys(character.abilities)">
					<span class="text-xl font-bold block tracking-wide text-gray-700">{{ character.abilities[attr] }}</span
					><span class="text-sm text-gray-500 uppercase">{{ attr }}</span>
				</div>
			</div>
		</section>
		<section class="mt-10 py-10 border-t border-gray-300 text-center" v-if="character.background">
			<div class="flex flex-wrap justify-center">
				<div class="w-full lg:w-9/12 px-4">
					<p class="mb-4 text-lg leading-relaxed text-gray-800">{{ character.background }}</p>
				</div>
			</div>
		</section>
	</div>
</template>
<script>

export default {
	props: {
		character: {
			type: Object,
			required: true,
		}
	},

	mounted() {
		console.log('mounted::_characterId/index')
		console.log(this.character)
	},
}

</script>	