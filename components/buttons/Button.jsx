
import { useRouter } from 'next/router'

const Button = ({ href, onClick, disabled, type, block, children }) => {
	const router = useRouter()

	const handler = () => {
		if(disabled === true) {
			return
		}

		if(onClick) {
			onClick()
		}

		if(href) {
			router.push(href)
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

	return <button onClick={ handler } className={ classList.join(' ') }>{ children }</button>
}

export default Button
