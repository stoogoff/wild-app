<template>
	<div />
</template>
<script>
import Vue from 'vue'

export default Vue.component('Ability', {
	props: {
		value: {
			type: String,
			required: true,
		},
	},
})


/*import ButtonGroup from './buttons/ButtonGroup'
import TextInput from './inputs/TextInput'

const Ability = ({ title, value, children, options, onChange }) => {
	return <section>
		<h2>{ title }</h2>
		<p>{ children }</p>
		<TextInput label={ title } value={ value } />
		<ButtonGroup options={ options.map(opt => ({
			...opt,
			disabled: opt.text === value ? false : opt.disabled,
			type: opt.text === value ? 'success' : 'primary',
		})) } onChange={ onChange } />
	</section>
}

export default Ability*/

</script>