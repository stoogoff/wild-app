<template>
	<nav-bar v-bind="$attrs">
		<template #title>
			<nuxt-link to="/">WILD</nuxt-link>
		</template>
		<template #buttons>
			<nav-button icon="ellipsis" @click="toggleNavbar()" />
		</template>
		<transition name="fade">
			<div
				v-if="navbarOpen"
				class="absolute top-14 left-4 right-4 md:hidden bg-white block rounded shadow-lg"
			>
				<menu-list :menu-items="menuItems" />
			</div>
		</transition>
		<div class="hidden md:flex flex-grow items-center bg-transparent shadow-none">
			<menu-list :menu-items="menuItems" />
		</div>
	</nav-bar>
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

			menuItems[1].menuItems.push({
				title: 'New Character',
				href: '/characters/new',
			})

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