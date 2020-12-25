/*
 * @Description: 满意度评价
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:12:42
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 15:54:20
 */

import qs from 'qs'
import { axios } from '@/utils/request'
import { QueryEntrust, GetSatisfactionItem, SubmitSatisfactionAppraise, AddEvaluate } from '@/api/common/urlString'

export default {
  // 业务进度查询
  QueryEntrust: parameter => {
    return axios({
      url: QueryEntrust,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 获取满意度调查项(苏州)
  GetSatisfactionItem: parameter => {
    return axios({
      url: GetSatisfactionItem,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 提交满意度调查（苏州）
  SubmitSatisfactionAppraise: parameter => {
    return axios({
      url: SubmitSatisfactionAppraise,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 新增评价（中山）
  AddEvaluate: parameter => {
    return axios({
      url: AddEvaluate,
      method: 'post',
      data: parameter
    })
  }
}
