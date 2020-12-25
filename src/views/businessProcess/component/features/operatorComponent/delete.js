/*
 * @Autor: junhui li
 * @Date: 2020-12-15 14:31:02
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-15 14:34:37
 * @Description: 删除功能
 */

// 父级vue对象
let parentVue = null
 /**
 * @description: 删除函数
 * @param {*} items 待删除数据
 * @return {*} null
 */
export default function deleteItem (items, Vue) {
  parentVue = Vue
  let CODE
  items.map((item) => {
    if (item['key'] === 'RID') {
      CODE = item['value']
    }
  })
  parentVue.$confirm({
    title: '请您确认是否删除本业务?',
    content: '业务一经删除，不可恢复，请谨慎操作！',
    onOk () {
      DeleteTemporarilyByCode(CODE)
    },
    onCancel () {}
  })
}

/**
 * @description: 实际数据删除函数
 * @param {*} code 数据标识
 * @return {*} null
 */
function DeleteTemporarilyByCode (code) {
	parentVue.$WebApi.busiProcess['DeleteTemporarilyByCode']({
		code: code,
		userid: parentVue.user.userID
	})
		.then((res) => {
			parentVue.$message.success('删除成功！')
			parentVue.QueryEntrust()
		})
		.catch((err) => {
			parentVue.$message.error('删除失败！')
			console.log(err)
		})
}
