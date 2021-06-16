<template>
    <div class="ImgTextList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <div class="imgBox"> <img :src="item.Cover" /></div>
                        <div class="textBox">
                          <p class="title txt-cut1" :title="item.Title" >{{item.Title}}</p>
                          <p class="text txt-cut4">{{item.Describe}}</p>
                          <!-- <div class="time"><span>{{item.ShowTime}} </span> </div> -->
                        </div>
                    </router-link>
                </li>
             </ul>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'imgTextList',
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
        }
   }
}
</script>
<style lang="scss" scoped >
// $themeColor
  .ImgTextList{
      ul{
          font-size: 0;
          width: 855px;
          margin-top: -35px;
          margin-bottom: 20px ;
        li{
            box-sizing: border-box;
            width: 250px;
            border: 4px solid #dddddd;
            margin-right:35px ;
            min-height: 240px;
            position: relative;
            font-size:0;
            padding: 7px ;
            display:  inline-block;
            vertical-align: top;
            background: #fff;
            margin-top:35px;
            .imgBox{
                display: inline-block;
                width: 100%;
                height: 142px;
                vertical-align: top;
            }
            .textBox{
                box-sizing: border-box;
            .title{
                font-size: 18px;
                color: #333;
                padding-top: 10px;
                line-height: 1;
                text-align: justify;
                padding-bottom: 10px;
            }
            .text{
                 font-size: 16px;
                 color: #666;
                 line-height: 1.5;
            }
           
            
          }
        }
      }

  }

</style>