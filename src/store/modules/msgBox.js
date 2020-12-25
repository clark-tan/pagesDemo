const msgBox = {
  state: {
    hasShowMsgBox: false
  },

  mutations: {
    SET_MSG_BOX: (state, hasShowMsgBox) => {
      state.hasShowMsgBox = hasShowMsgBox
    }
  }
}

export default msgBox
