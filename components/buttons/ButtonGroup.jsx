
import LinkButton from '~/components/buttons/LinkButton'

const ButtonGroup = ({ options, onChange }) => <div className="btn-group">
		{ options.map(opt => <LinkButton key={ opt.value } onClick={ () => onChange(opt.value) } { ...opt }>{ opt.text || opt.value }</LinkButton> )}
	</div>

export default ButtonGroup