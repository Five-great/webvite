<template>
    <div class="downList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class="wow fadeInLeft" :data-wow-delay="index/8+'s'">
                    <a  :href="item.FileUrl"   >
                        <!-- <div class="imgBox"> <img :src="item.Cover" /></div>-->
                        <div class="time"><span>{{setTimeformat(item.ShowTime,'mm-dd') }} </span> <em>{{setTimeformat(item.ShowTime,'YYYY') }}</em></div>
                        <div class="downIcon"><span><img src="@img/downIcon.png" alt=""></span></div>
                        <div class="textBox">
                          <p class="title txt-cut1">{{item.Title}}</p>
                        </div>
                    </a>
                </li>
             </ul>
    </div>
</template>
<script>
export default {
  name: 'downList',
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
      console.log(this.dataList)
   },
  methods:{
        setTimeformat(_data,_format='yyyy-mm-dd'){
             return _format.replace(/YYYY/i,_data.substr(0,4)).replace(/MM/i,_data.substr(5,2)).replace(/DD/i,_data.substr(8,2))
        },
  }
}
</script>
<style lang="scss" scoped >
// $themeColor
  $li-width: 580px;
  $li-height: 95px;
  $li-padding: 0;
 .downList{width:100%; min-height: 500px; margin: 0 auto; font-size: 0; }
 .downList ul{  width: 100%; display: inline-block;vertical-align: top;  }
 .downList ul>li{  padding:$li-padding;  margin-bottom: 30px; font-size: 0; background: #fff; }
 .downList ul>li>a>.time{display: inline-block;vertical-align: top; width: 80px; height:62px;font-size: 14px; padding-top: 18px ; background: $themeColor; text-align: center;  line-height: 1.5;  color: #fff;    }
 .downList ul>li>a>.time>em{ font-size: 18px;  }
 .downList ul>li .textBox{ display: flex;float: right; align-items: center;  width:  calc(100% - 180px);height: 80px; box-sizing: border-box; vertical-align: top; padding: 0 15px; }
 .downList ul>li .textBox .title{  font-size: 20px; color: #333;  text-align: justify;}
  .downList ul>li .downIcon{ width: 100px; height: 80px; float: right;}
  .downList ul>li .downIcon span{ display: block; width: 60px; height: 60px; border-radius: 60px; margin-top: 10px; margin-left: 10px; border: 1px solid rgb(248, 248, 248);  background-color: rgb(248, 248, 248); text-align: center; }
  .downList ul>li .downIcon span img{ display:block; margin: 0 auto; margin-top: 15px; transition: all 0.3s; }
.downList ul>li:hover .downIcon span img{ animation: downEffect 0.6s ease-in infinite}
.downList ul>li:hover .downIcon span:hover img{  animation: downEffect 0.1s ease-in 1}
  @keyframes downEffect {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 0.99;
      filter: alpha(opacity=99);
    }
    40% {
      transform: translate3d(0, -6px, 0);
      opacity: 1;
      filter: none;
    }
    60% {
      transform: translate3d(0, -6px, 0);
      opacity: 1;
      filter: none;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 0.99;
      filter: alpha(opacity=99);
    }
  }

</style>