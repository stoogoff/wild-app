<template>
	<div class="flex input py-6 mb-4" :class="colour">
		<input
			ref="fileUpload"
			type="file"
			class="hidden"
			:accept="acceptString"
		/>
		<span class="inline-block mr-2">
			<icon-view :icon="icon" />
		</span>
		<span>
			Drag file or click to upload.
		</span>
	</div>
</template>

<script>

import Vue, { PropType } from 'vue'

export default Vue.component('FileDropZone', {
	props: {
		accept: {
			type: Array,
			default: ['*/*'],
		},
	},

	data() {
		return {
			dragover: false,
			fileError: false,
		}
	},

	computed: {
		icon() {
			return this.fileError ? 'upload-off' : 'upload'
		},

		acceptString() {
			return this.accept.join(',')
		},

		colour() {
			if(this.fileError) {
				return 'text-red-500'
			}

			if(this.dragover) {
				return 'text-gray-400'
			}

			return 'text-gray-600'
		},
	},

	mounted() {
		const dropzone = this.$el
		const fileUpload = this.$refs.fileUpload

		if(dropzone) {
			dropzone.addEventListener('click', () => {
				if(fileUpload) {
					fileUpload.click()
				}
			})

			dropzone.addEventListener('dragenter', e => {
				e.preventDefault()

				this.dragover = true

				let fileList = Array.from(e.dataTransfer.items || [])

				if(e.dataTransfer) {
					e.dataTransfer.dropEffect = 'copy'
				}

				fileList = this.excludeRestrictedFiles(fileList)

				if(fileList.length === 0) {
					this.fileError = true
				}
			})

			dropzone.addEventListener('dragleave', e => {
				e.preventDefault()

				this.dragover = false
				this.fileError = false
			})
			dropzone.addEventListener('dragover', e => {
				if(e && e.preventDefault) {
					e.preventDefault()
				}

				if(e.dataTransfer) {
					e.dataTransfer.dropEffect = 'copy'
				}
				this.dragover = true
			})

			dropzone.addEventListener('drop', e => {
				e.preventDefault()

				if(this.fileError) {
					this.fileError = false
					return
				}

				if(e.dataTransfer) {
					const fileList = this.excludeRestrictedFiles(
						Array.from(e.dataTransfer.files)
					)
					if(fileList.length > 0) {
						this.filesSelected(fileList)
					}
				}
			})
		}

		if(fileUpload) {
			fileUpload.addEventListener('change', (e) => {
				if(e.target.files) {
					this.filesSelected(Array.from(e.target.files))
				}
			})
		}
	},
	methods: {
		excludeRestrictedFiles(fileList) {
			return fileList.filter((file) => this.isAcceptableFileType(file))
		},

		isAcceptableFileType(file) {
			if(file.type === '' && !file.name) return true
			if(this.accept.length === 0) return true
			if(this.accept.includes('*/*')) return true

			for(let i = 0, len = this.accept.length; i < len; ++i) {
				const accept = this.accept[i]

				if(accept.endsWith('/*')) {
					const acceptSplit = accept.split('/')
					const typeSplit = file.type.split('/')

					if(acceptSplit[0] === typeSplit[0]) {
						return true
					}
				}

				if(accept.includes('/') && file.type === accept) {
					return true
				}

				if(accept.startsWith('.') && file.name !== undefined) {
					const ext = file.name.substring(file.name.lastIndexOf('.'))

					if(accept === ext) {
						return true
					}
				}
			}
			return false
		},

		filesSelected(fileList) {
			this.$emit('input', fileList)
			this.dragover = false
		},
	},
})
</script>
