/*
 * @Autor: junhui li
 * @Date: 2020-12-16 14:51:05
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 15:05:13
 * @Description: 建议与投诉的状态控制
 */
const suggestAndComplaintModel = {
  state: {
    queryComplaint: 0,
    querySuggestions: 0,
    showProtocol: 0
  },
  mutations: {
    CHANGE_QUERY_COMPLAINT: (state) => {
      state.queryComplaint += 1
    },
    CHANGE_QUERY_SUGGESTIONS: (state) => {
      state.querySuggestions += 1
    },
    CHANGE_SHOW_PROTOCOL: (state) => {
      state.showProtocol += 1
    }
  }
}

export default suggestAndComplaintModel
