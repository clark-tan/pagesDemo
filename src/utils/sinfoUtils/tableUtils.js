/*
 * @Description: 表格类型数据工具箱
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-04 14:52:35
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-08-12 15:01:40
 */

export default {
  // 由于接口返回数据格式不统一，使用此方法兼容处理
  handleResultTableData (data) {
    let columns = []
    let hideColumns = []
    let rowsList = []
    if (Array.isArray(data)) {
      columns = data[0].tableResults.columns
      hideColumns = data[0].tableResults.hideColumns
      rowsList = data[0].tableResults.rowsList
    } else {
      if (Window._.isPlainObject(data) && data.hasOwnProperty('tableResults')) {
        columns = data.tableResults.columns
        hideColumns = data.tableResults.hideColumns
        rowsList = data.tableResults.rowsList
      } else {
        columns = data.columns
        hideColumns = data.hideColumns
        rowsList = data.rowsList
      }
    }
    return {
      columns,
      hideColumns,
      rowsList
    }
  },
  /**
   * @description: 获取去除隐藏列后的列
   * @param {data:Object}
   * @return: objArray
   * @author: Ethan Jiang
   */
  deleteHideColumns (data) {
    // eslint-disable-next-line no-unused-vars
    const { columns, hideColumns, rowsList } = this.handleResultTableData(data)
    return columns.filter(items => !hideColumns.some(item => item === items['key']))
  },
  /**
   * @description: 删除表格中的隐藏列并返回ant需要的列格式
   * @param {allCol:objArray} {hideCol:Array}
   * @return: objArray
   * @author: Ethan Jiang
   */
  handleColumns (data) {
    // eslint-disable-next-line no-unused-vars
    const { columns, hideColumns, rowsList } = this.handleResultTableData(data)
    const temp = columns.filter(items => !hideColumns.some(item => items.key === item))
    return temp.map((item, index) => {
      return {
        dataIndex: item['key'],
        key: item['key'],
        scopedSlots: { customRender: item['key'] },
        title: item['label']
      }
    })
  },
  /**
   * @description: 将table类型数据转换为desc型
   * @param {data: Object} {span: Number}
   * @return: objArray
   * @author: Ethan Jiang
   */
  table2Desc (data, span = 1.5, hasHide = true) {
    const _span = span
    const { columns, hideColumns, rowsList } = this.handleResultTableData(data)
    let afterCol = []
    if (hasHide) {
      afterCol = columns.filter(items => !hideColumns.some(item => item === items['key']))
    } else {
      afterCol = columns
    }
    const temp = rowsList.map((items, index) => {
      const arr = []
      afterCol.map((item, index) => {
        if (item.type === 'textarea') {
          arr.push({
            label: item.label,
            key: item.key,
            value: items[item.key],
            span: 3
          })
        } else {
          arr.push({
            label: item.label,
            key: item.key,
            value: items[item.key],
            span: _span
          })
        }
      })
      return arr
    })
    return temp
  }
}
