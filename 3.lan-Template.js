/**
 * 
 */
function template(id, data) {
  // 获取模板字符串
  var templateString = document.getElementById(id).innerHTML;

  // 定义正则表达式 
  var reg = /{{(\w+)}}/;

  // 循环替换 直到替换不了为止
  var result;

  while(result = reg.exec(templateString)){
    templateString = templateString.replace(result[0],data[result[1]]);
  }
  // 把替换完毕的内容返还给用户 s
  return templateString;
  
}