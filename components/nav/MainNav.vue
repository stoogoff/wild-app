<template>
	<Navbar v-bind="$attrs">
		<template #title>
			<nuxt-link to="/">WILD</nuxt-link>
		</template>
		<template #buttons>
			<NavButton icon="ellipsis" @click="toggleNavbar()" />
		</template>
		<transition name="fade">
			<!-- TODO this breaks the desktop menu -->
			<div
				v-if="navbarOpen"
				class="absolute top-14 left-4 right-4 md:static md:flex flex-grow items-center bg-white md:bg-transparent md:shadow-none py-4 block rounded shadow-lg"
			>
				<ul class="flex flex-col md:flex-row md:ml-auto relative">
					<li
						:key="`menu_${g}`"
						v-for="(item, g) in menuItems"
						class="group"
					>
						<nuxt-link :to="item.href">
							<NavItem :icon="item.icon">{{ item.title }}</NavItem>
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
		</transition>
	</Navbar>
</template>
<script>
import Vue from 'vue'

export default Vue.component('MainNav', {
	props: {
		transparent: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			navbarOpen: false,
			suppressClose: false,
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
		menuItems() {
			let menuItems = [
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
				{
					title: 'Account',
					href: '/account',
					icon: 'account-circle',
				},
			]

			// add chacracters
			const characters = this.$store.state.character.characters

			menuItems[1].menuItems = characters.map(character => ({
				title: character.name || `Unnamed character (${character.id})`,
				href: `/characters/${character.id}`,
			}))

			// update account options depending on user state
			const user = this.$store.state.auth.user

			if(!user || user.isAnonymous) {
				menuItems[3].menuItems = [
					{ title: 'Login', href: '/account/login' },
					{ title: 'Register', href: '/account/register' },
				]
			}
			else {
				menuItems[3].menuItems = [
					{ title: 'Logout', href: '/account/logout'},
				]
			}

			return menuItems
		},

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