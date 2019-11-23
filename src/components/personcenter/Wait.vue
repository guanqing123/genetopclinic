<template>
  <div class="wait pull">
    <pull-up-down ref="pull" :count="pages" :current-page="currentPage" :sum="total" :pull-down="false" @nextPage="nextPage">
      <box gap="5px 0px 10px 10px">
        <div class="result-info">共获得约<span class="number-info" v-html="total"></span>条结果</div>

        <swipeout>
          <swipeout-item :threshold=".5" v-for="enroll in enrollList" :key="enroll.enrollid" transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onExploreClick(enroll)" type="primary">详情</swipeout-button>
              <swipeout-button @click.native="onDeleteClick(enroll)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="project-item">
              <div class="img-box">
                <img :src="enroll.sltPath"/>
              </div>
              <div class="info-box">
                <flexbox>
                  <flexbox-item><div class="title">{{enroll.xmmc}}</div></flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item><div class="subtitle">所患疾病: {{enroll.disease}}</div></flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item><div class="desc">手机号: {{enroll.telephone}}</div></flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item><span class="state">等待审核</span><span class="date">用户名: {{enroll.name}}</span></flexbox-item>
                </flexbox>
              </div>
            </div>
          </swipeout-item>
        </swipeout>

      </box>
    </pull-up-down>
  </div>
</template>

<script>
import { Box, Swipeout, SwipeoutItem, SwipeoutButton, Flexbox, FlexboxItem } from 'vux'
import qs from 'Qs'
export default {
  name: "wait",
  data(){
    return {
      enrollList: [], //报名列表
      pages: 0, //总页数
      currentPage: 1, //当前页数
      pageSize: 10, //每页几条
      total: 0, //总条数
      state: 0  //等待审核
    }
  },
  created(){
    this.doRefresh();
  },
  methods: {
    //执行下拉释放刷新
    doRefresh: function () {
      var self = this;
      self.$set(self, 'currentPage', 1);
      self.$set(self, 'pages', 0);
      self.$set(self, 'total', 0);
      self.$set(self, 'enrollList', []);
      self.getEnrollList(); // 开始查询
    },
    nextPage: function () {
      var self = this;
      self.getEnrollList();
    },
    getEnrollList() {
      var self = this;
      self.$vux.loading.show({
        text: 'Loading'
      });
      self.$axios.get('/enroll/getEnrollList',{
        params: {
          state : self.state,
          pageNum: self.currentPage,
          pageSize: self.pageSize
        }
      }).then(res => {
        if (self.$judgecode(res) === 1){
          let data = res.data.data;
          self.total = data.total
          self.pages = data.pages
          if (self.currentPage === 1) {
            self.$set(self, 'enrollList', data.records);
          } else {
            let newArray = self.enrollList.concat(data.records);
            self.$set(self, 'enrollList', newArray);
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
    },
    onExploreClick: function (enroll) {
      this.$router.push({
        name: 'Explore',
        params: {enrollid: enroll.enrollid}
      })
    },
    onDeleteClick: function (enroll) {
        var self = this;
        this.$vux.confirm.show({
          title: '确认删除此报名',
          content: `${enroll.xmmc}`,
          onConfirm () {
            self.$vux.loading.show({
              text: 'Loading'
            });
            self.$axios.post('/enroll/deleteEnroll',
                qs.stringify({
                  enrollid: enroll.enrollid
                })
             )
            .then(function (response) {
              if (self.$judgecode(response) == 1) {
                self.doRefresh();
              }
              self.$vux.loading.hide();
              self.$show('删除成功');
             })
            .catch(function (error) {
              self.$vux.loading.hide();
              self.$show('网络异常')
            });
          }
        })
    }
  },
  components: {
    SwipeoutButton,
    SwipeoutItem,
    Swipeout,
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
      background-color: rgb(255, 167, 0);
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
