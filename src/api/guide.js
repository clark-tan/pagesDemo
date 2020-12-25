/*
 * @Description: 办事指南
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-27 14:35:02
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-16 17:30:54
 */

import { axios } from '@/utils/request'
import { GetBusinessGuideInfo } from '@/api/common/urlString'

export default {
  // 获取办事指南信息列表DOM (第二版)
  GetBusinessGuideInfo: parameter => {
    return axios({
      url: GetBusinessGuideInfo,
      method: 'post',
      data: parameter
    })
  }
}
