import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias:'/home/:uid',
      name: 'home',
      component: resolve => require(['@/components/home/home.vue'], resolve)
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/components/manage/manage.vue'], resolve)
    },
    {
      path: '/travel/:uid',
      name:'travel',
      component:resolve => require(['@/components/travel/travel.vue'], resolve)
    },
    {
      path: '/tripKnow/:uid',
      name:'tripKnow',
      component:resolve => require(['@/components/tripKnow/tripKnow.vue'], resolve)
    },
    {
      path: '/scenery/:uid',
      name:'scenery',
      component:resolve => require(['@/components/scenery/scenery.vue'], resolve)
    },
    {
      path: '/hotel/:uid',
      name:'hotel',
      component:resolve => require(['@/components/hotel/hotel.vue'], resolve)
    },
    {
      path: '/connect/:uid',
      name:'connect',
      component:resolve => require(['@/components/connect/connect.vue'], resolve)
    },
    {
      path: '/login',
      name:'login',
      component:resolve => require(['@/components/login/login.vue'], resolve)
    },
    {
      path: '/article/:uid',
      name:'article',
      component:resolve => require(['@/components/children/writings.vue'], resolve)
    },
  ]
})
