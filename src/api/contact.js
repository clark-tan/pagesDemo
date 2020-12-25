/*
 * @Description: 联系我们
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-17 14:09:41
 */

import { axios } from '@/utils/request'
import { GetContactUsInfo } from '@/api/common/urlString'

export default {
  // 联系我们
  GetContactUsInfo: parameter => {
    return axios({
      url: GetContactUsInfo,
      method: 'get',
      params: parameter
    })
  }
}
