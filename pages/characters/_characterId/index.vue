<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<div v-else>
			<section v-if="inViewMode" class="btn-panel">
				<button-action block disabled>Play</button-action>
				<button-action block type="primary" @click="soloPlay">Solo</button-action>
				<button-action block type="success" @click="editCharacter">Edit</button-action>
				<button-action block type="warning" @click="confirmDeleteCharacter">Delete</button-action>
			</section>
			<section v-if="inPlayMode" class="btn-panel gap-x-2">
				<menu-button type="primary" block outlined @click="drawCards" :disabled="!readyToDraw" :items="skillTestItems">
					Skill Check
				</menu-button>
				<menu-button type="success" block outlined :items="drawItems">
					Draw
				</menu-button>
			</section>

			<h1>{{ character.name }}</h1>
			<character-image :character="character" />

			<section class="mb-2 grid grid-cols-2">
				<div v-if="character.persona.card">
					<h2>Persona</h2>
					<card-view :card-name="character.persona.card" :reversed="character.persona.reversed" />
					<p class="text-sm italic">{{ character.persona.text }}</p>
				</div>
				<div v-if="character.shadow.card">
					<h2>Shadow</h2>
					<card-view :card-name="character.shadow.card" :reversed="character.shadow.reversed" />
					<p class="text-sm italic">{{ character.shadow.text }}</p>
				</div>
			</section>

			<section class="mb-2">
				<h2>Attributes</h2>
				<attributes-view :values="character.attributes" :play="inPlayMode" v-model="selectedAttribute" :injuries="character.injuries" />
			</section>
			<section class="mb-2 border-t border-gray-300 pt-6">
				<h2>Abilities</h2>
				<attributes-view :values="character.abilities" :play="inPlayMode" v-model="selectedAbility" />
			</section>
			<section class="mb-4 border-t border-gray-300 pt-6">
				<h2>Aspects</h2>
				<div class="flex flex-wrap justify-center">
					<ul class="w-full lg:w-9/12 px-4 list">
						<li
							class="my-2 text-gray-700"
							:class="{ 'text-red-500': isInjuryAspect(aspect) }"
							:key="`aspect_${idx}`"
							v-for="(aspect, idx) in character.aspects"
						>
							<div class="flex">
								<span class="flex-grow">{{ aspect.text }}</span>
								<span v-if="isInjuryAspect(aspect) && inPlayMode" @click="confirmRemoveAspect(idx)"><icon-view icon="close" /></span>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<section class="mt-4 py-10 border-t border-gray-300" v-if="character.background">
				<div class="flex flex-wrap justify-center">
					<div class="w-full lg:w-9/12 px-4">
						<p class="mb-4 text-lg leading-relaxed text-gray-800">{{ character.background }}</p>
					</div>
				</div>
			</section>
			<skill-check-draw
				v-if="showDrawCards"
				:number="cardsToDraw"
				:character="character"
				:attribute="selectedAttribute"
				:ability="selectedAbility"
				@close="showDrawCards = false"
				@push="push"
			/>
			<recovery-draw
				v-if="showRecovery"
				:character="character"
				@close="applyRecovery"
			/>
			<injury-draw
				v-if="showInjury"
				:character="character"
				@save="updateAspects"
			/>
			<inspire-draw v-if="showInspire" @close="showInspire = false" />
		</div>
		<confirm-overlay v-if="deleting" @click="deleteCharacter">Are you sure you want to delete this character?</confirm-overlay>
		<confirm-overlay v-if="removingAspect" @click="removeAspect">Are you sure you want to delete this aspect?</confirm-overlay>
	</main>
</template>
<script>

import range from 'lodash/range'
import { getCurrentAttribute, isInjured } from '~/utils/character'
import { ASPECT_INJURY } from '~/utils/config'

const PLAY = 'play'
const SOLO = 'solo'
const VIEW = 'view'

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
			mode: VIEW,
			selectedAbility: null,
			selectedAttribute: null,
			showDrawCards: false,
			cardsToDraw: 0,
			showRecovery: false,
			showInjury: false,
			showInspire: false,
			removingAspect: false,
			removingAspectIndex: -1,
		}
	},

	computed: {
		skillTestItems() {
			return range(1, 6).map(num => ({ text: `Draw ${num}`, key: num }))
		},

		drawItems() {
			return [
				{ text: 'Inspire', key: 'inspire', click: () => this.showInspire = true },
				{ text: 'Recover', key: 'recover', click: () => this.recover(), disabled: !this.isInjured },
			]
		},

		inViewMode() {
			return this.mode === VIEW
		},

		inPlayMode() {
			return this.mode === SOLO || this.mode === PLAY
		},

		readyToDraw() {
			return this.selectedAttribute !== null && this.selectedAbility !== null
		},

		isInjured() {
			return isInjured(this.character)
		},
	},

	methods: {
		soloPlay() {
			this.mode = SOLO
		},

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

		drawCards(num) {
			this.cardsToDraw = num
			this.showDrawCards = true
		},

		recover() {
			this.showRecovery = true
		},

		isInjuryAspect(aspect) {
			return aspect.type === ASPECT_INJURY
		},

		confirmRemoveAspect(toRemove) {
			this.removingAspect = true
			this.removingAspectIndex = toRemove
		},

		async removeAspect(result) {
			if(result) {
				await this.$store.dispatch('character/save', {
					...this.character,
					aspects: this.character.aspects.filter((_a, idx) => idx !== this.removingAspectIndex)
				})
				this.character = await this.$store.getters['character/byId'](this.character.id)
			}

			this.removingAspect = false
			this.removingAspectIndex = -1
		},

		async updateAspects(aspect) {
			await this.$store.dispatch('character/save', {
				...this.character,
				aspects: [
					...this.character.aspects,
					{ text: aspect, type: ASPECT_INJURY }
				]
			})

			this.character = await this.$store.getters['character/byId'](this.character.id)

			this.showInjury = false
		},

		async applyRecovery(injuries) {
			this.showRecovery = false
			
			await this.$store.dispatch('character/save', { ...this.character, injuries })

			this.character = await this.$store.getters['character/byId'](this.character.id)
		},

		async push(attribute) {
			if(getCurrentAttribute(this.character, attribute) > 0) {
				await this.$store.dispatch('character/push', {
					character: this.character,
					attribute
				})

				this.character = await this.$store.getters['character/byId'](this.character.id)

				if(getCurrentAttribute(this.character, attribute) === 0) {
					this.showInjury = true
					this.showDrawCards = false
				}
			}
		}
	},
}

</script>
<style scoped>
.btn-panel {
	@apply flex fixed bg-white bottom-0 left-0 right-0 px-6 py-2 border-t border-gray-300 z-10;
}
</style>