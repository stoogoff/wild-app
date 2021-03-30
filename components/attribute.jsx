
import { ATTRIBUTE_MIN, ATTRIBUTE_MAX } from '~/utils/config'
import TextInput from '~/components/input/text'

const Attribute = ({ title, children, value, onChange }) => {
	const error = isNaN(value) || value < ATTRIBUTE_MIN || value > ATTRIBUTE_MAX

	return <section>
		<h2>{ title }</h2>
		<p>{ children }</p>
		<TextInput label={ title } value={ value } onChange={ onChange } error={ error } message={ error ? `Attributes must be between ${ATTRIBUTE_MIN} and ${ATTRIBUTE_MAX}` : '' } />
	</section>
}

export default Attribute