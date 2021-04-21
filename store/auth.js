
export const state = () => ({
	user: null,
})

export const mutations = {
	set(state, user) {
		console.log('auth/set', user)
		state.user = user
	},
}

export const actions = {
	onAuthStateChanged({ commit }, { authUser }) {
		if(authUser) {
			commit('set', {
				uid: authUser.uid,
				email: authUser.email,
				isAnonymous: authUser.isAnonymous,
			})
		}
	},

	async logout({ commit, dispatch, rootState }) {
		await this.$fire.auth.signOut()

		await dispatch('anonymous')
		await dispatch('character/fetch', null, { root: true })
		await dispatch('image/fetch', [], { root: true })
	},

	async anonymous({ commit }) {
		try {
			const user = await this.$fire.auth.signInAnonymously()

			commit('set', {
				uid: user.user.uid,
				isAnonymous: true,
			})
		}
		catch(error) {
			console.log(error)
		}
	},

	async register({ commit }, { email, password }) {
		const credentials = this.$fireModule.auth.EmailAuthProvider.credential(email, password)
		const newUser = await this.$fire.auth.currentUser.linkWithCredential(credentials)
		const user = this.$fire.auth.currentUser

		user.sendEmailVerification()

		commit('set', {
			uid: newUser.user.uid,
			email: newUser.user.email,
			isAnonymous: newUser.user.isAnonymous
		})
	},

	async login({ commit }, { email, password }) {
		const user = await this.$fire.auth.signInWithEmailAndPassword(email, password)

		if(user) {
			commit('set', {
				uid: user.user.uid,
				email: user.user.email,
				isAnonymous: user.user.isAnonymous
			})
		}
	},
}
