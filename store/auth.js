
export const state = () => ({
	user: null,
})

export const mutations = {
	set(state, user) {
		state.user = user
	},
}

export const actions = {
	async logout({ commit }) {
		await this.$fire.auth.signout()
		commit('set', null)
	},

	async register({ commit }, { email, password }) {
		await this.$fire.auth.createUserWithEmailAndPassword(email, password)

		const user = this.$fire.auth.currentUser

		await user.sendEmailVerification()

		commit('set', user.user)
	},

	async login({ commit }, { email, password }) {
		const user = await this.$fire.auth.signInWithEmailAndPassword(email, password)

		commit('set', user)
	},
}
