<template>
  <div id="HeaderTop">
       <div class="head_wrap in_box">
         <div class="w1200 clearfix">
            <div class="Top">
                <a id="LOGO" href="./index.html"><img src="@/assets/images/logo.png" alt=""/></a>
                <span>招生代码：5193</span>
                <div class="fr search_box in_box clearfix">
                        <input class="fl search" id="search" type="text" placeholder="请输入关键词" autocomplete="off" v-model='SearchStr' @keyup.enter='Search' />
                        <a  @click.stop='Search'  ><div class="btn_search fr" id="searchbtn"><i></i></div> </a>
                </div>
            </div>
           
         </div>
         <div class="Menu">
            <ul id="Menu">
                  <li v-for='item in menuListOne' :key='item.ID'>
                      <a v-if='item.Url.indexOf("http")==-1' :href="item.Url" target="_blank" >{{item.Name}}</a>
                      <router-link v-else :to="(item.Children.length==0?item.Url :item.Children[0].Url)" :key='CId' :class="[item.On?'on':'']" ><i></i> {{item.Name}}</router-link>
                      <ul v-if="item.Children.length>0" >
                            <li v-for="item2 in item.Children" :key="item2.ID"> 
                                <router-link v-if='item2.Url.indexOf("http")==-1' :to="item2.Url" :key='item2.ID' >{{item2.Name}}</router-link>
                                <a v-else :href="item2.Url" target="_blank" >{{item2.Name}}</a>
                            </li>
                      </ul>
                  </li>
                  <!-- <li><a href="./index.html">首页</a></li>
                  <li><a href="./list.html">党建动态</a></li>
                  <li><a href="./howllow">通知公告</a></li>
                  <li><a href="./howllow">重要文件</a></li>
                  <li><a href="./index.html">精准扶贫</a></li>
                  <li><a href="./index.html">统战工作</a></li>
                  <li><a href="./index.html">先进风采</a></li>-->
                  <!--<li><a href="http://www.tianyi.edu.cn/"  target="_blank">学院首页</a></li>-->
            </ul>
        </div>
       </div>


  </div>
</template>

<script>

export default {
  name: 'HeaderTop',
  data () {
    return {
      menuList: [],
      menuListOne: [],
      CId:this.$route.query.CId,
      SearchStr: null,
    }
  },
  methods:{
   Search(){
         if (!this.SearchStr) {
                alert("请输入查询关键词")
            } else {
               this.$router.push('./search.html?selText='+this.SearchStr)
            }
      }
  },
  created(){
     this.menuList = this.Base.GetNavColumnsByDid();
     this.menuListOne = this.menuList.filter((ele)=>ele.FID == 0)
     this.menuListOne.forEach((r)=>{
       r.Children = this.menuList.filter((ele)=>ele.FID == r.ID)
   })
     this.menuListOne.unshift({Name:'首页',Url:'./index.html',On: true,Children:[]});
    //  console.log(this.menuListOne)
  }
}
</script>
<style lang="scss" scoped>
//  $themeColor: #eee; 
.head_wrap {background: url('@img/topBg.png') no-repeat top; }
.head_wrap .w1200{ height: 120px;}
 .head_wrap  #LOGO{ width: 450px;}
.head_wrap .w1200 > .Top{height: 95px; padding-top:25px; }
.head_wrap .w1200 > .Top > a > img{ display: inline; margin-right:20px;}
.head_wrap .w1200 > .Top >a > span{ font-size: 24px;font-family: "Microsoft YaHei"; color: $themeColor; font-weight: bold;line-height: 0.833;position: relative; bottom:15px; letter-spacing: 2px;}
.head_wrap .w1200 > .Top > span{margin-left:70px; font-size: 14px; font-family: "Microsoft YaHei";line-height: 1.429; color: $themeColor;} 
.head_wrap .w1200 > .Top > .search_box{width: 200px; height: 30px; border-radius:15px; border: 1px solid #fff; margin-top: -60px;}  
.head_wrap .w1200 > .Top > .search_box >.search{font-size: 12px;   margin: 4px 0px 4px 10px ; line-height: 1.667;background: transparent; color: #fff;} 
.head_wrap .w1200 > .Top > .search_box >.search::placeholder{ color: #fff!important; }
.head_wrap .w1200 > .Top .search_box >a> .btn_search{ border-left: 1px solid #fff ; margin: 4px 0; padding: 0px 8px;  width: 20px; height: 20px; background: url("@img/searchIcon.png") no-repeat center;  background-size: 16px 16px;}
.head_wrap  .Menu{background: $themeColor; }
.head_wrap  #Menu{width:1200px;margin:0 auto;display: flex; height: 50px; align-content: center;}
.head_wrap  #Menu>li{text-align: center;flex: 1; display: inline-block;position: relative; vertical-align: top;}
.head_wrap  #Menu>li:last-child{margin-right: 0px;}
.head_wrap  #Menu>li>a{ font-size: 18px; font-family: "Microsoft YaHei";color: rgb(255, 255, 255);  line-height:50px;  text-align: center;}
.head_wrap  #Menu>li>a:hover,.head_wrap  #Menu>li>a.on ,.head_wrap  #Menu>li>a.router-link-exact-active{ background: rgba(0,0,0,.1);}
.head_wrap  #Menu>li>ul{ max-height: 0; width: 100%;  position: absolute;z-index: 999;overflow: hidden;background: $themeColor;  -webkit-transition: max-height 0.3s; transition: max-height 0.3s}
.head_wrap  #Menu>li>ul>li{line-height: 30px; padding: 8px 0;}
.head_wrap  #Menu>li>ul>li>a{color: #fff}
.head_wrap  #Menu>li>ul>li:hover{ background: rgba(0,0,0,.1);}
.head_wrap  #Menu>li:hover>ul{ max-height: 1000px}
</style>