<template>
	<main class="p-2">
    <Alert type="primary">Primary alert</Alert>
    <Alert type="secondary">Secondary alert</Alert>
    <Alert type="warning">Warning alert</Alert>
    <Alert type="success">Success alert</Alert>

    <MenuButton type="primary" outlined :items="menuItems" @click="testMenu">Default</MenuButton>
    <!--div>
      <Button>Default</Button>
      <Button type="primary" @click="stateTest">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="warning">Warning</Button>
      <Button type="success" @click="alert('test')">Success</Button>
      <Button disabled @click="alert('test')">Disabled</Button>
    </div>
    <div>
      <Button outlined>Default</Button>
      <Button outlined type="primary">Primary</Button>
      <Button outlined type="secondary">Secondary</Button>
      <Button outlined type="warning">Warning</Button>
      <Button outlined type="success" @click="alert('test')">Success</Button>
      <Button outlined disabled @click="alert('test')">Disabled</Button>
    </div-->

    <!--FileDropZone @input="test" :accept="['image/*']" / -->
		<TextInput v-model="name" label="Test" :error="error" message="This is a form field" placeholder="Enter something" />
		<TextInput v-model="name" label="Test 2" disabled message="This is a form field" placeholder="Enter something" />
		{{ name }}
		<TextArea v-model="description" label="Description" />
		{{ description }}
		{{ group }}
    <div>
      <IconButton type="primary" icon="pencil" />
      <IconButton type="secondary" icon="pencil" />
      <IconButton type="warning" icon="pencil" />
      <IconButton type="success" icon="pencil" />
      <IconButton type="success" disabled icon="pencil" />
    </div>
    <div>
      <IconButton type="primary" outlined icon="pencil" />
      <IconButton type="secondary" outlined icon="pencil" />
      <IconButton type="warning" outlined icon="pencil" />
      <IconButton type="success" outlined icon="pencil" />
      <IconButton type="success" outlined disabled icon="pencil" />
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
