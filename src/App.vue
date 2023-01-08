<template>
  <div id="app">
 <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="less">
//去掉默认样式
*,body{
  margin: 0;
  padding: 0;
}
</style>
