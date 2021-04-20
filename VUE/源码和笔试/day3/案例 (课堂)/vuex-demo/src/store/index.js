import Vue from 'vue'
import Vuex from 'vuex'
import AboutModel from '../views/About.model'
Vue.use(Vuex)
//初始化Vuex的仓库对象Store，用来配置基础数据
//Store中传入的对象是全局的store对象，可以在任何模块中使用
const store = new Vuex.Store({
  // 全局的state对象，相当于data中的属性，可以用computed来引用
  state:{
    name:'我是默认值'
  },
  // 全局的mutations对象，用来对state进行赋值操作，
  //这个是vuex的基本规范，必须通过mutations来对state进行值的设置
  //不可以直接对state对象进行操作
  mutations:{
    setName(state,name){
      state.name = name
    }
  },
  // getters相当于vuex中的computed，可以对state进行扩展监听
  // state改变时会触发getters重新计算
  getters:{
    getName(state){
      return `name的值是：${state.name}`
    }
  },
  //用于执行业务的函数，通常用来做接口调用
  //并且可以使用异步操作
  actions:{
    async fetchName({commit},data){
      //延迟两秒执行的函数
      await (() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      })()
      commit('setName',data)
      
    }
  },
  // 在全局部分注册模块
  modules:{
    aboutModel:AboutModel
  }
})
export default store;