#### 1. 什么是JQuery

- JavaScript库：一个封装号特定的集合（方法和函数）
- 方便快速操作DOM
- 常见的JavaScript库：JQuery，Prototype，YUI，Dojo，ExtJS，移动端的zepto

> JQuery是一个快速，简洁的库，宗旨`write less,do more`

优点：

- 轻量，跨浏览器，链式编程，隐式迭代
- 对事件、样式、动画支持，简化DOM操作
- 支持插件扩展开发，开源，免费

#### 2. JQuery基本使用

官方地址：https://jquery.com/

中文地址：https://jquery.cuishifeng.cn/

下载地址：https://jquery.com/download/

百度CDN：https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js

使用：

- 引入JQuery文件
- 在文档末尾插入script标签，书写代码

两种入口函数

```js
// 第一种
$(function() {
  ..... // 代码逻辑
})
// 第二种
$(document).ready(function() {
  ..... // 代码逻辑
})
```

> - DOM渲染完毕，立即执行代码，不必等待外部资源加载完毕

#### 3. JQuery对象

顶级对象$

- $ 是JQuery的别称，代码中可以用JQuery也是一样的
- $是顶级对象，相当于JS中的window对象
- 可以修改$顶级对象的别称

```js
$(function() {
  // 修改顶级对象名称为suibian
  var suibian = jQuery.noConflict();
})
```

JQuery对象和DOM对象

- JQuery的本质就是，利用$对象对封装后DOM对象进行操作
- JQuery和DOM对象的转换

```js
// 1.DOM对象转换为JQuer，只有一种方法
var box = documetn.getElementByID('box')
var jqObj = $(box)

2.JQuery对象转换为DOM对象
// 方法1
var domObj1 = $('div')[0]
// 方法2
var domObj2 = $('div').get(0)

```

#### 4. JQuery选择器

```js
// 基础选择器
$("选择器")  // .box #home div/p/span...
// 层级选择器
$("father son")
// 筛选选择器
$("div:first") 第一个
$("div:eq(2)") 第二个
$("div:odd")  奇数
$("div:even") 偶数
```

#### 5. 思想

- 隐式迭代：会对匹配到的元素进行遍历操作，不需要我们进行循环

- 链式编程：一层一层的调用方法，美观优雅

- JQuery 排他思想

```js
// 想要多选一的效果，排他思想：当前元素设置样式，其余的兄弟元素清除样式。
$(this).css("color", "red").sibiling().css("color", "")
```

#### 6. 样式操作

- 操作css方法

```js
// 1.参数只写属性名，则是返回属性值
var strColor = $(this).css('color');

// 2.  参数是属性名，属性值，逗号分隔，是设置一组样式，属性必须加引号，值如果是数字可以不用跟单位和引号
$(this).css(''color'', ''red'');

// 3.  参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开， 属性可以不用加引号
$(this).css({ "color":"white","font-size":"20px"});
```

- 设置类样式方法

```js
// 1.添加类
$("div").addClass("box")

// 2.删除类
$("div").removeClass("box")

// 3.切换类
$("div").toggleClass("box")
```

> 设置类样式方法比较适合多样式操作
>
> 原生的JS中 calssName 会覆盖元素原先里面的类名，JQuery则不会

#### 7.JQuery效果

- 显示隐藏：show() / hide() / toggle()
- 滑入滑出：slideDown() / slidUp() / slideToggle()
- 淡入淡出：fadeIn() / fadeOut/ fadeToggle() / fadeTo()
  - foade() 为修改透明度 foadeTo(speed, opcity)
- 自定义动画：animate()
  - 停止动画排队：动画一旦触发就造成多个动画或者效果排队执行
  - stop()

```js
$(function() {
  $("button").click(function() {
    $("div").animate({
      width: 100,
      height:200,
      opacity: .1
    })
	})
})
```

- 事件切换 hover() 类似 css 中的伪类 :hover
  - over：鼠标经过到元素上要触发函数（相当关于mouseenter）
  - out：鼠标离开元素要触发的函数（相当于mouseleave）
  - 如果只有一个函数，则经过和离开都会触发

```js
hover([over,]out)
```

#### 8. 属性操作

- prop()  元素固有属性操作

```js
$("input[type='checkbox']").prop("checked", "参数，callback");
```

注意：prop() 除了普通属性操作，更适合操作表单属性：disabled / checked / selected 等

- attr() 元素自定义属性

```js
// 基本使用
$("img").attr("src","test.jpg");
// 多属性使用
$("img").attr({ src: "test.jpg", alt: "Test Image" });
// 回调函数
$("img").attr("title", function() { return this.src });
// 新增属性
$("div").attr("index", 4);
```

注意：attr() 除了普通属性操作，更适合操作自定义属性

- data() 数据缓存

```js
// 设置data的缓存名称 
$("span").data("uname", "andy");
// 获取H5自定义属性
$("div").data("index")
```

注意：同时，还可以读取 HTML5 自定义属性  data-index ，得到的是数字型。

