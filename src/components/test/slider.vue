<template>
  <div id="Slider"  v-if='len > 1'  style="width: 100%"    :style="{ maxWidth: styles.width+'px' ,height: styles.height+'px'}">
    <div class="imgBox">
          <div v-for="(item, index) in imgList" :key="index"  :ref='index'  :style="{left: item.left+'px'}"  :class="['img-item',{'active': index === active}]">
            <router-link v-if="item.Url.indexOf('http') == -1" :to="item.Url" ><img :src="item.FileUrl"  style="width: 100%"  :style="{height: styles.height+'px'}" /></router-link> 
            <a v-else  :href="item.Url"><img :src="item.FileUrl"  style="width: 100%"  :style="{height: styles.height+'px'}" /></a>
          </div>
    </div>
    <div class="img-position" v-if="isShowPosition">
      <template v-for="(item, index) in imgList" >
        <span :key="index" :class="['img-position-item',{'active': index === active},'circle']" @click="clickDot(index)" >
        </span>
      </template>
    </div>
    <div class="btn" @mouseenter="clearTimer()" @mouseleave="setTimer()" >
      <div class="left-btn" v-if="isShowLeftOrRightBtn" @click="clickBtn('left')">
        <i class="iconfont roll-zuo"></i>
      </div>
      <div class="right-btn" v-if="isShowLeftOrRightBtn" @click="clickBtn('right')">
        <i class="iconfont roll-you"></i>
      </div>
    </div>
  </div>
  <div id="slider" v-else >
    <div class="imgBox">
         <div class="img-item" >
            <a :href="imgList[0].Url">
               <img :src="imgList[0].FileUrl"  style="width: 100%"  :style="{height: styles.height+'px'}" />
            </a>
         </div>
    </div>
  </div>
</template>

<script>
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
          height: 480
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
  updated () {
    if( this.len>1){
      if (this.timer)this.clearTimer()
      this.setTimer()
    }
  },
  created () {
    this.len = this.imgList.length
    if(this.len>1)this.setTimer()
  },
  methods: {
    clickDot (id) {
      if(id < this.active ) {
        this.move(parseFloat((this.active-id)*this.$root.$el.clientWidth/this.animationT.speed),id)
        this.active = id
      }
      if(id > this.active){
        this.move(parseFloat(-(id-this.active)*this.$root.$el.clientWidth/this.animationT.speed),id)
        this.active = id
      }
    },
    clickBtn (arg) {
      this.clearTimer()
      if (arg === 'left') {
        this.active = (this.len+this.active+1) % this.len
        this.move(this.$root.$el.clientWidth /this.animationT.speed,this.active)
      } else {
        this.active = (this.len+this.active-1) % this.len
        this.move(-this.$root.$el.clientWidth /this.animationT.speed,this.active)
      }
      this.setTimer()
    },
    moveStep (step,i) {
      this.imgList.forEach((element,index) => {
          element.left = step >=0 ? parseFloat(((this.len + this.active-1 - index ) % this.len )* this.$root.$el.clientWidth + i*step ) : parseFloat(this.$root.$el.clientWidth+((this.len + this.active-1 - index ) % this.len )* this.$root.$el.clientWidth + i*step )
          this.$refs[index]['0'] ? this.$refs[index]['0'].style.left = element.left +'px': this.clearTimer() 
      });
    },
    move (step , id) {
       for(let i = 0; i<=this.animationT.speed;i++){ setTimeout(()=>{this.moveStep(step,i)},i*this.animationT.speedTime)}
    },
    divInterval(){ 
       this.active =(this.len + this.active-1) % this.len
       this.move(parseFloat(this.$root.$el.clientWidth*1.0 / this.animationT.speed),this.active)
    },
    setTimer () {
      clearInterval(this.timer) 
      this.timer=setInterval(this.divInterval,this.duration)
    },
    clearTimer () {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  watch: {
    screenWidth (val) {
      if (!this.screenWidthtimer) {
        this.screenWidth = val
        this.screenWidthtimer = true
        let that = this
        this.divInterval()
        setTimeout(function () {
          that.screenWidthtimer = false
        }, 90)
      }
    }
  }, 
   mounted () {
    // 监听窗口大小
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },

}
</script>
<style lang="scss" scoped >
$font-stack: Helvetica, sans-serif;
$primary-color: rgb(212, 19, 19);
  @import url('//at.alicdn.com/t/font_1451815_senarwrqu6.css');
  #Slider{margin: 0; padding: 0; width: 100%;position: relative;overflow: hidden; margin: 0 auto;}
 .imgBox{ width:1000%;height:480px;position: relative; left: -100%;}
 .img-item {margin: 0;padding: 0;height: 100%; width: 10%; left: 10%; position: absolute;text-align: center;background: rgb(148, 146, 146);}
  .img-position { position: absolute; z-index: 2; bottom: 5px;left: 50%;display: flex;transform: translate(-50%, 0);}
  .img-position-item {display: inline-block;width:15px;height:15px;background: #ffffff; box-sizing: border-box;cursor: pointer;}
  .img-position-item.circle {border-radius: 50%;}
.img-position-item:hover, .img-position-item.active {background: $primary-color; border-radius: 50%;border: 2px solid #ffffff;color: #d1d2d3;}
.img-position-item { margin: 0px 0px 15px 10px;}
.btn{ width: 100% ;height: 5px;position: absolute; top: 235px;}
.left-btn, .right-btn { opacity: 0; position: absolute; top: 50%; bottom: 0; width: 70px; height: 70px;background: rgba(255,255,255,0.03);border: 1px solid rgba(255,255,255,0.031);border-radius: 70px; display: flex;justify-content: center;align-items: center;cursor: pointer;color: #d1d2d3;font-size: 50px;transform: translate(0, -50%);}
#Slider:hover .btn>.left-btn, #Slider:hover .btn>.right-btn {opacity: 1;  background: rgba(255,255,255,0.2);border: 1px solid rgba(255,255,255,0.22);color: #fff; transition: .1s;}
.left-btn { left: 60px; margin-left:auto; }
.right-btn {right: 60px;margin-right:auto;}
</style>