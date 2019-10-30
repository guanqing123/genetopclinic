<template>
  <div class="wait pull">
    <pull-up-down ref="pull" :count="pages" :current-page="currentPage" :sum="total" @doRefresh="doRefresh" @nextPage="nextPage">
      <box gap="5px 0px 10px 10px">
        <div class="result-info">共获得约<span class="number-info" v-html="total"></span>条结果</div>
        <div class="project-item" v-for="project in projectList" :key="project.id" @click="goProject(project)">
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
import { Box, Flexbox, FlexboxItem} from 'vux'
export default {
  name: "wait",
  data(){
    return {
      projectList: [], //项目列表
      pages: 0, //总页数
      currentPage: 1, //当前页数
      total: 0 //总条数
    }
  },
  created(){
    this.getProjectList();
  },
  methods: {
    // 跳转详情
    goProject: function (project) {
      console.log(project)
      this.$router.push({
        name: 'Project',
        params: {projectId: project.id}
      })
    },
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
      self.$set(self, 'pages', 0);
      self.$set(self, 'total', 0);
      self.$set(self, 'projectList', []);
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
      self.$axios.get('/sellactivity/getSellingActivityFenye',{
        params: {
          userid : '180321105710',
          pageNum: self.currentPage,
          pageSize: 10
        }
      }).then(res => {
        if (self.$judgecode(res) === 1){
          let data = res.data.data;
          self.total = data.total
          self.pages = data.pages
          if (self.currentPage === 1) {
            self.$set(self, 'projectList', data.list);
          } else {
            let newArray = self.projectList.concat(data.list);
            self.$set(self, 'projectList', newArray);
          }
          self.currentPage ++
          // 关闭下拉
          self.$refs['pull'].closePullDown();
        }
        this.$vux.loading.hide()
      }).catch(err => {
        console.log(err)
        this.$vux.loading.hide()
      })
    }
  },
  components: {
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

.wait {
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
