import VueRouter from 'vue-router'
import routes from './routes'

// 解决 NavigationDuplicated
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default () =>{
  return new VueRouter({
    routes
  })
}
