import { Context } from 'koa'
import Respond from '../utils/respond'

/**
 * IO
 *
 * @author liux
 * @export
 * @class IOController
 */
export default class IOController {
  /**
   * 获取列表
   *
   * @author liux
   * @static
   * @param {Context} ctx
   * @memberof IOController
   */
  public static async list(ctx: Context) {
    try {
      ctx.body = Respond.suc('成功')
    } catch(e) {
      console.error(e)
      ctx.body = Respond.err(e?.message)
    }
  }
  /**
   * 获取错误堆栈信息
   *
   * @author liux
   * @static
   * @param {Context} ctx
   * @returns 
   * @memberof IOController
   */
  public static async info(ctx: Context) {
    const { sid = '' } = ctx.query
    try {
      ctx.body = Respond.suc({
        sid
      })
    } catch(e) {
      console.error(e)
      ctx.body = Respond.err(e?.message)
    }
  }
}