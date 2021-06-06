import Router from '@koa/router'
import compose from 'koa-compose'
import InfoController from '../controllers/info'
const router = new Router({
  prefix: '/info'
})

export default () => {
  router.get('/get', InfoController.get)

  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}