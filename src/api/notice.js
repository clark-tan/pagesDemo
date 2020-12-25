/*
 * @Description: 通知公告
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-28 09:11:35
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 13:40:14
 */

import { axios } from '@/utils/request'
import { NoticeList } from '@/api/common/urlString'

export default {
  // 通知公告
  NoticeList: parameter => {
    return axios({
      url: NoticeList,
      method: 'post',
      data: parameter
    })
  }
}
