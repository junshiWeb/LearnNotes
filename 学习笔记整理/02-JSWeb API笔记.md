# Day1

### 1.1. Web API

- API：应用程序编程接口
- Web API：浏览器提供操作浏览器功能和页面元素的API（DOM和BOM）
- 接口：预先定义的函数，无需了解内部实现源码、内部工作细节，直接调用

#### 1.2. DOM

- 什么是DOM？ 
  - 文档对象模型，W3C组织推荐处理的可扩展标记语言（html和xhtml）标准接口
- DOM树了解（文档结构）
  - 文档：一个页面就是一个文档，DOM中使用document表示
  - 节点：网页中所有内容都称节点（node）
  - 标签节点：网页中所有标签，也称元素节点（element）
- 核心总结
  - 改变网页的内容、结构和样式
  - JS有一套自己的DOM编程接口
  - DOM使HTML形成一颗DOM数包含文档、节点、标签节点
  - DOM操作：主要针对元素的创建、增、删、改、查、属性、事件等操作

#### 1.3.获取元素

- 根据ID获取
  - document.getElementByID('id')       
  - 返回obj或null
- 根据标签名获取
  - document.getElementByTagName('标签名')
  - 返回元素集合（数组）
  - 要操作元素就只能遍历元素或使用array[0]
  - 动态元素的集合，页面标签新增，集合中元素也增加
- H5新增获取元素方式
  - 存在兼容性问题
  - document.getElementByClassName('类名')
    - 返回类名元素对象集合
  - doucment.querySelector('选择器') 
    - 指定返回第一个选择器元素 
  - document.querySelectorAll('选择器')
    - 指定返回选择器所有元素
  - 选择器（'#id', ',class’ .......）
- 获取特殊元素
  - doucument.body
  - doucument.documentElement

#### 1.4. 事件

- 什么是事件？
  
  - 触发---响应过程
  
- 事件三要素
  - 事件源（谁）：触发事件元素
  - 事件类型（什么事件）：click事件等.....
  - 事件处理程序（做什么）：事件触发要执行的代码（要做的事）
  
- 常见的事件
  - occlick：鼠标点击
  - onmouseover：鼠标经过
  - onmouseout：鼠标离开
  - onfocus：获取焦点
  - onblur：失去焦点
  - onmousemove：鼠标移动
  - onmouseup：鼠标弹起
  - onmousedown：鼠标按下

  mouseenter和mouseover区别：

  - mouseenter
    - 鼠标移动到元素上是触发
    - 只有经过自身盒子触发
  - mouseover
    - 鼠标移动元素触发
    - 经过父盒子触发，经过子盒子也会触发
  - 总结：因为mouseenter不会冒泡，**mouseenter**搭配鼠标离开 **mouseleave**  同样不会冒泡

#### 1.5. 操作元素

- 改变元素内容

  - element.innerText
  - element.innerHTML
  - 区别
    - 获取内容时：innerText会去除空格和换行，而innerHTML会保留空格和换行
    - 设置内容时：innerText不识别html，innerHTML识别html

- 属性操作

  - src、href、id、alt、title
  - type、value、checked、selected、disabled
  - xxxx.属性（img.src）
  - 获取对象属性：img.scr   获取的值是一个对象
  - 对象属性赋值：img.src = 'xx'
  - 样式属性操作
    - element.style    行内样式操作
    - element.className   类名操作
    - 注意：js中样式要是用驼峰式命名   fontSize.....

  

# Day2

#### 2.1 排他思想

- 1.所有元素清楚样式（干掉所有人）
- 2.给当前元素设置样式（留下我自己）
- 3.顺序不能颠倒

### 2.2 自定义属性操作

- 获取属性值
  - element.属性  获取内置属性
  - element.getAttribute('属性')  主要获取自定义属性值
- 设置属性值
  - element.属性 = '值'
  - elmenet.setAttribute('属性'， '值')
- 移除属性
  - element.moveAttribute
- H5自定义属性
  - 设置自定义属性，规定date-开头
    - element.setAttribute('data-index', 1)
  - 获取自定义属性
    - element.getAttribute('data-index', 1)
    - element.datase.index  或者 element,dataset['index']  ie11才支持

