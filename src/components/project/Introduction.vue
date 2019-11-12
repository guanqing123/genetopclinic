<template>
  <div class="introduction" v-html="datas.xmjs"/>
</template>

<script>
export default {
  name: "introduction",
  props: ['datas']
}
</script>

<style scoped lang="less">
.introduction {
  padding: 10px;

  /deep/ img {
    width: 100%;
  }
}
/*
lang="css"
.introduction >>> img {
  width: 100%;
}*/
</style>
