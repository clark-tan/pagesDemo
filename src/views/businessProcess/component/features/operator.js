/*
 * @Autor: junhui li
 * @Date: 2020-12-15 10:01:10
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-15 15:21:50
 * @Description: 进度查询相关接口
 */

import deleteItem from './operatorComponent/delete'
import retractItem from './operatorComponent/retract'
import eidtItem from './operatorComponent/editItem'

// 方法枚举
// 收回 删除 编辑
const funcEnum = {
  暂存: 'delete',
  已提交预约: 'retract',
  预约打回: 'edit'
}
Object.freeze(funcEnum)

/**
 * @description: 出口函数
 * @param {*} id 方法类型
 * @param {*} items 当前这条数据
 * @param {*} vue 当前的vue对象
 * @return {*} null
 */
export default function clickFuncTrans (id, items, vue) {
  switch (funcEnum[id]) {
    case 'delete':
      deleteItem(items, vue)
      break
    case 'retract':
      retractItem(items, vue)
      break
    case 'edit':
      eidtItem(items, vue)
      break
    default:
      return null
  }
}
