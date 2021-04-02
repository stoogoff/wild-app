
import LinkButton from '../buttons/LinkButton'
import Card from './Card'

const CardGrid = ({ cards, selected, toggleSelected }) =>	<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
		{ cards.map(card => <div key={ card.id }>
				<Card { ...card } />
				<LinkButton
					block
					onClick={ () => toggleSelected(card) }
					type={ selected && selected.id === card.id ? 'success' : 'secondary' }
				>Use Card</LinkButton>
			</div>
		) }
	</div>

export default CardGrid