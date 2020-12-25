/*
 * @Description: 投诉与建议
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-07-10 11:02:59
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:32:52
 */
import qs from 'qs'
import { axios } from '@/utils/request'
import {
  QueryComplaint,
  QuerySuggestions,
  SubmitSuggestions,
  SubmitComplaint,
  GetSuggestionsSurveyInfo,
  SaveSuggestionsDataByTemporarily,
  SaveComplaintDataByTemporarily,
  GetComplaintSurveyInfo
} from '@/api/common/urlString'

export default {
  // 投诉查询
  QueryComplaint: parameter => {
    return axios({
      url: QueryComplaint,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 建议查询
  QuerySuggestions: parameter => {
    return axios({
      url: QuerySuggestions,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 建议详情
  GetSuggestionsSurveyInfo: parameter => {
    return axios({
      url: GetSuggestionsSurveyInfo,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 投诉详情
  GetComplaintSurveyInfo: parameter => {
    return axios({
      url: GetComplaintSurveyInfo,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 存储建议暂存保存数据
  SaveSuggestionsDataByTemporarily: parameter => {
    return axios({
      url: SaveSuggestionsDataByTemporarily,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 建议提交
  SubmitSuggestions: parameter => {
    return axios({
      url: SubmitSuggestions,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 存储投诉暂存保存数据
  SaveComplaintDataByTemporarily: parameter => {
    return axios({
      url: SaveComplaintDataByTemporarily,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 投诉提交
  SubmitComplaint: parameter => {
    return axios({
      url: SubmitComplaint,
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
}
