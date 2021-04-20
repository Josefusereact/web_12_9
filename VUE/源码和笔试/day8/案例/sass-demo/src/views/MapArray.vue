<template>
  <div id="map-array">
      <h4>
          <!-- 回顾使用vue -->
          <div v-for="(item) in [1,2,3]" :key="item" :class="'item'+item">
              item{{item}}
          </div>
          <!-- 以上的代码会生成 -->
          <div class="item1"> item1 </div>
          <div class="item2"> item2 </div>
          <div class="item3"> item3 </div>
      </h4>
  </div>
</template>

<script>
export default {
    name:'map-array',
}
</script>

<style lang="scss" scoped>
$arr:
(name:'.item1', fontSize: 10px, color:rgb(0, 255, 13)),
(name:'.item2', fontSize: 20px, color:rgb(24, 51, 138)),
(name:'.item3', fontSize: 30px, color:rgb(194, 47, 182));
@each $item in $arr{
    // {nth($arr, $i)}
    #{map-get($item, 'name')}{
        color:map-get($item, 'color');
        font-size: map-get($item,'fontSize');
    }
}
</style>