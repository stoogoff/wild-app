
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
	async onAuthStateChanged({ commit }, { user, claims }) {
		console.log('onAuthStateChanged')
		console.log('user=', user)
		console.log('claims=', claims)
		console.log('I don\'t think this is helping...')

		/*if(user) {
			const { uid, email, emailVerified } = user
    
			commit('set', { uid, email, emailVerified, isAnonymous: false })
		}*/
	},

	async logout({ commit }) {
		console.log('logout')
		await this.$fire.auth.signOut()
		commit('set', null)
	},

	async anonymous({ commit }) {
		console.log('anonymous')
		try {
			const user = await this.$fire.auth.signInAnonymously()

			console.log('anonymous user=', user)
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

		console.log('newUser=', newUser)

		//await this.$fire.auth.createUserWithEmailAndPassword(email, password)

		const user = this.$fire.auth.currentUser

		console.log('currentUser=', user)

		user.sendEmailVerification()

		commit('set', {
			uid: newUser.user.uid,
			email: newUser.user.email,
			isAnonymous: false
		})
	},

	async login({ commit }, { email, password }) {
		const user = await this.$fire.auth.signInWithEmailAndPassword(email, password)

		console.log(user)

		if(user) {
			commit('set', {
			uid: user.user.uid,
			email: user.user.email,
			isAnonymous: false
		})
		}
	},
}
