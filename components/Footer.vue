<template>
	<footer class="relative bg-gray-300 pt-8 pb-6">
		<div
			class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
			style="height: 80px;"
		>
			<svg
				class="absolute bottom-0 overflow-hidden"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				version="1.1"
				viewBox="0 0 2560 100"
				x="0"
				y="0"
			>
				<polygon
					class="text-gray-300 fill-current"
					points="2560 0 2560 100 0 100"
				></polygon>
			</svg>
		</div>
		<div class="container mx-auto px-4">
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
					<div class="mt-6">
						<a
							:key="`elsewhere_${idx}`"
							v-for="(item, idx) in elsewhere"
							class="bg-white text-blue-600 shadow-lg rounded-full outline-none focus:outline-none mr-2 p-3 inline-block"
							:href="item.href"
							target="_blank"
						>
							<Icon :icon="item.icon" />
						</a>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="flex flex-wrap items-top mb-6">
						<div class="w-full lg:w-4/12 px-4 ml-auto" v-if="useful">
							<h5 class="block uppercase text-gray-600 text-sm font-semibold mb-2">Useful Links</h5>
							<ul>
								<li
									:key="`useful_${idx}`"
									v-for="(item, idx) in useful"
								>
									<nuxt-link
										class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
										:to="item.href"
										>
											{{ item.title }}
									</nuxt-link>
								</li>
							</ul>
						</div>

					</div>
				</div>
			</div>
			<hr class="my-6 border-gray-400" />
			<div
				class="flex flex-wrap items-center md:justify-between justify-center"
			>
				<div class="w-full md:w-4/12 px-4 mx-auto text-center">
					<div class="text-sm text-gray-600 font-semibold py-1">
						Copyright © 2021 WILD App by
						<a
							href="https://we-evolve.co.uk/"
							class="text-gray-600 hover:text-gray-900"
							>we-evolve</a
						>.
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
<script>

export default {
	data() {
		return {
			elsewhere: [
				{ icon: 'twitter', href: 'https://twitter.com/autocratik' },
				{ icon: 'facebook', href: 'https://www.facebook.com/WILDRPG/' },
				{ icon: 'web', href: 'https://www.autocratik.com/' },
			],
			useful: [
				{ title: 'About Us', href: '/about-us' },
				{ title: 'Characters', href: '/characters' },
				{ title: 'Tarot', href: '/tarot' },
			],
		}
	},
}

</script>
