<template>
  <div class="tabs">
    <el-tag
      v-for="item in tabsList"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      @click="tabsLink(item)"
      @close="handleClose(item,tabsList)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods:{
    //关闭标签
    handleClose(val,tabsList){
      //indexOf得到指定索引，后面跟删除元素个数，包括此索引的数
    tabsList.splice(tabsList.indexOf(val),1)
     this.$router.push({path:tabsList[tabsList.length-1].path})
    },
    //点击tag跳转
    tabsLink(item){
       this.$router.push({path:item.path})
    }
  },
  computed: {
    ...mapState("tab", ["tabsList"]),
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
