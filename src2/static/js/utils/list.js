
export const head = (arr) => arr[0]
export const tail = ([first, ...rest]) => rest

export const shuffle = array => {
	const clone = [...array]
	let current = array.length

	while(current !== 0) {
		let random = Math.floor(Math.random() * current)

		current--

		[clone[current], clone[random]] = [
			clone[random], clone[current]
		]
	}

	return clone
}