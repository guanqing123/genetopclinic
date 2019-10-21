<template>
  <div id="project" class="project">
      <div class="special-banner">{{$route.params.title}}|PD-L1</div>
      <div class="nav">
        <button-tab>
          <button-tab-item :selected="tabType === 'introduction'" @on-item-click="tabType = 'introduction'">项目介绍</button-tab-item>
          <button-tab-item :selected="tabType === 'standard'" @on-item-click="tabType = 'standard'">参加标准</button-tab-item>
          <button-tab-item :selected="tabType === 'hospital'" @on-item-click="tabType = 'hospital'">开展医院</button-tab-item>
        </button-tab>
      </div>
      <component style="height: 400px;overflow: scroll" :datas="datas" :is="tabType"></component>
      <box gap="10px">
        <!--<x-button type="primary" link="/demo">我要报名</x-button>-->
        <button style="width: 100%">hhhh</button>
      </box>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem,XButton,Box } from 'vux'
import Introduction from './Introduction'
import Standard from './Standard'
import Hospital from './Hospital'
export default {
  name: "project",
  data(){
    return {
        tabType: "", //当前tab类型：introduction-项目介绍,standard-参加标准,hospital-开展医院
        datas: {}
    }
  },
  created(){
    var self = this;
    console.log(this.$route.params.projectId)
    self.$set(self, 'tabType', 'introduction')
    self.$set(self, 'datas', '123')
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Introduction,
    Standard,
    Hospital,
    XButton,
    Box
  }
}
</script>

<style scoped lang="less">
@borderColor: #f7f8fd;
@white: #ffffff;
.project {
  .special-banner {
    width: 100%;
    height: 160px;
    line-height: 160px;
    text-align: center;
    font-size: 18px;
    color: @white;
    text-emphasis-color: @white;
    background-image: url("../../assets/bg-header.jpg");
    border-bottom: 10px solid @borderColor;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.nav {
  padding: 0px 15px;
}
</style>
