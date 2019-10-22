<template>
  <div class="enroll">
    <group>
      <x-input v-model="name">
        <span slot="label" class="iconfont icon-bitian2-5">aaa</span>
        <!--<span slot="label">姓名xxx:</span>-->
      </x-input>
    </group>
  </div>
</template>

<script>
import { Group, XInput } from 'vux'
export default {
  name: "enroll",
  data(){
    return {
      name: '' // 姓名
    }
  },
  components: {
    Group,
    XInput
  }
}
</script>

<style scoped lang="css">

</style>
