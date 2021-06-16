<template>
    <div class="Img-home">
            <div class="top_title wow fadeInUp" data-wow-delay="0.2s" ><i class="wow bounceInLeft" data-wow-delay="0.3s" ></i><span class="wow fadeInDown" data-wow-delay="0.22s" >青青校园</span><i  class="wow bounceInRight" data-wow-delay="0.3s" ></i></div>
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID'  class="wow fadeInLeft" :data-wow-delay="index/5+'s'">
                    <div class="imgBox"> <img :src="item.FileUrl" /></div>
                </li>
             </ul>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'Img-home',
  props: {
     dataList: { // 图片列表
      type: Array,
      default: () => []
     },
     moreLink: {
       type: String,
       default: ''
     },
    styles: { 
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
        showItem: this.dataList? this.dataList[0]:null
     }
   },
   created(){
        // console.log(this.dataList)
   },
  methods:{
        setTimeformat(_data,_format='yyyy-mm-dd'){
             return _format.replace(/YYYY/i,_data.substr(0,4)).replace(/MM/i,_data.substr(5,2)).replace(/DD/i,_data.substr(8,2))
        }
  }
}
</script>
<style lang="scss" scoped >
// $themeColor
  $li-width: 380px;
  $li-height: 285px;
 .Img-home{width:1200px; min-height: 500px; margin: 0 auto; padding-top: 45px ; padding-bottom: 0px; font-size: 0;
       ul{
           width: 1230px;
            position: relative;
            margin-left: -30px;
           li{
               display: inline-block;
               vertical-align: top;
                width: $li-width;
                height: $li-height;
                margin: 0 0 30px 30px;
                .imgBox{
                     width: 100%; 
                     height: 100%;
                     overflow: hidden;
                 }
           }
       }
 .top_title{margin-bottom: 20px;}
 }

</style>