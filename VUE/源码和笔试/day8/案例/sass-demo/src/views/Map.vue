<template>
  <div>
    <h4>定义map</h4>
    <div class="item1">
      item1
    </div>
    <div class="item2">
      item2
    </div>
    <div class="item3">
      item3
    </div>
  </div>
</template>
<style lang="scss" scoped >
$map1:(
  name:'.item1',
  fontSize:30px,
  color:red
);
// map的取值 map-get($map变量,key)
#{map-get($map1, 'name' )}{
  color:map-get($map1, 'color' );
  font-size: map-get($map1, 'fontSize' );
}
$map2:(
  name:'.item2',
  fontSize:30px,
  color:green
);
// map的取值 map-get($map变量,key)
#{map-get($map2, 'name' )}{
  color:map-get($map2, 'color' );
  font-size: map-get($map2, 'fontSize' );
}
$map3:(
  name:'.item3',
  fontSize:30px,
  color:blue
);
// map的取值 map-get($map变量,key)
#{map-get($map3, 'name' )}{
  color:map-get($map3, 'color' );
  font-size: map-get($map3, 'fontSize' );
}


</style>