#### 2.3 节点操作

- 节点
  - 元素节点：nodeType = 1
  - 属性节点：nodeType = 2
  - 文本节点：nodeType = 3
  - 实际开发中主要操作元素节点
- 父节点
  - node.parentNode  最近的父元素节点
- 子节点
  - node.children   所有的子元素节点
  - 获取元素第一个子节点和最后一个子节点（存在兼容性问题一般不使用）
    - firstChild和lastChild   操作不方便
    - firstElementChild和lastELementChild  兼容性问题
  - 解决方案
    - node.children[0]
    - node.children[ children.length - 1]
- 兄弟节点
  - nextSibling
  - nextElementSibling
- 创建节点
  - document.createElement('tagName')
- 添加节点
  - node.appendChild( child ) 添加指定节点元素到子节点末尾 类似after伪元素
  - node.insertBefore(child，指定元素) 添加到指定节点前面，类似before

#### 案例：

1. 百度换肤
   - 点击指定背景，切换到指定背景
2. 表格隔行变色
   - 隔行颜色不同，并且鼠标移动到和离开有不同样式显示
3. 全选操作
4. tab栏切换
5. 新浪下拉菜单
6. 简单发布留言版

# DAY03

#### 3.1 节点操作

- 删除节点
  - node.removeChild('指定节点') 删除一个子节点，返回删除的节点

- 复制节点
  - node.cloneNode( ) 返回复制的一个节点
    - 括号内为true，为深拷贝，会复制节点本身以及所有子节点
    - 括号内为false，为浅拷贝，只复制节点本身
- 创建元素的三种方式
  - doucment.write() 
    - document.write 直接将内容写入到页面的内容，**文档流执行完毕，则会将页面进行重绘**
  - element.innerHTML = 
    - 将内容直接写入某个DOM节点，不会进行页面的重绘
    - 创建多个元素效率高(不要使用拼接方式（join），使用数组方式)，结构复杂
  - document.createElement()
    - 创建多个元素效率低，但是结构清晰

### 3.2 DOM总结

主要针对元素的创建、增、删、改、查、属性、事件等操作

- 创建
  - document.write()
  - element.innerHTML = 
  - document.CreateElement()
- 增加
  - appendChild
  - insertBefore
- 删
  - removeChild
- 改
  - 元素属性修改：scr、href、title
  - 普通元素修改：innerHTML、innerText
  - 表单元素修改：valuie、type、disabled
  - 元素样式修改：style、className
- 查
  - DOM提供的API：getElementById、getElementsByTagName 
  - H5：querySelector、querySelectorAll
  - 节点：父（parentNode)、子（children）、兄（previousElementSibling、nextElementSibling）
- 属性操作
  - 设置属性：setAttribute
  - 得到属性：getAttribute
  - 移除属性：removeAttribute
- 事件操作
  - 注册事件
    - 传统模式
      - onclick.......
        - 事件源（谁）、事件类型（什么事件）、事件处理程序（做什么）
    - 监听注册
      - addEventListener( '事件', '回调函数' true|false（冒泡|捕获）)
      - 不需要添加on删除事件
  - 删除事件
    - 传统方式
      - eventTarget.onclick = null
    - 监听方式
      - eventTarget.removeEventListener( type, fn )  
      - eventTarget.datachEvent('onclick' fn )  
  - DOM事件流
    - 捕获过程
    - 当前目标阶段
    - 冒泡过程
  - 事件对象
    - 事件发生后，跟事件相关的一系列信息数据的集合都放到这个对象里面，这个对象就是事件对象
    - function( event ) {  conlog( e )  }
    - e.target和this的区别
      - 一般情况下返回的是一个对象
      - 当父元素是事件对象是，执行了子元素，则指向不同（冒泡阶段）
  - 阻止默认行为
    - e.preventDefault（）
  - 阻止事件冒泡
    - stopPropagation（）
  - 事件委托
    - 原理：通过监听父元素，影响每一个子节点
    - 通过获取事件的e.earget（事件对象的属性）中的style

#### 3.3鼠标事件

- contextmenu：禁用右键菜单事件
- selectstart：禁用选中文字事件

- 鼠标事件 （点击、移动、离开、鼠标按下、松开）

