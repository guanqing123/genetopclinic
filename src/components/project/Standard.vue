<template>
  <div class="standard" v-html="datas.cjbz"/>
</template>

<script>
export default {
  name: "standard",
  props: ['datas']
}
</script>

<style scoped lang="less">
.standard {
  padding: 10px;
}
</style>
