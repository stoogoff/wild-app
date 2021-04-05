<template>
  <div class="container">
      <div><Button>Primary</Button></div>
      <div><Button type="secondary">Secondary</Button></div>
      <div><Button type="warning">Warning</Button></div>
      <div><Button type="success" @click="alert('test')">Success</Button></div>
      <div><Button disabled @click="alert('test')">Disabled</Button></div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  components: {
    Button
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
