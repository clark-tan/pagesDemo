/*
 * @Description: 路由工具箱
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-04 14:52:35
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-06-22 14:49:05
 */

export default {
  /**
   * @description: 刷新当前路由组件
   * @param {vm:调用组件的上下文对象}
   * @return: void
   * @author: Ethan Jiang
   */
  reloadComponent (vm) {
    const currentPath = vm.$route.path
    vm.$router.push({ path: '/FixRouter', query: { path: currentPath } })
  }
}
