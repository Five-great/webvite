<template>
    <div class="Sidebar" :style="styles">
          <div class="nav">
              <div v-if="sidebarData.PColumn" class="PColumn">{{sidebarData.PColumn.Name}}</div>
              <div v-else class="PColumn">{{sidebarData.lanmu.Name}}</div>
              <ul>
                 <li v-for="item in sidebarData.List" :key="item.ID">
                   <router-link :to="item.Url" :class="[item.Name==sidebarData.lanmu.Name?'on':'']" :href="item.Url"  @click.native="OpenLink(item.Url)" ><i></i><span>{{item.Name}}</span></router-link>
                 </li>
              </ul>
          </div> 
    </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
     sidebarData: { // 
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
  .Sidebar{
      display: inline-block;
      vertical-align: top;
      width: 260px;
      
      .nav {
          background-color: rgb(255, 255, 255);
          box-shadow: 0.696px 4.951px 10px 0px rgba(0, 0, 0, 0.1);
          padding-bottom: 30px;
        .PColumn{
             border-bottom:  2px solid #009dfd;
              letter-spacing: 2px; 
              text-align: center;
              background: url('@img/logo2.png') no-repeat right;
               height:78px;line-height: 80px; 
               font-size: 22px;
               color: rgb(255, 255, 255); 
               font-weight: bold;
        }
        li {
            a{ 
                padding-left: 53px;
                text-align:left;
                border-bottom:1px solid #dcdcdc; 
                font-size: 16px; 
                height: 44px;
                margin: 0px 25px; 
                color: #333;
                line-height: 45px; 
               &.on>span, &:hover>span{ margin-left: 6px; color: $themeColor;}
                span{
                    position: relative;
                    display: inline-block;
                    transition: 0.6s;
                }
                  i{display: inline-block;
                    position: relative; 
                    width:10px; 
                    height: 10px;
                    vertical-align: middle;
                    background: $themeColor;
                    transform:rotate(45deg); 
                    overflow: hidden;
                    margin-right:10px;
                    transition: 0.6s;
                  }
             }

        }
      }
  }
</style>