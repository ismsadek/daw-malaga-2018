import Vue from 'vue'
import graphql from './graphql'
import App from './App.vue'

new Vue({
  el: '#app',
  graphql,
  render: h => h(App)
})
