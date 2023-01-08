<template>
  <div>
    <el-container>
      <el-aside width="auto">
      <common-Aside/>
    </el-aside>
      <el-container>
        <el-header>
          <CommonHeader/>
        </el-header>
        <CommonTagVue/>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonTagVue from "@/components/CommonTag.vue";
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue"
export default {
  name: "VueManageMain",
  data() {
    return {};
  },
  components: {
    CommonAside,CommonHeader,CommonTagVue
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>
