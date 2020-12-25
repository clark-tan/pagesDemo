/*
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-28 11:27:57
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-08 21:02:10
 */
// 邮箱
export function isEmail (value) {
  // /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  const pattern = /^[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/
  return pattern.test(value)
}
// 手机
export function isMobile (value) {
  const pattern = /^1\d{10}$/
  return pattern.test(value)
}
// 座机
export function isTel (value) {
  const pattern = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  return pattern.test(value)
}
// 用户名
export function isYHM (value) {
  const pattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
  return pattern.test(value)
}
// 密码
export function isMM (value) {
  const pattern = /^(\w){6,20}$/
  return pattern.test(value)
}
// 身份证
export function isIDCard (value) {
  const pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return pattern.test(value)
}
// 户口本
export function isAccountCard (value) {
  const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return pattern.test(value)
}
// 护照
export function isPassPortCard (value) {
  const pattern = /^([a-zA-z]|[0-9]){5,17}$/
  return pattern.test(value)
}
// 统一社会信用代码 Uniform Social Credit Code
export function isUSCC (value) {
  const pattern = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10})$/
  return pattern.test(value)
}