#### 9. 内容文本

- html()：innerHTML
- text()：innerText 
- val()：value 

```js
// 1. 获取设置元素内容 html()
$("div").html("123")
// 2. 获取设置元素文本内容 text()
$("div").text("123");
// 3. 获取设置表单值 val()
$("input").val("123");
```

#### 10. 元素操作

- 遍历元素

```js
// index为索引号，dom为元素的节点, dom为js对象，需要转换为$对象$(dom)
$.ecah($("div"), function(index, dom) {
  ....处理程序
})
```

- 创建、添加、删除

  ```js
  // 1. 创建元素
  var li = $("<li>我是后来创建的li</li>");
  // 2. 添加元素
  // 	2.1 内部添加
  $("ul").append(li);  // 内部添加并且放到内容的最后面 
  $("ul").prepend(li); // 内部添加并且放到内容的最前面
  //  2.2 外部添加
  var div = $("<div>我是后妈生的</div>");
  $(".test").after(div);  // 之前
  $(".test").before(div);  // 之后
  // 3. 删除元素
  $("ul").remove(); 删除当前匹配的元素和类（不加参数，.hello）
  $("ul").empty(); // 删除匹配的元素里面的子节点 孩子
  })
  ```

- 尺寸、位置操作

```js
// 1. width() / height() 获取设置元素 width和height大小 
console.log($("div").width());
$("div").width(300);

// 2. innerWidth() / innerHeight()  获取设置元素 width和height + padding 大小 
console.log($("div").innerWidth());

// 3. outerWidth()  / outerHeight()  获取设置元素 width和height + padding + border 大小 
console.log($("div").outerWidth());

// 4. outerWidth(true) / outerHeight(true) 获取设置 width和height + padding + border + margin
console.log($("div").outerWidth(true));
})
```

- 位置操作

```js
// 1. 获取设置距离文档的位置（偏移） offset
console.log($(".son").offset());
console.log($(".son").offset().top);
// $(".son").offset({
//     top: 200,
//     left: 200
// });

// 2. 获取距离带有定位父级位置（偏移） position   如果没有带有定位的父级，则以文档为准
// 这个方法只能获取不能设置偏移
console.log($(".son").position());

// 3. 被卷去的头部
$(document).scrollTop(100);
// 被卷去的头部 scrollTop()  / 被卷去的左侧 scrollLeft()
// 页面滚动事件 $(window).scroll()
$(document).scrollTop()

```

#### 11. 事件处理

- 普通事件

```js
$("div").click(function() {
   $(this).css("background", "purple");
});
```

- 新增事件处理
  - on()：事件绑定
    - 其他时间绑定方法bind() / live() / delegate()
  - off()：事件解绑
    - 其他事件解绑方法die() / undelegate()
  - trigger() / triggerHandle()：事件自动触发

```js
// on() 事件绑定 
// 1.可以绑定一个或多个事件处理程序
$("div").on({
  click: function() {},
  mouseenter: function() {}
})
$("div").on("mouseenter mouseleave", function() {})
// 2.可以实现事件委派
$("ul").on("click", "li", function() {})
// 3.可以给未来动态创建的元素绑定事件(留言板)
$("ul").on("click", "li", function() {})
$("ul").append("<li>我是后来创建的</li>")

// 事件解绑 off 
$("div").off();  // 这个是解除了div身上的所有事件
$("div").off("click"); // 这个是解除了div身上的点击事件
$("ul").off("click", "li"); //指定解绑事件

// one() 但是它只能触发事件一次
$("p").one("click", function() {})

// trigger 事件自动触发
$("p").click( function (event, a, b) {
  // 一个普通的点击事件时，a和b是undefined类型
  // 如果用下面的语句触发，那么a指向"foo",而b指向"bar"
} ).trigger("click", ["foo", "bar"]);
// triggerHandler 事件自动触发 不触发事件的默认行为
```

- 事件对象

```js
$("div").on("click", function(event) {
	console.log(event)
})
```

- 拷贝对象

```js
var obj = {
  id = 0
}
var obj2 = {
  id = 1,
  name: "andy"
}
$.extend(obj, obj2)
```

> 当两个对象有相同数据的时候会合并第一个obj对象数据，没有则合并



#### 12. 其他

- JQuery允许多库共存

```js
$(function() {
  		// 让jquery 释放对$ 控制权 让用自己决定
  		var suibian = jQuery.noConflict();
  		console.log(suibian("span"));
	})
```



#### JQuery插件

- JQuery插件之家： http://www.htmleaf.com/   免费
- JQuery 插件库：http://www.jq22.com/     

使用

- 引入相关文件
- 复制html，css，js相关文件

常用插件

- 图片懒加载
- 全屏滚动插件：http://www.dowebok.com/demo/2014/77/

#### JQuery组件

组件：凡是在软件开发中用到了软件的复用，被复用的部分可以称为组件

插件：凡是在应用程序中已经预留接口的组件就是插件

bootstrap组件

- 引入bootstrap相关css和js
- 复制html功能模块

