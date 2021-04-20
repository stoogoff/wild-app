
import { STORAGE_CHARACTERS } from '~/utils/config'

export const state = () => ({
	images: [],
})

export const getters = {
	byPath: (state) => path => {
		return state.images.find(image => image.path === path)
	},
}

export const mutations = {
	set(state, images) {
		state.images = images
	},

	add(state, image) {
		state.images.push(image)
	},

	delete(state, path) {
		state.images = state.images.filter(image => image.path !== path)
	}
}

export const actions = {
	// data: { id: characterId, file: fileUpload }
	async save({ commit }, data) {
		const name = data.file.name
		const ext = name.substring(name.lastIndexOf('.'))
		const root = this.$fire.storage.ref(STORAGE_CHARACTERS)
		const path = `${data.id}${ext}`
		const uploaded = root.child(path)

		await uploaded.put(data.file)

		const url = await uploaded.getDownloadURL()
		const metadata = await uploaded.getMetadata()

		commit('add', {
			path,
			url,
			size: metadata.size,
			type: metadata.contentType,
			lastModified: Date.parse(metadata.updated),
		})

		return path
	},

	// data: imagePath
	async delete({ commit }, data) {
		await this.$fire.storage.ref(STORAGE_CHARACTERS).child(data).delete()

		commit('delete', data)
	},

	// data: images[]
	async fetch({ commit }, data) {
		const root = this.$fire.storage.ref(STORAGE_CHARACTERS)
		const images = await Promise.all(data.map(path => root.child(path).getDownloadURL()))
		const metadatas = await Promise.all(data.map(path => root.child(path).getMetadata()))

		data.forEach((path, idx) => commit('add', {
			path,
			url: images[idx],
			size: metadatas[idx].size,
			type: metadatas[idx].contentType,
			lastModified: Date.parse(metadatas[idx].updated),
		}))
	}
}
