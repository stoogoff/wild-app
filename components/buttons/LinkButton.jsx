
import { useRouter } from 'next/router'

const LinkButton = ({ href, onClick, disabled, type, block, children }) => {
	const router = useRouter()

	if(href) {
		onClick = () => {
			if(disabled !== true) {
				router.push(href)
			}
		}
	}

	let classList = ['btn']

	if(block === true) {
		classList.push('block w-full')
	}

	if(disabled === true) {
		classList.push('disabled')
	}
	else {
		classList.push('enabled')

		if(type) {
			classList.push(type)
		}
		else {
			classList.push('primary')
		}
	}

	return <button onClick={ onClick } className={ classList.join(' ') }>{ children }</button>
}

export default LinkButton
