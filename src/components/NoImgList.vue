<template>
    <div class="NoImgList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <p v-if="!init.Render" class="title txt-cut1">{{item.Title}}</p>
                        <p v-else class="title txt-cut1" v-html='item.Title' ></p>
                        <p v-if="!init.Render" class="text txt-cut1">{{item.Describe}}</p>
                        <p v-else class="text txt-cut1" v-html='item.Describe'></p>
                        <p class="time"><span>{{item.ShowTime}} </span> </p>
                    </router-link>
                </li>
             </ul>
    </div>
</template>
<script>
export default {
  name: 'noImgList',
  props: {
     dataList: { // 图片列表
      type: Array,
      default: () => []
     },
     moreLink: {
       type: String,
       default: ''
     },
    init:{
       type: Object,
       default: () => {
        return {
           Render: ''
        }
      }
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
  .NoImgList{
      ul{
        li{
            position: relative;
            font-size:0;
            display: block;
            overflow: hidden;
            padding: 30px;
            background: url("@img/noImgListBg.png") no-repeat top;
            margin-bottom: 20px;
            border-radius: 20px;
            padding-bottom: 40px;
            .title{
                font-size: 20px;
                color: #333;
                line-height: 1;
                text-align: justify;
                padding-bottom: 20px;
                padding-right:120px ;
            }
            .text{
                 font-size: 16px;
                 color: #666;
                 line-height: 2;
            }
            .time{
                font-size: 16px;
                color: rgb(102, 102, 102);
                line-height: 2;
                border-bottom: 1px solid #dddddd;
                text-align: center;
                span{
                    padding: 0 20px;
                    background: #fff;
                    position: relative;
                    top: 16px;
                }
            }
        }
      }

  }

</style>