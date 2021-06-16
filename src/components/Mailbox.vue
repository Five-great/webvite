<template>
    <div class="Mailbox">
        <div class="textBox">
            <p>尊敬的来信人，您好！  </p>
            <p>为进一步增进学校领导与师生员工的密切联系，更好地解决师生普遍关心的实际问题，学院专门设立了"院长信箱"（以下简称"信箱"）。为了使"信箱"更好地发挥作用，请您在使用时注意以下几点：  </p>
            <p>1、学院欢迎广大师生员工就科院发展建设中存在的问题、各单位工作人员的职务行为等提出意见和建议。  </p>
            <p>2、来信内容应遵守中华人民共和国法律、法规，并应客观真实。  </p>
            <p>3、建议您尽量详细地描述所反映问题，并填写真实姓名和联系方式，以便及时反馈办理情况。  </p>
            <p>4、对于已经答复过的事项，"信箱"可不予受理，请勿就答复过的问题重复提交信件。感谢您对我们工作的支持与配合！   </p>
        </div>
        <ul id="yzxxID" class="yzxx">
        <div class="inputBox"> <label>姓名<span>*</span></label> 
           <input id="myName" type="text" placeholder="请输入您的姓名" v-model="mailName" ></div>
        <div class="inputBox"> <label>邮箱<span>*</span></label> 
          <input id="myEmail" type="text" placeholder="请输入您的电子邮箱" v-model="mailEmail"></div>
        <div class="inputBox"> <label>电话<span>*</span></label> 
         <input type="text" id="myPhone" v-model="mailPhone" placeholder="请输入您的电话"></div>
        <div class="inputBox max"> <label>标题<span>*</span></label> 
        <input id="myTitleId" type="text" placeholder="请输入标题" v-model="mailTitle"></div>
        <div class="inputBox max"> <label>内容<span>*</span></label> 
          <div class="textareaBox fr"> <textarea id="textID" name="" v-model="mailInfo" placeholder="请输入内容" cols="30" rows="10"></textarea></div>
        </div>
        </ul>
        <a class="btn_send" @click.stop="sendMail">点击发送</a>
    </div>
</template>
<script>
// import ddd from '@npkg/tinymce-plugins/libsss/List-home.vue'
export default {
  name: 'mailbox',
  props: {
     dataList: { // 图片列表
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
        mailPhone:'',
        mailName:'',
        mailTitle:'',
        mailInfo:'',
        mailEmail:''
     }
   },
   methods:{
      sendMail(){
          this.Base.sendMail({Name: this.mailName ,
            Email: this.mailEmail ,
            Mobile: this.mailPhone,
            Title: this.mailTitle ,
            Info: this.mailInfo,
            ColumnID: this.$route.query.CId});
      }

  }
}
</script>
<style lang="scss" scoped >
// $themeColor
  .Mailbox{
      .textBox{
          background: #fff;
          padding: 30px;
          height: 400px;
            p{ 
                &:first-child{
                 text-indent: 0px;
                }
                 letter-spacing: 1px;
                font-size: 18px;
                color: rgb(51, 51, 51);
                line-height: 2;
                text-align: justify;
                text-indent: 38px;
            }
      }
    .btn_send{ font-size: 16px;color:  $themeColor;font-family: "Microsoft YaHei";line-height: 1.5; padding: 5px 50px;border: 1px solid  $themeColor;width: 100px;text-align: center;letter-spacing: 2px; border-radius: 30px; margin: 20px auto; }
.btn_send:hover{background:  $themeColor;color: #fff; } 
.yzxx { padding-top:30px; min-height: 480px; font-size: 0;}
.yzxx .inputBox{ display: inline-block; width: 360px;height: 60px; 
     &:first-child{
          margin-right:80px;
     }
}
.yzxx .inputBox>label{font-size: 16px; color: $themeColor;}
.yzxx .inputBox>input{display: inline-block; width: 278px;border-radius: 5px;margin-left:15px;font-size: 14px; border: 1px solid $themeColor;padding: 7px 10px 5px 10px;}
.yzxx .inputBox>input::placeholder{ color: #999;}
.yzxx .inputBox.max{ width: 800px;}
.yzxx .inputBox.max>input{ width: 718px;}
.yzxx .inputBox .textareaBox{display: inline-block;margin-left: 5px; width: 740px; margin-right:5px; border-radius: 5px;height: 290px;border: 1px solid $themeColor;overflow: hidden;}
.yzxx .inputBox .textareaBox>textarea{width: 730px; margin-top:-1px;margin-left: -1px ; min-height: 272px;max-height: 292px;font-size: 16px; padding: 10px;}
.yzxx .inputBox .textareaBox>textarea::placeholder{color: #999;}
.yzxx .inputBox.max>label{vertical-align: top;}
     
     
  }

</style>