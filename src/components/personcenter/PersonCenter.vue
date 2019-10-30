<template>
  <div class="personcenter">
    <div style="position: fixed; top: 0px; left: 0px; width: 100%">
      <div class="header">
        <img class="head" src="../../assets/icon_home.png"/>
      </div>
      <tab>
        <tab-item :selected="tabType === 'wait'" @on-item-click="handler">等待审核</tab-item>
        <tab-item :selected="tabType === 'pass'" @on-item-click="handler">已通过</tab-item>
        <tab-item :selected="tabType === 'refuse'" @on-item-click="handler">已拒绝</tab-item>
      </tab>
    </div>
    <router-view style="margin-top: 204px"></router-view>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
export default {
  name: "person-center",
  components: {
    Tab,
    TabItem
  },
  data(){
    return {
      tabType: "" //当前tab类型: wait等待审核,pass:通过,refuse:拒绝
    }
  },
  created(){
    var self = this;
    self.$set(self, 'tabType', 'wait')
  },
  methods: {
    handler: function(index) {
      var self = this
      switch(index) {
        case 0:
          self.$set(self, 'tabType', 'wait')
          self.$router.push({
            name: 'Wait'
          })
          break;
        case 1:
          self.$set(self, 'tabType', 'pass')
          self.$router.push({
            name: 'Pass'
          })
          break;
        case 2:
          self.$set(self, 'tabType', 'refuse')
          self.$router.push({
            name: 'Refuse'
          })
          break;
        default:
          console.log(`index=${index}`)
      }
    }
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
