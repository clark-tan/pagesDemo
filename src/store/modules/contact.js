/*
 * @Autor: junhui li
 * @Date: 2020-12-16 11:23:10
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 14:37:27
 * @Description: 联系我们地图数据
 */
const contact = {
  state: {
    contactItem: {},
    mapModelState: false
  },
  mutations: {
    SET_CONTACT_ITEM: (state, item) => {
      state.contactItem = item
    },
    CHANGE_MAP_MODEL_STATE: (state, item) => {
      state.mapModelState = item
    }
  }
}

export default contact
