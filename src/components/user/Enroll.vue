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
      <x-input type="text" v-model="enroll.disease" placeholder="请填写" required>
        <label slot="label" class="weui-label slot iconfont icon-bitian">所患疾病：</label>
      </x-input>
      <x-input title="用药情况：" type="text" v-model="enroll.disease" placeholder="请填写"/>
      <x-address ref="address" title="所在地区" popupTitle="所在地区" :raw-value="false" :list="addressData" placeholder="请选择" value-text-align="left" @on-hide="getAddress">
        <label slot="title" class="weui-label slot iconfont icon-bitian">所在地区：</label>
      </x-address>
      <x-textarea title="详细地址：" v-model="enroll.detailAddress" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
      <x-textarea title="备注信息：" v-model="enroll.comment" placeholder="请填写" :show-counter="true" :rows="2" :max="50"></x-textarea>
    </group>
  </div>
</template>

<script>
import { Group, XInput, PopupPicker, XAddress, ChinaAddressV4Data, XTextarea } from 'vux'
export default {
  name: "enroll",
  data(){
    return {
      enroll : {
        name: '', // 姓名
        telephone: '', // 手机号
        sex: [], // 性别
        disease: '', //所患疾病
        medication: '', //用药情况
        address: [], //所在地区
        detailAddress: '', //详细地址
        comment: '' //备注
      },
      list: [['男','女']],
      addressData: ChinaAddressV4Data,
      uploadUrl:'',
      params:''
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
    }
  },
  components: {
    Group,
    XInput,
    PopupPicker,
    XAddress,
    XTextarea
  }
}
</script>

<style scoped lang="less">
.enroll {
  .slot {
    text-align: right;
    margin-right: 2em;
  }
}
</style>
