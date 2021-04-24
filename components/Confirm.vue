<template>
	<Overlay>
		<div class="bg-white p-2 rounded">
			<div class="py-4 px-2 mb-4 border-b border-gray-300">
				<slot />
			</div>
			<div class="flex">
				<Button block type="warning" @click="$emit('click', false)">Cancel</Button>
				<Button block type="success" @click="$emit('click', true)">OK</Button>
			</div>
		</div>
	</Overlay>
</template>
