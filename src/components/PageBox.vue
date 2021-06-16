
<template>
    <div class="PageBox">
        <div class="page_box">
            <div id="page_turn_box" >
                <li v-for="(item,index) in pageBoxData" :key='index'>
                    <router-link :to='item.Url' :class="[ (pageIndex==item.Nab ||(!pageIndex&&item.Nab==1))?'on':'']"  >{{item.Name}}</router-link>
                </li>    
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'PageBox',
  props: {
     pageBoxData: { // 图片列表
      type: Object,
      default: () => {}
     },
     pageIndex: {
       type:Number,
       default: 1
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
  methods:{
       
   }
}
</script>
<style lang="scss" scoped >
// $themeColor
.page_box li>a.on{
  color: $themeColor;
  font-weight: bold;
}

</style>