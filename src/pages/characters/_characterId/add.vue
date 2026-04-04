<template>
	<main>
		<loading-spinner v-if="loading || character === null" />
		<section v-else>
			<h1>Add Character</h1>
			<column-view title="Personal Details">
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
				<template #sidebar>
					<p class="mt-14">The character’s name and other personal details.</p>
				</template>
			</column-view>
			<column-view title="Persona">
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
					<card-filter-select :cards="cards" :selected="character.persona" @input="selectPersonaCard" />
				</div>
				<template #sidebar>
					<p class="mt-14">Choose a card to represent the character and define their basic concept.</p>
				</template>
			</column-view>
			<column-view title="Shadow">
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
					<card-filter-select :cards="cards" :selected="character.shadow" @input="selectShadowCard" />
				</div>
				<template #sidebar>
					<p class="mt-14">Choose a card to represent the character’s shadow, the thing which is holding them back.</p>
				</template>
			</column-view>
			<column-view title="Aspects">
				<div :key="`aspect_${idx}`" v-for="(aspect, idx) in character.aspects">
					<validate-field
						:value="character.aspects[idx].text"
						:rules="rules.required"
						v-slot="{ error, message }"
					>
						<text-input
							:label="`Aspect ${idx + 1}`"
							v-model="character.aspects[idx].text"
							:error="error"
							:message="message"
						>
							<template #append>
								<span class="text-gray-300 hover:text-red-500 cursor-pointer" @click="removeAspect(idx)">
									<icon-view icon="close" />
								</span>
							</template>
						</text-input>
					</validate-field>
				</div>
				<div class="mt-2 mb-6 col-span-2">
					<button-action type="primary" :outlined="character.aspects.length > 0" :disabled="character.aspects.length >= 8" block @click="addAspect">Add</button-action>
				</div>
				<template #sidebar>
					<p class="mt-14">Aspects are simple phrases which define the character’s strengths and weaknesses.</p>
				</template>
			</column-view>
			<column-view title="Attributes">
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
				<template #sidebar>
					<p class="mt-14">The character’s attributes must be between 1 and 6.</p>
				</template>
			</column-view>
			<column-view title="Abilities">
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
				<template #sidebar>
					<p class="mt-14">The character’s abilities must be between 1 and 6.</p>
				</template>
			</column-view>
			<div class="flex">
				<button-action block outlined @click="close">Cancel</button-action>
				<button-action block type="primary" @click="save" :disabled="!canContinue">Save</button-action>
			</div>
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
import { required, requiredEach, numeric, minVal, maxVal, minLen, validateBatch } from '~/utils/validators'
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

			const rules = {
				name: this.rules.required,
				persona: this.rules.required,
				personaCard: this.rules.required,
				shadow: this.rules.required,
				shadowCard: this.rules.required,
				aspects: [minLen(1), requiredEach()],
			}
			const character = {
				name: this.character.name,
				persona: this.character.persona.text,
				personaCard: this.character.persona.card,
				shadow: this.character.shadow.text,
				shadowCard: this.character.shadow.card,
				aspects: this.character.aspects.map(aspect => aspect.text)
			}

			this.attributes.forEach(key => {
				rules[key] = this.rules.attributes
				character[key] = this.character.attributes[key]
			})

			this.abilities.forEach(key => {
				rules[key] = this.rules.abilities
				character[key] = this.character.abilities[key]
			})

			return validateBatch(rules, character)
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

			this.close()

			this.loading = false
		},

		close() {
			const { redirect } = this.$nuxt.context

			redirect(`/characters/${this.character.id}`)
		}
	},
}
</script>
