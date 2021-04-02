
import { id } from '~/utils/string'
import FormField from '~/components/inputs/FormField'

const TextArea = ({ label, value, message, error, onChange }) => {
	const htmlFor = 'input-' + id(label)
	const handler = (evt) => {
		if(onChange) {
			onChange(evt.target.value)
		}
	}

	const classList = ['input']

	if(error) {
		classList.push('error')
	}

	return <FormField label={ label } message={ message } error={ error }>
		<textarea
			id={ htmlFor }
			value={ value }
			onChange={ handler }
			type="text"
			className={ classList.join(' ') }
		/>
	</FormField>
}

export default TextArea
