/*
import { Vue } from 'vue'

let state2 = Vue.component('CounterState', {
	data: {
		counter: 0
	}
})

console.log(state)
*/


/*export const state = () => ({
	counter: 0
})

export const mutations = {
	increment(state) {
		state.counter++
	}
}*/

import Vue from 'vue'

let state = Vue.observable({
	counter: 0
})



export const getCounter = () => state.counter

export const increment = () => ++state.counter

export const decrement = () => --state.counter