<template>
	<nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
				<nuxt-link class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" to="/">WILD</nuxt-link>
				<button
					class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
					type="button"
					@click="toggleNavbar"
				>
					<i class="lg:text-gray-300 text-white text-lg leading-lg"><Icon icon="ellipsis" /></i>
				</button>
			</div>
			<div
				class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
				:class="navbarOpen ? 'block rounded shadow-lg' : 'hidden'"
			>
				<ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
					<li :key="`menu_${idx}`" v-for="(item, idx) in menuItems" class="flex items-center">
						<nuxt-link
							class="block w-full lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-2 lg:py-2 flex items-center text-xs uppercase font-bold"
							:to="item.href"
						>
							<i v-if="item.icon" class="lg:text-white text-gray-500 text-lg leading-lg"><Icon :icon="item.icon" /></i>
							<span class="lg:hidden block ml-2">{{ item.title }}</span>
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Navbar', {
	data() {
		return {
			navbarOpen: false,
	  	menuItems: [
    		{
    			title: 'Home',
    			href: '/',
    			icon: 'home',
    		},
    		{
    			title: 'Characters',
    			href: '/characters',
    			icon: 'characters',
    		},
    		{
    			title: 'Tarot',
    			href: '/tarot',
    			icon: 'tarot',
    			menuItems: [
						{ title: 'Passion', href: '/tarot/passion' },
						{ title: 'Strength', href: '/tarot/strength' },
						{ title: 'Control', href: '/tarot/control' },
						{ title: 'Focus', href: '/tarot/focus' },
						{ title: 'Major Arcana', href: '/tarot/major-arcana' },
  			  ]
  			},
  		]
		}
	},

	computed: {
		ellipsis() {
			return ELLIPSIS
		},
	},

	methods: {
		toggleNavbar() {
			this.navbarOpen = !this.navbarOpen
		}
	},
})
</script>