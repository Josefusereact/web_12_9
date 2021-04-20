import Vue from 'vue'
import qs from 'qs'
export const router = Vue.observable({
  path:'',
  routes:[],
  $route:{},
  push(arg){
    if(typeof arg == 'string'){
      this.path = arg
      location.href = '/#'+arg
    }else{
      if(arg.path){  
        if(arg.query){
          this.path = arg.path+'?'+qs.stringify(arg.query)
          this.$route = {
            path:arg.path,
            query:arg.query
          }
        }else{
          this.path = arg.path
        }
        location.href = '/#'+this.path
      }else if(arg.name){
        this.path = arg.path
        location.href = '/#'+arg.path
      }else{
        throw('不可以传入非法参数')
      }
    }
  }
})