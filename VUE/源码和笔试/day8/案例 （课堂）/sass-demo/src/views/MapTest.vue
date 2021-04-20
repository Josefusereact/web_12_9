<template>
  <div>
    map-test
    <div v-for="(item) in [1,2,3]"
      :key="item"
      :class="['item'+item]">
      item{{item}}
    </div>
  </div>
</template>
<script>
export default {
  name:'MapTest'
}
</script>
<style lang="scss" scoped>
$arr:(
  name:'.item1',
  fontSize:30px,
  color:red
),(
  name:'.item2',
  fontSize:30px,
  color:green
),(
  name:'.item3',
  fontSize:30px,
  color:blue
);
//循环$arr
$i:1;
@each $item in $arr{
  //复杂写法
  //从数组的map中取值
  //首先需要取出数组的每个元素
  //nth(数组,下标)此时，这个结构相当于数组中的map对象
  //在通过map-get(map对象,key)来取出map中的key的值
  //所以最终编写代码为map-get(nth($arr,$i),'name')
  // #{map-get(nth($arr,$i),'name')}{
  //   font-size:map-get(nth($arr,$i),'fontSize');
  //   color:map-get(nth($arr,$i),'color');
  // }
  //简单写法
  #{map-get($item,'name')}{
    font-size:map-get($item,'fontSize');
    color:map-get($item,'color');
  }
  $i:$i+1;
}
</style>