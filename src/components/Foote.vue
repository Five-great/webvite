<template>
  <div id="Foote" class="in_box">
         <div class="w1200 clearfix">
           <div class="leftBox wow fadeInLeft">
               <p>招生电话：0791-85866356（前台）<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 85866707（传真）</p>
               <p>学院地址：中国 . 白银. 白银白银白银</p>
               <p><a href="http://beian.miit.gov.cn" target="_blank">赣ICP备15004302号</a></p>
               <p><a href="http://beian.miit.gov.cn" target="_blank">赣公网安备 36012102000108号</a></p>
           </div>
           <div class="midBox">
              <img  class="wow fadeInUp"  src="@img/footerLogo.png" alt="">
              <img   class="wow fadeInUp" data-wow-delay="0.3s" src="@img/footerLogoTitle.png" alt="">
           </div>
           <div class="rightBox">
               <ul class="wow fadeInRight" >
                  <li><div class="QRCode"> <img id="wxQRCodeID" src="@img/qrCodeImg.png" alt=""></div> <img src="@img/wxicon.png" alt=""><p>微信</p></li>
                  <li><div class="QRCode"> <img  id="wbQRCodeID" src="@img/qrCodeImg.png" alt=""></div> <img src="@img/wbicon.png" alt=""><p>微博</p></li>
                  <!-- <li><div class="QRCode"> <img  id="QQQRCodeID" src="./img/qrCodeImg.png" alt=""></div> <img src="./img/QQicon.png" alt=""><p>QQ</p></li> -->
                  <li><div class="QRCode"> <img  id="dyQRCodeID"  src="@img/qrCodeImg.png" alt=""></div> <img src="@img/wxicon.png" alt=""><p>抖音</p></li>
              </ul>
           </div>
         </div>
  </div>
</template>

<script>
export default {
  name: 'Foote',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss" scoped>
#Foote{ height: 320px; background: url("@img/footerBg.png") no-repeat top; padding-top:60px; width: 100%; }
#Foote p{ font-size: 16px; font-family: "Microsoft YaHei";  color: rgb(255, 255, 255);  line-height: 40px; letter-spacing: 1px; text-align: justify;} 
#Foote p>a{display: inline-block; font-size: 16px; font-family: "Microsoft YaHei";letter-spacing: 1px;  color: rgb(255, 255, 255);  line-height: 40px;  text-align: justify;}
#Foote  .leftBox{padding-top: 10px ; width: 345px; display: inline-block;vertical-align: middle;}
#Foote  .midBox{ display: inline-block;width: 445px;padding: 10px; vertical-align: middle;height: 195px; border-left: 1px solid #fff;border-Right: 1px solid #fff; text-align: center;}
#Foote  .midBox>img{ margin: 5px auto;}
#Foote  .rightBox{display: inline-block;width: 313px;padding-left: 22px; vertical-align: middle;}
#Foote .rightBox ul{}
#Foote .rightBox ul li{ display: inline-block;width: 101px; padding-top: 20px; position: relative; text-align: right;}
#Foote .rightBox ul li p{font-size: 14px; color: rgb(255, 255, 255); text-align: center;position: relative; z-index: 8;padding-top: 8px ; padding-left: 33px ;}
#Foote .rightBox ul li img{position: relative;z-index: 8; }
#Foote .rightBox ul li .QRCode{position: absolute;display: none; z-index: 9; width: 90px; height: 90px; padding: 5px; background: #fff; top:-85px;left: 14px;}
#Foote .rightBox ul li .QRCode img{width: 90px;}
#Foote .rightBox ul li .QRCode::after{content: ""; display: block; position: relative;width: 0; border: 5px solid transparent ; border-top: 8px solid  #fff; bottom: 0; left: 42px;}
#Foote .rightBox ul li:hover .QRCode{display: block;}
</style>