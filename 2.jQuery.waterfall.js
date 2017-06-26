// 一般插件的 主要方法 跟插件的名字 是一样的
/*
  由于这个插件是我自己来编写 可以要求 使用者 遵守一些规范 如果不遵守 那么就不要用
  调用这个插件 
    需要通过 瀑布流的 容器来调用 $('.container').waterfall();
    瀑布流容器中 布局的子元素 必须使用 .item 作为类名
  
*/
$.fn.extend({
  waterfall: function () {
    // 为了使用时 看起来 不至于弄混 可以把this 存起来
    // 这里 只是起了一个别名而已 
    var $this = this;

    // 布局容器 子元素的 宽度 瀑布流布局 子元素的宽度 都是一样
    var itemWidth = $this.children('.item').width();
    // 容器的宽度
    var containerWidth = $this.width();
    // 每一行的列数
    var colNum = Math.floor(containerWidth / itemWidth);
    // 间隙
    var margin = (containerWidth - colNum * itemWidth) / (colNum + 1);

    // 准备一个 高度数组
    var heightArr = [];
    // 为高度数组 设置一个 初始值
    for (var i = 0; i < colNum; i++) {
      // 默认都设置一个 间隙
      heightArr[i] = 0;
    }

    // 循环 一个个 .item div for
    $this.children('.item').each(function (index, element) {

      // 找到告诉数组中的 最小的值
      var minIndex = 0;
      var minHeight = heightArr[minIndex];

      // 循环验证
      for (var i = 0; i < heightArr.length; i++) {
        // 如果 我们人为的最小值 比当前循环的值 还要打 说明 有更小的
        if (minHeight > heightArr[i]) {
          minHeight = heightArr[i];
          minIndex = i;
        }
      }
      // 循环完毕之后 最小值 是不是就有了
      // 设置给 当前循环的那个 dom元素
      // console.log(element);
      // 转化为jQuery 对象
      $(element).css({
        left: margin + (margin + itemWidth) * minIndex,
        top: minHeight
      })
      // 用完了之后需要去更新 高度数组的值
      heightArr[minIndex] += $(element).height();
      heightArr[minIndex] += margin;
    })

    // 在循环完毕之后 获取 高度数组的 最大值 设置给 容器 即可

    // 假设 最大的索引为0
    var maxIndex = 0;
    var maxHeight = heightArr[maxIndex];

    // 循环计算
    for (var i = 0; i < heightArr.length; i++) {
      // 如果 循环的值 比我们认为的最大值 还要大
      if (heightArr[i] > maxHeight) {
        maxHeight = heightArr[i];
        maxIndex = i;
      }
    }
    // 设置布局容器的高度
    $this.height(maxHeight);

    // 为了链式编程
    return $this;
  }
})
