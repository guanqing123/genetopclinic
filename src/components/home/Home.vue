<template>
  <div id="home">
      <search
        v-model="searchText"
        placeholder="请输入关键字"
        auto-scroll-to-top
        @on-submit="beginSearch"
        @on-cancel="cancel"
      />
      <swiper
        :list="swiperList"
        auto
        loop
        :aspect-ratio = 0.4
      />
      <div>aaa</div>
    <div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div><div>aaa</div>
  </div>
</template>

<script>
import { Search, Swiper } from 'vux'
export default {
  name: "home",
  data(){
    return {
      searchText: '', //搜索框内容
      swiperList: [] //轮播数组
    }
  },
  created(){
    this.$axios.get('/homepage/getHomePageList')
      .then(res => {
        console.log(JSON.stringify(res))
        this.swiperList = res.data.data.map(item =>{
          return {
            url: '/PersonCenter',
            img: item.fileRealPath,
            title: item.title
          }
        })
        console.log(this.swiperList)
      })
      .catch(err => console.log(err))
  },
  methods: {
    beginSearch: function (value) {
      alert('beginSearch:'+value+'searchText:'+this.searchText)
    },
    cancel: function () {
      alert(this.searchText)
    }
  },
  components: {
    Search,
    Swiper
  }
}
</script>

<style scoped>

</style>
