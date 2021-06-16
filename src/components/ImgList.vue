<template>
    <div class="ImgList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <div class="imgBox"> <img :src="item.Cover" /></div>
                        <div class="textBox">
                          <p class="title txt-cut1">{{item.Title}}</p>
                          <p class="text txt-cut2">{{item.Describe}}</p>
                          <div class="time"><span>{{item.ShowTime}} </span> </div>
                        </div>
                    </router-link>
                </li>
             </ul>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'ImgList',
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
    //  console.log(this.dataList)
   },
  methods:{
        setTimeformat(_data,_format='yyyy-mm-dd'){
            // console.log(_data)
             return _format.replace(/YYYY/i,_data.substr(0,4)).replace(/MM/i,_data.substr(5,2)).replace(/DD/i,_data.substr(8,2))
        }
   }
}
</script>
<style lang="scss" scoped >
// $themeColor
  .ImgList{
      ul{
        li{
            position: relative;
            font-size:0;
            display: block;
            padding: 30px;
            background: #fff;
            margin-bottom: 20px;
            .imgBox{
                display: inline-block;
                width: 200px;
                height: 130px;
                vertical-align: top;
            }
            .textBox{
                box-sizing: border-box;
                display: inline-block;
                width: calc(100% - 200px);
                padding-left: 30px;
                height: 130px;
                vertical-align: top;
            .title{
                font-size: 18px;
                color: #333;
                line-height: 1;
                text-align: justify;
                padding-bottom: 10px;
            }
            .text{
                 font-size: 16px;
                 color: #666;
                 line-height: 2;
            }
            .time{
                font-size: 14px;
                color: rgb(102, 102, 102);
                line-height: 2;
                border-bottom: 1px solid #dddddd;
                text-align: center;
                span{
                    padding: 0 20px;
                    background: #fff;
                    position: relative;
                    top: 15px;
                }
            }
          }
        }
      }

  }

</style>