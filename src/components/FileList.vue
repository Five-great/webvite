<template>
    <div class="FileList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <a >
                        <div v-if="dataType == 'img'" class="imgBox"> <img :src="item.FileUrl" /></div>
                         <div v-else  class="videoBox"><iframe :src="item.FileUrl"  frameborder="0"></iframe> </div>
                        <div class="textBox">
                          <p class="title txt-cut1" :title="item.Title" >{{item.Title}}</p>
                        </div>
                    </a>
                </li>
             </ul>
             <div v-if="moreLink" class="more wow zoomIn" data-wow-delay="0.3s"><router-link :to="moreLink" ><em>查看更多</em></router-link></div>
    </div>
</template>
<script>
export default {
  name: 'fileList',
  props: {
     dataList: { // 图片列表
      type: Array,
      default: () => []
     },
     dataType: {
       type: String,
       default: 'img'
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
  .FileList{
      ul{
          font-size: 0;
          width: 855px;
          margin-top: -20px;
          margin-bottom: 10px ;
        li{
          &:nth-child(even){
            margin-left: 60px;
          }
            box-sizing: border-box;
            width: 380px;
            min-height: 240px;
            position: relative;
            font-size:0;
          
            display:  inline-block;
            vertical-align: top;
            // background: #fff;
            margin-top:20px;
            .imgBox{
                display: inline-block;
                width: 100%;
                height: 285px;
                vertical-align: top;
            }
            .textBox{
                box-sizing: border-box;
            .title{
                font-size: 18px;

                color: #333;
                padding-top: 15px;
                line-height: 1;
                text-align: center;
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