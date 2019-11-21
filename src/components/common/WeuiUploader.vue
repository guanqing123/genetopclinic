<template>
  <div class="page">
    <div class="page__bd">
      <!-- 老的预览方式
      <div class="weui-gallery" id="gallery">
        <span class="weui-gallery__img" id="galleryImg"></span>
        <div class="weui-gallery__opr">
          <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
          </a>
        </div>
      </div>
      -->

      <div v-transfer-dom>
        <previewer :list="preSrc" ref="previewer" :options="options" @on-close="onPreviewClose"></previewer>
      </div>

      <!--<div class="weui-cells weui-cells_form">因为外面已经有一层group包含weui-cells-->
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">{{title}}</p>
                <div class="weui-uploader__info">{{images.length}}/{{max}}</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
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
                  <li v-for="(img, index) in imgSrc" class="weui-uploader__file imgitem" :style="img" @click="show(index)">
                    <div class="delete" @click="deleteImg($event, index)">x</div>
                  </li>
                </ul>
                <div class="weui-uploader__input-box">
                  <input ref="uploaderInput" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                </div>
              </div>
              <div>
                <slot name="desc"></slot>
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
  name: "weui-uploader",
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
      default: 0
    },
    allowTypes: { // 图片列表范围
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: "images", // 绑定的值,通过父组件传递
    event: "update" // 自定义事件名
  },
  watch: {
    images : function(val, oldVal) {
      this.$emit('update', val)
    }
  },
  data(){
    return {
      src: '',
      defaultImg: 'background-image:url('+require('../../assets/pic_160.png')+')',
      imgSrc: [],
      preSrc: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.imgitem')[index];
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
  methods : {
    deleteImg: function (e, index) {
      e.stopPropagation();
      var self = this;
      self.imgSrc.splice(index, 1);
      self.preSrc.splice(index, 1);
      self.images.splice(index, 1);
    },
    show: function (index) {
      this.$refs.previewer.show(index)
    },
    onPreviewClose: function () {
      this.$refs.previewer.photoswipe = null
    },
    compressImage: function (file, success, error) { // 压缩图片
        var self = this;
        // 图片小于1M不压缩
        if (file.size < Math.pow(1024, 2)) {
          return success(file);
        }
        const name = file.name; //文件名
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          const src = e.target.result;

          const img = new Image();
          img.src = src;
          img.onload = function (e) {
            const w = img.width;
            const h = img.height;
            const quality = 0.5; // 默认图片质量为0.92
            // 生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute("width");
            anw.nodeValue = w;
            const anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);

            ctx.drawImage(img, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            const base64 = canvas.toDataURL('image/jpeg', quality); //图片格式jpeg或webp可以选0-1质量区间

            // 返回base64转blob的值
            console.log(`原图${(src.length/(1024*1024)).toFixed(2)}mb`, `新图${(base64.length/(1024*1024)).toFixed(2)}mb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
            }
            file = new Blob( [ab] , {type : 'image/jpeg'});
            file.name = name;

            success(file);
          }
          img.onerror = function (e) {
            error(e);
          }
        }
        reader.onerror = function (e) {
          error(e);
        }
    },
    detectVerticalSquash: function(img) {
      // 拍照在IOS7或以下的机型会出现照片被压扁的bug
      var data
      var ih = img.naturalHeight
      var canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = ih
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      try {
        data = ctx.getImageData(0, 0, 1, ih).data
      } catch (err) {
        console.log('Cannot check verticalSquash: CORS?')
        return 1
      }
      var sy = 0
      var ey = ih
      var py = ih
      while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3]
        if (alpha === 0) {
          ey = py
        } else {
          sy = py
        }
        py = (ey + sy) >> 1 // py = parseInt((ey + sy) / 2)
      }
      var ratio = (py / ih)
      return (ratio === 0) ? 1 : ratio
    },
    dataURItoBuffer: function(dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var buffer = new ArrayBuffer(byteString.length)
      var view = new Uint8Array(buffer)
      for (var i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i)
      }
      return buffer
    },
    dataURItoBlob: function(dataURI) {
      var self = this;
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var buffer = self.dataURItoBuffer(dataURI)
      return new Blob([buffer], {type: mimeString})
    },
    getOrientation: function(buffer) {
      var view = new DataView(buffer)
      if (view.getUint16(0, false) != 0xFFD8) return -2
      var length = view.byteLength, offset = 2
      while (offset < length) {
        var marker = view.getUint16(offset, false)
        offset += 2
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return -1
          var little = view.getUint16(offset += 6, false) == 0x4949
          offset += view.getUint32(offset + 4, little)
          var tags = view.getUint16(offset, little)
          offset += 2
          for (var i = 0; i < tags; i++)
          {
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
            {return view.getUint16(offset + (i * 12) + 8, little);}
          }
        } else if ((marker & 0xFF00) != 0xFF00) break
        else offset += view.getUint16(offset, false)
      }
      return -1
    },
    orientationHelper: function(canvas, ctx, orientation) {
      const w = canvas.width, h = canvas.height
      if (orientation > 4) {
        canvas.width = h
        canvas.height = w
      }
      switch (orientation) {
        case 2:
          ctx.translate(w, 0)
          ctx.scale(-1, 1)
          break
        case 3:
          ctx.translate(w, h)
          ctx.rotate(Math.PI)
          break
        case 4:
          ctx.translate(0, h)
          ctx.scale(1, -1)
          break
        case 5:
          ctx.rotate(0.5 * Math.PI)
          ctx.scale(1, -1)
          break
        case 6:
          ctx.rotate(0.5 * Math.PI)
          ctx.translate(0, -h)
          break
        case 7:
          ctx.rotate(0.5 * Math.PI)
          ctx.translate(w, -h)
          ctx.scale(-1, 1)
          break
        case 8:
          ctx.rotate(-0.5 * Math.PI)
          ctx.translate(-w, 0)
          break
      }
    },
    compress: function(file, options, callback) {
      var self = this;
      const reader = new FileReader()
      reader.onload = function (evt) {
        if (options.compress === false) {
          // 不启用压缩 & base64上传 的分支，不做任何处理，直接返回文件的base64编码
          file.base64 = evt.target.result
          callback(file)
          return
        }

        // 启用压缩的分支
        const img = new Image()
        img.onload = function () {
          const ratio = self.detectVerticalSquash(img)
          const orientation = self.getOrientation(self.dataURItoBuffer(img.src))
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          const maxW = options.compress.width
          const maxH = options.compress.height
          let w = img.width
          let h = img.height
          let dataURL

          if (w < h && h > maxH) {
            w = parseInt(maxH * img.width / img.height)
            h = maxH
          } else if (w >= h && w > maxW) {
            h = parseInt(maxW * img.height / img.width)
            w = maxW
          }

          canvas.width = w
          canvas.height = h
          debugger
          if (orientation > 0) {
            self.orientationHelper(canvas, ctx, orientation)
          }
          ctx.drawImage(img, 0, 0, w, h / ratio)

          if (/image\/jpeg/.test(file.type) || /image\/jpg/.test(file.type)) {
            dataURL = canvas.toDataURL('image/jpeg', options.compress.quality)
          } else {
            dataURL = canvas.toDataURL(file.type, options.compress.quality)
          }

          if (options.type == 'file') {
            if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
              // 压缩出错，以文件方式上传的，采用原文件上传
              console.warn('Compress fail, dataURL is ' + dataURL + '. Next will use origin file to upload.')
              callback(file)
            } else {
              let blob = self.dataURItoBlob(dataURL)
              blob.id = file.id
              blob.name = file.name
              blob.lastModified = file.lastModified
              blob.lastModifiedDate = file.lastModifiedDate
              callback(blob)
            }
          } else {
            if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
              // 压缩失败，以base64上传的，直接报错不上传
              options.onError(file, new Error('Compress fail, dataURL is ' + dataURL + '.'))
              callback()
            } else {
              file.base64 = dataURL
              callback(file)
            }
          }
        }
        img.src = evt.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  mounted(){
    /*var $gallery = document.getElementById('gallery'),$galleryImg = document.getElementById('galleryImg'),
      $uploaderInput = document.getElementById('uploaderInput'),
      $uploaderFiles = document.getElementById('uploaderFiles'),
      $uploaderInput = document.getElementById('uploaderInput');*/
    var self = this;
    var $uploaderInput = this.$refs.uploaderInput;

    $uploaderInput.addEventListener("change",function(e){
      var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
      for (var i = 0, len = files.length; i < len; ++i) {
        var file = files[i];
        // 判断图片类型
        if (self.allowTypes.length && self.allowTypes.indexOf(file.type) === -1) {
            self.$show('该类型不允许上传!');
            continue;
        }
        // 判断图片数量
        if (self.max && self.images.length >= self.max) {
            self.$show('图片数量超出'+ self.max + '张！');
            break;
        }

        /*if (url) {
          src = url.createObjectURL(file);
        } else {
          src = e.target.result;
        }
        (function (file, src) {
          self.compressImage(file, function (file) {
            self.images.push(file);
            self.imgSrc.push("background-image: url("+src+")");
            self.preSrc.push({msrc:src, src:src});
          }, self.$noop());
        })(file, src);*/

        (function(file, url, e){
          self.compress(file, {type: 'file',compress: {width:800, height: 800, quality: 0.8}} , function(file){
            self.images.push(file);
            if (url) {
              src = url.createObjectURL(file);
            } else {
              src = e.target.result;
            }
            self.imgSrc.push("background-image: url("+src+")");
            self.preSrc.push({msrc:src, src:src});
          });
        })(file, url, e);

        /*self.compressImage(file, function(file) {
          self.images.push(file);
          // 涉及变量提升的概念,更改为闭包
          self.imgSrc.push("background-image: url("+src+")");
          self.preSrc.push({msrc:src, src:src});
        }, self.$noop());*/
      }
    });

    /* 使用vue @事件代替
    $uploaderFiles.bindEvent("click", "li", function(){
      $galleryImg.setAttribute("style", this.getAttribute("style"));
      $gallery.fadeIn(5);
    });

    $gallery.bindEvent("click", function(){
      $gallery.fadeOut(5);
    });*/
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer
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
  .weui-uploader__hd {
    padding-bottom: 0px;
  }
  .weui-uploader__file {
    margin-top: 9px;
    margin-right: 15px;
  }
  .weui-uploader__input-box {
    margin-top: 9px;
    margin-right: 15px;
  }
}
.imgitem {
  position: relative;
  border: 1px solid #D9D9D9;
  .delete {
    position: absolute;
    top: -9px;
    right: -9px;
    width: 20px;
    height: 20px;
    border-radius: 9px;
    background-color: rgba(167,167,167, 0.7);
    border: none;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
