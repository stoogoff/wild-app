<template>
	<main>
		<section class="flex">
			<article class="md:w-8/12">
				<markdown-content content="home" />
			</article>
			<aside class="hidden md:block w-3/12">
				<loading-spinner v-if="$fetchState.pending" />
				<div v-else>
					<card-single :card="card">
						<div class="-mr-4"><icon-action outlined type="primary" icon="refresh" @click="$fetch" /></div>
					</card-single>
				</div>
			</aside>
		</section>
	</main>
</template>
<script>

import { deck } from'~/state'

export default {
	layout: 'image',

	fetch() {
		this.card = deck.drawOne()
	},

	data() {
		return {
			card: null,
			test: '',
		}
	},
}
</script>
