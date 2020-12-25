/*
 * @Autor: junhui li
 * @Date: 2020-12-15 15:07:55
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-23 17:34:47
 * @Description: 编辑项目
 */

let parentVue = null

/**
 * @description: 跳转到编辑页面
 * @param {*} items 条目数据
 * @param {*} vue 父级vue对象
 * @return {*} null
 */
export default function editItem (items, vue) {
  parentVue = vue
  let CODE
  items.map((item) => {
    if (item['key'] === 'RID') {
      CODE = item['value']
    }
  })
  parentVue.$router.push({
    name: 'PreBusiness',
    params: {
      docunid: CODE
    }
  })
}
