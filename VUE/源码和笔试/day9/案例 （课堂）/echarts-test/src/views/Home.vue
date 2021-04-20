<template>
  <div class="home">
    <div ref="chart1" style="width: 800px; height: 600px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Home",
  mounted() {
    let myChart = echarts.init(this.$refs.chart1);
    //声明数据
    let list = [
      {
        name: "小明",
        score: 99,
      },
      {
        name: "小红",
        score: 100,
      },
      {
        name: "小黄",
        score: 75,
      },
      {
        name: "小刚",
        score: 87,
      },
      {
        name: "小芳",
        score: 120,
      },
      {
        name: "小丽",
        score: 25,
      },
    ];
    // 指定图表的配置项和数据
    var option = {
      //图表的标题
      title: {
        text: "考试成绩排名",
      },
      //图表工具栏
      tooltip: {},
      //图表的标识点展示名称
      legend: {
        data: ["成绩"],
      },
      //x轴的配置
      xAxis: {
        // 将数据中的人名整理到x轴数据上
        data: list.map((item) => item.name),
      },
      //y轴的配置
      yAxis: {},
      // 图表的数据对象
      series: [
        {
          //标识名称，必须与legend中配置的名称一样
          name: "成绩",
          //图表的类别，bar代表柱状图
          type: "bar",
          // 图表的数据，这里必须与xAxis中的数据长度一样的数组
          //将数据中的分数整理到y轴上
          data: list.map((item) => item.score),
        },
      ],
    };
    myChart.setOption(option)
  },
};
</script>
