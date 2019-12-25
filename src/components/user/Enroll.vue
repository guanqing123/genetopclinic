<template>
  <div class="enroll">
    <group label-margin-right="2em" label-align="right">
      <x-input ref="name" type="text" v-model="enroll.name" placeholder="请填写" required is-type="china-name">
        <label slot="label" class="weui-label slot iconfont icon-bitian">姓名：</label>
      </x-input>
      <x-input ref="telephone" type="tel" v-model="enroll.telephone" placeholder="请填写" required is-type="china-mobile">
        <label slot="label" class="weui-label slot iconfont icon-bitian">手机号：</label>
      </x-input>
      <popup-picker placeholder="请选择" popup-title="性别" :data="list" v-model="enroll.sex" value-text-align="left" required>
        <label slot="title" class="weui-label slot iconfont icon-bitian">性别：</label>
      </popup-picker>
      <x-input ref="age" type="number" v-model="enroll.age" placeholder="请填写" required :is-type="ageValue">
        <label slot="label" class="weui-label slot iconfont icon-bitian">年龄：</label>
      </x-input>
      <x-input ref="disease" type="text" v-model="enroll.disease" placeholder="请填写" required>
        <label slot="label" class="weui-label slot iconfont icon-bitian">所患疾病：</label>
      </x-input>
      <x-address ref="address" title="所在地区" popupTitle="所在地区" :raw-value="false" :list="addressData" placeholder="请选择" value-text-align="left" @on-hide="getAddress">
        <label slot="title" class="weui-label slot iconfont icon-bitian">所在地区：</label>
      </x-address>
      <x-textarea v-show="false" title="详细地址：" v-model="enroll.detailAddress" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
      <x-textarea title="备注信息：" v-model="enroll.comment" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
    </group>

    <group>
      <weui-uploader title="上传患者病历" :max="10" v-model="enroll.images">
      <div slot="desc">
        <p class="material-title">材料包含：</p>
        <ul class="material-list">
          <li>最近一次CT报告</li>
          <li>最近的出院小结或病程记录</li>
          <li>检查记录</li>
        </ul>
      </div>
    </weui-uploader>
      <div class="weui-cell">
        <check-icon :value.sync="agree">我同意</check-icon>
        <a href="javascript:;" @click="clickDeal" class="confirm">《服务声明》</a>
      </div>
    </group>
    <confirm
      v-model="show"
      class="confirm"
      title="服务声明"
      cancelText="返回"
      confirmText="同意"
      @on-confirm="agreeDeal">
      <div class="content">
        致患者和患者家属的一封信<br/><br/>
        尊敬的患者或患者家属：<br/><br/>
        欢迎您登录和使用本平台，本患者服务声明旨在告诉您本平台“全球寻药联盟”如何为患者服务。在使用本平台服务之前，请务必阅读本服务声明之全部内容。使用本平台必须遵守《中华人民共和国药品管理法》《药品注册管理办法》《药物临床试验质量管理规范 GCP》《赫尔辛基宣言》伦理原则等相关法律、法规、及本平台隐私保护制度的规定。使用本平台的服务，您会被视为已清楚知晓并认可本患者服务声明之全部内容。声明内容如下：<br/>
        1、全球寻药联盟旨在公益性地帮助患者寻找、咨询、匹配适合的临床试验项目。<br/>
        2、患者或患者家属是知晓临床试验并自愿委托全球寻药联盟帮助寻找、咨询、匹配适合的临床试验项目。<br/>
        3、全球寻药联盟不会以任何形式和名义向患者收取咨询费、中介费等任何费用。<br/>
        4、全球寻药联盟不会以任何形式和名义诱导患者进行任何的医疗措施和/或任何的医学检验/检查。<br/>
        5、全球寻药联盟不会以返高额报酬的形式引诱患者参加临床试验。<br/>
        6、患者或患者家属是知晓并认可本平台服务的性质及所有内容，而自愿向全球寻药联盟提供患者真实、正确、最新及完整的病历资料等信息的。<br/>
        7、全球寻药联盟遵守公司的隐私保护原则，患者所有资料信息仅供寻找、咨询、匹配适合的临床试验项目。<br/>
        8、全球寻药联盟可能会应法律之要求公开个人资料，或者因善意确信这样的作法对于下列各项有其必要性：1)符合法律公告；2)在紧急情况下，为了保护本平台及其服务个人或公众安全。<br/>
        9、如任何个人和/或组织以全球寻药联盟的名义，向患者收取咨询等费用或引诱患者做任何附加检测/检查，全球寻药联盟将依法追究其法律责任。<br/>
      </div>
    </confirm>
    <confirm v-model="icode.show" title="验证号码" class="confirm" confirmText="提交" :close-on-confirm="false" @on-confirm="finalCommit">
        <div>
            <cell title="手机号" :value="enroll.telephone"></cell>
            <x-input @on-blur="icodeBlur" class="weui-vcode" v-model="enroll.icode" :max="6" placeholder="请输入验证码">
              <x-button ref="icode" slot="right" :type="icode.buttonType" :text="icode.buttonText" :disabled="icode.disabled" @click.native="getIcode" mini></x-button>
            </x-input>
        </div>
    </confirm>
    <group class="bottom">
      <x-button type="primary" :disabled="!agree" @click.native="commit">提交</x-button>
    </group>
  </div>
</template>

