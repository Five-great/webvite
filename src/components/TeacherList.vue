<template>
    <div class="TeacherList">
              <ul>
                <li v-for="(item,index) in dataList" :key='item.ID' class=" fadeInUp" :data-wow-delay="index/5+'s'">
                    <router-link  :to="item.Url" :href="item.Url"  @click.native="OpenLink(item.Url)"  >
                        <div class="imgBox"> <img :src="item.Cover" /></div>
                        <div class="textBox">
                          <p class="moreBtn"><span>更多+</span></p>
                           <p class="title txt-cut1">{{item.Title}}</p>
                           <p class="text txt-cut3">{{item.Describe}}</p>
                        </div>
                    </router-link>
                </li>
             </ul>
    </div>
</template>
<script>
export default {
  name: 'teacherList',
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
 
}
</script>
<style lang="scss" scoped >
// $themeColor
  .TeacherList{
      ul{
        li{
            position: relative;
            font-size:0;
            display: block;
            overflow: hidden;
            padding: 0px;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            // padding-bottom: 40px;
            .imgBox{
              display: inline-block;
              vertical-align: top;
              width: 138px;
              height: 156px;
            }
            .textBox{
              display: inline-block;
              vertical-align: top;
              box-sizing: border-box;
              padding-top: 20px;
               padding-left:20px;
              width: calc(100% - 138px);
            } 
            .title{
                font-size: 20px;
                color: #333;
                line-height: 1;
                width: calc(100% - 150px);
                text-align: justify;
                padding-bottom: 10px;
                padding-right:120px ;
            }
            .text{
                 font-size: 16px;
                 color: #666;
                 line-height: 1.9;
            }
            .moreBtn{
              position: absolute;
              right: 20px;
              top:15px;
              text-align: center;
              background-color: rgb(255, 255, 255);
              box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
               width: 120px;
               height: 28px;
               border-radius: 30px;
               line-height: 30px;
               font-size: 18px;
               color: $themeColor;
               border:  1px solid $themeColor;
            }
        }
      }

  }

</style>