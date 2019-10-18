<template>
  <div id="root" style="height: 100%">
    <view-box ref="viewBox">
      <div>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
    </view-box>
    <tabbar slot="bottom" style="position: fixed">
      <tabbar-item>
        <img slot="icon" src="../../assets/icon-home.png"/>
        <img slot="icon-active" src="../../assets/icon-home-active.png"/>
        <p slot="label">首页</p>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../../assets/icon-home.png"/>
        <img slot="icon-active" src="../../assets/icon-home-active.png"/>
        <p slot="label">个人中心</p>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from 'vux'
import Tab from "vux/src/components/tab/tab";
export default {
  name: "root",
  components: {
    Tab,
    ViewBox,
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
