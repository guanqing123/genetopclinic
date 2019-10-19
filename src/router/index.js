import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '@/components/common/Root'
import Home from '@/components/home/Home'
import PersonCenter from '@/components/personcenter/PersonCenter'

Vue.use(VueRouter)

// 解决 NavigationDuplicated
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root,
      redirect: { name: 'Home' },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        {
          path: 'PersonCenter',
          name: 'PersonCenter',
          component: PersonCenter
        }
      ]
    }
  ]
})
