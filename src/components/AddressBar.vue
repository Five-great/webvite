<template>
    <div class="AddressBar" :style="styles">
          <p class="PL fl"><a href="">{{addressBarData.lanmu.Name}}</a></p> <p class="PR fr">当前位置：<router-link to="./" >首页 ·&nbsp;</router-link><router-link v-if="addressBarData.PColumn" :href="addressBarData.PColumn.Url" :to="addressBarData.PColumn.Url"  @click.native="OpenLink(item.Url)"   >{{addressBarData.PColumn.Name}} ·&nbsp;</router-link><router-link :to="addressBarData.lanmu.Url"  :href="addressBarData.lanmu.Url"  @click.native="OpenLink(addressBarData.lanmu.Url)" >{{addressBarData.lanmu.Name}}</router-link></p>
    </div>
</template>
<script>
export default {
  name: 'AddressBar',
  props: {
     addressBarData: { // 
      type: Object,
      default: () => {
          return {
            PColumn:{},
            lanmu:{},
            List:[]
          }
      
      }
     },
     moreLink: {
       type: String,
       default: ''
     },
    styles: { 
      type: String,
      default: ""
      }
  }
}
</script>
<style lang="scss" scoped >
// $themeColor
  $li-width: 580px;
  $li-height: 95px;
  $li-padding: 15px 0;
  .AddressBar{
        height: 35px; border-bottom:2px solid $themeColor; margin: 25px 0px 35px ;
        .PL{
            overflow: hidden;
            height: 40px;
            width: 300px;
            a{   
              font-size: 18px;
              color: $themeColor;
              font-weight: bold;
              line-height: 30px;
            }
        }
        .PR{
            text-align: right;
            overflow: hidden;
            height: 40px;
            margin-top:12px ;
            width: 450px; 
            font-size: 14px; 
            color: rgb(102, 102, 102); 
            line-height: 1.2;
            a{
             display: inline-block;
             text-align: right;
             font-size: 14px; 
             color: rgb(102, 102, 102);  
             line-height: 1.2;
             &:last-child{  
                 color:$themeColor; 
              }
            }
        }
  }




  
</style>