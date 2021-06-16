<template>
  <div id="HeaderTop">
       <div class="head_wrap in_box">
         <div class="w1200 clearfix">
            <div class="Top">
                <a id="LOGO" href="./index.html"><img src="@/assets/images/logo.png" alt=""/><span>党委办公室</span></a>
                <span>招生代码：5193</span>
                <div class="fr search_box in_box clearfix">
                        <input class="fl search" id="search" type="text" placeholder="请输入关键词" autocomplete="off" v-model='SearchStr' @keyup.enter='Search' />
                        <router-link to="./search.html?selText=''" ><div class="btn_search fr" id="searchbtn"><i></i></div> </router-link>
                </div>
            </div>
           
         </div>
         <div class="Menu">
            <ul id="Menu">
                  <li v-for='item in arr' :key='item.ID'>
                     <!-- <a :href=''  ></a> -->
                       <router-link :to="item.Url" :key='CId' :class="[item.On?'on':'']">{{item.Name}}</router-link>
                  </li>
                  <!-- <li><a href="./index.html">首页</a></li>
                  <li><a href="./list.html">党建动态</a></li>
                  <li><a href="./howllow">通知公告</a></li>
                  <li><a href="./howllow">重要文件</a></li>
                  <li><a href="./index.html">精准扶贫</a></li>
                  <li><a href="./index.html">统战工作</a></li>
                  <li><a href="./index.html">先进风采</a></li>-->
                  <li><a href="http://www.tianyi.edu.cn/"  target="_blank">学院首页1</a></li>
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
      arr: [],
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
     this.arr = this.Base.GetNavColumnsByDid();
     this.arr.unshift({Name:'首页',Url:'./index.html',On: true});
  }
}
</script>