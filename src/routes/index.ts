import compose from 'koa-compose'
import ioRoutes from './io'
import infoRoutes from './info'

export default () => {
  return compose([
    ioRoutes(),
    infoRoutes()
  ])
}