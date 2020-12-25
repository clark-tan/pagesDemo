/*
 * @Description: 业务预约
 * @Version: 0.0
 * @Autor: lhy
 * @Date: 2020-12-18 09:14:40
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-18 10:15:36
 */

import { axios } from '@/utils/request'
import {
  // GetDataByTemporarily,
  GetDataByTemporarilyToCode,
  GetSurveyAndLocal,
  GetEntrustDesc,
  GetEditableContent,
  GetMeasurementItems,
  GetProvideFileList,
  SubmitEntrust,
  GetEntrustTempWeb,
  GetWindowsInfo,
  GetSurveyType,
  GetComponentConfig
} from '@/api/common/urlString'

export default {
  // 获取表单配置项
  GetComponentConfig: parameter => {
    return axios({
      url: GetComponentConfig,
      method: 'post',
      data: parameter
    })
  },
  // // 获取暂存数据 1（重庆）
  // GetDataByTemporarily: parameter => {
  //   return axios({
  //     url: GetDataByTemporarily,
  //     method: 'get',
  //     params: parameter
  //   })
  // },
  // 获取存储暂存保存数据详情（平昌、重庆）
  GetDataByTemporarilyToCode: parameter => {
    return axios({
      url: GetDataByTemporarilyToCode,
      method: 'get',
      params: parameter
    })
  },
  // 获取项目类型列表
  GetSurveyType: parameter => {
    return axios({
      url: GetSurveyType,
      method: 'get'
    })
  },
  // 获取业务委托数据
  GetSurveyAndLocal: parameter => {
    return axios({
      url: GetSurveyAndLocal,
      method: 'get'
    })
  },
  // 业务委托说明
  GetEntrustDesc: parameter => {
    return axios({
      url: GetEntrustDesc,
      method: 'post',
      data: parameter
    })
  },

  // 获取业务委托表单
  GetEditableContent: parameter => {
    return axios({
      url: GetEditableContent,
      method: 'post',
      data: parameter
    })
  },
  // 获取测量事项
  GetMeasurementItems: parameter => {
    return axios({
      url: GetMeasurementItems,
      method: 'post',
      data: parameter
    })
  },
  // 根据项目类型CODE获取收件材料
  GetProvideFileList: parameter => {
    return axios({
      url: GetProvideFileList,
      method: 'post',
      data: parameter
    })
  },
  // 业务委托提交
  SubmitEntrust: parameter => {
    return axios({
      url: SubmitEntrust,
      method: 'post',
      data: parameter,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  // 苏州-测量委托书模板下载
  GetEntrustTempWeb: parameter => {
    return axios({
      url: GetEntrustTempWeb,
      method: 'post',
      data: parameter
    })
  },
  // 根据行政区变化动态获得“现场取件地址”
  GetWindowsInfo: parameter => {
    return axios({
      url: GetWindowsInfo,
      method: 'post',
      data: parameter,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }
}