<script>
import { Group, XInput, PopupPicker, XAddress, ChinaAddressV4Data, XTextarea, XButton, CheckIcon, Confirm, Cell } from 'vux'
import WeuiUploader from '../common/WeuiUploader'
export default {
  name: "enroll",
  data(){
    return {
      enroll : {
        projectid: this.$route.params.projectId,
        name: '', // 姓名
        telephone: '', // 手机号
        sex: [], // 性别
        age: '', // 年龄
        disease: '', //所患疾病
        address: [], //所在地区
        detailAddress: '', //详细地址
        comment: '', //备注
        state: '0', //等待审核
        images: [], //图片数组
        icode: '' //验证码
      },
      icode: {
        show: false,
        buttonType: 'primary',
        buttonText: '获取验证码',
        disabled: false,
        countDown: 60
      },
      list: [['男','女']],
      addressData: ChinaAddressV4Data,
      agree: false,
      show: false,
      ageValue: function(value) {
        return {
          valid: /^[1-9][0-9]?$/.test(value),
          msg: '年龄范围是0-99岁！'
        }
      }
    }
  },
  methods: {
    icodeBlur: function() {
      window.scrollTo(0,0);
    },
    getAddress: function (sure) {
      if (sure){
        let nameValue = this.$refs['address'].nameValue;
        if (nameValue.length > 0) {
          let names = nameValue.split(' ');
          this.$set(this.enroll,'address', names);
        }
      }
    },
    clickDeal: function() {
      this.show = true;
    },
    agreeDeal: function(){
      this.agree = true
    },
    commit: function() {
      var self = this;
      if (!self.$refs.name.valid) {
        self.$show('请输入正确格式的名字');
        self.$refs.name.focus();
        return;
      }
      if (!self.$refs.telephone.valid) {
        self.$show('请输入正确格式的手机');
        self.$refs.telephone.focus();
        return;
      }
      if (!self.enroll.sex.length) {
        self.$show('请选择性别');
        return;
      }
      if (!self.$refs.age.valid) {
        self.$show('请输入正常格式的年龄');
        self.$refs.age.focus();
        return;
      }
      if (!self.enroll.disease.length) {
        self.$show('请输入所患疾病');
        self.$refs.disease.focus();
        return;
      }
      if (!self.enroll.address.length) {
        self.$show('请选择所在地区');
        return;
      }
      if (!self.enroll.images.length) {
        self.$show('请上传附件');
        return;
      }
      // 验证成功,显示验证码框
      self.icode.show = true;
    },
    getIcode: function() { // 获取验证码
      var self = this;
      self.beforeGetIcode();
      self.$axios.get(`/enroll/sendIcode?projectid=${this.$route.params.projectId}&telephone=${self.enroll.telephone}`)
        .then(res => {
          if (self.$judgecode(res) === 1) {
            self.$show('验证码发送成功')
            self.sendSuccess()
          }else{
            self.sendFailure()
          }
        })
        .catch(err => {
          console.log(err)
          self.$show('验证码获取失败')
          self.sendFailure()
        })
    },
    beforeGetIcode: function() {
      var self = this
      self.icode.disabled = true
      self.icode.buttonType = "default"
    },
    sendSuccess: function() {
      var self = this
      self.icode.disabled = true
      self.icode.buttonType = "default"
      self.countDown()
    },
    sendFailure: function() {
      var self = this
      self.icode.disabled = false
      self.icode.buttonText = "获取验证码"
      self.icode.buttonType = "primary"
      self.icode.countDown = 60
    },
    countDown: function() {
      var self = this
      if (self.icode.countDown <= 0) {
        self.icode.buttonText = "获取验证码"
        self.icode.buttonType = "primary"
        self.icode.disabled = false
        self.icode.countDown = 60
      } else {
        self.icode.buttonText = self.icode.countDown.toString() + 's后重新获取'
        setTimeout(() => {
          self.countDown()
        }, 1000);
        this.icode.countDown--
      }
    },
    finalCommit: function() {
      var self = this;
      if (self.enroll.icode.length!=6) {
        self.$show('请输入6位验证码');
        return;
      }
      self.icode.show = false;
      var params = new FormData();
      params.append('projectid', self.enroll.projectid);
      params.append('icode', self.enroll.icode);
      params.append('name', self.enroll.name);
      params.append('telephone', self.enroll.telephone);
      params.append('sex', self.enroll.sex[0]);
      params.append('age', self.enroll.age);
      params.append('disease', self.enroll.disease);
      params.append('province', self.enroll.address[0]);
      params.append('city', self.enroll.address[1]);
      params.append('district', self.enroll.address[2]);
      params.append('detailAddress', self.enroll.detailAddress);
      params.append('comment', self.enroll.comment);
      params.append('state', self.enroll.state);
      self.enroll.images.forEach(file => {
        params.append('files', file, file.name);
      });
      self.$vux.loading.show({
        text: 'Loading'
      });
      self.$axios.post('/enroll/saveEnroll', params, {
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
        alert('err>' + err);
        console.log(err);
        self.$vux.loading.hide();
      });
    }
  },
  components: {
    XButton,
    Group,
    XInput,
    PopupPicker,
    XAddress,
    XTextarea,
    WeuiUploader,
    XButton,
    CheckIcon,
    Confirm,
    Cell
  }
}
</script>

<style scoped lang="less">
.enroll {
  background-color: #F7F7FA;
  .slot {
    text-align: right;
    margin-right: 2em;
  }
  .bottom {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #F7F7FA;
  }
  .material-title {
    font-size: 14px;
    color: #999999;
  }
  .material-list {
    margin-left: 25px;
    font-size: 12px;
    color: #999999;
  }
  .confirm {
    color: rgb(60,176,52);
  }
  .content {
    height: 300px;
    text-align: left;
    overflow: scroll;
  }
}
.vux-check-icon {
  /deep/ span {
    line-height: 30px;
  }
}
</style>
