/*
 * @Description: 通用方法
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-27 14:35:02
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-17 14:41:36
 */

import { axios } from '@/utils/request'
import { LookupDict, MaterialUpload } from '@/api/common/urlString'

export default {
    // 获取数字词典值
    LookupDict: parameter => {
        return axios({
            url: LookupDict,
            method: 'post',
            data: parameter
        })
    },
    // 附件上传
    MaterialUpload: parameter => {
        return axios({
            url: MaterialUpload,
            method: 'post',
            data: parameter,
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
