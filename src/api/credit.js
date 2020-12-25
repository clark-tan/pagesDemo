/*
 * @Description: 信用公示
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:14:40
 */

import { axios } from '@/utils/request'
import { getUnitCreditListLike } from '@/api/common/urlString'

export default {
  getUnitCreditListLike: parameter => {
    return axios({
      url: getUnitCreditListLike,
      method: 'post',
      data: parameter
    })
  }
}