- 鼠标事件对象
  - e.clienX   Y 鼠标可视区域X、Y坐标
  - e.pageX   Y 鼠标文档页面区域X、Y坐标
  - e.screenX   Y 鼠标屏幕区域X、Y坐标

#### 案例：

1. 删除留言
   - 发布留言，删除当前留言
2. 动态生成表格
   - 通过数据动态生成元素
3. 跟随鼠标的图像
   - 选择一个图片跟随鼠标移动

# DAY4

#### 4.1 键盘事件

- onkeyup：按键松开时触发
- onkeydown：按键按下时触发
- onekypress：按键按下时触发，**不识别功能键cart enter ...**

使用addEventListener不需要加on

- keyCode ：返回键盘事件的ASCII

#### 4.2 BOM

- 什么事BOM

  - 浏览器对象模型，用于在浏览器之间进行交互

- 构成

  - 比DOM更大
  - BOM相当于window（document、location、nvaigation、screen、history

- 顶级对象window

  - 提示JS访问浏览器的一个接口
  - 是一个全局对象，可以省略window，alert() prompt()等都是

- window常见事件

  - 页面（窗口）加载

    - onload = function()  { }
      - 当DOM加载完成时触发，包括样式，图片，脚本flash的加载
    - DOMContentLoaded = function () { }
      - 当DOM加载完成时触发，不包括样式，图片，flash的加载

  - 窗口大小事件

    - onresize = function () { }
      - 窗口大小修改后触发fn函数
    - 可以进行响应式布局使用

    事件都可以使用addEventListerner（）监听

- 定时器

  - setTimeout( fn , 延迟毫秒数)  回调函数不需要添加()
    - 定时器
    - 一般给定时器赋值一个标识符
    - 直接执行
    - 停止定时器：clearTimeout( 标识符 )
  - setInterval()
    - 闹钟定时，每隔一段时间调用一次这个函数
    - 一般给定时器赋值一个标识符（定时器很多）
    - 第一次执行也会有间隔毫秒数

- this指向问题

  1. 全局作用域或者普通的函数中this的指向是window
  2. 方法调用中谁使用了它就指向谁
  3. 构造函数中this指向的是实例对象

- location对象

  - 用于获取窗体的URL，并且可以用于解析URL，该属性返回的是一个对象
  - URL（统一资源定位符）组成
    - protocol ：通信协议
    - host：主机、域名
    - port：端口号
    - path：路径
    - query：参数 以键值对方式存在
    - fagment：片段  #后面
  - location对象
    - location.href
  - location常见方法
    - location.assign()：跟href一样，可以跳转页面（重定向页面）
    - location.replace()：替换当前页面，不记录历史
    - location.reload()：重新加载页面，刷新页面

- navigotor对象
  
  - 包含浏览器信息，
- history对象
  - 用于对访问过的历史页面进行交互
  - back()：后退
  - forward()：前进
  - get（参数）：前进后退多少

#### 4.3 JS执行机制

- JS是单线程执行
  - 只有当前面的完成才会进行下一步的操作
- 同步任务和异步任务
- JS执行机制（事件循环）
  1. 先执行执行栈的同步任务
  2. 异步任务（回调函数）放入任务队列中
  3. 一旦执行栈中的同步任务执行完毕，按次序执行任务队列中的异步任务



#### 案例：

1. 模拟京东按键输入
   - 按下s时获取搜索框焦点
2. 京东快递单号查询放大
   - 获取焦点时弹出放大框，失去焦点时隐藏
3. 5秒后关闭广告 setTimeout
4. 倒计时 setInterval
5. 发送短信倒计时
6. 5分钟后自动跳转页面
7. 获取URL参数

# DAY05

##### 5.1 元素偏移量offset

- offset（偏移量）
  - element.offsetParent：返回该元素的父级元素，如果没有则返回body
  - element.offsetTop：返回元素相对定位父元素上方的偏移
  - element.offsetLeft：返回元素相对定位父元素左边的偏移
  - element.offsetWidth：返回包括自身padding、边框、内容区域宽度，不带单位
  - element.offsetHeight：返回包括自身padding、边框、内容区域宽度，不带单位
