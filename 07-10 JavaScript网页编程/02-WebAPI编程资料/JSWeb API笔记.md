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

案例：

1. 百度换肤
   - 点击指定背景，切换到指定背景
2. 表格隔行变色
   - 隔行颜色不同，并且鼠标移动到和离开有不同样式显示
3. 全选操作
4. tab栏切换
5. 新浪下拉菜单
6. 简单发布留言版