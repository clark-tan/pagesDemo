/*
 * @Description: 材料补充
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:12:58
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:33:01
 */

import qs from 'qs'
import { axios } from '@/utils/request'
import {
  TemporaryMaterialsList,
  SupplMaterialsList,
  GetSupplyMaterialList,
  RevokeSupplyMaterial
} from '@/api/common/urlString'

export default {
  // 暂存补充材料信息（苏州）
  TemporaryMaterialsList: parameter => {
    return axios({
      url: TemporaryMaterialsList,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 上传补充材料信息（苏州）
  SupplMaterialsList: parameter => {
    return axios({
      url: SupplMaterialsList,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 获取需要补充的材料（苏州）
  GetSupplyMaterialList: parameter => {
    return axios({
      url: GetSupplyMaterialList,
      method: 'post',
      data: qs.stringify(parameter)
    })
  },
  // 撤回已经补充的材料（苏州）
  RevokeSupplyMaterial: parameter => {
    return axios({
      url: RevokeSupplyMaterial,
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
}
