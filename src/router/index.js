import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '@/components/common/Root'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    }
  ]
})
