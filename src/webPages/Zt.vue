<template>
  <div id="ZT" :style="{minHeight: winHeight+'px'}"> 
    <div id="ztyMaxBox" ref="ztyMaxBoxRef" :style="{ minHeight: 'calc(100vh - 170px)', width: '100%', height: iframeBoxHeight }">
        <iframe id="ztIframe" ref="ztIframeRef" name="ztIframe" frameborder="0" scrolling="no" :style="{width:'100%', margin: 'auto 0', height: iframeHeight , maxHeight: iframeBoxHeight }" :src="iframeSrc"></iframe>
    </div>
  </div>
</template>

<script>
import '../assets/css/list.css'
export default {
  name: 'Zt',
  data () {
    return {
       ztname:this.$route.query.ztname,
       winHeight: window.innerHeight-290,
       item:'',
       cwind:{
           topY: 160,
           winH: window.innerHeight-160
       },
       iframeSrc: './zt/'+this.$route.query.ztname+'/index.html',
       iframeHeight: '',
       iframeBoxHeight: ''
    }
  },
  created(){
    this.Init()
          //  console.log(document.body.clientHeight)
  },
  methods: {
     Init() {
       let that = this ;
       this.positionTimer = setInterval(() => {
         if(typeof that.$refs.ztIframeRef === "object" && typeof that.$refs.ztyMaxBoxRef === "object"){
             that.iframeBoxHeight = that.$refs.ztIframeRef.contentWindow.document.body.scrollHeight +'px';
             that.iframeHeight = this.cwind.winH + 'px';
             that.$refs.ztIframeRef.contentWindow.document.body.addEventListener("click",(e) => {
              if(e.target.className.indexOf("zyzx")!=-1||e.target.parentElement.className.indexOf("zyzx")!=-1){
                    console.log("sdsd")
               }else if(e.target.className.indexOf("zxbm")!=-1||e.target.parentElement.className.indexOf("zxbm")!=-1){
                   location.href = 'www.baidu.com'
               }
             },false)
              window.scrollBy(0,1)
            clearInterval(that.positionTimer)
            that.positionTimer = null
         }
        
       }, 200)
     },
      scrollFun() {
        let that = this
        that.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(that.iframeBoxHeight){
          // console.log(that.iframeBoxHeight)
          let temHeight = parseInt( that.$refs.ztIframeRef.style.height);
          let temMax = parseInt( that.$refs.ztyMaxBoxRef.style.height);

          if( that.cwind.winH && window.scrollY + that.cwind.winH >= temHeight && temMax >= temHeight){
              that.iframeHeight = that.cwind.winH+window.scrollY+'px';
              
          }
        }
        //   let temHeight = parseInt( this.$refs.ztIframe.style.height);
        //   let temMax = parseInt( this.$refs.ztyMaxBox.style.height);
        // if(this.cwind.winH && window.scrollY + this.cwind.winH >= temHeight&&temMax>=temHeight){
        //     this.$refs.ztIframe.style.height = this.cwind.winH+window.scrollY+'px';
        //  }
      }
    },
  mounted() {
      window.addEventListener('scroll', this.scrollFun)
      window.addEventListener('pageshow', function (event) {
        // if(event.persisted || window.performance && window.performance.navigation.type == 2){
        //             window.location.
        //  }
      })
  },
  destoryed() {
	   this.clearInterval(this.positionTimer )
   }
}
</script>