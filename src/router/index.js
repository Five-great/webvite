import Vue from 'vue'
import Router from 'vue-router'
// const Zt = require('../../'+process.env.PROJECT_NAME+'/components/Zt.vue').default
Vue.use(Router)
// console.log(process.env.BASE_URL)


export default new Router({
  mode: 'history',
  base:  process.env.BASE_URL||'',
  fullPath:'',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/webPages/Index')
    }, {
      path: '/list.html',
      name: 'List',
      component: () => import('@/webPages/List'),
      props: (route) => ({query: route.query})
    }, {
      path: '/search.html',
      name: 'Search',
      component: () => import('@/webPages/Search'),
      props: (route) => ({query: route.query})
    },
     {
      path: '/zt.html',
      name: 'Zt',
      component: () => import('@/webPages/Zt'),
      props: (route) => ({query: route.query})
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})