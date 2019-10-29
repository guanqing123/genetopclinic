<template>
  <div class="personcenter">
    <div class="header">
      <img class="head" src="../../assets/icon_home.png"/>
    </div>
    <tab>
      <tab-item selected>等待审核</tab-item>
      <tab-item>已通过</tab-item>
      <tab-item>已拒绝</tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
export default {
  name: "person-center",
  components: {
    Tab,
    TabItem
  }
}
</script>

<style scoped lang="less">
.personcenter {
  .header {
    width: 100%;
    height: 160px;
    background-image: url("../../assets/bg-header.jpg");
    position: relative;
    .head{
      position: absolute;
      left: 10px;
      top: 50px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
