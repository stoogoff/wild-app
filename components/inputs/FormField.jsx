
import React from 'react'
import { id } from '~/utils/string'

const FormField = ({ label, message, error, children }) => {
	const htmlFor = 'input-' + id(label)
	const colour = error ? 'red' : 'gray'

	return <div className="mb-3 pt-0">
		<label htmlFor={ htmlFor } className={ `font-sans font-semibold text-xs text-${colour}-500 inline-block mb-2 uppercase` }>{ label }</label>
		{ children }
		<aside className={ `mt-2 text-sm text-${colour}-500` }>{ message || ' ' }</aside>
	</div>
}

export default FormField
