/*
 * @Description: 政策法规
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:53:45
 */

import { axios } from '@/utils/request'
import { PoliciesAndRegulationsList } from '@/api/common/urlString'

export default {
  // 政策法规（模糊查询）
  PoliciesAndRegulationsList: parameter => {
    return axios({
      url: PoliciesAndRegulationsList,
      method: 'post',
      data: parameter
    })
  }
}
