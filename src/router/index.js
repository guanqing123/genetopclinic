import Vue from 'vue'
import VueRouter from 'vue-router'

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
      component: () => import('../components/common/Root'),
      redirect: { name: 'Home' },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('../components/home/Home'),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'PersonCenter',
          name: 'PersonCenter',
          component: () => import('../components/personcenter/PersonCenter'),
          redirect: { name: 'Wait' },
          children: [
            {
              path: 'Wait',
              name: 'Wait',
              component: () => import('../components/personcenter/Wait'),
              meta: {
                title: '个人中心'
              }
            },
            {
              path: 'Pass',
              name: 'Pass',
              component: () => import('../components/personcenter/Pass')
            },
            {
              path: 'Refuse',
              name: 'Refuse',
              component: () => import('../components/personcenter/Refuse')
            }
          ],
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
      component: () => import('../components/project/Project'),
      meta: {
        title: '项目详情'
      }
    },
    {
      path: '/Enroll/:projectId',
      name: 'Enroll',
      component: () => import('../components/user/Enroll'),
      meta: {
        title: '我要参加'
      }
    },
    {
      path: '/Explore/:enrollid',
      name: 'Explore',
      component: () => import('../components/personcenter/Explore'),
      meta: {
        title: '报名详情'
      }
    },
    {
      path: '/EnrollEdit/:enrollid',
      name: 'EnrollEdit',
      component: () => import('../components/personcenter/EnrollEdit'),
      meta: {
        title: '修改报名'
      }
    }
  ]
})
