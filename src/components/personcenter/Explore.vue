<template>
  <div class="explore">
    <group label-width="5em" title="报名信息">
        <cell title="姓名" :value="enroll.name"></cell>
        <cell title="手机号" :value="enroll.telephone"></cell>
        <cell title="性别" :value="enroll.sex"></cell>
        <cell title="年龄" :value="enroll.age"></cell>
        <cell title="所患疾病" primary="content" :value="enroll.disease"></cell>
        <cell title="所在地区" :value="address"></cell>
        <cell title="详细地址" primary="content" :value="enroll.detailAddress"></cell>
        <cell primary="content" title="备注信息" :value="enroll.comment"></cell>
    </group>
    <group label-width="5em" title="附件信息">
      <weui-browser :images="images"></weui-browser>
    </group>
    <group v-show="enroll.state==1" label-width="5em" title="审核信息">
        <cell title="审核状态" value="通过"></cell>
        <cell primary="content" title="审核意见" :value="enroll.checkComment"></cell>
        <cell title="审核时间" :value="enroll.checkDate"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import WeuiBrowser from '../common/WeuiBrowser'
export default {
  name: "explore",
  components: {
    Group,
    Cell,
    WeuiBrowser
  },
  computed: {
    address: function() {
      if(this.enroll && this.enroll.province)
        return this.enroll.province +' '+ this.enroll.city + ' ' + this.enroll.district;
      return '';
    }
  },
  data(){
    return {
      enroll: {}, // 报名对象
      images: []  // 图片浏览
    }
  },
  created(){
    var self = this;
    self.$vux.loading.show({
      text: 'Loading'
    });
    console.log('enrollid>' + this.$route.params.enrollid)
    var self = this;
    self.$axios.get(`/enroll/detailEnroll?enrollid=${this.$route.params.enrollid}`)
      .then(res => {
        if (self.$judgecode(res) === 1) {
            self.$set(self, 'enroll', res.data.data)
            if (self.enroll.images && self.enroll.images.length > 0) {
              self.images = self.enroll.images.map(image => {
                return {src: image.filePath}
              })
            }
        }
        self.$vux.loading.hide()
      })
      .catch(err => {
        console.log(err)
        self.$vux.loading.hide()
      })
  }
}
</script>

<style scoped>

</style>
