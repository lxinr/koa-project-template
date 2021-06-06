import Router from '@koa/router'
import compose from 'koa-compose'
import IOController from '../controllers/io'
const router = new Router({
  prefix: '/io'
})

export default () => {
  router.get('/list', IOController.list)
  router.get('/info', IOController.info)

  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}