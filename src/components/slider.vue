<template>
  <div class="swiperBox"  :style="{position: 'relative',height: styles.height+'px'}" >
    <div class="swiper-container" :style="{width: styles.width + 'px',position: 'absolute',height: styles.height+'px',left: '50%',marginLeft: '-960px'}">
    <div class="swiper-wrapper">
         <div v-for="(item, index) in imgList" :key="index"    class="swiper-slide" >
            <router-link :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"   ><img :src="item.FileUrl"  style="height: 500px"   /></router-link> 
       </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div  v-if="imgList.length>1" class="swiper-button-prev" style="left: 50%; margin-left: -620px"></div>
    <div  v-if="imgList.length>1" class="swiper-button-next" style="left: 50%; margin-left: 600px"></div>

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
</div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'Slider',
  props: {
   imgList: { // 图片列表 src数组
      type: Array,
      default: () => []
    },
    isShowPosition: { // 是否显示下方小圆点
      type: Boolean,
      default: true
    },
    isShowLeftOrRightBtn: { // 是否显示左右按钮
      type: Boolean,
      default: true
    },
    duration: { // 切换间隔
      type: [Number, String],
      default: 5000
    },
    animationT: {
     type: Object,
     default: () => {
        return {
          speed: 20,
          speedTime: 20
        }
      }
    },
    styles: { // 自定义轮播图片宽高 默认500*300
      type: Object,
      default: () => {
        return {
          width: 1920,
          height: 500
        }
      }
    }
  },
  data () {
    return {
      active: 1, // 当前轮播图片
      timer: null,// 定时器
      len: 1,
      screenWidthtimer: false,
      screenWidth: document.body.clientWidth, // 屏幕宽度
    }
  },
   mounted () {
    if(this.imgList.length>1){
      var mySwiper = new Swiper ('.swiperBox .swiper-container', {
                  loop: true,
                  // 如果需要分页器
                  pagination: '.swiperBox .swiper-pagination',
                  // 如果需要前进后退按钮
              
                  nextButton: '.swiperBox .swiper-button-next',
                  prevButton: '.swiperBox .swiper-button-prev',
      })
    }        
  },

}
</script>
<style lang="scss" scoped >
.swiperBox{
   .swiper-button-prev,.swiper-button-next{
            display: none;
   }
   &:hover{
       .swiper-button-prev,.swiper-button-next{
            display: block;
       }
   }
}
</style>