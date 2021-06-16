<template>
  <div id="List" :style="{minHeight: winHeight+'px'}"> 
    <div class="banner"></div>
     <div class="mid">
       <div class="w1200 clearfix">
          <side-bar :sidebarData="Nav"
                    styles="margin-top: -80px"
          ></side-bar>
           <div class="main fr">
              <address-bar :addressBarData="Nav"></address-bar>
             <div id='infoBox' :style="{minHeight: winHeight-500+'px'}">
               <no-img-list :dataList="List"  :init="{Render: 'html' }"></no-img-list>
                <page-box :pageBoxData="List.PageBar" :pageIndex="PageIndex"></page-box>
             </div>
          </div>
       </div>
     </div>
  </div>
</template>

<script>
import '../assets/css/list.css'
import sideBar from '../components/Sidebar'
import addressBar from '../components/AddressBar'
import noImgList from '../components/NoImgList'
import pageBox from '../components/PageBox'
export default {
  name: 'List',
  data () {
    return {
       selText:this.$route.query.selText,
       PageIndex:this.$route.query.PageIndex,
       winHeight: window.innerHeight-290,
       item:'',
       List:[],
       Nav: {
         PColumn: { Name: "搜索结果", Url: "javascript:;" },
         lanmu: {Name: "搜索",
          Url: "javascript:;"
         },
         List:[{
           Name: '搜索',
           Url: "javascript:;"
         }]
       },
    }
  },
  created(){
        this.List = this.Base.GetInfoBySearch(this.selText,this.PageIndex,6);
        
  },
   components:{
    sideBar,
    addressBar,
    pageBox,
    noImgList
  },
}
</script>