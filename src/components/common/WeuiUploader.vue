<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-gallery" id="gallery">
        <span class="weui-gallery__img" id="galleryImg"></span>
        <div class="weui-gallery__opr">
          <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
          </a>
        </div>
      </div>

      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">{{title}}</p>
                <div class="weui-uploader__info">{{4}}/{{5}}</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles" v-html="imgStr">
                  <!--<li class="weui-uploader__file" :style="defaultImg"></li>-->
                  <!--<li class="weui-uploader__file" :style="defaultImg"></li>-->
                  <!--<li class="weui-uploader__file weui-uploader__file_status" :style="defaultImg">-->
                    <!--<div class="weui-uploader__file-content">-->
                      <!--<i class="weui-icon-warn"></i>-->
                    <!--</div>-->
                  <!--</li>-->
                  <!--<li class="weui-uploader__file weui-uploader__file_status" :style="defaultImg">-->
                    <!--<div class="weui-uploader__file-content">50%</div>-->
                  <!--</li>-->
                </ul>
                <div class="weui-uploader__input-box">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title:{ // 标题
      type: String,
      default: '图片上传'
    },
    images: { // 图片数组
      type: Array,
      default: () => []
    },
    max: { // 图片上传最大数
      type: Number,
      default: 1
    }
  },
  name: "weui-uploader",
  data(){
    return {
      defaultImg: 'background-image:url('+require('../../assets/pic_160.png')+')',
      imgStr:''
    }
  },
  mounted(){
    var self = this;
    // var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
    var tmpl = '<li class="weui-uploader__file"><img src="#url#"/></li>',
      $gallery = document.getElementById('gallery'),$galleryImg = document.getElementById('galleryImg'),
      $uploaderInput = document.getElementById('uploaderInput'),
      $uploaderFiles = document.getElementById('uploaderFiles')
      ;

    $uploaderInput.addEventListener("change",function(e){
      // debugger
      var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
      for (var i = 0, len = files.length; i < len; ++i) {
        var file = files[i];
        if (url) {
          src = url.createObjectURL(file);
        } else {
          src = e.target.result;
        }
        // $uploaderFiles.insertAdjacentHTML('beforeend', tmpl.replace('#url#', src));
        let tempStr = self.imgStr.concat(tmpl.replace('#url#', src))
        self.$set(self, 'imgStr', tempStr);
      }
    });
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.page {
  .weui-cells {
    margin-top: 0px;
  }
  /deep/ .weui-uploader__file {
    float: left;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 79px;
    height: 79px;
    background: no-repeat center center;
    background-size: cover;
  }
  /deep/ img {
    width: 100%;
  }
}
</style>
