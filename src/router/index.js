import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home.vue'
import travel from '@/components/travel/travel.vue'
import tripKnow from '@/components/tripKnow/tripKnow.vue'
import scenery from '@/components/scenery/scenery.vue'
import hotel from '@/components/hotel/hotel.vue'
import connect from '@/components/connect/connect.vue'
import login from '@/components/login/login.vue'
import manage from '@/components/manage/manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/travel/:uid',
      name:'travel',
      component:travel,
    },
    {
      path: '/tripKnow/:uid',
      name:'tripKnow',
      component:tripKnow,
    },
    {
      path: '/scenery/:uid',
      name:'scenery',
      component:scenery,
    },
    {
      path: '/hotel',
      name:'hotel',
      component:hotel,
    },
    {
      path: '/connect/:uid',
      name:'connect',
      component:connect,
    },
    {
      path: '/login',
      name:'login',
      component:login,
    },
  ]
})
