<template>
  <div>
    <transition name="pull-down">
      <div class="pull-refresh" v-if="isDown>0">
        {{isDown==1?'释放刷新...':'正在刷新...'}}
      </div>
    </transition>
    <slot></slot>
    <div class="pull-bottom" v-if="currentPage>count">已全部加载</div>
    <div class="pull-bottom" v-if="currentPage<=count&&loadMoreFlag">正在加载</div>
  </div>
</template>

<script>
export default {
  name: "pull-up-down",
  props: ['count', 'currentPage', 'sum'], //总页数,当前页码
  data(){
    return {
      oldScrollTop: 0, //上一次滚动的位置
      startY: 0, //上一次的触摸位置
      downFlag: false, //是否手势为下拉
      isDown: 0, //下拉状态标志
      loadMoreFlag: false, //上拉加载上锁
      hasRequest: false //执行过请求标识
    }
  },
  methods: {
    //监听滚动到底部事件
    inBottom: function () {
      var self = this;
      // 获取页面页面的滚动高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 获取页面滚动距离顶部的高度,  window.pageYOffse 兼容苹果
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      var delta = scrollTop - self.oldScrollTop;
      self.oldScrollTop = scrollTop;
      // 获取页面的可视高度
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 40) {
        // 距离底部还有40的时候执行数据加载
        if (delta > 0) {
          //表示向上滑动
          self.downFlag = false;
          //当前页不是最后一页
          if (self.currentPage <= self.count && !self.loadMoreFlag) {
            //上锁
            self.loadMoreFlag = true;
            self.$emit("nextPage");
          }
        }
      }
    },
    //下拉刷新监听
    bindRefresh: function () {
      var self = this;
      var parent = document.querySelector(".pull");
      parent.addEventListener('touchstart', function(e) {
        self.startY = e.touches[0].pageY;
      });
      parent.addEventListener('touchmove', function(e) {
        if (self.isTop() && (e.touches[0].pageY - self.startY) > 0) {
          //显示释放刷新...
          self.downFlag = true;
          self.isDown = 1;
        }
      });
      parent.addEventListener('touchend', function(e) {
        if (self.downFlag) {
          //显示正在刷新...
          self.startY = 0;
          self.isDown = 2;
          self.downFlag = false;
          self.$emit("doRefresh");
        }
      });
    },
    //是否在顶部
    isTop: function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      return t === 0;
    },
    //关闭下拉 / 关闭上拉加载锁
    closePullDown: function () {
      var self = this;
      self.isDown = 0;
      self.loadMoreFlag = false;
      //执行过网络请求
      self.hasRequest = true;
    }
  },
  created(){
    var self = this;
    // 滚动监听
    window.addEventListener('scroll', self.inBottom, true)
  },
  mounted(){
    var self = this;
    //下拉刷新监听
    self.bindRefresh();
  }
}
</script>

<style scoped>
  .pull-refresh {
    height: 40px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    vertical-align: middle;
    text-align: center; }
  .pull-bottom {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    vertical-align: middle;
    margin-left: -15px;
    text-align: center; }
  .pull-bottom:first-child {
    padding-bottom: 70vh; }
  .pull-down-enter {
    transform: translateY(-40px); }
  .pull-down-enter-active {
    transform: translateY(0);
    transition: all ease .2s; }
  .pull-down-leave {
    transform: translateY(0); }
  .pull-down-leave-active {
    transform: translateY(-40px);
    transition: all ease .2s; }
</style>
