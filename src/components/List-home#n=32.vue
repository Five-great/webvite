<template>
    <div class="List-home">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' @mouseenter="hoverRoll(item)" class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <div class="time"><span>{{setTimeformat(item.ShowTime,'mm-dd') }} </span> <em>{{setTimeformat(item.ShowTime6,'YYYY') }}</em></div>
                        <div class="textBox">
                          <p class="title txt-cut1">{{item.Title}}</p>
                          <p class="text txt-cut2">{{item.Describe}}</p>
                        </div>
                    </router-link>
                </li>
             </ul>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'List-home',
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
  methods:{
        setTimeformat(_data,_format='yyyy-mm-dd'){
            // console.log(_data)
             return _format.replace(/YYYY/i,_data.substr(0,4)).replace(/MM/i,_data.substr(5,2)).replace(/DD/i,_data.substr(8,2))
        },
        hoverRoll(_data){
          this.showItem = _data
        }
  }
}
</script>
<style lang="scss" scoped >
// $themeColor
  $li-width: 580px;
  $li-height: 97px;
  $li-padding: 15px 0;
 .List-home{width:1200px; min-height: 400px; margin: 0 auto; padding-top: 25px ;font-size: 0; }
 .List-home ul{  padding-top: 10px;width: 1240px; margin-left: -40px; position: relative; display: inline-block;vertical-align: top; font-size: 0;  }
 .List-home ul>li{ width: $li-width; position: relative;  height: $li-height; padding:$li-padding; background: url("@img/list-homeBg.png") ;  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.08); display: inline-block;vertical-align: top; margin: 35px 0;margin-left: 40px; padding-top: 50px; font-size: 0; }
 .List-home ul>li>a>.time{display: block; transition: all 0.3s ; position: absolute; top:-40px;left:0; width: 80px;background: $themeColor; height:60px;font-size: 14px; padding-top: 20px ;  text-align: center;  line-height: 1.5;  color: #fff;   }
 .List-home ul>li>a>.time>em{ font-size: 18px;  }
  .List-home ul>li:hover>a>.time{ transform: translateY(-5px);}
 .List-home ul>li .textBox{  padding: 0 20px;}
 .List-home ul>li .textBox .title{  font-size: 20px; color: #333; line-height: 2; text-align: justify;}
 .List-home ul>li .textBox .text{  font-size: 16px; color: #666;line-height: 1.8;text-align: justify;}
 .List-home ul>li:hover .textBox .title{color: $themeColor;}
</style>