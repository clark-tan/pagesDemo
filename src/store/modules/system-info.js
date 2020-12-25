import Api from '@/api/home'

const systemInfo = {
  state: {
    pageInfo: {}
  },
  mutations: {
    SET_PAGE_INFO: (state, pageInfo) => {
      console.log(`保存页面信息：`, pageInfo)
      state.pageInfo = pageInfo
    }
  },
  actions: {
    GetWebConfig ({ commit }) {
      return new Promise(resolve => {
        Api.GetWebConfig().then(res => {
          commit('SET_PAGE_INFO', res.rowsList[0])
          resolve()
        }).catch(err => {
          console.log(err)
          resolve()
        })
      })
    }
  }
}

export default systemInfo
