<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<column-view
				title="Personal Details"
				sidebar="The character’s name and other personal details."
			>
				<div>
					<validate-field
						:value="character.name"
						:rules="rules.required"
						v-slot="{ error, message }"
					>
						<text-input
							label="Name"
							v-model="character.name"
							:error="error"
							:message="message"
						/>
					</validate-field>
					<text-area label="Background" v-model="character.background" />
				</div>
				<div>
					<label class="label">Image</label>
					<file-drop-zone :accept="['image/*']" @input="setImage" />
					<div v-if="image">
						<image-upload :file="image" @delete="removeImage" />
					</div>
				</div>
			</column-view>
			<column-view
				title="Persona"
				sidebar="Choose a card to represent the character and define their basic concept."
			>
				<div class="col-span-2">
					<validate-field
						:value="character.persona.text"
						:rules="rules.required"
						v-slot="{ error, message }"
					>
						<text-input
							label="Persona"
							v-model="character.persona.text"
							:error="error"
							:message="message"
						/>
					</validate-field>
					<card-filter-select :cards="cards" :selected="character.persona.card" @input="selectPersonaCard" />
				</div>
			</column-view>
			<column-view
				title="Shadow"
				sidebar="Choose a card to represent the character’s shadow, the thing which is holding them back."
			>
				<div class="col-span-2">
					<validate-field
						:value="character.shadow.text"
						:rules="rules.required"
						v-slot="{ error, message }"
					>
						<text-input
							label="Shadow"
							v-model="character.shadow.text"
							:error="error"
							:message="message"
						/>
					</validate-field>
					<card-filter-select :cards="cards" :selected="character.shadow.card" @input="selectShadowCard" />
				</div>
			</column-view>
			<column-view
				title="Aspects"
				sidebar="Aspects are simple phrases which define the character’s strengths and weaknesses."
			>
				<div :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
					<text-input :label="`Aspect ${idx + 1}`" v-model="character.aspects[idx].text">
						<template #append>
							<span class="text-gray-300 hover:text-red-500 cursor-pointer" @click="removeAspect(idx)">
								<icon-view icon="close" />
							</span>
						</template>
					</text-input>
				</div>
				<div class="mt-2 mb-6 col-span-2">
					<button-action type="primary" outlined block @click="addAspect">Add</button-action>
				</div>
			</column-view>
			<column-view
				title="Attributes"
				sidebar="The character’s attributes must be between 1 and 6."
			>
				<validate-field
					:value="character.attributes[attr]"
					:rules="rules.attributes"
					v-slot="{ error, message }"
					v-for="(attr, idx) in attributes"
					:key="`attribute_${idx}`"
				>
					<text-input
						v-model="character.attributes[attr]"
						:label="attr"
						:error="error"
						:message="message"
					/>
				</validate-field>
			</column-view>
			<column-view
				title="Abilities"
				sidebar="The character’s abilities must be between 1 and 6."
			>
				<validate-field
					:value="character.abilities[ability]"
					:rules="rules.abilities"
					v-slot="{ error, message }"
					v-for="(ability, idx) in abilities"
					:key="`ability_${idx}`"
				>
					<text-input
						v-model="character.abilities[ability]"
						:label="ability"
						:error="error"
						:message="message"
					/>
				</validate-field>
			</column-view>
			<button-action block type="primary" @click="save" :disabled="!canContinue">Save</button-action>
		</section>
	</main>
</template>
<script>
import OwnedCharacter from '~/mixins/OwnedCharacter'
import {
	ASPECTS_MIN,
	ASPECTS_MAX,
	DEFAULT_ASPECT,
	ATTRIBUTE_MIN,
	ATTRIBUTE_MAX,
	ABILITY_MIN,
	ABILITY_MAX
} from '~/utils/config'
import { required, numeric, minVal, maxVal, validateBatch } from '~/utils/validators'
import { character, image, deck } from '~/state'

export default {
	mixins: [ OwnedCharacter ],

	async fetch() {
		this.loading = true

		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)

		if(this.character.image) {
			this.image = await image.byPath(this.character.image)
		}

		this.cards = deck.all()
		this.loading = false
	},

	data() {
		return {
			loading: false,
			character: null,
			image: null,
			cards: [],
			filteredCards: [],
		}
	},

	computed: {
		attributes() {
			return ['Control', 'Strength', 'Focus', 'Passion']
		},

		abilities() {
			return ['Diplomat', 'Guardian', 'Rogue', 'Scholar', 'Visionary']
		},

		rules() {
			return {
				attributes: [required(), numeric(), minVal(ATTRIBUTE_MIN), maxVal(ATTRIBUTE_MAX)],
				abilities: [required(), numeric(), minVal(ABILITY_MIN), maxVal(ABILITY_MAX)],
				required: [required()],
			}
		},

		canContinue() {
			if(!this.character) {
				return false
			}

			const character = {}
			const rules = {}


			return validateBatch(
				{
					name: this.rules.required,
					persona: this.rules.required,
					shadow: this.rules.required,
					control: this.rules.attributes,
				},
				{
					name: this.character.name,
					persona: this.character.persona,
					shadow: this.character.shadow,
					control: this.character.attributes.Control,
				}
			)
		},
	},

	methods: {
		setImage(files) {
			if(files && files.length > 0) {
				this.image = files[0]
			}
		},

		removeImage() {
			this.image = null
		},

		addAspect() {
			this.character.aspects = [ ...this.character.aspects, { ...DEFAULT_ASPECT } ]
		},

		removeAspect(toRemove) {
			this.character.aspects = this.character.aspects.filter((_a, idx) => idx !== toRemove)
		},

		selectPersonaCard(card) {
			this.character.persona.card = card && card.id !== this.character.persona.card ? card.id : null
		},

		selectShadowCard(card) {
			this.character.shadow.card = card && card.id !== this.character.shadow.card ? card.id : null
		},

		async save() {
			const { redirect } = this.$nuxt.context

			this.loading = true
			// save an image
			if(this.image) {
				const imageUrl = await image.save(
					this.character.id,
					this.image
				)

				this.character.image = imageUrl
			}
			// delete an existing image
			else if(this.character.image) {
				await image.delete(this.character.image)

				delete this.character.image
			}

			await character.save(this.character)

			redirect(`/characters/${this.character.id}`)

			this.loading = false
		},
	},
}
</script>
