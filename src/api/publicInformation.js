/*
 * @Description: 信息公开
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-06-24 10:45:15
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-18 09:15:46
 */

import { axios } from '@/utils/request'
import { GetInfoList } from '@/api/common/urlString'

export default {
  // 获取信息公开列表
  GetInfoList: parameter => {
    return axios({
      url: GetInfoList,
      method: 'get',
      params: parameter
    })
  }
}
