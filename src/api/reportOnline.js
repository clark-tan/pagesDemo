/*
 * @Description: 在线看报告
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:12:18
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:32:16
 */

import qs from 'qs'
import { axios } from '@/utils/request'
import {
  QueryEntrust,
  GetPauseReason,
  GetSurveyCompanyInfo,
  GetSurveyReport
} from '@/api/common/urlString'

export default {
  // 业务进度查询
  QueryEntrust: parameter => {
    return axios({
      url: QueryEntrust,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 获取暂停原因（苏州）
  GetPauseReason: parameter => {
    return axios({
      url: GetPauseReason,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 获取测绘单位联系信息（苏州）
  GetSurveyCompanyInfo: parameter => {
    return axios({
      url: GetSurveyCompanyInfo,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 获取测量报告（苏州）
  GetSurveyReport: parameter => {
    return axios({
      url: GetSurveyReport,
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
}
