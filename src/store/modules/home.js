/*
 * @Autor: junhui li
 * @Date: 2020-12-16 17:31:01
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 17:33:59
 * @Description: go2HomePage
 */
const home = {
  state: {
    showMore: null
  },
  mutations: {
    CHANGE_SHOW_MORE: (state, data) => {
      state.showMore = data
    }
  }
}
export default home
