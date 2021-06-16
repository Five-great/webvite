<template>
  <div id="Index"> 
      <slider :imgList = 'imgList'/>
      <div id='mid'>
           <news-list  :dataList = 'dynamicList' moreLink = "/list.html?HType=2&CId=3442" ></news-list>
           <tags-list 
             :dataTabs='[ {name:"通知公告",type: "List-home#n=32", data: noticeList,link: "/list.html?HType=2&CId=3444"},
                          {name:"教育教学",type: "List-home#n=32", data: jiaoyujiaoxue ,link: "/list.html?HType=2&CId=3450"}]'>
          </tags-list>
          <img-list :dataList = 'povertyList' > </img-list>
      </div>
  </div>
</template>

<script>
import '../assets/css/index.css';
import slider from '../components/slider'
import newsList from '../components/List-home'
import tagsList from '../components/Tags-home'
import imgList from '../components/Img-home'
export default {
  name: 'Index',
  data () {
    return {
      baseUrl:"http://base.hope55.com/",
      imgList: [],
      item:'',
      dynamicList:[],
      noticeList: [],
      fileList: [],
      povertyList: []
    }
  },
  
  created(){
       this.$root.$children['0'].$children['0'].menuListOne.forEach(element =>element.On = false)
       this.imgList = this.Base.GetFilesInfoByCid(3467,1,'',20,1); //banner
       this.dynamicList = this.Base.GetNewsInfoByCid(3442,true,1,'',4);//学校要闻
       this.noticeList = this.Base.GetNewsInfoByCid(3444,false,1,'',6);//通知公告
       this.jiaoyujiaoxue = this.Base.GetNewsInfoByCid(3450,false,1,'',4);//教育教学
       this.povertyList = this.Base.GetFilesInfoByCid(3440,1,'',6);
      //  console.log(this.imgList);
       
  },
  components: {
      slider: slider,
      newsList: newsList,
      tagsList,
      imgList
  }
}
</script>
