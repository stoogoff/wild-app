
export const state = () => ({
	images: [],
})

export const mutations = {
	set(state, images) {
		state.images = images
	},

	add(state, image) {
		state.images.push(image)
	},
}

export const actions = {
	async save({ commit }, data) {
		commit('update', data)

		//const root = this.$file.storage.ref(STORAGE_IMAGES)

		//await this.$fire.storage.collection(COLLECTION_CHARACTERS).doc(data.id).set(data)
	},
}
