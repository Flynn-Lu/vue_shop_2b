import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from  '../views/Login'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'login',
    component: Login

  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    // redirect:'/welcome',
    children:[
      {path:'welcome',component:Welcome},
      { path: '/users', component: Users },
    ]
  }

]
const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()

  const tokenStr= window.sessionStorage.getItem('token')
  if(!tokenStr){
    return next('/login')
  
  }
  next()
})


export default router