- offset和style的区别
  - offset可以获得任意样式的值，style不可以
  - offset不带单位，style带单位
  - offset只读，不能修改，style可以修改和获取值
  - offsetWidth获取padding、边框、内容，style.width获取宽度没有其他值

#### 5.2 元素可视区client系列

- client（客服端）
  - el.clientTop：返回元素上边框的大小
  - el.clientLeft：返回元素左边框的大小
  - el.clientWidth：返回padding、内容宽度，不带单位
  - el.clientHeight：返回padding、内容宽度，不带单位

#### 5.3 元素滚动scroll

- scoll（滚动）
  - el.scrollTop：返回被滚去上侧距离
  - el.scrollLeft：返回被滚去左侧距离
  - el.scrollWidth：返回实际宽度，不带边框，不带单位
  - el.scrollHeight：返回实际高度，不带边框，不带单位

三大系列主要区别：

他们主要用法：

1.offset系列 经常用于获得元素位置    offsetLeft  offsetTop

2.client经常用于获取元素大小  clientWidth clientHeight

3.scroll 经常用于获取滚动距离 scrollTop  scrollLeft  

4.注意页面滚动的距离通过 window.pageXOffset  获得



#### 案例：

1. 获取鼠标在盒子内坐标
2. 模态框拖拽
3. 仿京东放大镜
4. 淘宝flexible.js源码分析
5. 仿淘宝固定右侧侧边栏
6. 动画封装
   - 获取盒子位置，让盒子位置+1px，通过定时器不断重复

# DAY06

#### 6.1动画函数封装

- 缓动效果原理
  - 改变元素的运动速度，从而达到缓动效果，修改每次移动的步长
- 指定目标移动
  - 修改步长的长度
- 添加回调函数

#### 6.2 节流

- 防止一个按钮连续点击造成的影响
  - 目的；当一个函数指向完毕，再去执行下一个函数，让一个事件无法连续触发
  - 思路：利用回调函数，添加一个变量控制，锁住函数和解锁函数
  - 节流：开关水龙头

#### 6.3 移动端触屏事件

- 触屏touch事件
  - touchstart：手指触摸到一个DOM元素触发
  - touchmove：手指滑动触发
  - touchend：手指离开触发
- 触屏事件对象
  - targetTocuhes：手指状态发生改变列表，从无到有，从有到无的变化

#### 6.4 移动click延迟解决方案

1. 禁用缩放

   ```html
   <meta name="viewport" content="user-scalable=no" >
   ```

2. 利用touch事件封装解决300ms延迟

   - 记录手指两次触屏时间（触摸和离开），离开 - 触摸 如果时间小于150ms，并且没有滑动屏幕，定义为点击事件

3. 插件方式解决

#### 6.5 移动端常用开发插件

- swiper：触屏
- superslide ：特效
- iscroll  滚动插件
- zy.media  视频插件

#### 6.6 移动端常用开发插件

- bootstrap

#### 案例：

1. 动画函数封装
2. 返回顶部
   - 滚动到指定位置显示返回顶部，点击返回顶部跳转到头部
3. 筋斗云案例
   - 鼠标移动到某个位置，显示相关样式或背景，点击绑定该位置
4. 移动端拖动元素
   - 移动端手指移动也会触发滚动事件，阻止滚动事件触发e.preventDefault()
5. 移动端轮播图
   - 自动播放图片
   - 手指拖动滑动功能
   - 点击滑动功能
6. 记住用户名密码

#### 7.本地存储

1、数据存储在用户浏览器中

2、设置、读取方便、甚至页面刷新不丢失数据

3、容量较大，sessionStorage约5M、localStorage约20M

4、只能存储字符串，可以将对象JSON.stringify() 编码后存储

- localStorage
  - 永久保存，除非手动删除
  - 多窗口共享
  - 以键值对的形式存储使用
- sessionStorage
  - 生命周期为关闭浏览器窗口
  - 在同一个窗口下数据可以共享
  - 以键值对形式存储
- 操作： 两个操作方式一致
  - 存储数据：localStorage.setItem( key , value)
  - 获取数据：localStorage.getItem( key )
  - 删除数据：localStorage.removeItem( key )
  - 清空数据：localStorage.clear( )

