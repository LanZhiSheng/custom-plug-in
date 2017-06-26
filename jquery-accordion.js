/**
 * Created by Administrator on 2017/5/7.
 */

$.fn.accordion =function (){
  //1.获得要操作的对象
  // var lis = $("#box li");
  var lis = this.find('li'); // 在插件当中，this表示jQuery对象
  // var boxWidth = $("#box").width();
  var boxWidth = this.width();
//2.给li设置一个宽度
//        lis.css({   // 是给每一个li标签 添加宽度
//          width: Math.ceil((boxWidth/lis.length)),
//        });
  wid();
//3. 给每个li标签随机生成颜色
  lis.each(function(index,ele){
    $(ele).css({
      backgroundColor:createColor()
    })
  });
// 4. 鼠标移入当前的li标签，要让当前的li标签扩大3倍,其余的平均剩余的宽度
  lis.on("mouseenter",function (){
    $(this).stop().animate({
      width: $(this).width()*3
    },500).siblings().stop().animate({
      width: (boxWidth-$(this).width()*3)/(lis.length-1)
    })
  });
  // 5.鼠标离开当前盒子的时候，要让所有的li标签恢复原样
  this.on("mouseleave",function (){
    wid();
  })
  function wid(){
    lis.css({   // 是给每一个li标签 添加宽度
      width: Math.ceil((boxWidth/lis.length)),
    });
  }

  function createColor(){
    var str = "#";
    var colors = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9];
    for(var i=0;i<6;i++){
      var index = Math.floor(Math.random()*colors.length);
      str+= colors[index];
    }
    return str;
  }
}
