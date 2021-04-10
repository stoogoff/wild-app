<template>
	<div class="pt-12 relative">
		<span class="absolute top-6 right-0">
			<IconButton icon="pencil" @click="editCharacter" />
		</span>

		<h1 class="text-4xl text-center font-semibold leading-normal mb-2 text-gray-800 mb-2">{{ character.name }}</h1>

		<section class="mb-4">
			<h2>Aspects</h2>
			<div class="flex flex-wrap justify-center">
				<ul class="w-full lg:w-9/12 px-4 list">
					<li class="my-2 text-gray-700" :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
						{{ aspect }}
					</li>
				</ul>
			</div>
		</section>
		<section class="mb-2">
			<h2>Attributes</h2>
			<Attributes :values="character.attributes" />
		</section>
		<section class="mb-2">
			<h2>Abilities</h2>
			<Attributes :values="character.abilities" />
		</section>
		<section class="mt-10 py-10 border-t border-gray-300" v-if="character.background">
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
	},
	methods: {
		editCharacter() {
			console.log('edit character')
		},
	},
}

</script>
<style>
h2 {
	@apply uppercase text-gray-500 text-center;
}
</style>