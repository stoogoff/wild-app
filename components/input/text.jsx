
import { id } from '~/utils/string'

const TextInput = ({ label, value, message, error, onChange }) => {
	const htmlFor = 'input-' + id(label)
	const colour = error ? 'red' : 'gray'
	const handler = (evt) => {
		if(onChange) {
			onChange(evt.target.value)
		}
	}

	return <div className="py-3 flex flex-col">
		<label htmlFor={ htmlFor } className={ `font-semibold text-${colour}-500 inline-block mb-1` }>{ label }</label>
		<input
			id={ htmlFor }
			value={ value }
			onChange={ handler }
			type="text"
			className={ `font-sans p-2 transition duration-300 border border-${colour}-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-${colour}-200 text-${colour}-500` }
		/>
		<aside className={ `mt-2 text-sm text-${colour}-500` }>{ message || ' ' }</aside>
	</div>
}

export default TextInput
