<template>
	<main>
		<Loading v-if="$fetchState.pending || character === null" />
		<div v-else>
			<span class="absolute top-6 right-2">
				<IconButton icon="pencil" @click="editCharacter" />
			</span>

			<img v-if="image !== null" :src="image" />

			<h1 class="text-4xl text-center font-semibold leading-normal mb-4 text-gray-800">{{ character.name }}</h1>

			<section class="mb-2">
				<h2>Attributes</h2>
				<Attributes :values="character.attributes" />
			</section>
			<section class="mb-2">
				<h2>Abilities</h2>
				<Attributes :values="character.abilities" />
			</section>
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
			<section class="mt-10 py-10 border-t border-gray-300" v-if="character.background">
				<div class="flex flex-wrap justify-center">
					<div class="w-full lg:w-9/12 px-4">
						<p class="mb-4 text-lg leading-relaxed text-gray-800">{{ character.background }}</p>
					</div>
				</div>
			</section>
			<section class="flex mb-4">
				<div class="w-1/2 pr-1"><Button block disabled>Play</Button></div>
				<div class="w-1/2 pl-1"><Button block disabled>Solo</Button></div>
			</section>
		</div>
	</main>
</template>
<script>

export default {
	layout: 'default',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)

		if(this.character.image) {
			const image = await this.$store.getters['image/byPath'](this.character.image)

			if(image)	{
				this.image = image.url
			}
		}
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
			image: null,
		}
	},

	methods: {
		editCharacter() {
			const { redirect } = this.$nuxt.context

			redirect(`/characters/${this.character.id}/persona`)
		},
	},
}

</script>
<style>
h2 {
	@apply uppercase text-gray-500 text-center;
}
</style>