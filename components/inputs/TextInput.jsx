
import { id } from '~/utils/string'
import FormField from './FormField'

const TextInput = ({ label, value, message, error, disabled, onChange }) => {
	const htmlFor = 'input-' + id(label)
	const handler = (evt) => {
		if(onChange) {
			onChange(evt.target.value)
		}
	}

	const classList = ['input']

	if(disabled) {
		classList.push('disabled')
	}

	if(error) {
		classList.push('error')
	}

	return <FormField label={ label } message={ message } error={ error }>
		<input
			id={ htmlFor }
			value={ value }
			onChange={ handler }
			type="text"
			className={ classList.join(' ') }
			disabled={ disabled }
		/>
	</FormField>
}

export default TextInput
