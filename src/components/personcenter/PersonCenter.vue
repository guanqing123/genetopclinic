<template>
  <div class="personcenter">
    <div style="position: absolute; top: 0px; left: 0px; width: 100%; z-index: 99;">
      <div class="header">
        <img class="head" src="../../assets/icon_home.png"/>
      </div>
      <tab>
        <tab-item :selected="tabType === 'Wait'" @on-item-click="handler">等待审核</tab-item>
        <tab-item :selected="tabType === 'Pass'" @on-item-click="handler">已通过</tab-item>
        <tab-item :selected="tabType === 'Refuse'" @on-item-click="handler">已拒绝</tab-item>
      </tab>
    </div>
    <router-view style="margin-top: 204px;"></router-view>
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
    self.$set(self, 'tabType', this.$route.name);
  },
  mounted(){
    var self = this;
    this.$nextTick(function(){
      self.moveAdjustment();
    });
  },
  methods: {
    moveAdjustment: function(){
      /*var a = document.documentElement;
      document.documentElement.ontouchmove = function(t) {
        // 判断默认行为是否可以被禁用
        if (t.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!t.defaultPrevented) {
            t.preventDefault();
          }
        }
      }
      document.querySelector('.personcenter').addEventListener("touchmove", function(e) {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            t.preventDefault();
          }
        }
      }, false);
      var t = document.querySelector(".enrollList");
      t.addEventListener("touchstart", function(e) {
        var i = e.touches[0].clientY;
        t.ontouchmove = function(e) {
          var s = e.touches[0].clientY
            , n = t.scrollTop
            , a = t.scrollHeight - t.clientHeight;
          0 === n ? i < s ? e.preventDefault() : e.stopPropagation() : n === a ? i > s ? e.preventDefault() : e.stopPropagation() : n > 0 && n < a ? e.stopPropagation() : e.preventDefault()
        }
      }, !1);*/
    },
    handler: function(index) {
      var self = this
      switch(index) {
        case 0:
          self.$set(self, 'tabType', 'Wait')
          self.$router.push({
            name: 'Wait'
          })
          break;
        case 1:
          self.$set(self, 'tabType', 'Pass')
          self.$router.push({
            name: 'Pass'
          })
          break;
        case 2:
          self.$set(self, 'tabType', 'Refuse')
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
