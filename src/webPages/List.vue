<template>
  <div id="List" :style="{minHeight: winHeight+'px'}"> 
    <div v-if='!Nav.lanmu.Logo || Nav.lanmu.Logo =="http://base.hope55.com"' class="banner"></div>
    <div v-else class="banner" :style="{'background-image': 'url('+Nav.lanmu.Logo+')'}"></div>
     <div class="mid">
       <div class="w1200 clearfix">


          <!-- <div class="nav fl">
              <div v-if="Nav.PColumn" class="title">{{Nav.PColumn.Name}}</div>
              <div v-else class="title">{{Nav.lanmu.Name}}</div>
              <ul>
                 <li v-for="item in Nav.List" :key="item.ID">
                   <router-link :to="item.Url" :class="[item.Name==Nav.lanmu.Name?'on':'']" ><span><i></i><em>{{item.Name}}</em></span></router-link>
                 </li>
              </ul>
          </div>  -->
          <side-bar :sidebarData="Nav"
                    styles="margin-top: -80px"
          ></side-bar>
           <div class="main fr">
            <address-bar :addressBarData="Nav"></address-bar>
             <div id='infoBox' :style="{minHeight: winHeight-500+'px'}">
               <ul v-if="NId" class="newsDetails">
                      <template >
                        <p class="title">{{List.Title}}</p>
                        <p class="related_information">
                          <span><img class="icon" src="../assets/images/icon_time.jpg" alt="icon_time">{{List.ShowTime}}</span>
                          <span><img class="icon" src="../assets/images/icon_views.jpg" alt="icon_views">{{List.Press}}</span>
                        </p>
                      </template>
                      <div class="info" v-html="List.Details"></div>
               </ul>
                <ul v-else-if="HType==1" v-html="List.Info" class="singleBox">

                </ul>
               <component-view  v-else  :option='{dataList: List ,componentType: currentValue}' ></component-view>
       
                 <!-- <div v-else-if='CId == 3442 ||CId == 3443 || CId == 3450 ||CId == 3461'>
                    <img-List 
                     :imgListData = "List"
                    >
                   </img-List>
                 </div >
                 <div v-if='CId == 3444 ||CId == 3445 || CId == 3451 || CId == 3456 || CId == 3457  || CId == 3462 || CId == 3464'>
                  <no-img-List 
                     :dataList = "List"
                  >
                   </no-img-List>
                 </div>
              
               
                <file-list  v-else-if='CId == 3440 || CId == 3439'
                 :dataList = "List"
                 ::dataType="CId == 3439? 'video':''"
                ></file-list>
                <down-list  v-else-if='CId == 3465'
                :dataList = "List"
                >
                </down-list> -->
               <!-- <ul class="dynamic">
                    <li v-for=" item in List" :key="item.ID">
                      <router-link  :to="item.Url">
                        <div class="img_box"><img :src="item.Cover" /></div> 
                         <p class="title">{{item.Title}}</p>
                         <div class="text">
                           {{item.Describe}}
                         </div>
                         <p class="time"><i></i>{{item.ShowTime}}</p>
                      </router-link>
                    </li>
                </ul>  -->
<!-- 
                <ul v-else-if="CId == 1160" class="notice">
                     <li v-for="item in List" :key='item.ID'>
                       <router-link :to="item.Url">
                         <span class="time"><em>{{item.ShowTime2}}</em>{{item.ShowTime6_2}}</span>
                         <p class="title">{{item.Title}}</p>
                       </router-link>
                     </li>
                </ul>
                <ul v-else-if="CId == 1161" class="notice">
                     <li v-for="item in List" :key='item.ID'>
                       <a :href="item.FileUrl" target="_blank">
                         <span class="time"><em>{{item.ShowTime2}}</em>{{item.ShowTime6_2}}</span>
                         <p class="title">{{item.Title}}</p>
                       </a>
                     </li>
                </ul>
               <ul v-else-if="CId == 1164 " class="elegant">
                     <li v-for="item in List" :key='item.ID'>
                       <router-link :to="item.Url">
                         <div class="img_box"><img :src="item.FileUrl" :alt="item.Title"></div>
                         <p class="title">{{item.Title}}</p>
                       </router-link>
                     </li>
                </ul> -->
                 <!-- <img-text-List 
                   :dataList = "List"
                >
                </img-text-List>  -->
               <page-box :pageBoxData="List.PageBar" :pageIndex="PageIndex"></page-box>
             </div>
          </div>
       </div>
     </div>
  </div>
