<template>
  <div id="root">
    <view-box ref="viewBox">
      <router-view />
    </view-box>
    <tabbar slot="bottom" style="position: fixed">
      <tabbar-item :selected="$route.name==='Home'" @on-item-click="itemClick('/Home')">
        <img slot="icon" src="../../assets/icon_home.png"/>
        <img slot="icon-active" src="../../assets/icon_home_selected.png"/>
        <p slot="label">首页</p>
      </tabbar-item>
      <tabbar-item :selected="$route.name==='PersonCenter'||$route.fullPath.indexOf('PersonCenter')!=-1" @on-item-click="itemClick('/PersonCenter')">
        <img slot="icon" src="../../assets/icon_personcenter.png"/>
        <img slot="icon-active" src="../../assets/icon_personcenter.selected.png"/>
        <p slot="label">个人中心</p>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from 'vux'
export default {
  name: "root",
  data(){
    return {

    }
  },
  methods: {
    itemClick:function (to) {
      this.$router.push({path: to})
    }
  },
  mounted() {
    console.log('this.$route.name>'+this.$route.name)
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped lang="less">
/*html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}*/
.weui-tabbar__label {
  color: #000000;
}
</style>
