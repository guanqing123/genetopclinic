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
                <div class="weui-uploader__info">{{images.length}}/{{max}}</div>
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
              <div>
                <slot name="desc"></slot>
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
    },
    allowTypes: { // 图片列表范围
      type: Array,
      default: () => []
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
    var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
      $gallery = document.getElementById('gallery'),$galleryImg = document.getElementById('galleryImg'),
      $uploaderInput = document.getElementById('uploaderInput'),
      $uploaderFiles = document.getElementById('uploaderFiles')
      ;

    $uploaderInput.addEventListener("change",function(e){
       debugger
      var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
      for (var i = 0, len = files.length; i < len; ++i) {
        var file = files[i];
        // 判断图片类型
        if (self.allowTypes.indexOf(file.type) === -1) {
          self.$vux.toast.show({
            type: 'text',
            text: '该类型不允许上传!',
            position: 'top',
            width: '15em'
          });
          continue;
        }
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

    $uploaderFiles.bindEvent("click", "li", function(){
      $galleryImg.setAttribute("style", this.getAttribute("style"));
      $gallery.fadeIn(5);
    });

    $gallery.bindEvent("click", function(){
      $gallery.fadeOut(5);
    });
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
@weuiGalleryOprHeight: 60px;
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
  /* 预览大图 */
  .weui-gallery {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
    z-index: 1000;
  }
  .weui-gallery__img {
    position: absolute;
    top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
    right: constant(safe-area-inset-right);
    right: env(safe-area-inset-right);
    bottom: calc(@weuiGalleryOprHeight ~"+ constant(safe-area-inset-bottom)");
    bottom: calc(@weuiGalleryOprHeight ~"+ env(safe-area-inset-bottom)");
    left: constant(safe-area-inset-left);
    left: env(safe-area-inset-left);
    background: center center no-repeat;
    background-size: contain;
  }
  .weui-gallery__opr {
    position: absolute;
    right: constant(safe-area-inset-right);
    right: env(safe-area-inset-right);
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    left: constant(safe-area-inset-left);
    left: env(safe-area-inset-left);
    background-color: #0D0D0D;
    color: #FFFFFF;
    line-height: @weuiGalleryOprHeight;
    text-align: center;
  }
  .weui-gallery__del {
    display: block;
  }
}
</style>
