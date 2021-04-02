
import { useState } from 'react'
import { createCharacter } from '~/lib/character'
import {
	ABILITY_MIN,
	ABILITY_MAX,
	ABILITY_STRONG,
	ABILITY_MID,
	ABILITY_REST,
	ABILITY_WEAK,
	ABILITY_SPREAD,
} from '~/utils/config'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import ButtonGroup from '~/components/buttons/ButtonGroup'
import Ability from '~/components/Ability'

const Abilities = () => {
	const [character, updateCharacter] = useState(createCharacter())
	const toggleAbility = attr => val => {
		if(character.abilities[attr] === ABILITY_SPREAD[val]) {
			updateCharacter({ ...character, abilities: { ...character.abilities, [attr]: ABILITY_REST }})
		}
		else {
			updateCharacter({ ...character, abilities: { ...character.abilities, [attr]: ABILITY_SPREAD[val] }})
		}
	}
	const chosen = Object.values(character.abilities).filter(attr => !!attr)
	const options = Object.keys(ABILITY_SPREAD).map(value => ({ value, text: ABILITY_SPREAD[value], disabled: chosen.includes(ABILITY_SPREAD[value]) }))
	const allChosen = options.filter(opt => opt.disabled).length === 3

	console.log('character=', character)

	return <Layout title="4: Abilities">
		<p>There are five Abilities which reflect the characters talents, skills and training. These Abilities are <strong>Diplomat</strong>, <strong>Guardian</strong>, <strong>Rogue</strong>, <strong>Scholar</strong> and <strong>Visionary</strong>. Again, these are scored between { ABILITY_MIN } and { ABILITY_MAX }. You begin by deciding which Ability is your strongest ({ ABILITY_STRONG }), your weakest ({ ABILITY_WEAK }), your second strongest ({ ABILITY_MID }) and then giving the remaining two Abilities the score of { ABILITY_REST }.</p>
		<Ability
			title="Diplomat"
			value={ character.abilities.Diplomat }
			onChange={ toggleAbility('Diplomat') }
			options={ options }
		>
			The Diplomat Ability is used whenever the character is talking, negotiating, charming, empathising, or understanding someone.
		</Ability>
		<Ability
			title="Guardian"
			value={ character.abilities.Guardian }
			onChange={ toggleAbility('Guardian') }
			options={ options }
		>
			Guardian comes into play most often when the character is in a physical conflict - shooting, defending, protecting, and fighting.
		</Ability>
		<Ability
			title="Rogue"
			value={ character.abilities.Rogue }
			onChange={ toggleAbility('Rogue') }
			options={ options }
		>
			Whenever your character is doing something remotely sneaky or underhanded, then Rogue is used.
		</Ability>
		<Ability
			title="Scholar"
			value={ character.abilities.Scholar }
			onChange={ toggleAbility('Scholar') }
			options={ options }
		>
			The Scholar Ability is used whenever you are doing something that involves information.
		</Ability>
		<Ability
			title="Visionary"
			value={ character.abilities.Visionary }
			onChange={ toggleAbility('Visionary') }
			options={ options }
		>
			Visionary is a highly creative Ability used whenever your character is making, crafting, planning or creating something. 
		</Ability>
		<LinkButton href='/characters/new/aspects' disabled={ !allChosen }>Next</LinkButton>
	</Layout>
}

export default Abilities
