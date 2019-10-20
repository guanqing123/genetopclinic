<template>
  <div id="home" class="home">
      <pull-up-down ref="pull" :count="pages" :current-page="currentPage" :sum="total" @doRefresh="doRefresh" @nextPage="nextPage">
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
      <box gap="5px 0px 10px 10px">
        <div class="result-info">共获得约<span class="number-info" v-html="total"></span>条结果</div>
        <div class="project-item" v-for="project in projectList" :key="project.id">
          <div class="img-box">
            <img :src="project.fileRealPath"/>
          </div>
          <div class="info-box">
            <flexbox>
              <flexbox-item><div class="title">招募EGFR突变非小细胞癌地方发电房地方发大发发电房发放大幅度的发的</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><div class="subtitle">适应症: EGFR突变的非小细胞癌</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><div class="desc">项目用药: PD-1</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><span class="state">进行中</span><span class="date">截止时间:{{project.createDate}}</span></flexbox-item>
            </flexbox>
          </div>
        </div>
      </box>
      </pull-up-down>
  </div>
</template>

<script>
import { Search, Swiper, Box, Flexbox, FlexboxItem} from 'vux'
export default {
  name: "home",
  data(){
    return {
      searchText: '', //搜索框内容
      swiperList: [], //轮播数组
      projectList: [], //项目列表
      pages: 0, //总页数
      currentPage: 1, //当前页数
      total: 0 //总条数
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
    this.getProjectList();
  },
  methods: {
    beginSearch: function (value) {
      alert('beginSearch:'+value+'searchText:'+this.searchText)
    },
    cancel: function () {
      alert(this.searchText)
    },
    //执行下拉释放刷新
    doRefresh: function () {
      var self = this;
      self.$set(self, 'currentPage', 1);
      alert('doRefresh')
    },
    nextPage: function () {
      alert('nextPage')
    },
    getProjectList() {
      var self = this;
      self.$vux.loading.show({
        text: 'Loading'
      });
      self.$axios.get('/sellactivity/getSellingActivityFenye',{
        params: {
          userid : '180321105710',
          pageNum: self.currentPage,
          pageSize: 10
        }
      }).then(res => {
        console.log(self.$judgecode(res))
        if (self.$judgecode(res)){
          let data = res.data.data
          this.projectList = data.list
          this.total = data.total
          this.pages = data.pages
        }
        this.$vux.loading.hide()
      }).catch(err => {
        console.log(err)
        this.$vux.loading.hide()
      })
      /*this.$axios.get('/sellactivity/getSellingActivityFenye?userid=180321105710&pageNum=1&pageSize=10')
        .then(res => {
          console.log(res)
          this.projectList = res.data.data.list
          this.total = res.data.data.total
          this.pages = res.data.data.pages
          this.$vux.loading.hide()
        })
        .catch(err => {
          console.log(err)
          this.$vux.loading.hide()
        })*/
    }
  },
  components: {
    Search,
    Swiper,
    Box,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style scoped lang="less">
@width114: 114px;
@width94: 94px;
.home {
  .result-info {
    border-bottom: 1px solid rgba(153,153,153,0.3);
    padding-bottom: 5px;
    color: rgba(153,153,153,0.8);
    font-size: 14px;
    letter-spacing: 1px;
  }
  .number-info {
    color: rgba(60,176,52,0.8);
  }
}
.project-item {
  background: #ffffff;
  width: 100%;
  height: @width114;
  border-radius: 6px;
  margin-bottom: 10px;
  .img-box {
    float: left;
    width: @width94;
    height: @width94;
    background-color: #eaeeef;
    margin: (@width114 - @width94)/2 0px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info-box {
    float: right;
    width: calc(~"100% - @{width94}");
    height: 100%;
    box-sizing: border-box;
    padding: 10px 10px;
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      height: 25px;
    }
    .subtitle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      height: 22px;
    }
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      height: 22px;
    }
    .state {
      background-color: rgb(60,176,52);
      font-size: 12px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
      margin-right: 10px;
      color: white;
      letter-spacing: 1px;
    }
    .date {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>
