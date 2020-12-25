import { axios } from '@/utils/request'
import { LoginURL, GetLoginUserInfo, LogoutURL } from '@/api/common/urlString'

export default {
  login: parameter => {
    return axios({
      url: LoginURL,
      method: 'post',
      data: parameter
    })
  },
  getInfo: () => {
    return axios({
      url: GetLoginUserInfo,
      method: 'get'
    })
  },
  logout: () => {
    return axios({
      url: LogoutURL,
      method: 'get'
    })
  }
}
