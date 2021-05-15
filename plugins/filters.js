
import Vue from 'vue'

Vue.filter('date', val => (new Date(Date.parse(val))).toLocaleDateString())

