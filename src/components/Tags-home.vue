<template>
    <div class="Tabs-home">
        <div class="w1200 ">
          <div class="TopBtn">
             <ul>
               <li v-for="(item , idx) in dataTabs" :key="idx"  @click.stop="toggleTab(idx,$event)"> 
                  <span>{{item.name}}</span>
               </li>
            </ul>
            <div v-if="tagMoreLink" class="Tags-more" ><router-link  :to="tagMoreLink" ><em>更多+</em></router-link></div>
            <p ref="line_on" class="line_on"></p>
          </div>
          <keep-alive>
             <component v-bind:is="currentTabComponent"  :dataList='listdata'  class="tabs"></component>
          </keep-alive>
        </div>
     </div>
</template>
<script>
export default {
  name: 'Tags-home',
  props: {
     dataTabs: { // 图片列表
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
        showItem: this.dataList? this.dataList[0]:null,
        tagMoreLink: 'www.baidu.com',
        idx: 0,
        listdata: []
     }
   },
  methods:{
       toggleTab(_data,e){
         this.idx = _data;
        this.$refs.line_on.style.transform = 'translateX('+e.target.parentNode.offsetLeft+'px'+')';
       }
  },
   computed: {
          currentTabComponent() {
              this.listdata = this.dataTabs[this.idx].data
            return require(`../components/${this.dataTabs[this.idx].type}`).default
          }
   }
}
</script>

<style lang="scss" scoped>
   .Tabs-home{
       background: url("@img/bg2.png") no-repeat top;
       background-attachment: fixed;
       min-height: 500px;
       padding-top: 40px;
       font-size: 0;
       .TopBtn{
            position: relative;
            min-height: 50px;
            border-bottom: 2px solid #dddddd;
            font-size: 0;
        .line_on{
          content: "";
          position: absolute;
          display: block;
          left:0;
          bottom: -2px;
          background: $themeColor ;
          width: 60px;
          height: 2px;
          transition: all 0.3s;
          
        }
        ul{
            display: inline-block;
            width: 1100px;
            height: 60px;
            vertical-align: middle;
            li{
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                margin-right: 50px;
               font-size: 28px;
               letter-spacing: 2px;
               color: rgb(51, 51, 51);
            }
        }
       .Tags-more{
           width: 100px;
           min-height: 48px;
           display: inline-block;
           vertical-align: middle;
            a{
            text-align: center;
            font-size: 18px;
            color: $themeColor;
            line-height: 30px;
            border-radius: 30px;
            letter-spacing: 2px;
            border:  1px solid $themeColor;
                &:hover{
                    color: #fff;
                    background: $themeColor;
                }
            }

        }
            
       }
   }
</style>