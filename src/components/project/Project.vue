<template>
  <div id="project" class="project">
      <div class="special-banner">
        <div class="banner-title">{{datas.xmmc}}</div>
      </div>
      <div class="nav">
        <button-tab>
          <button-tab-item :selected="tabType === 'introduction'" @on-item-click="tabType = 'introduction'">项目介绍</button-tab-item>
          <button-tab-item :selected="tabType === 'standard'" @on-item-click="tabType = 'standard'">参加标准</button-tab-item>
          <button-tab-item :selected="tabType === 'hospital'" @on-item-click="tabType = 'hospital'">开展医院</button-tab-item>
        </button-tab>
      </div>
      <div class="content">
        <component :datas="datas" :is="tabType"></component>
      </div>
      <div class="bottom">
        <x-button type="primary" :link="link">我要报名</x-button>
      </div>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, XButton} from 'vux'
import Introduction from './Introduction'
import Standard from './Standard'
import Hospital from './Hospital'
export default {
  name: "project",
  data(){
    return {
        tabType: "", //当前tab类型：introduction-项目介绍,standard-参加标准,hospital-开展医院
        datas: {},
        link: "/Enroll/" + this.$route.params.projectId
    }
  },
  created(){
    var self = this;
    self.$vux.loading.show({
      text: 'Loading'
    });
    self.$set(self, 'tabType', 'introduction');
    self.$axios.get(`/project/projectDetail?projectid=${this.$route.params.projectId}`)
      .then(res => {
        if (self.$judgecode(res) === 1){
          self.$set(self, 'datas', res.data.data)
        }
        self.$vux.loading.hide()
      })
      .catch(err => {
        console.log(err)
        self.$vux.loading.hide()
      })
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Introduction,
    Standard,
    Hospital,
    XButton
  }
}
</script>

<style scoped lang="less">
@borderColor: #f7f8fd;
@white: #ffffff;
.project {
  /*height: 100%;*/
  .special-banner {
    width: 100%;
    height: 160px;
    background-image: url("../../assets/bg-header.jpg");
    border-bottom: 10px solid @borderColor;
    display: table;
    img {
      width: 100%;
      height: 100%;
    }
    .banner-title {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: white;
      font-size: 18px;
      color: @white;
      text-emphasis-color: @white;
    }
  }
  .nav {
    padding: 0px 15px;
  }
  .content {
    height: calc(~"100vh - 262px");
    overflow: scroll;
  }
  .bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #F7F7FA;
  }
}
</style>
