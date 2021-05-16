<template>
	<div>
		<div class="my-4">
			<button-action>Default</button-action>
			<button-action type="primary">Primary</button-action>
			<button-action type="secondary">Secondary</button-action>
			<button-action type="success">Success</button-action>
			<button-action type="warning">Warning</button-action>
		</div>
		<div class="my-4">
			<button-action outlined>Default</button-action>
			<button-action outlined type="primary">Primary</button-action>
			<button-action outlined type="secondary">Secondary</button-action>
			<button-action outlined type="success">Success</button-action>
			<button-action outlined type="warning">Warning</button-action>
		</div>
		<div class="my-4">
			<icon-action icon="home" />
			<icon-action icon="home" type="primary" />
			<icon-action icon="home" type="secondary" />
			<icon-action icon="home" type="success" />
			<icon-action icon="home" type="warning" />
		</div>
		<div class="my-4">
			<icon-action icon="home" outlined />
			<icon-action icon="home" outlined type="primary" />
			<icon-action icon="home" outlined type="secondary" />
			<icon-action icon="home" outlined type="success" />
			<icon-action icon="home" outlined type="warning" />
		</div>
		<div class="my-4">
			<alert-view type="success">Success</alert-view>
			<alert-view type="primary">Primary</alert-view>
			<alert-view type="secondary">Secondary</alert-view>
			<alert-view type="warning">Warning</alert-view>
		</div>
		<div>
			<text-input v-model="test" label="Form Field" :error="test=='Hello'" :message="test=='Hello'?'Required':''" />
		</div>
		</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ComponentTemplate', {
	data() {
		return {
			test: '',
		}
	},
})
</script>