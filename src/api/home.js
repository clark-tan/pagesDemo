/*
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-11-02 15:13:34
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 18:02:04
 */
import { axios } from '@/utils/request'
import { GetMenuBar, GetNoticeList, MenuInfoCount, GetWebConfig, GetWorkService, GetCarousel, GetCarouselDetail } from '@/api/common/urlString'

export default {
  GetCarouselDetail: parameter => {
    return axios({
      url: GetCarouselDetail,
      method: 'get',
      params: parameter
    })
  },
  GetCarousel: parameter => {
    return axios({
      url: GetCarousel,
      method: 'post',
      data: parameter
    })
  },
  GetWorkService: parameter => {
    return axios({
      url: GetWorkService,
      method: 'get',
      params: parameter
    })
  },
  GetMenuBar: parameter => {
    return axios({
      url: GetMenuBar,
      method: 'get',
      params: parameter
    })
  },
  GetNoticeList: parameter => {
    return axios({
      url: GetNoticeList,
      method: 'post',
      data: parameter
    })
  },
  MenuInfoCount: parameter => {
    return axios({
      url: MenuInfoCount,
      method: 'post',
      data: parameter
    })
  },
  GetWebConfig: parameter => {
    return axios({
      url: GetWebConfig,
      method: 'get',
      params: parameter
    })
  }
}
