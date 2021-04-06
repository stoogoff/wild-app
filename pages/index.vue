<template>
  <div class="container">
      <div><Button>Primary</Button></div>
      <div><Button type="secondary">Secondary</Button></div>
      <div><Button type="warning">Warning</Button></div>
      <div><Button type="success" @click="alert('test')">Success</Button></div>
      <div><Button disabled @click="alert('test')">Disabled</Button></div>
      <TextInput v-model="name" label="Test" :error="error" message="This is a form field" placeholder="Enter something" />
      <TextInput v-model="name" label="Test" disabled message="This is a form field" placeholder="Enter something" />
      {{ name }}
      <TextArea v-model="description" label="Description" />
      {{ description }}
      <ButtonGroup :options="options" v-model="group" />
      {{ group }}
  </div>
</template>

<script>
//import Button from '~/components/Button.vue'
//import Button from '~/components/Button.vue'

export default {
  //components: {
  //  Button
  //},

  data() {
    return {
      name: '',
      description: '',
      group: '',
    }
  },

  computed: {
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
    alert(s) {
      window.alert(s)
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
