<template>
  <div class="page">
    <div class="page__bd">
      <!-- 浏览图片 -->
      <div v-transfer-dom>
        <previewer :list="images" ref="duppreviewer" :options="options" @on-close="onPreviewClose"></previewer>
      </div>
      <!--<div class="weui-cells weui-cells_form">因为外面已经有一层group包含weui-cells-->
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li v-for="(image, index) in images" class="weui-uploader__file dupimgitem" :style="{backgroundImage: `url(${image.src})`}" @click="show(index)"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
export default {
  name: "weui-browser",
  components: {
    Previewer
  },
  directives: {
    TransferDom
  },
  props: {
    title: { // 标题
      type: String
    },
    images: { // 图片列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.dupimgitem')[index];
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  methods: {
    show: function (index) {
      this.$refs.duppreviewer.show(index)
    },
    onPreviewClose: function () {
      this.$refs.duppreviewer.photoswipe = null
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.page {
  .weui-uploader__file {
    margin-top: 9px;
    margin-right: 15px;
  }
}
.dupimgitem {
  border: 1px solid #D9D9D9;
}
</style>
