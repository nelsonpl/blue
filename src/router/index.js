import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Create from '@/components/Create'
import Delete from '@/components/Delete'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details
    },
  ]
})
