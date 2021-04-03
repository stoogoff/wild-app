
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { saveCharacter } from '~/lib/character'
import LinkButton from './LinkButton'
import LoadingButton from './LoadingButton'

const Stepper = ({ character, previous, next, disabled }) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const clickHandler = async () => {
		setLoading(true)
		await saveCharacter(character)

		router.push(next)
		setLoading(false)
	}

	return <div>
		{ previous ? <LinkButton href={ previous } type="secondary">Previous</LinkButton> : null }
		<LoadingButton loading={ loading } onClick={ clickHandler } disabled={ disabled }>Next</LoadingButton>
	</div>
}

export default Stepper
