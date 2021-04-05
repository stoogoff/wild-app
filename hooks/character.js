
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCharacter, saveCharacter } from '~/lib/character'
import { DEFAULT_CHARACTER } from '~/utils/config'

export const useGetCharacterById = (setLoading) => {
	const router = useRouter()
	const [character, updateCharacter] = useState(DEFAULT_CHARACTER)

	useEffect(async () => {
		setLoading(true)
		console.log(`Loading character for ID: ${router.query.id}`)
		const result = await getCharacter(router.query.id)

		console.log(result)

		updateCharacter(result)
		setLoading(false)
	}, [])

	return [character, updateCharacter]
}

export const useGetCharacters = () => {
	const [characters, setCharacters] = useState([])

	useEffect(async () => {
		const result = await allCharacters()

		setCharacters(result)
	}, [])

	return [characters, setCharacters]
}