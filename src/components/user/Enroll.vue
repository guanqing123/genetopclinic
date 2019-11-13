<template>
  <div class="enroll">
    <group label-margin-right="2em" label-align="right">
      <x-input type="text" v-model="enroll.name" placeholder="请填写" required is-type="china-name">
        <label slot="label" class="weui-label slot iconfont icon-bitian">姓名：</label>
      </x-input>
      <x-input type="tel" v-model="enroll.telephone" placeholder="请填写" required is-type="china-mobile">
        <label slot="label" class="weui-label slot iconfont icon-bitian">手机号：</label>
      </x-input>
      <popup-picker placeholder="请选择" popup-title="性别" :data="list" v-model="enroll.sex" value-text-align="left">
        <label slot="title" class="weui-label slot iconfont icon-bitian">性别：</label>
      </popup-picker>
      <x-input type="number" v-model="enroll.age" placeholder="请填写" required>
        <label slot="label" class="weui-label slot iconfont icon-bitian">年龄：</label>
      </x-input>
      <x-input type="text" v-model="enroll.disease" placeholder="请填写" required>
        <label slot="label" class="weui-label slot iconfont icon-bitian">所患疾病：</label>
      </x-input>
      <x-address ref="address" title="所在地区" popupTitle="所在地区" :raw-value="false" :list="addressData" placeholder="请选择" value-text-align="left" @on-hide="getAddress">
        <label slot="title" class="weui-label slot iconfont icon-bitian">所在地区：</label>
      </x-address>
      <x-textarea title="详细地址：" v-model="enroll.detailAddress" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
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
        <a href="javascript:;" @click="clickDeal" class="confirm">《某某协议》</a>
      </div>
    </group>
    <confirm
      v-model="show"
      class="confirm"
      title="xxx协议"
      cancelText="返回"
      confirmText="同意"
      @on-confirm="agreeDeal">
      <div class="content">夏日总是燥热的，在这个偏僻的小山村，住着几百庄稼人，还有这排列整齐却显破旧的房屋。纵使夏日骄阳，汗流浃背，人们也不舍得休息。只有在一处房屋前，有几人在焦急的等待，里面还时不时的传出几声妇人的痛苦的呻吟声。没过多久，里面传来了婴儿的啼哭，所有人都松了一口气。就在所有人都认为一切已经皆大欢喜，准备办一场酒宴的时候，一阵骚乱传来，里面的孕妇血崩死了。有人在这个世上出生，就有人死亡，或许他的命运就是从此刻开始改变的.时间如流水般，静静地流淌，转瞬之间，已是十五年后，当初的婴孩也步入了少年时期，这个年纪，本该是肆意张扬，潇洒快活的时候，而少年却无法像同龄人一般肆意玩闹，他每天都很忙很累。不是像别人一样被敦促学习，对于他来说，学不学习都不重要了，因为将这高中读完，他就只能缀学回家，帮父母料理农活。实际上，从很久之前，他就开始下地干活了，每天除了学习之外，其余的时间都是在田野里度过的。时间如流水般，静静地流淌，转瞬之间，已是十五年后，当初的婴孩也步入了少年时期，这个年纪，本该是肆意张扬，潇洒快活的时候，而少年却无法像同龄人一般肆意玩闹，他每天都很忙很累。不是像别人一样被敦促学习，对于他来说，学不学习都不重要了，因为将这高中读完，他就只能缀学回家，帮父母料理农活。实际上，从很久之前，他就开始下地干活了，每天除了学习之外，其余的时间都是在田野里度过的。时间如流水般，静静地流淌，转瞬之间，已是十五年后，当初的婴孩也步入了少年时期，这个年纪，本该是肆意张扬，潇洒快活的时候，而少年却无法像同龄人一般肆意玩闹，他每天都很忙很累。不是像别人一样被敦促学习，对于他来说，学不学习都不重要了，因为将这高中读完，他就只能缀学回家，帮父母料理农活。实际上，从很久之前，他就开始下地干活了，每天除了学习之外，其余的时间都是在田野里度过的。</div>
    </confirm>
    <group class="bottom">
      <x-button type="primary" :disabled="!agree" @click.native="commit">提交</x-button>
    </group>
  </div>
</template>

<script>
import { Group, XInput, PopupPicker, XAddress, ChinaAddressV4Data, XTextarea, XButton, CheckIcon, Confirm } from 'vux'
import WeuiUploader from '../common/WeuiUploader'
export default {
  name: "enroll",
  data(){
    return {
      enroll : {
        name: '', // 姓名
        telephone: '', // 手机号
        sex: [], // 性别
        disease: '', //所患疾病
        address: [], //所在地区
        detailAddress: '', //详细地址
        comment: '', //备注
        images: []
      },
      list: [['男','女']],
      addressData: ChinaAddressV4Data,
      agree: false,
      show: false
    }
  },
  methods: {
    getAddress: function (sure) {
      if (sure){
        let nameValue = this.$refs['address'].nameValue;
        if (nameValue.length > 0) {
          let names = nameValue.split(' ');
          this.enroll.address.length = 0;
          Array.prototype.push.call(this.enroll.address, names);
        }
      }
    },
    clickDeal: function() {
      this.show = true;
    },
    agreeDeal: function(){
      this.agree = true
    },
    commit: function(){
      this.$router.push({
        path: '/PersonCenter'
      })
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
    Confirm
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
    height: 200px;
    overflow: scroll;
  }
}
.vux-check-icon {
  /deep/ span {
    line-height: 30px;
  }
}
</style>
