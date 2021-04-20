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
import person from '@/person/index-32000.js'
console.log(person)
export default {
  name: 'Demo8',
  data(){
    return {
      list:[],
      begin:0
    }
    
  },
  mounted(){
    //我们分别使用下面两个方案在控制台上查看从beforeUpdate到updated
    //的时间差距有多大,分别从2000-16000的文件引用来查看差别
    //不要随便使用超过32000的数据
    //正常方案，直接将8000数据设置到list上
    // this.list = person.data
    //优化方案，通过Object.freeze修饰一下在设置到list上
    // this.list = Object.freeze(person.data)
  },
  beforeUpdate() {
    this.begin = new Date().getTime()
    
  },
  updated() {
    console.log(new Date().getTime()-this.begin)
  },
}
</script>
