
import React from 'react'
import { id } from '~/utils/string'

const FormField = ({ label, message, error, children }) => {
	const htmlFor = 'input-' + id(label)
	const colour = error ? 'red' : 'gray'

	return <div className="py-3 flex flex-col">
		<label htmlFor={ htmlFor } className={ `font-semibold text-${colour}-500 inline-block mb-1` }>{ label }</label>
		{ children }
		<aside className={ `mt-2 text-sm text-${colour}-500` }>{ message || ' ' }</aside>
	</div>
}

export default FormField
