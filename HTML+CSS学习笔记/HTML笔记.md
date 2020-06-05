#### 1. 什么是HTML

- 超文本标记语言，一种描述性语言
  - 超文本：超出文本限制的一些类型，图片、音频、视屏、动画、多媒体等内容
  - 标记语言：拥有一套标记标签，用于组成网页元素
  - 不需要编译，由浏览器解析

#### 2. web和浏览器

- 什么是web？
  - 万维网，w3c创建的标准，主要有HTML、CSS、JavaScript
  - HTML：结构标准（语义化描述页面结构）
  - CSS：表现标准（美化页面样式）
  - JavaScript：行为标准（进行页面之间的交互）
- 浏览器
  - 渲染引擎（浏览器内核）和JS引擎组成
  - 主流浏览器谷歌、火狐、IE、safari、opera等

#### 3. 名词

- 网页：各种标记标签组成的页面
- 主页（首页）：一个网站的起始页面
- 标签：有开始标签和结束标签
- 元素：由一个开始标签和结束标签组成
- 属性：给元素附件属性
- XHTML：复核XML语法的标准HTML，可扩展超文本标记语言
- DHTML：动态超文本标记语言，dynamic：动态的
- HTTP：超文本传输协议，smtp邮件传输协议ftp文件传输协议

#### 4. 结构

```html
<html>
  <head>
    <title></title>
    <base></base>
 		<meta></meta>
		<link></link>
  </head>
  <body>
    
  </body>
</html>
```

- html：根标签
- head：头标签，文档头部
  - title：网页标题
  - base：默认地址
  - meta：页面基本配置信息
  - link：外部资源关系
- body：定义文档主体

### 5. 标签分类

- 行内标签
  - a、span、br、i、em、strong、label
  - 特点：display:inline
    1. 和其他元素都在一行上
    2. 元素的宽度、高度、边距不可设置
    3. 元素高度由文字和图片自身宽度，不可改变
- 块状标签
  - div、p、h1-6、ul、ol、li、table、from
  - 特点：display:block
    1. 每个块级元素都需要换一行
    2. 元素的宽度、高度、边距可设置
    3. 元素宽度不设置的情况，继承(inherit)父容器的100%
- 行内块状标签
  - img、input
  - 特点：display:inline-block
    1. 每个元素会进行换行
    2. 可设置宽度

#### 6. 常用标签

##### 排版标签

- h 1~6：标题标签
- p：段落标签
- hr：水平线标签
- br：换行标签
- div：分块标签
- span：分块标签，不换行

##### 字体标签

- font、b、u、sup、sub
- 特殊字符：`&nbsp;`、`&lt`、`&gt`、`&copy`
  - 空格、小于号、大于号、版权
- a：超链接
  - 链接外部文件 anchor锚
  - 属性：
    - href：目标url
    - title：悬停显示文本
    - name：设置锚点，用于一些跳转
    - target：用什么方式打开
      - _self：同一个网页显示？
      - _blank：新窗口打开
      - _parent：父窗口打开？
      - _top：顶级窗口打开？

```html
<a href="" title="" name="" target="">
```

- img：图片标签
  - 属性：
    - src：图片链接，相对路径和绝对路径
    - width：宽度
    - height：高度
    - alt：图片不可用时显示内容
    - title：悬停时显示文本
    - align：图片相对文字文字（bottom：默认）
- 列表标签
  - ul： 无序列表
    - type： disc、square、circle （实心，实心方点，实心圆）
  - ol： 有序列表
    - type： 1、A、a、i、I
  - dl： 自定义列表 
    - dt、dd
- 表格标签 table
  - 属性： table
    - border：边框
    - style：样式
    - width：宽度
    - height：过度
    - bordercolor：边框颜色
    - align：表格对齐水平
    - cellpadding：单元边沿间和内容的空白
    - cellspacling：单元之间的空白
  - 属性：td
    - 

```html
<table>
  <tr>  <th></th> <th></th>  </tr>
  <tr>  <td></td> <td></td>  </tr>
</table>
```

