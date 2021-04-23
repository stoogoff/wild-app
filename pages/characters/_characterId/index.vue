<template>
	<main>
		<Loading v-if="loading || character === null" />
		<div v-else>
			<section class="flex fixed bg-white bottom-0 left-0 right-0 px-6 py-2 border-t border-color-gray-300">
				<Button block disabled>Play</Button>
				<Button block disabled>Solo</Button>
				<Button block type="success" @click="editCharacter">Edit</Button>
				<Button block type="warning" @click="confirmDeleteCharacter">Delete</Button>
			</section>

			<h1>{{ character.name }}</h1>
			<CharacterImage :character="character" />

			<section class="mb-2">
				<h2>Attributes</h2>
				<AttributesView :values="character.attributes" />
			</section>
			<section class="mb-2 border-t border-gray-300 pt-6">
				<h2>Abilities</h2>
				<AttributesView :values="character.abilities" />
			</section>
			<section class="mb-4 border-t border-gray-300 pt-6">
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
		</div>
		<Confirm v-if="deleting" @click="deleteCharacter">Are you sure you want to delete this character?</Confirm>
	</main>
</template>
<script>

export default {
	layout: 'default',

	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await this.$store.getters['character/byId'](params.characterId)
		this.loading = false
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
			deleting: false,
			loading: false,
		}
	},

	methods: {
		editCharacter() {
			const { redirect } = this.$nuxt.context

			redirect(`/characters/${this.character.id}/persona`)
		},

		deleteCharacter(result) {
			this.deleting = false

			if(result) {
				this.loading = true

				try {
					this.$store.dispatch('character/delete', this.character.id)
					this.$router.push('/characters')
				}
				catch(error) {
					console.log(error)
				}

				this.loading = false
			}
		},

		confirmDeleteCharacter() {
			this.deleting = true
		},
	},
}

</script>
