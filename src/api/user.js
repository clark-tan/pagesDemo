/*
 * @Description:
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-06-16 16:12:03
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 15:57:12
 */
import { axios } from '@/utils/request'
import {
  changeMailBox,
  SendVerification,
  changePasswordEx,
  updateProUser,
  transferAccountInfo,
  LookupDict,
  CheckRegisterInfo,
  Register,
  RetrievePassword,
  GetByValidate
} from '@/api/common/urlString'

export default {
  Register: parameter => {
    return axios({
      url: Register,
      method: 'post',
      data: parameter
    })
  },
  changeMailBox: parameter => {
    return axios({
      url: changeMailBox,
      method: 'get',
      params: parameter
    })
  },
  SendVerification: parameter => {
    return axios({
      url: SendVerification,
      method: 'get',
      params: parameter
    })
  },
  changePasswordEx: parameter => {
    return axios({
      url: changePasswordEx,
      method: 'get',
      params: parameter
    })
  },
  RetrievePassword: parameter => {
    return axios({
      url: RetrievePassword,
      method: 'post',
      data: parameter
    })
  },
  updateProUser: parameter => {
    return axios({
      url: updateProUser,
      method: 'get',
      params: parameter
    })
  },
  transferAccountInfo: parameter => {
    return axios({
      url: transferAccountInfo,
      method: 'get',
      params: parameter
    })
  },
  LookupDict: parameter => {
    return axios({
      url: LookupDict,
      method: 'get',
      params: parameter
    })
  },
  CheckRegisterInfo: parameter => {
    return axios({
      url: CheckRegisterInfo,
      method: 'post',
      data: parameter
    })
  },
  GetByValidate: parameter => {
    return axios({
      url: GetByValidate,
      method: 'post',
      data: parameter
    })
  }
}
