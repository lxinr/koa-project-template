import { Context } from 'koa'
import Respond from '../utils/respond'

/**
 * IO
 *
 * @author liux
 * @export
 * @class IOController
 */
export default class InfoController {
  /**
   * 获取列表
   *
   * @author liux
   * @static
   * @param {Context} ctx
   * @memberof InfoController
   */
  public static async get(ctx: Context) {
    try {
      ctx.body = Respond.suc('获取info')
    } catch(e) {
      console.error(e)
      ctx.body = Respond.err(e?.message)
    }
  }
}