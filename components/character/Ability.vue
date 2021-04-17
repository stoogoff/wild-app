<template>
	<section>
			<h2>{{ title }}</h2>
			<slot></slot>
			<TextInput
				:label="title"
				v-model="editing"
			/>
			<ButtonGroup
				v-model="editing"
				:options="options.map(opt => ({
					...opt,
					disabled: opt.text === value ? false : opt.disabled,
					type: opt.text === value ? 'success' : 'primary',
				}))"
			/>
		</section>
</template>
<script>
import Vue from 'vue'

export default Vue.component('Ability', {
	props: {
		title: {
			type: String,
			required: true,
		},

		value: {
			type: [String, Number],
			required: true,
		},

		options: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			editing: this.value,
		}
	},

	watch: {
		value(newValue) {
			this.editing = newValue
		},

		editing(newValue) {
			this.$emit('input', newValue)
		},
	},
})

/*
import ButtonGroup from './buttons/ButtonGroup'
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