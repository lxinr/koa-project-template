interface RespondInfo {
  result?: number;
  data?: any;
  message?: string;
}

/**
 * 封装返回的数据
 *
 * @author liux
 * @date 2021-05-14
 * @export
 * @class Respond
 */
export default class Respond {
  public static info(message = '', result = 2, data = null) {
    return { message, result, data } as RespondInfo
  }

  public static suc(data: any = null, message = '请求成功') {
    return { message, result: 1, data } as RespondInfo
  }

  public static err(message = '请求失败', result = 0, data = null) {
    return { message, result, data } as RespondInfo
  }
}
