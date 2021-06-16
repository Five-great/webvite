new WOW().init(); 

$(function(){
    $(".select").each(function(){
        let s=$(this);
        let z=parseInt(s.css("z-index"));
        let dt=$(this).children("input");
        let di=$(this).children("i");
        let dd=$(this).children("div");
        let _show=function(){dd.slideDown(200);dt.parent().addClass("cur");s.css("z-index",z+1);};   //展开效果
        let _hide=function(){dd.slideUp(200);dt.parent().removeClass("cur");s.css("z-index",z);};    //关闭效果
        dt.click(function(){dd.is(":hidden")?_show():_hide();});
        di.click(function(){dd.is(":hidden")?_show():_hide();});
        dd.find("a").click(function(){dt.val($(this).html());dt.attr('tid',$(this).attr('tid')); _hide();}); 
        $("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
    })
})
 function checkform(e){
     console.log(e)
     console.dir($("#myForm").serializeArray())

 }
//  $(function(){
//     $("body .zxbm").on("click",function(){
//         parent.window.location.href=parent.window.location.href.replace("#ExpressID","")+"#ExpressID"
//     })
// })