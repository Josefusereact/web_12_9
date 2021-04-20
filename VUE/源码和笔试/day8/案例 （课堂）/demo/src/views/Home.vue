<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%" height="200" />
      </van-swipe-item>
    </van-swipe>
    <van-button >按钮</van-button> 
    <div class="content">
      我的字体是响应式的<br/>
      无论窗口多大我都只占一半
    </div>
    <div class="content1">
      我我是用px设置的
    </div>
    <van-tabbar :value="0">
      <van-tabbar-item @click="handleClick" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item @click="handleClick('/about')" icon="search">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  name: 'Home',
  data(){
    return {
      active:0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
    }
  },
  methods:{
    handleClick(path){
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
  .content{
    // 在该项目中使用了rpx2vw，所以
    //在该项目中可以使用rpx作为像素单位
    //他的基准屏幕宽度是750rpx也就是iphone6的调试窗口
    //在iphone6时1rpx == 0.5px 也就是375rpx在iphone6中正好占用一半的窗口空间
    //其他尺寸会等比例变大和缩小
    width: 375rpx;
    height:375rpx;
    background: red;
    color: white;
    font-size: 35rpx;
    font-weight: bold;
  }
  // .content1{
  //   width: 375px;
  //   height:375px;
  //   background: red;
  //   color: white;
  //   font-size: 35px;
  //   font-weight: bold;
  // }
</style>