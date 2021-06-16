<template>
<div>
     <keep-alive>
        <component  v-bind:is="currentView" :dataList="option.dataList" ></component>
    </keep-alive>
</div>       
</template>
<script>
export default {
  name: 'componentView',
  props: {
     option: { // 图片列表
      type: Object,
      default: () =>{
         return {
           dataList: [],
           componentType:'ImgList'
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
        currentData: this.option.dataList
     }
   },
   created(){
        // console.log("------------")
        // console.log(this.option.dataList)
        // console.log("------------")
   },
   computed: {
          currentView() {
            return require(`../components/${this.option.componentType}`).default
          }
   }
}
</script>