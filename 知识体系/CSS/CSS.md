#### 盒模型

所有 HTML 元素都可以视为一个盒子，盒子内容包括边距(margin)，边框(border)，填充(padding)和实际内容(content)

- 盒模型主要有两种，一种标准模型，和ie模型

标准模型：content(width /height) + padding + border + margin

ie模型：content(width/height + padding + border) + margin

- 设置模型 box-sizing 

```css
div {
	box-sizing: content-box; // w3c
  box-sizing: border-box; // ie
}
```

- JS 设置盒模型的宽高

```js
// 设置获取内联样式的宽高  
dom.style.width/height
// 设置获取渲染后的宽高 ie
dom.currentStyle.width/height
// 设置获取渲染后的宽高 兼容好
dom.getComputedStyle.width/height
// 设置获取渲染后的宽高，元素的绝对位置
dom.getBoundingClientRect().width/height
```

#### position 属性

- static：默认
- relative：相对定位
- absolute：绝对定位
- fixed：固定定位
- sticky：粘性定位

#### flex 弹性布局

​	由position + display + float 布局来实现，容器中由主轴和交叉轴构成

容器属性：

- flex-warp：换行
- flex-direction：主轴布局方式
- flex-flow：direction | warp
- justify-content：主轴布局方式
- align-items：交叉轴布局方式
- align-content：多条交叉轴布局方式

项目属性：

- order： 项目排序 0 默认 -1最前面
- flex：grow | shrink | basis 默认值 0 1 auto
- flex-grow：放大
- flex-shrink：缩小
- flex-basis：主轴的长度
- align-self：当个项目和其他项目不同的对齐方式 可以覆盖 align-items 属性

#### 清楚浮动，边距重叠，高度塌陷，BFC

- box： CSS 布局的基本单位
  - block-level box： display 属性为 block，list-item，table 的元素
  - inline-level box： display 属性为 inline，inline-block，inline-table 的元素
  - run-in box： CSS3 特有
- BFC 规则
  - 内部的 box 会在垂直方向一个接一个放置
  - box 垂直方向的距离有 margin 决定，属于同一个 BFC 的两个相邻元素 margin 会发生重叠
  - BFC 是隔离页面的独立容器，容器里面的子元素不会影响外面元素，反之如此
  - BFC 区域不会和 float 的盒子重叠
  - 计算 BFC 高度的时候会将浮动元素也一起计算
- BFC 创建
  - 根元素
  - 浮动元素：float 不为 none
  - 定位元素： position 为 absolute 或 fixed
  - 内联块： display: inline-block，table-cell，table-caption
  - 溢出元素：overflow 不为 visible
  - 弹性盒子：flex
- BFC 作用
  - 利用 BFC 避免 margin 重叠
  - 自适应两栏布局
  - 清除浮动
- 重叠问题
  - 块级元素和块级元素中的上下 margin 会重叠
  - 行内元素与浮动元素发生重叠，边框，背景和内容都会显示在浮动元素之上
  - 块级元素与浮动元素发生重叠，边框和背景都会显示在浮动元素之上，内容在下
- 高度塌陷
  - 当父块级元素未设置高度时，其高度由子元素撑开，当子元素设置了浮动，那么子元素脱离文档流，原本应该被撑开的高度就没有了，这就所谓的高度塌陷
- 清除浮动
  - 设定固定高度
  - 使用 clear: both  
  - 给父元素添加 overflow: hidden 等属性 （形成 BFC）
  - 利用伪元素清楚浮动

#### CSS 选择器

- ！important
- 内联样式 1000
- ID 选择器 0100
- 类选择器 / 属性选择器 / 伪类选择器  0010
- 元素选择器 / 关系选择器 / 伪元素选择器 0001
- 统配选择器 0000

#### 伪类和伪元素

- 伪类

  根据用户的行为判断用户属于某种状态

  - link:
  - visited:
  - hover:
  - active:
  - 等等

- 伪元素

  创建一些不在文档树中的元素，并为其添加样式，其添加的元素会影响页面的布局

  - ::before
  - ::after

> 区别：伪类操作文档中的已有元素，伪元素则在文档中元素中创建一个新的元素

#### 水平垂直居中布局

1. 直接使用 absolute + margin: auto 实现  缺点：需要固定宽高
2. 使用定位的方式：
   - position + transform
3. 使用 flex 弹性布局的方式
4. 行内元素的水平居中
   - text-align: center
   - line-height: 高度

#### 布局的方式

- 三栏布局
  - 使用 float 的方式
    - 优点：实现简单，兼容性好
    - 缺点：浮动元素脱离文档流，会造成高度塌陷，需要手动清除浮动
  - 绝对定位的方式
    - 优点：实现简单，兼容性好
    - 缺点：浮动元素脱离文档流，子元素也脱离文档流，有效性和可用性比较差
  - flex 布局
    - 优点：简单
    - 缺点：ie8 以上才兼容
  - 表格布局
  - grid 布局

#### link 和 @import

- link： 是从html引入，外部样式引入，包括 css，js，图片等，会在浏览器加载页面的时候同时加载 css
- @import： 样式引入，只在 css 中引入，会在页面加载完成后再加载 @ import 的 css

> 区别：引入方式不同，link 兼容性好，加载方式不同，优先级不同

#### CSS3

- transition：过渡

- transform：转换

- animation：动画

- 阴影

- 边框，圆角

- 图片背景

- 文字

- rgba

- 渐变

- 弹性布局： flex

- 栅格布局： grid

- 盒模型定义

- 媒体查询

  

#### 移动端的适配

- 实现 0.5 的边框
  - 修改 meta viewport  initial-scale
  - 使用transform: scale(0.5)

- rem 适配

  rem 是基于根元素，作用于根元素，相对于初始值/默认值大小

  原理：通过设计图的比例计算固定 rem 值，需要通过 js 来修改根字体大小

- vh / vw 适配

  CSS3 新增的属性，vh 为视高，vm 为视宽，通过百分比的方式按设计图计算宽高

  优点：实现方便简单

  缺点：没有最大和最小限制，当屏幕很小的时候，内容和字体看不清，过大同理

  