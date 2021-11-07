<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<div v-else>
			<main class="md:hidden p-0 w-screen h-screen bg-white">
				<swiper>
					<swiper-slide>
						<article class="px-6 flex flex-col">
							HERE
							<img :src="imagePath" class="mb-6" />
							<markdown-content :content="contentPath" />
						</article>
					</swiper-slide>
					<swiper-slide :key="`mb-${card.id}`" v-for="card in cards">
						<card-flip :card="card" />
					</swiper-slide>
				</swiper>
			</main>
			<section class="hidden md:block relative py-16 bg-gray-300">
				<div class="container mx-auto md:px-4 max-w-screen-lg">
					<div class="relative flex flex-col mt-32 bg-white w-full mb-6 shadow-xl sm:rounded-lg pb-8">
						<main>
							<div class="flex justify-center p-4 -mt-32 mb-6">
								<div class="flex items-center justify-center shadow-xl rounded-full p-2 bg-white w-56 h-56">
									<img :src="imagePath" class="w-40 h-auto" :class="imagePosition" />
								</div>
							</div>
							<markdown-content :content="contentPath" />
							<card-grid :cards="cards" />
						</main>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import deck from '~/state/deck'

export default {
	components: {
		Swiper,
		SwiperSlide
	},

	directives: {
		swiper: directive
	},

	layout: 'slider',

	async fetch() {
		const content = await this.$content(this.contentPath).only(['image']).fetch()

		this.image = content.image
		this.cards = deck.suit(this.suit)
	},

	data() {
		return {
			image: '',
			cards: [],
		}
	},

	computed: {
		suit() {
			const { params } = this.$nuxt.context

			return params.suit
		},

		imagePosition() {
			if(this.suit === 'control' || this.suit === 'focus') {
				return 'mt-6'
			}

			if(this.suit === 'major-arcana') {
				return ''
			}

			return '-mt-4'
		},

		contentPath() {
			return `tarot/${this.suit}`
		},

		imagePath() {
			return `/img/cards/${this.image}`
		},
	},
}
</script>
<style scoped>
.swiper-wrapper, .swiper-slide {
	@apply p-4 pt-16 h-full w-full;
}
</style>