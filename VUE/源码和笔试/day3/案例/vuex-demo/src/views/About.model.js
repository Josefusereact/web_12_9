export default {
  namespaced:true,
  state:{
    name:'我是模块中的name的值',
  },
  getters:{
    getName(state){
      return `模块中的getName的值是：${state.name}`
    }
  },
  mutations:{
    setName(state,name){
      state.name = name
    }
  },
  actions:{
    async fetchNameNew({commit},data){
      //延迟两秒执行的函数
      await (() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000);
        })
      })()
      // 在模块内使用commit和dispatch是无需指定模块名的
      commit('setName',data)
    }
  }
}