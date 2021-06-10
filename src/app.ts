import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import config from '../config'

import router from './routes'
import { logger } from './middlewares/logger'
import chalk from 'chalk'

(async () => {
  // 初始化 Koa 应用实例
  const app = new Koa()
  // 注册中间件
  app.use(logger())
  app.use(cors())
  app.use(bodyParser())
  app.use(router())

  await new Promise((resolve: any) => app.listen({ port: config.PORT }, resolve))
  // console.info(`🚀 Server ready at http://localhost:${config.PORT}`)
  console.log(chalk.blueBright('🚀 Server ready at'), chalk.greenBright(` http://localhost:${config.PORT}`))
})()
