import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '@/components/common/Root'
import Home from '@/components/home/Home'
import PersonCenter from '@/components/personcenter/PersonCenter'

import Project from '@/components/project/Project'
import Enroll  from '@/components/user/Enroll'

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
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'PersonCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          meta: {
            title: '个人中心'
          }
        }
      ],
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Project/:projectId',
      name: 'Project',
      component: Project,
      meta: {
        title: '项目详情'
      }
    },
    {
      path: '/Enroll',
      name: 'Enroll',
      component: Enroll,
      meta: {
        title: '我要参加'
      }
    }
  ]
})
