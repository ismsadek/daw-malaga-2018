import Vue from 'vue'
import App from './App.vue'
import graphql from './graphql';

new Vue({
  el: '#app',
  graphql,
  render: h => h(App)
})