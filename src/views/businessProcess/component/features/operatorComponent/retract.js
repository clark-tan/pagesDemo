/*
 * @Autor: junhui li
 * @Date: 2020-12-15 14:40:50
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-15 15:06:51
 * @Description: 收回项目
 */

let parentVue = null

/**
 * @description: 收回方法
 * @param {*} items 收回数据
 * @param {*} Vue 父级vue对象
 * @return {*} null
 */
export default function retractItem (items, Vue) {
  parentVue = Vue
  let docunid
  items.map((item) => {
    if (item['key'] === 'RID') {
      docunid = item['value']
    }
  })
  CallBack(docunid)
}

/**
 * @description: 回收方法
 * @param {*} docunid 标识
 * @return {*} null
 */
function CallBack (docunid) {
  parentVue.onSpinning = true
  parentVue.$WebApi.busiProcess['CallBack']({
    docunid: docunid
  })
    .then((res) => {
      console.log(res)
      parentVue.QueryEntrust()
    })
    .catch((err) => {
      console.log(err)
    })
    .then(() => {
      parentVue.onSpinning = false
    })
}
