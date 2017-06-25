  // 为了比较为window对象 添加过多的 属性 方法 --避免全局变量污染
  // 一般会使用命名空间进行优化 把我们想要添加的 变量 属性 方法呀 全部都 丢到一个对象的里面
  // 只往页面中 添加了一个对象
  // 所有要增加的内容 都在这个对象的 属性中
  var heima = {
    sayHi: function () {

    },
    eatfood: function () {
    },
    get: function (url, data, success) {
      //1.创建异步对象
      var xhr = new XMLHttpRequest();

      // 如果用户传了data进来 并且 data是有值的
      if (data) {
        url += '?';
        url += data;
      }
      //2.设置请求行
      xhr.open('get', url);

      //3.设置请求头(get请求可以省略)
      //4.注册状态改变事件
      xhr.onreadystatechange = function () {
        //4.1判断状态&请求是否成功并使用数据
        if (xhr.readyState == 4 && xhr.status == 200) {

          // 获取 响应 头 大小写 没有要求
          // console.log(xhr.getResponseHeader('content-type'));
          var type = xhr.getResponseHeader('content-type');
          // 使用正则来判断 是否有 json
          var jsonReg = /json/;
          if (jsonReg.test(type) == true) {
            // 如果进来了 说明是 json数据
            success(JSON.parse(xhr.responseText));
            return;
          }
          // console.log(jsonReg.test(type));
          // 使用正则来判断 是否有 xml
          var xmlReg = /xml/;
          if (xmlReg.test(type) == true) {
            success(xhr.responseXML);
            return;
          }
          // console.log(xmlReg.test(type));
          success(xhr.responseText);
        }
      }
      //5.发送请求
      xhr.send(null);
    },
    post: function (url, data, success) {
      //1.创建异步对象
      var xhr = new XMLHttpRequest();
      //2.设置请求行
      xhr.open('post', url);
      //3.设置请求头(get请求可以省略)
      // 只在发送数据的时候 才需要设置
      if (data) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      //4.注册状态改变事件
      xhr.onreadystatechange = function () {
        //4.1判断状态&请求是否成功并使用数据
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 使用 indexof 进行判断
          // 获取 content-type的值
          var type = xhr.getResponseHeader('content-type');

          // console.log('json:' + type.indexOf('json'));
          // console.log('xml:' + type.indexOf('xml'));
          // indexof 字符串用来判断内部是否有某个值的 如果存在 返回的是 位置
          // 如果不存在 返回的是 -1
          if (type.indexOf('xml') != -1) {
            // 如果 返回的数据时 xml 那么 就把 xml 给回调函数,success就是指一个回填函数
            success(xhr.responseXML);
            return;
          }
          if (type.indexOf('json') != -1) {
            success(JSON.parse(xhr.responseText));
            return;
          }
          // 判断数据的格式 并返回
          success(xhr.responseText);
        }
      }
      //5.发送请求
      xhr.send(data);
    },
    /*
      type：请求方法
      data: 发送的数据
      url: 请求的url
      success:回掉函数
    */
    ajax: function (option) {
      //1.创建异步对象
      var xhr = new XMLHttpRequest();
      //2.设置请求行
      if (option.type == 'get' && option.data) {
        option.url += '?';
        option.url += option.data;
        // 如果是get请求 那么 把data 设置为null 发送的时候 就相当于 发送null
        option.data = null;
      }
      xhr.open(option.type, option.url);
      //3.设置请求头(get请求可以省略)
      if (option.type == 'post' && option.data) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      //4.注册状态改变事件
      xhr.onreadystatechange = function () {
        //4.1判断状态&请求是否成功并使用数据
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 判断数据格式 并返回不同的给用户
          var type = xhr.getResponseHeader('content-type');

          // 判断是否为json
          if (type.indexOf('json') != -1) {
            option.success(JSON.parse(xhr.responseText));
            return;
          }
          // 判断是否为xml
          if (type.indexOf('xml') != -1) {
            option.success(xhr.responseXML);
            return;
          }
          option.success(xhr.responseText);
        }
      }

      //5.发送请求
      // if(type=='get'){
      //   xhr.send(null);
      // }else{
      //   xhr.send(data);
      // }
      xhr.send(option.data);
    }
  }

