
import { useRouter } from 'next/router'

const Button = ({ href, onClick, disabled, children }) => {
	const router = useRouter()

	if(href) {
		onClick = () => {
			if(disabled !== true) {
				router.push(href)
			}
		}
	}

	let classList = 'focus:outline-none font-sans uppercase px-8 py-2 rounded-md max-w-max'

	if(disabled === true) {
		classList += ' bg-gray-300 text-gray-400 cursor-default'
	}
	else {
		classList += ' bg-blue-600 text-blue-50 shadow-sm hover:shadow-lg cursor-pointer'
	}

	return <button onClick={ onClick } className={ classList }>{ children }</button>
}

export default Button