</template>

<script>
import '../assets/css/list.css';
import sideBar from '../components/Sidebar'
import addressBar from '../components/AddressBar'
// import imgList from '../components/ImgList'
// import imgTextList from '../components/ImgTextList'
// import noImgList from '../components/NoImgList'
import pageBox from '../components/PageBox'
// import fileList from '../components/FileList'
// import downList from '../components/DownList'
import componentView from '../components/componentView'
export default {
  name: 'List',
  data () {
    return {
       CId:this.$route.query.CId,
       NId:this.$route.query.NId,
       PageIndex:this.$route.query.PageIndex,
       HType:this.$route.query.HType,
       winHeight: window.innerHeight-290,
       item:'',
       List:[],
       Nav: '',
       currentData: '',
       currentValue: 'PageBox'
    }
  },
 
  created(){
        this.Nav = this.Curren.SetClassStyle(this.CId);
        this.Nav.List=[]
        this.Nav.lanmu.Fid > 0?this.Nav.List = this.$root.$children['0'].$children['0'].menuListOne.filter(ele=> ele.ID==this.Nav.lanmu.Fid)[0].Children : this.Nav.List.push(this.Nav.lanmu)
        
       if( this.$root.$children['0'].$children['0'].menuListOne){ this.$root.$children['0'].$children['0'].menuListOne.forEach(element => { // 确定菜单点击项
          element.ID == this.CId ? element.On = true : element.On = false
        }); 
       }
        // this.List = this.Base.GetNewsInfoByCid(1159,false,this.PageIndex,'',9);
        // this.List = this.Base.GetFilesInfoByCid(1161,this.PageIndex,'',8);
        console.log( this.Nav)      
        if(this.NId){
          this.List = this.Base.GetNewsInfoByNid(this.NId);
          //  console.log(this.List);
        }else{
          if(this.CId ==3442 || this.CId == 3443 || this.CId == 3450 || this.CId == 3461) {this.List = this.Base.GetNewsInfoByCid(this.CId,true,this.PageIndex,'',5);this.currentValue = 'ImgList';}//有图
          else if(this.CId == 3444 || this.CId == 3445 || this.CId == 3451 || this.CId == 3456 || this.CId == 3457  || this.CId == 3462 || this.CId == 3464){ this.List = this.Base.GetNewsInfoByCid(this.CId,false,this.PageIndex,'',5);this.currentValue = 'NoImgList';} //无图
          else if(this.CId == 3438||this.CId == 3458) {this.List = this.Base.GetNewsInfoByCid(this.CId,true,this.PageIndex,'',6);this.currentValue = 'ImgTextList'; }//图文列表
          else if(this.CId == 3440 || this.CId == 3439){ this.List = this.Base.GetFilesInfoByCid(this.CId,this.PageIndex,'',6);this.currentValue = 'FileList' }
         else if(this.CId == 3447 || this.CId == 3448) this.List = this.Base.GetNewsInfoByCid(this.CId,false,this.PageIndex,'',6,200),this.currentValue = 'TextList';
         else if(this.CId == 3454) this.List = this.Base.GetNewsInfoByCid(this.CId,true,this.PageIndex,'',6),this.currentValue = 'TeacherList';
         else if(this.CId == 3465) this.List = this.Base.GetFilesInfoByCid(this.CId,this.PageIndex,'',8),this.currentValue = 'DownList';// 下载中心
         else if(this.CId == 3466) this.List =[],this.currentValue = 'Mailbox'
         if(this.CId == 3437) this.List = this.Base.GetSinglePageInfoByCid(this.CId);
       //   console.log(this.List)
        //  console.log(this.List);
        }
  },
  components:{
    sideBar,
    addressBar,
    // imgList,
    pageBox,
    // noImgList,
    // imgTextList,
    // fileList,
    // downList,
    componentView
  },
 
}
</script>
<style lang="scss" scoped >
    ::v-deep .title{
    &:hover{
        color: $themeColor!important;
      }
   }
   ::v-deep .imgBox{
      overflow: hidden;
      img{
        width: 100%;
        min-height: 100%;
      }
   }
</style>