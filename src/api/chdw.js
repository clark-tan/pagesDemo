/*
 * @Description: 测绘单位
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:13:30
 */

import { axios } from '@/utils/request'
import { SurveyInstitutionsList } from '@/api/common/urlString'

export default {
  // 测绘单位（模糊查询）
  SurveyInstitutionsList: parameter => {
    return axios({
      url: SurveyInstitutionsList,
      method: 'post',
      data: parameter
    })
  }
}
