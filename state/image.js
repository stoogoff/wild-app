
import Vue from 'vue'
import { storage } from '~/plugins/firebase'
import { STORAGE_CHARACTERS } from '~/utils/config'

const state = Vue.observable({
	images: [],
})


export default {
	async byPath(path) {
		const existingImage = state.images.find(img => img.path == path)

		if(existingImage) {
			return existingImage
		}

		const root = storage().ref(STORAGE_CHARACTERS)
		const image = await root.child(path).getDownloadURL()
		const metadata = await root.child(path).getMetadata()

		const newImage = {
			path,
			url: image,
			size: metadata.size,
			type: metadata.contentType,
			lastModified: Date.parse(metadata.updated),
		}

		state.images = [ ...state.images, newImage ]

		return newImage
	},

	async save({ id, file }) {
		const name = file.name
		const ext = name.substring(name.lastIndexOf('.'))
		const root = storage().ref(STORAGE_CHARACTERS)
		const path = `${id}${ext}`
		const uploaded = root.child(path)

		await uploaded.put(file)

		return path
	},

	async delete(imagePath) {
		await storage().ref(STORAGE_CHARACTERS).child(imagePath).delete()
		state.images = state.images.filter(image => image.path !== imagePath)
	},

	async reset() {
		state.images = []
	},
}
