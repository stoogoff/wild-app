<template>
	<main
		class="p-0 w-screen h-screen break-words bg-white"
	>
		<Loading v-if="$fetchState.pending" />
		<swiper v-else>
			<swiper-slide>
				<article>
					<MarkdownContent :content="contentPath" />
				</article>
			</swiper-slide>
			<swiper-slide :key="card.id" v-for="card in cards">
				<Card :card="card" />
			</swiper-slide>
		</swiper>
	</main>
</template>
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
//import 'swiper/css/swiper.css'


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
		const { params } = this.$nuxt.context

		this.cards = await this.$store.getters['deck/getSuit'](params.suit)
	},
	fetchOnServer: false,

	data() {
		return {
			cards: [],
		}
	},

	computed: {
		contentPath() {
			const { params } = this.$nuxt.context

			return `tarot/${params.suit}`
		},
	},
}
</script>
<style scoped>
.swiper-wrapper, .swiper-slide {
	@apply pt-16 h-full w-full;
}
</style>