import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import NewUser from './components/NewUser'
import {auth} from './firebase'

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     currentUserId = user.uid 
//     console.log(user.uid);
//   }else{
//     currentUserId = null;
//     //desconectar
//   }
// });

const routes = [
  { path: '/', name:"principal", component: Home },
  { path: '/login', name:"login", component: Login },
  { path: '/carta', name:"menu", component: Menu },
  { path: '/reset-password', name:"reset-password", component: ResetPassword },
  { path: '/new-user', name:"new-user", component: NewUser },
  { path: '/admin', name:"admin", component: Admin, meta: { requiresAuth: true } }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

router.beforeEach((to,from,next) => {
  let currentUser = auth.currentUser
  let isLogin = to.matched.some( record => record.name=="login")
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next("login")
  }else if(currentUser && isLogin){
    next("admin")
  }else{
    next()
  }
})

Vue.use(VueFire)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
