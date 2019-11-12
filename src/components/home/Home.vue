<template>
  <div class="home pull">
      <pull-up-down ref="pull" :count="pages" :current-page="currentPage" :sum="total" @doRefresh="doRefresh" @nextPage="nextPage">
      <search
        v-model="condition"
        placeholder="请输入关键字"
        auto-scroll-to-top
        @on-blur="search"
        @on-submit="search"
        @on-cancel="cancel"
      />
      <swiper
        :list="swiperList"
        auto
        loop
        :aspect-ratio = 0.4
        @on-click-list-item="clickSwiper"
      />
      <box gap="5px 0px 10px 10px">
        <div class="result-info">共获得约<span class="number-info" v-html="total"></span>条结果</div>
        <div class="project-item" v-for="project in projectList" :key="project.id" @click="goProject(project)">
          <div class="img-box">
            <img :src="project.sltPath"/>
          </div>
          <div class="info-box">
            <flexbox>
              <flexbox-item><div class="title">{{project.xmmc}}</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><div class="subtitle">适应症: {{project.syz}}</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><div class="desc">项目用药: {{project.xmyy}}</div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><span class="state">进行中</span><span class="date">截止时间:{{project.jzsj | convertTime('YYYY-MM-DD')}}</span></flexbox-item>
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
      condition: '', //搜索框内容
      loading: false, // 正在搜索
      swiperList: [], //轮播数组
      projectList: [], //项目列表
      pages: 0, //总页数
      currentPage: 1, //当前页数
      pageSize: 5, //每页条数
      total: 0 //总条数
    }
  },
  created(){
    var self = this;
    self.$axios.get('/project/swiperList')
      .then(res => {
        self.swiperList = res.data.data
      });
    self.doRefresh();
  },
  mounted(){
    this.$nextTick(function(){

    })
  },
  methods: {
    // 点击轮播,跳转详情
    clickSwiper: function(item) {
      this.$router.push({
        name: 'Project',
        params: {projectId: item.projectid}
      })
    },
    // 跳转详情
    goProject: function (project) {
      this.$router.push({
        name: 'Project',
        params: {projectId: project.projectid}
      })
    },
    search: function () {
      document.activeElement.blur();
      var self = this;
      self.doRefresh();
    },
    cancel: function () {
      document.activeElement.blur();
      var self = this
      self.$set(self, 'condition', null)
      self.doRefresh();
    },
    //执行下拉释放刷新
    doRefresh: function () {
      var self = this;
      if (self.loading) return;
      self.$set(self, 'currentPage', 1);
      self.$set(self, 'pages', 0);
      self.$set(self, 'total', 0);
      self.$set(self, 'projectList', []);
      self.$set(self, 'loading', true);
      self.getProjectList(); // 开始查询
    },
    nextPage: function () {
      var self = this;
      self.getProjectList();
    },
    getProjectList() {
      var self = this;
      self.$vux.loading.show({
        text: 'Loading'
      });
      self.$axios.get('/project/list', {
        params: {
          pageNum: self.currentPage,
          pageSize: self.pageSize,
          condition: self.condition
        }
      }).then(res => {
        if (self.$judgecode(res) === 1){
          let data = res.data.data;
          self.total = data.total;
          self.pages = data.pages;
          if (self.currentPage === 1) {
            self.$set(self, 'projectList', data.records);
          } else {
            let newArray = self.projectList.concat(data.records);
            self.$set(self, 'projectList', newArray);
          }
          self.currentPage ++;
          // 关闭下拉
          self.$refs['pull'].closePullDown();
        }
        self.$vux.loading.hide();
        self.loading = false;
      }).catch(err => {
        console.log(err)
        self.$vux.loading.hide();
        self.loading = false;
      })
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
@fontColor: rgb(153, 153, 153);

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
      color: @fontColor;
    }
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      height: 22px;
      color: @fontColor;
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
      color: @fontColor;
    }
  }
}
</style>
