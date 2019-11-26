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
    </group>
    <group label-width="5em" title="附件信息">
      <weui-browser :images="images"></weui-browser>
    </group>
    <group label-width="5em" title="审核信息">
      <cell title="审核状态" value="拒绝"></cell>
      <cell primary="content" title="审核意见" :value="enroll.checkComment"></cell>
      <cell title="审核时间" :value="enroll.checkDate"></cell>
    </group>
    <group label-width="5em" title="补充信息">
      <x-textarea class="line" title="备注信息" v-model="enroll.comment" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
      <weui-uploader title="补充附件" :max="5" v-model="enroll.dupimages"></weui-uploader>
    </group>
    <group class="bottom">
      <x-button type="primary" @click.native="commit">提交</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XTextarea, XButton } from 'vux'
import WeuiBrowser from '../common/WeuiBrowser'
import WeuiUploader from '../common/WeuiUploader'
export default {
  name: "enroll-edit",
  components: {
    Group,
    Cell,
    WeuiBrowser,
    XTextarea,
    WeuiUploader,
    XButton
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
      images: [],  // 图片浏览
      enroll: {}
    }
  },
  created(){
    var self = this;
    self.$vux.loading.show({
      text: 'Loading'
    });
    self.enroll.enrollid = this.$route.params.enrollid;
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
  },
  methods: {
    commit: function() {
      var self = this;
      if (!self.enroll.comment.length && (!self.enroll.dupimages || !self.enroll.dupimages.length)) {
        self.$show('备注和附件不能同时为空');
        return;
      }
      var params = new FormData();
      params.append('enrollid', self.enroll.enrollid);
      params.append('comment', self.enroll.comment);
      if (self.enroll.dupimages && self.enroll.dupimages.length){
        self.enroll.dupimages.forEach(file => {
          params.append('files', file, file.name);
        });
      }
      self.$vux.loading.show({
        text: 'Loading'
      });
      self.$axios.post('/enroll/modifyEnroll', params, {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (self.$judgecode(res) === 1){
          self.$router.push({
            path: '/PersonCenter'
          });
        }
        self.$vux.loading.hide();
      }).catch(err => {
        console.log(err);
        self.$vux.loading.hide();
      });
    }
  }
}
</script>

<style scoped lang="less">
.line {
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
}
.bottom {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #F7F7FA;
}
</style>
