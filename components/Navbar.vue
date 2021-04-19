<template>
	<nav :class="`top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-1 ${background}`">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div class="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
				<nuxt-link class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" to="/">WILD</nuxt-link>
				<button
					class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
					type="button"
					@click="toggleNavbar()"
				>
					<i class="md:text-gray-300 text-white text-lg leading-lg"><Icon icon="ellipsis" /></i>
				</button>
			</div>
			<div
				class="absolute top-14 left-4 right-4 md:static md:flex flex-grow items-center bg-white md:bg-transparent md:shadow-none py-4"
				:class="navbarOpen ? 'block rounded shadow-lg' : 'hidden'"
			>
				<ul class="flex flex-col md:flex-row md:ml-auto relative">
					<li
						:key="`menu_${g}`"
						v-for="(item, g) in menuItems"
						class="group"
					>
						<nuxt-link
							class="block w-full md:text-white md:hover:text-gray-300 text-gray-800 px-4 py-3 md:py-2 flex items-center text-xs uppercase font-bold"
							:to="item.href"
						>
							<i v-if="item.icon" class="md:text-white text-gray-500 text-lg leading-lg"><Icon :icon="item.icon" /></i>
							<span class="block ml-2">{{ item.title }}</span>
						</nuxt-link>

							<ul
								v-if="item.menuItems"
								class="bg-white md:absolute group-hover:block md:hidden md:rounded md:shadow-lg md:py-2 md:w-40"
							>
								<li
									v-for="(subitem, h) in item.menuItems"
									:key="`menu_${g}_subitem_${h}`"
								>
									<nuxt-link class="block pl-12 p-1 md:px-3 min-w-full md:hover:text-gray-800 md:hover:bg-gray-200" :to="subitem.href">{{ subitem.title }}</nuxt-link>
								</li>
							</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Navbar', {
	props: {
		transparent: {
			type: Boolean,
			default: false,
		}
	},

	async fetch() {
		const characters = await this.$store.dispatch('character/fetch')

		this.menuItems[1].menuItems = characters.map(character => ({
			title: character.name || `Unnamed character (${character.id})`,
			href: `/characters/${character.id}`,
		}))
	},
	fetchOnServer: false,

	data() {
		return {
			navbarOpen: false,
			suppressClose: false,
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
						{ title: 'Control', href: '/tarot/control' },
						{ title: 'Passion', href: '/tarot/passion' },
						{ title: 'Focus', href: '/tarot/focus' },
						{ title: 'Strength', href: '/tarot/strength' },
						{ title: 'Major Arcana', href: '/tarot/major-arcana' },
  			  ]
  			},
  		]
		}
	},

	mounted() {
		document.addEventListener('click', () => {
			Vue.nextTick(() => {
				if(!this.suppressClose) {
					this.navbarOpen = false
				}

				this.suppressClose = false
			})
		})
	},

	computed: {
		background() {
			return this.transparent ? 'bg-transparent' : 'bg-gray-600'
		},
	},

	methods: {
		toggleNavbar() {
			this.navbarOpen = !this.navbarOpen

			if(this.navbarOpen !== false) {
				this.suppressClose = true
			}
		},
	},
})
</script>