/*
 * @Description: 进度查询
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 11:27:57
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:26:56
 */
import { axios } from '@/utils/request'
import {
  QueryEntrust,
  DeleteTemporarilyByCode,
  GetPauseReason,
  GetSurveyCompanyInfo,
  GetSurveyReport,
  GetPersonAppointmentDetail,
  QueryProgress
} from '@/api/common/urlString'

export default {
  // 确认进度查询
  QueryProgress: parameter => {
    return axios({
      url: QueryProgress,
      method: 'post',
      data: parameter
    })
  },
  // 业务进度查询
  QueryEntrust: parameter => {
    return axios({
      url: QueryEntrust,
      method: 'post',
      data: parameter
    })
  },
  // 获取我的预约信息详情
  GetPersonAppointmentDetail: parameter => {
    return axios({
      url: GetPersonAppointmentDetail,
      method: 'post',
      data: parameter
    })
  },
  // 根据RID删除暂存数据
  DeleteTemporarilyByCode: parameter => {
    return axios({
      url: DeleteTemporarilyByCode,
      method: 'post',
      data: parameter
    })
  },
  // 获取暂停原因（苏州）
  GetPauseReason: parameter => {
    return axios({
      url: GetPauseReason,
      method: 'post',
      data: parameter
    })
  },
  // 获取测绘单位联系信息（苏州）
  GetSurveyCompanyInfo: parameter => {
    return axios({
      url: GetSurveyCompanyInfo,
      method: 'post',
      data: parameter
    })
  },
  // 获取测量报告（苏州）
  GetSurveyReport: parameter => {
    return axios({
      url: GetSurveyReport,
      method: 'post',
      data: parameter
    })
  }
}
