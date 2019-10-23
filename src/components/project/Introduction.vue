<template>
  <div class="introduction" v-html="datas.content"/>
</template>

<script>
export default {
  name: "introduction",
  props: ['datas'],
  created(){
    console.log("introduction:"+JSON.stringify(this.datas))
  }
}
</script>

<style scoped lang="css">
.introduction {
  padding: 10px;
}
.introduction >>> img {
  width: 100%;
}
</style>
