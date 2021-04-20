<template>
	<main class="p-2">
    <FileDropZone @input="test" :accept="['image/*']" />
		<TextInput v-model="name" label="Test" :error="error" message="This is a form field" placeholder="Enter something" />
		<TextInput v-model="name" label="Test 2" disabled message="This is a form field" placeholder="Enter something" />
		{{ name }}
		<TextArea v-model="description" label="Description" />
		{{ description }}


		<!--div><Button @click="stateTest">Primary</Button></div>
		{{ counter }}
		<div><Button type="secondary">Secondary</Button></div>
		<div><Button type="warning">Warning</Button></div>
		<div><Button type="success" @click="alert('test')">Success</Button></div>
		<div><Button disabled @click="alert('test')">Disabled</Button></div>
		<ButtonGroup :options="options" v-model="group" />
		{{ group }}
		<IconButton type="primary" icon="pencil" />
		<IconButton type="secondary" icon="pencil" />
		<IconButton type="warning" icon="pencil" />
		<IconButton type="success" icon="pencil" />
		<IconButton type="success" disabled icon="pencil" / -->
	</main>
</template>

<script>
//import Button from '~/components/Button.vue'
//import Button from '~/components/Button.vue'

export default {
  layout: 'image',

  data() {
    return {
      name: '',
      description: '',
      group: '',
    }
  },

  computed: {
    counter() {
      return this.$store.state.counter.counter
    },

    error() {
      return this.name === 'Hello'
    },
    options() {
      const ABILITY_SPREAD = {
      	'ABILITY_STRONG': 4,
      	'ABILITY_MID': 3,
      	'ABILITY_WEAK': 1,
      }

      return Object.keys(ABILITY_SPREAD).map(
      	value => ({ value, text: ABILITY_SPREAD[value] }))
    },
  },

  methods: {
    stateTest() {
      console.log('stateTest')
      this.$store.commit('counter/increment')
    },

    alert(s) {
      window.alert(s)
    },

    test(files) {
      console.log(files)
    }
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
