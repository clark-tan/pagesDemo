/*
 * @Autor: junhui li
 * @Date: 2020-12-16 17:44:41
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 18:49:20
 * @Description:
 */
const preBusniess = {
  state: {
    SaveData: null,
    HandlePreBusniessState: 0
  },
  mutations: {
    CHANGE_SAVE_DATA: (state, data) => {
      state.SaveData = data
    },
    CHANGE_HANDLE_PRE_BUSNISS_STATE: (state) => {
      state.HandlePreBusniessState += 1
    }
  }
}
export default preBusniess
