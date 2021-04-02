
import { ATTRIBUTE_MIN, ATTRIBUTE_STARTING_MAX } from '~/utils/config'
import TextInput from '~/components/inputs/TextInput'

const Attribute = ({ title, children, value, onChange }) => {
	const error = isNaN(value) || value < ATTRIBUTE_MIN || value > ATTRIBUTE_STARTING_MAX

	return <section>
		<h2>{ title }</h2>
		<p>{ children }</p>
		<TextInput label={ title } value={ value } onChange={ onChange } error={ error } message={ error ? `Attributes must be between ${ATTRIBUTE_MIN} and ${ATTRIBUTE_STARTING_MAX}` : '' } />
	</section>
}

export default Attribute
