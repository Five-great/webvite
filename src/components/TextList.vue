<template>
    <div class="TextList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <p class="title">{{item.Title}}</p>
                    </router-link>
                </li>
             </ul>
    </div>
</template>
<script>
export default {
  name: 'textList',
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
  .TextList{
      ul{
          font-size: 0;
        li{
            position: relative;
            font-size:0;
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            width: 255px;
            height: 75px;
            background: url("@img/textBg.png") no-repeat top;
            margin-bottom: 27px;
            margin-right: 27px;
            .title{
                font-size: 20px;
                color: #333;
                line-height: 1;
                text-align: center;
                line-height: 75px;
            }
            &:nth-child(3n+3){
                margin-right: 0 ;
            }
           
        }
      }

  }

</style>