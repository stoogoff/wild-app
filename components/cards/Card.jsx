
import { useState } from 'react'
import head from 'lodash/head'
import tail from 'lodash/tail'
import Image from 'next/image'

const Card = ({ title, meanings, reversed, image }) => {
	const [ flipped, setFlipped ] = useState(false)

	return <div className={ (flipped ? 'flipped' : '') + ' card-display' } onClick={ () => setFlipped(!flipped) }>
		<h2 className="text-center">{ title }</h2>
		<div>
			<img className="card-front" src={ `/img/cards/${image}` } />
			<aside className="card-back">
				<div>
					<div><strong>Key Meaning:</strong> { head(meanings) }</div>
					<div><strong>Other Meanings:</strong> { tail(meanings).join(', ') }</div>
				</div>
				<div>
					<div><strong>Key Reversed Meaning:</strong> { head(reversed) }</div>
					<div><strong>Other Reversed Meanings:</strong> { tail(reversed).join(', ') }</div>
				</div>
			</aside>
		</div>
	</div>
}

export default Card

/*
{
	"_original": "Ace of Coins",
	"title": "Controlled Visionary",
	"suit": "Control",
	"meanings": ["Pleasure", "Bliss", "Prosperity", "Perfection"],
	"reversed": ["Corruption", "Wasted Money", "Arguments", "Dissatisfaction"],
	"image": "control/01-ace-of-coins.jpg"
},
*/