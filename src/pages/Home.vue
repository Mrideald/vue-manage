<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <!-- 用户信息 -->
        <el-card class="box-card" style="margin-bottom: 20px">
          <div class="user">
            <img src="@/assets/images/user.png" alt="" />
            <div class="userInfo">
              <p class="name">EdgeDiary</p>
              <p class="assess">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2022-12-23</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <!-- 课程卡片 -->
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, keys) in tableLabel"
              :prop="keys"
              :label="val"
              :key="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <!-- 订单量 -->
          <el-card
            v-for="(item, index) in countData"
            :key="index"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px">
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="height: 260px" id="echarts2"></el-card>
          <!-- 饼状图 -->
          <el-card style="height: 260px" id="echarts3"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getData } from "@/api";
export default {
  name: "VueManageHome",

  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },

  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      //基于准备好的dom节点初始化echarts
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定echarts的配置
      var echarts1Options = {};
      //处理xaxis
      const { orderData, userData,videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      echarts1Options.xAxis = { data: xAxis }; //x轴
      echarts1Options.yAxis = {}; //y轴
      //图例
      echarts1Options.legend = {
        data: xAxis,
      };
      (echarts1Options.series = []),
        xAxis.forEach((keys) => {
          echarts1Options.series.push({
            name: keys,
            type: "line",
            //返回一个新数组
            data: orderData.data.map((item) => item[keys]),
          });
        });
      echarts1.setOption(echarts1Options);

      // 柱状图
      var echarts2 = echarts.init(document.getElementById("echarts2"));
      // 指定图表配置项
      var echarts2Options = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item=>item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [{
          name:'新增用户',
          data:userData.map(item=>item.new),
          type:'bar'
        },{
          name:'活跃用户',
          data:userData.map(item=>item.active),
          type:'bar'
        }],
      };
      echarts2.setOption(echarts2Options);

      //饼状图
     const echarts3=echarts.init(document.getElementById("echarts3"))
     const echarts3Options={
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{
            data:videoData,
            type:'pie'
          }],
        }
        echarts3.setOption(echarts3Options)
    })
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .assess {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
  }
  span {
    color: #666666;
    margin-left: 60px;
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .price {
    font-size: 30px;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
  }
  .desc {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
