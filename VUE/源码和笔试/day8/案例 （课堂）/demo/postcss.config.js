module.exports = {
  plugins:{
    'postcss-preset-env':{},
    'postcss-plugin-rpx2vw':{
      viewportWidth: 750,//定义基准窗口宽度为750px
      viewportUnit: 'vw',//定义生成的尺寸单位为vw
      fontViewportUnit: 'vw',//定义字体生成的尺寸为vw
      unitPrecision: 5,//定义生成的vw保留5位小数
    }
  }
}