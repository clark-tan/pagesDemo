/*
 * @Description: 预约进场
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:12:29
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 17:51:46
 */

import qs from 'qs'
import { axios } from '@/utils/request'
import { QueryAppointmentApproach, SaveAppointmentApproach, RevokeAppointmentApproach } from '@/api/common/urlString'

export default {
  // 预约进场查询
  QueryAppointmentApproach: parameter => {
    return axios({
      url: QueryAppointmentApproach,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 提交预约进场数据
  SaveAppointmentApproach: parameter => {
    return axios({
      url: SaveAppointmentApproach,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 撤回预约进场时间数据
  RevokeAppointmentApproach: parameter => {
    return axios({
      url: RevokeAppointmentApproach,
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
}
