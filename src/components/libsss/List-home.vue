<template>
    <div class="List-home">
            <div class="top_title wow fadeInUp" data-wow-delay="0.2s" ><i class="wow bounceInLeft" data-wow-delay="0.3s" ></i><span class="wow fadeInDown" data-wow-delay="0.22s" >学院要闻</span><i  class="wow bounceInRight" data-wow-delay="0.3s" ></i></div>
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' @mouseenter="hoverRoll(item)" class="wow fadeInLeft" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <!-- <div class="imgBox"> <img :src="item.Cover" /></div>-->
                        <div class="time"><span>{{setTimeformat(item.ShowTime6,'mm-dd') }} </span> <em>{{setTimeformat(item.ShowTime6,'YYYY') }}</em></div>
                        <div class="textBox">
                          <p class="title txt-cut1">{{item.Title}}</p>
                          <p class="text txt-cut1">{{item.Describe}}</p>
                        </div>
                    </router-link>
                </li>
             </ul>
              <div v-if="showItem" class="showItem wow fadeInRight" data-wow-delay="0.3s">
                    <router-link  :to="showItem.Url" :href="showItem.Url"  @click.native="OpenLink(showItem.Url)"  >
                        <div class="imgBox"> <img :src="showItem.Cover" /></div>
                        <div class="time"><span>{{setTimeformat(showItem.ShowTime6,'mm-dd') }} </span> <em>{{setTimeformat(showItem.ShowTime6,'YYYY') }}</em></div>
                        <div class="textBox">
                          <p class="title txt-cut1">{{showItem.Title}}</p>
                          <p class="text txt-cut1">{{showItem.Describe}}</p>
                        </div>
                    </router-link>
              </div>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'List-home',
  props: {
     dataList: { // 图片列表aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
  $li-height: 95px;
  $li-padding: 15px 0;
 .List-home{width:1200px; min-height: 500px; margin: 0 auto; padding-top: 45px ; padding-bottom: 50px; font-size: 0; }
 .List-home ul{  padding-top: 30px;width: $li-width; display: inline-block;vertical-align: top; min-height: 540px;  }
 .List-home ul>li{ width: $li-width; padding:$li-padding; background: #f6f6f6; margin-bottom: 30px; font-size: 0; }
 .List-home ul>li>a>.time{display: inline-block;vertical-align: top; width: 79px; height:60px;font-size: 14px; padding-top: 15px ;  text-align: center;  line-height: 1.5;  color: #333; border-right: 1px solid #333;   }
 .List-home ul>li>a>.time>em{ font-size: 18px;  }
 .List-home ul>li:hover>a>.time{ color: #fff; border-right: 1px solid #fff;  }
 .List-home ul>li:hover{background: $themeColor; }
 .List-home ul>li .textBox{ display: inline-block; width: 460px; vertical-align: top; padding: 0 20px;}
 .List-home ul>li .textBox .title{  font-size: 20px; color: #333; line-height: 2; text-align: justify;}
 .List-home ul>li .textBox .text{  font-size: 16px; color: #666;line-height: 2;text-align: justify;}
  .List-home ul>li:hover .textBox .title{color: #fff;}
  .List-home ul>li:hover .textBox .text{color: #fff;}
  .showItem { display: inline-block; width: 580px; vertical-align: top; padding-top: 30px; padding-left: 40px; }
  .showItem a{ width: 520px; padding:$li-padding; background: #f6f6f6; padding: 30px; font-size: 0;}
  .showItem a .imgBox{ width:520px ; height: 344px; margin-bottom: 30px; overflow: hidden; }
  .showItem a .imgBox>img{ min-height: 344px; }
  .showItem a>.time{display: inline-block;vertical-align: top; width: 79px; height:60px;font-size: 14px; padding-top: 15px ;  text-align: center;  line-height: 1.5;  color: #333; border-right: 1px solid #333;   }
  .showItem a>.time>em{ font-size: 18px;  }
  // .showItem a:hover>.time{ color: #fff; border-right: 1px solid #fff;  }
  .showItem a .textBox{ display: inline-block; width: 420px; vertical-align: top; padding: 0 20px; padding-right: 0;}
 .showItem a .textBox .title{  font-size: 20px; color: #333; line-height: 2; text-align: justify;}
 .showItem a .textBox .text{  font-size: 16px; color: #666;line-height: 2;text-align: justify;}
  // .showItem a:hover .textBox .title{color: $themeColor;}
  // .showItem a:hover .textBox .text{color: #fff;}
  // .showItem a:hover { background: $themeColor; }
  .more >a{display: block; margin: 0 auto; font-size: 20px; text-align: center; letter-spacing: 2px; line-height: 40px; color: $themeColor;  width: 165px; height: 40px; border-radius: 40px; border: 1px solid $themeColor;}
  .more >a:hover{ color: #fff; border: 1px solid #fff; background: $themeColor; }
</style>