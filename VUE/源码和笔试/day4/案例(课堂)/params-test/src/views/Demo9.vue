<template>
<div class="home">
  <h4>
    组件传参练习：海量数据渲染
  </h4>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id+''+item.age">
        {{item.name}},
        {{item.sex}},
        {{item.age}},
      </li>
      
    </ul>
  </div>
</div>
</template>

<script>
import person from '@/person/index-8000.js'
console.log(person)
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo9',
  data(){
    return {
      list:[],
      begin:0,
      loading:false,
      pno:1,
      psize:100,
      pcount:0
    }
    
  },
  mounted(){
    //我们分别使用下面两个方案在控制台上查看从beforeUpdate到updated
    //的时间差距有多大,分别从2000-16000的文件引用来查看差别
    //不要随便使用超过32000的数据
    //正常方案，直接将8000数据设置到list上
    //这里我们只截取前100条数据
    this.list = person.data.slice((this.pno-1)*this.psize,this.pno*this.psize)
    //优化方案，通过Object.freeze修饰一下在设置到list上
    // this.list = person.data.slice((this.pno-1)*this.psize,this.pno*this.psize)
    let _this = this;
    // 计算一共有多少页
    this.pcount = Math.round(person.data.length/this.psize)
    // 给body绑定滚动监听
    document.body.onscroll = function(e){
      //获取当前页面向上滚动到多少像素
      let scrollTop = document.documentElement.scrollTop||
        document.body.scrollTop
      // console.log(scrollTop)
      // 获取滚屏总高度有多高
      let scrollHeight = document.documentElement.scrollHeight||
        document.body.scrollHeight
      // console.log(scrollHeight,window.innerHeight)
      // 获取一个窗口的高度有多高
      let bodyHeight = window.innerHeight;
      // 判断，当滚屏高度+窗口高度+200像素不小于滚动内容的总高度
      //说明当前滚动到页底部200像素以内了，这时就要触发加载新的数据
      //并且条件还附加了当前的页号不允许超过总页数
      if(scrollTop+bodyHeight+200>=scrollHeight
        &&_this.pno<_this.pcount){
        console.log('到达分页部位')
        

        // 如果当前滚到到位置并且状态为未加载页面就执行
        if(_this.loading == false){
          //设置状态为加载中，防止滚动时瞬间触发多次增加数据产生重复数据
          //保证当前的if逻辑没执行完之前loading都是true这样就不会同时触发多次
           _this.loading = true;
           //设置页号++
          _this.pno++
          //从本地数据中抽取下一页的数据
          let nextPage = person.data.slice((_this.pno-1)*_this.psize,_this.pno*_this.psize)
          //将下一页的数据与list合并
          _this.list = _this.list.concat(nextPage)
          //在下一次渲染完毕将loading设置为false保证加载流程完整性
          _this.$nextTick().then(() => {
            _this.loading = false
          })
        }
      }
    }
  },
  beforeUpdate() {
    this.begin = new Date().getTime()
    
  },
  updated() {
    console.log(new Date().getTime()-this.begin)
  },
}
</script>
