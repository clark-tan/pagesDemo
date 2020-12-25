/*
 * @Description: 其他接口
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:23:07
 */

// eslint-disable-next-line no-unused-vars
import qs from 'qs'
import { axios } from '@/utils/request'
import { getPCCAddress, GetInstitutionsProperty } from '@/api/common/urlString'

export default {
  // 省市县三级联动
  getPCCAddress: parameter => {
    return axios({
      url: getPCCAddress,
      method: 'get',
      params: parameter
    })
  },
  // 测绘单位性质
  GetInstitutionsProperty: parameter => {
    return axios({
      url: GetInstitutionsProperty,
      method: 'get',
      params: parameter
    })
  }
}
