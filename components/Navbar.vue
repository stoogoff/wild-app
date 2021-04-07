<template>
	<nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
				<a class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" to="/">WILD</a>
				<button
					class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
					type="button"
					@click="toggleNavbar"
				>
				<i class="lg:text-gray-300 text-white text-lg leading-lg">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
					</svg>
					</i>
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
							<i v-if="item.icon" class="lg:text-white text-gray-500 text-lg leading-lg" v-html="item.icon"></i>
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
    			icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
    		},
    		{
    			title: 'Characters',
    			href: '/characters',
    			icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><g><path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"/></g></svg>',
    		},
    		{
    			title: 'Tarot',
    			href: '/tarot',
    			icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"/></svg>',
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

	methods: {
		toggleNavbar() {
			this.navbarOpen = !this.navbarOpen
		}
	},
})
</script>