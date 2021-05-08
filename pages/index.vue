<template>
	<main class="p-2">
    <alert-view type="primary">Primary alert</alert-view>
    <alert-view type="secondary">Secondary alert</alert-view>
    <alert-view type="warning">Warning alert</alert-view>
    <alert-view type="success">Success alert</alert-view>

    <menu-button type="primary" outlined :items="menuItems" @click="testMenu">Default</menu-button>
    <div>
      <button-action>Default</button-action>
      <button-action type="primary" @click="stateTest">Primary</button-action>
      <button-action type="secondary">Secondary</button-action>
      <button-action type="warning">Warning</button-action>
      <button-action type="success" @click="alert('test')">Success</button-action>
      <button-action type="primary" disabled @click="alert('test')">Disabled</button-action>
    </div>
    <div>
      <button-action outlined>Default</button-action>
      <button-action outlined type="primary">Primary</button-action>
      <button-action outlined type="secondary">Secondary</button-action>
      <button-action outlined type="warning">Warning</button-action>
      <button-action outlined type="success" @click="alert('test')">Success</button-action>
      <button-action outlined disabled @click="alert('test')">Disabled</button-action>
    </div>

    <!--FileDropZone @input="test" :accept="['image/*']" / -->
		<text-input v-model="name" label="Test" :error="error" message="This is a form field" placeholder="Enter something" />
		<text-input v-model="name" label="Test 2" disabled message="This is a form field" placeholder="Enter something" />
		{{ name }}
		<text-area v-model="description" label="Description" />
		{{ description }}
		{{ group }}
    <div>
      <icon-action type="primary" icon="pencil" />
      <icon-action type="secondary" icon="pencil" />
      <icon-action type="warning" icon="pencil" />
      <icon-action type="success" icon="pencil" />
      <icon-action type="success" disabled icon="pencil" />
    </div>
    <div>
      <icon-action type="primary" outlined icon="pencil" />
      <icon-action type="secondary" outlined icon="pencil" />
      <icon-action type="warning" outlined icon="pencil" />
      <icon-action type="success" outlined icon="pencil" />
      <icon-action type="success" outlined disabled icon="pencil" />
    </div>

    
    <!-- Confirm @click="confirmTest" v-if="active">This is some text</Confirm-->
    
	</main>
</template>

<script>


export default {
  layout: 'image',

  /*fetch() {
    this.counter = getCounter()
  },*/

  data() {
    return {
      name: '',
      description: '',
      group: '',
      active: true,
      //counter: 0,
    }
  },

  computed: {
    menuItems() {
      return [
        { text: 'Menu 1', key: 'menu_1' },
        { text: 'Menu 2', key: 'menu_2' },
        { text: 'Menu 3', key: 'menu_3' },
      ]
    },

    /*counter() {
      //return this.$store.state.counter.counter
      return getCounter()
    },*/

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
    testMenu(item) {
      console.log('menu clicked=', item)
    },

    stateTest() {
      console.log('stateTest')
      //this.$store.commit('counter/increment')
      this.counter = increment()
    },

    alert(s) {
      window.alert(s)
    },

    test(files) {
      console.log(files)
    },
    confirmTest(result) {
      console.log('confirm=', result)
      this.active=false
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
