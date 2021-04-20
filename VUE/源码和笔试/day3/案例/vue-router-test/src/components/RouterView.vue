<template>
<!-- 动态组件，用来当路由的页面的容器-->
<component :is="getPath"></component>
</template>

<script>
// 引入router响应式对象用来动态的渲染组件
import {
  router
} from '../router/data'
// qs是格式化url参数的工具类
import qs from 'qs'
export default {
  name: 'router-view',
  data() {
    return {}
  },
  computed: {
    // getPath可以监听router对象的变化。
    //由于router是Vue.observable进行定义的
    //他就相当于被Object.defineProperty监听到了
    //这样当router变更时就会触发getPath的执行
    //这样每次component都能获取到最新的与url匹配的
    //Vue的组件来渲染页面
    getPath() {
      // 通过filter过滤函数来找到当前
      // 与router.path匹配的配置在routes数组中的Vue组件
      //并且返回同时将数据设置到$route对象中
      //用于组件跳转传值使用
      let res = router.routes.filter(item => {
        if (router.path.indexOf('?') != -1) {
          return item.path == router.path.split('?')[0]
        } else {
          return item.path == router.path
        }
      })
      if (res.length > 0) {
        // 如果url中包含？的参数
        //就截取参数部分
        let queryParam = ''
        if (router.path.indexOf('?') != -1) {
          queryParam = router.path.split('?')[1]
        }
        router.$route = {
          path: res[0].path,
          name: res[0].name,
          // 将key=value&key=value的格式的参数
          //转换成json对象的参数
          query: qs.parse(queryParam)
        }
        //返回匹配到url的Vue组件让他渲染到页面上
        return res[0].component
      } else {
        return ''
      }
    }
  }
}
</script>
