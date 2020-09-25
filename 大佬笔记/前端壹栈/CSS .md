# CSS 

## 1px

### 百分比

- 宽度（width）、间距（maring/padding）支持百分比值，但默认的相对参考值是包含块的宽度
- 高度（height）百分比的大小是相对其父级元素高的大小
- 边框圆角半径（border-radius）支持百分比值，但水平方向相对参考值是盒子的宽度，垂直方向相对参考值是盒子的高度；
- 文本大小（font-size）支持百分比值，但相对参考值是父元素的font-size的值
- 边框（border）不支持百分值、盒阴影（box-shadow）、文本阴影（text-shadow）不支持百分比值

### 移动端1px

- 产生的原因：我们拿到设计稿，按照像素比dpr换算，每次量的单位都要/dpr，比如dpr为2这时候1px转化为css以后就是0.5px虽然苹果手机型支持，但是安卓不支持0.5就是0px，所以前端还是写上1px 这样就会被转化为2px物理像素，看起来就粗了（我们看的页面效果是按以物理像素来说<===这才是问题的关键）
- 浏览器有最小字体限制

	- PC上最小 font-size=12px
	- 手机上最小 font-size=8px
	- 注意

		- 不要使用奇数级单位来定义字体大小，容易在一些低端设备上造成字体模糊，出现锯齿

- 1dpr, 1 物理像素等于 1 CSS 像素宽度, 
2 dpr, 1 物理像素等于 0.5 CSS 像素宽度
- 在 iOS7 以下，Android 等其他系统里，小于 1px 的单位会被当成为 0px 处理
- 方法

	- 0.5px
	- 使用图片实现（base64）

		- border颜色变了就得重新制作图片；圆角会比较模糊。

	- 使用SVG实现（嵌入 background url）
	- 使用box-shadow实现
	- 伪类+缩放实现

	  div {
	    height: 1px;
	    background: #000;
	    transform: scaleY(0.5);
	    transform-origin: 0 0;
	    overflow: hidden;
	  }

### 介绍一下rem 和 vw方案，分别有什么优缺点

- em

	- 作为font-size 的单位时，其代表父元素的字体大小，em 作为其他属性单位时，代表其自身字体大小
如果该元素没有设置，则一直向父级元素查找，直到找到，如果都没有设置大小，则使用浏览器默认的字体大小
	- 优点

		- 解决，当设置了等比缩放，字体不能很好展示，可以用em来解决字体问题。

	- 缺点

		- 改变父元素的字体大小，全部子元素都回流

- rem

	- rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小，本质是等比缩放
	- 优点

		- 对精度要求不是很高即可使用
		- 微观尺寸（20px 左右）定位不准
		- 逐帧动画容易抖动
		- 不同机型 或多或少会被裁掉一部分，原因是由于 `小数像素` 导致的
		- 浏览器在处理小数像素的时候并不是舍入处理，元素依旧占据着应有的空间，只是在计算元素尺寸的时候做了舍入处理

			- 解决

				- 使用 iconfont
				- 如需使用 background-image，尽量为背景图设置一定的空白间隙

	- 缺点

		- 不能实现100%等比例缩放
		- 需要借助 Javascript 进行动态修改根元素的 font-size
		- 实现计算rem的时候，需要借助sass或者less等的函数
		- 字体问题 - 字体大小并不能使用rem,字体的大小和字体宽度并不成正比关系，这个关系完全取决于字体的作者。所以字体大小不能使用rem。
		- 某些Android机会丢掉 rem 小数部分

	- 使用flexible

		- 根据 document.documentElement.clientWidth 动态修改 <html> 的 font-size ，页面其他元素使用 rem 作为长度单位进行布局，从而实现页面的等比缩放

- vw

	- 1vw就等于屏幕宽度的1%
	- 使用

		- postcss-px-to-viewport + postcss-loader

		  module.exports = {
		    "plugins": {
		        // ...
		      "postcss-px-to-viewport": {
		        viewportWidth: 750,
		        viewportHeight: 1334,
		        unitPrecision: 3,
		        viewportUnit: 'vw',
		        selectorBlackList: ['.usepixel'],
		        minPixelValue: 1,
		        mediaQuery: false
		      },
		      // ...
		    }
		  }

			- unitPrecision：转换后值的精度，3表示保留3位小数
			- viewportUnit：转换成什么视口单位，这里当然是vw
			- selectorBlackList：是一个选择符数组，对应声明中的像素单位不会转换
			- minPixelValue：最小像素值，大于等于这个值才会转换
			- mediaQuery：是否转换媒体查询中的像素

	- 优点
	- 缺点

		- 也没能很好的解决 1px 边框在高清屏下的显示问题，需要自行处理
		- 由于 vw 方案是完全的等比缩放，在完全等比还原设计稿的同时带来的一个问题是无法很好的限定一个最大最小宽度值，由于 rem 方案是借助 Javascript 的，所以这一点 rem 比 vw 会更加的灵活

- hotcss

### rem，移动端字体怎么处理

- 网易和淘宝做法

### 亚像素处理

- 亚像素渲染利用了LCD屏（液晶屏）中每个像素是由R、G、B三个亚像素的颜色和亮度混合而成一个完整像素的颜色这一原理，将字体轮廓上的像素点由三个亚像素体现以达到原始形状的方法

## 居中、常见布局

### 居中

- 行内/行内块级/图片

  #parent{
      height: 150px; 
  	line-height: 150px; /*行高的值与height相等*/ 
      text-align: center; 
      font-size: 0; /*消除幽灵空白节点的bug*/ } 
  #son{ 
      /*display: inline-block;*/ /*如果是块级元素需改为行内或行内块级才生效*/              	vertical-align: middle; 
  }

- 表格
- 固定宽高

	- position + margin

	  .item {
	    position: absolute; 
	    top: 50%;
	    left: 50%; 
	    margin-left: -50px;
	    margin-top: -50px;
	  }

	- position + calc

	  .item {
	    position: absolute;
	    top: calc(50% - 50px);
	    left: calc(50% - 50px);
	  }

	- display: inline-block + center

- 宽高不定

	- position + transform

	  .item {
	    position: absolute;
	    transform: translate(-50% , -50%);
	  }

	- css-table

	  .item {
	    display: table-cell;
	    text-align:center;
	    vertical-align: middle;
	  }

	- Flex

	  .item {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	  }

	- Grid

	  .wrapper {
	    display: grid;
	  }
	  .item {
	    align-self: center;
	    justify-self: center;
	  }

### 布局

- 文档流（流式）布局

	- 最基本的布局，按照文档的顺序一个一个的显示，块元素独占一行，行内元素共享一行
	- 在普通流中, 元素按照其在 HTML 中的先后位置至上而下布局, 在这个过程中, 行内元素水平排列, 直到当行被占满然后换行; 块级元素则会被渲染为完整的一个新行.
	- 脱离普通流会发生什么呢？

		- 会打乱元素的排序规则，设置浮动，定位后会按照自己设置的属性值来摆放
		- 让各类型元素失去原来各自的特性，变成同一种元素。
		- 浮动会让元素有块元素部分性质，如：支持所有css样式，子元素和内容能撑开自身（不设置） 。 但是不会独占一行，不能继承父元素宽高。（给元素只设置高，然后浮动元素，元素会因为没有宽度而无法显示）
		-  对于父元素来说，脱离了文档流的子元素不能再撑开父元素了，所以会出现高度塌陷的问题。

- 表格布局
- 定位布局

	- 使用 position 属性

		- relative定位原则

			- 相对自身。使用relative定位的元素，其相对的是自身进行偏移。
			- 无侵入性。使用relative定位的元素，可以理解为产生了”幻影”，其真身依然在原来的位置上，所以并不会影响页面中其他的元素的布局。本例中，使用relative这几个字依然在原来的位置上，而使用margin这几个字则偏移了原来的位置

- 浮动布局

	- 使用 float 属性，使元素脱离文档流
	- 横向两列布局，横向三列布局

- flex 布局

	- 介绍flex、实现九宫格、flex:1 指的是什么、分别介绍flex-grow、flex-shrink
	- 水平的起点与终点 ( main start、main end )
垂直的起点与终点 ( cross start、cross end )，水平轴与垂直轴 ( main axis、cross axis )，元素具有水平尺寸与垂直尺寸 ( main size、cross size )
	-  justify-

		- content
		- self 

			- 设置在其对 齐容器内 对齐的方式

	- align-

		- item

			- baseline

				- 以所有 内容元素的基线 作为对齐标准，(项目的 `第一行` 文字的基线对齐)

			- stretch

				- 预设值，将内容元素全部撑开至 flexbox 的高度

		- self

			- 覆盖已经使用 align-items 的属性，因为 align-items 是针对子元素，所以必须要用 align-self 来覆盖

		- content

			- align-items 是针对单行的元素，当遇到多根轴线的时候（flex-wrap：wrap 的时候可能出现多条轴线），就要使用 align-content

				- align-content.jpg

	- flex

		- none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

		  .item {
		        flex:  none;
		        /* 等同于 */
		        flex-grow: 0;
		        flex-shrink: 0;
		        flex-basis:  auto;
		      }
		  .item {
		        flex: auto;
		        /* 等同于 */
		        flex-grow: 1;
		        flex-shrink: 1;
		        flex-basis:  auto;
		      }
		  .item {
		        flex: 1;
		        /* 等同于，也和设置 0% 一样 */
		        flex-grow: 1;
		        flex-shrink: 1;
		        flex-basis:   0%;
		      }
		  
		      .item {
		        flex: 0;
		        /* 等同于 */
		        flex-grow: 0;
		        flex-shrink: 1;
		        flex-basis:  auto;
		      }
		  
		      .item {
		        flex: 24px;
		        /* 等同于 */
		        flex-grow:  1;
		        flex-shrink: 1;
		        flex-basis:  24px;
		      }
		  
		      .item {
		        flex: 11 24px;
		        /* 等同于 */
		        flex-grow: 11;
		        flex-shrink: 1;
		        flex-basis: 24px;
		      }

			- flex-group

				- 定义项目的放大比例，默认为 0，如果存在剩余空间也不放大

			- flex-shrink

				- 定义了项目的缩小比例，默认值为 1，如果空间不足，该项目将缩小

			- flex-basis

				- 定义了在分配空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余的空间
				- 默认值为 auto，完全根据子列表项自身尺寸渲染（即项目本身的大小）
当设置了 flex-basis，项目的宽度（width）设置值会失效
				- 不考虑容器不足或溢出

					- width:100px + flex-basis:auto = 元素自身100px
					- content + flex-basis:100px = max(content, flex-basis) = 大于等于100px
					- 不足时，min(content, flex-basis)

	- 子元素最后一项居左

		- 列数固定
		- 列数不定

- Gird布局

	- 设为网格布局后，容器子元素 float、clear 、inline-block、table-cell、vertical-align、column-*都会失效

- 圣杯布局、双飞翼布局

	- 三栏式布局，两边定宽，中间自适应的三栏布局
	- 圣杯布局与双飞翼布局的不同之处，圣杯布局的的左中右三列容器没有多余子容器存在，通过控制父元素的 padding 空出左右两列的宽度
	- 圣杯布局

		-  margin-left 与 left 属性将左右两列放置到准确的位置
		- 父元素需要设置 padding
		- margin-left 取值为百分比时，是以其父元素的宽度为基准的

	- 双飞翼布局

		- 通过 margin-left 属性将左右两列放置到准确的位置，通过控制 middle 的子容器的 margin 或者 padding 空出左右两列的宽度
		- 父元素不需要设置 padding
		-  margin-left 取值为百分比时，是以其父元素的宽度为基准的

- 两列布局

	- float + margin
	- float + margin(fix)
	- float + overflow

	  #left { 
	      background-color: #f00; 
	      float: left; 
	      width: 100px; 
	      height: 500px; 
	  } 
	  #right { 
	      background-color: #0f0; 
	      height: 500px; 
	      overflow: hidden; /*触发bfc达到自适应*/ 
	  }

	- table

	  #parent {
	          width: 100%;
	          display: table;
	          height: 500px;
	        }
	        #left {
	          width: 100px;
	          background-color: #f00;
	        }
	        #right {
	          background-color: #0f0;
	        }
	        #left,
	        #right {
	          display: table-cell; /*利用单元格自动分配宽度*/
	        }

	- absolute、flex、gird

## BFC、IFC、FFC、GFC

### 视觉格式化模型(一种算法机制)会根据CSS盒子模型将文档中的元素转换为一个个盒子
盒子会参与上下文的创建 （不是元素参与格式化上下文创建 而是先把元素生成对应的盒子）
创建盒子也包括它的布局 所以我们写的CSS样式也是盒子创建也会使用的
通过css样式我们可以定义这个元素转化为盒子时候 其上下文是什么类型的
行内元素会生成行内级盒子 行内盒子会参与行内格式上下文的创建 所以我们不用显示声明IFC 通常行内盒子的上下文就是IFC

### 格式上下文

- Formatting Context（简写FC）是 W3C CSS2.1 规范中的一个概念，它是页面中的一块渲染区域，有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
- 先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指 BFC 中的 FC。FC 是 formatting context 的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的 FC 有 BFC、IFC，还有 GFC 和 FFC
- 以BFC为例 BFC就是的规则就是包括了普通流 这样理解就懂了😊

### BFC

- 块级格式化上下文，它是一个独立的渲染区域，规定了内部 Block-level Box 如何布局，并且与这个区域的外部毫不相关
- 原理/规则

	- 内部的Box会在垂直方向上一个接一个的放置（垂直放置）
	- 垂直方向的距离由margin决定，属于同一个 BFC 的两个相邻的 Box 的margin会发生重叠
	- BFC 区域不会与 float box 发生重叠
	- 计算 BFC 的高度，浮动元素也参与计算
	- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之如此

- 作用

	- 清楚内部浮动

		- 触发 父div 的BFC，使下面 子元素 都处在父div的同一个BFC区域之内，如：防止字体环绕

	- 避免 margin 折叠

		- 分别处于不同 BFC 时，可以防止 margin 重叠

	- 多列布局中使用 BFC（双飞翼、圣杯）

- 如何生成BFC

	- 根元素，即 HTML 元素（最大的一个BFC）
	- float 不为 none
	- position 为 absolute 或 fixed
	- overflow 不为visible
	- display 为  inline-block、table-cell、table-caption

### Inline Formatting Contexts，内联格式化上下文

- IFC盒子表现形式 行级盒子在包含块里是从左到右水平排列的
- 上下文不单会决定盒子内的规则 也会决定自身的特性
- IFC布局规则

	- 内部的（行内）Boxes会在水平方向，一个接一个地放置
	- 这些Boxes垂直方向的起点从包含块盒子的顶部开始
	- 摆放这些Boxes的时候，它们在水平方向上的外边距、边框、内边距所占用的空间都会被考虑在内。
	- 在垂直方向上，这些框可能会以不同形式来对齐（vertical-align）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（baseline）对齐。
	- IFC中的line box一般左右边都贴紧其包含块，但是会因为float元素的存在发生变化。float元素会位于IFC与与line box之间，使得line box宽度缩短。
	- IFC中的line box高度由CSS行高计算规则来确定，同个IFC下的多个line box高度可能会不同（比如一行包含了较高的图片，而另一行只有文本）
	- 当inline-level boxes的总宽度少于包含它们的line box时，其水平渲染规则由‘text-align’属性来确定，如果取值为‘justify’，那么浏览器会对inline-boxes（注意不是inline-table 和 inline-block boxes）中的文字和空格做出拉伸。
	- 当一个inline box超过line box的宽度时，它会被分割成多个boxes，这些boxes被分布在多个line box里。如果一个inline box不能被分割（比如只包含单个字符，或word-breaking机制被禁用，或该行内框受white-space属性值为nowrap或pre的影响），那么这个inline box将溢出这个line box。

### FFC: Flex formatting contexts，弹性盒模型

- 与BFC区别

	- vertical-align  对 Flexbox 中的子元素 是没有效果的
	- float 和 clear 属性对 Flexbox 中的子元素是没有效果的，也不会使子元素脱离文档流(但是对Block 是有效果的！)

### GFC：GrideLayout formatting contexts，网格布局格式化上下文

## 命名规范

### BEM

<div class="media media_shadow">
  <div class="media__image-container">
    <img class="media__image" src="rean.jpg" alt="" />
  </div>
  <div class="media__body">
    <p class="media__text">本作的主角，帝国北部地方贵族施瓦泽男爵的养子，也是托尔兹士官学校特科班“Ⅶ组”的成员。</p>
  </div>
</div>

- 什么是 BEM 命名规范

	- Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。
	- 块级名称这样是合理的antd-close-icon,把这个看成一个整体的block，这样就能理解了

- 优点

	- class 的单一职责原则、开闭原则
	- 模块化思想，一般来说遵循这个方法的组件可以迁移环境
	- 一定程度上，避免命名的污染
	- 自解释性。可以直观看出各个 class 之间的依赖关系以及它们的作用范围（.list\_\_item 和.list\_\_item--underline 都是依赖于.list 的，因此它们不能脱离于.list 存在）

### OOCSS（Object Oriented CSS）

<div class="media media-shadow">
  <div class="media-image-container">
    <img class="media-image" src="rean.jpg" alt="" />
  </div>
  <div class="media-body">
    <p class="media-text">本作的主角，帝国北部地方贵族施瓦泽男爵的养子，也是托尔兹士官学校特科班“Ⅶ组”的成员。</p>
  </div>
</div>

- 在不同元素中哪些样式是通用的，然后将这些通用的样式从模块、组件、对象等中抽离出来，使其能在任何地方能够复用，而不依赖于某个特定的容器，比较适合大项目

	- 基本原则

		- 强调重用

			- 通过对基础对象扩展类名，从而达到基础对象的可重用性

		- 选择器简洁

			- 坚持以语义类来命名类名

		- 可扩展类

			- 使用类名为扩展基本对象，增加 class

		- 强调结构与样式分离

			- 把布局样式（高度、宽度、边距）和设计样式（边框、背景、颜色）独立出来

		- 强调容器与内容分离

			- 把内容从容器中分离出来，任何对象（容器）应该适应接受任何形式的内容

	- 使用

		- 创建一个组件库
		- 独立的容器和内容，并且避免样式来依赖位置
		- 独立的结构和样式
		- 使用类名为扩展基本对象
		- 坚持以语义类来命名类名

### OOSCSS

- 基本原则

	-  没有 CSS，只有 Sass
	- 通过%placholder 来声明视觉对象
	- 可以通过 mixin 创建可重复的 CSS
	- 语义化的类名在 DOM 中声明，而视觉化类名在 Sass 中声明
	- 否则不可能使用 CSS 构建 UI 结构和框架
	- 通过 Sass 来扩展类，而不是通过 DOM 来扩展类

### SMACSS (Scalable and Modular Architecture for CSS)

- 基本原则

	- 结构化 CSS 代码，提出了一种分类规则

		- Base (reset.css)
		- Layout (header、sidebar、l-header、l-sidebar、l-footer、g-header)（`左右分栏、栅格系统等`）
		- Module (对公共组件样式的设置 .media、.media-image、.article 或 .m-article 或 .c-article) (产品列表，一个导航条)
		- Util（ u-clearfix、u-ellipsis ）
		- State ( is-active、is-hidden )
		- Theme (.button-large、.theme-a-background、.theme-a-shadow)（页面主题外观，一般是指颜色、背景图）

## Sass/Less/Stylus

### 预处理

- 选择符嵌套

	- 反应层级和约束

- 变量/运算/函数

	- 减少冗余代码

- extend、Mixin

	- 代码片段 重用
	- mixin 是直接把 CSS 代码每个地方重复写一份
	- extend 是使用逗号分割的选择器来为多个不同的地方使用同一段 CSS

- 循环

	- 适用于复杂有规律的样式

-  import

	- CSS 模块化

### for

@for \$var from <start> through/to <end>

to 使用，start <= value < end
through 使用，start <= value <= end

```scss
  $class-slug: for !default

  @for $i from 1 through 2
    .#{$class-slug}-#{$i}
      width: 60px + $i;

  .for-1 { width: 61px; }
  .for-2 { width: 62px; }
```

## 层叠上下文、z-index

### 层叠上下文

- 是HTML中三维的概念，每个盒模型中的位置是三维的，分别是平面画布上的 X轴，Y 轴以及代表层叠的 Z轴，通常元素都是沿着X Y轴平铺，一旦元素发生堆叠，就会发生某个元素盖着另外一个元素或者被覆盖

### 层叠等级/层叠水平

- 在同一个层叠上下文中，它描述定义的是该层叠上下文中的层叠上下文元素在Z轴上的上下顺序
- 在其他普通元素中，它描述定义的是这些普通元素在Z轴上的上下顺序
- 层叠等级的比较只有在当前层叠上下文元素中才有意义。不同层叠上下文中比较层叠等级是没有意义的

### 层叠顺序

- 元素发生层叠时按照特定的规则在 Z轴 上垂直显示，上面两个是概念，层叠顺序是规则
- 

### 比较两个元素是否在同一个层叠上下文中

- 是则，根据上图判断谁大谁上，层叠上下文和层叠顺序都相同，在DOM流中处于后面的元素会覆盖前面的元素（后来居上）
- 否，则比较层叠上下文

### 层叠上下文创建

- 根层叠上下文（html）
- 定位元素 (非 static) 和z-index (非 auto)
- CSS3中的属性对层叠上下文的影响

	- 父元素：display: flex/|inline-flex，子元素z-index属性值不为auto的时候，子元素为层叠上下文元素
	- 元素的opacity属性值不是1
	- 元素的transform属性值不是none
	- 元素的filter属性值不是none
	- will-change指定的属性值为上面任意一个
	- 元素的-webkit-overflow-scrolling属性值设置为touch

### 为什么定位元素会层叠在普通元素的上面

- 元素一旦成为定位元素，其z-index 就会自动生效，此时z-index: auto 也就是0级别， 根据上面的层叠顺序表，就会覆盖inline或block或float元素。
而不支持z-index的层叠上下文元素天然z-index:auto级别，层叠上下文元素和定位元素是一个层叠顺序的，于是当他们发生层叠的时候，遵循的是“后来居上”准则

## animate

### steps

- 二、一句话介绍steps()功能符
steps()功能符可以让动画不连续。
- steps()功能符和CSS3 animation中的cubic-bezier()功能符的地位和作用是一样的，都可以作为animation-timing-function的属性值。
- 只不过steps()更像是楼梯坡道，cubic-bezier()更像是无障碍坡道。如下图示意：
- 然后steps()简化出了step-start和step-end这两个关键字；cubic-bezier()则有linear，ease，ease-in，ease-out以及ease-in-out
- 用steps()语法表示就是

	- steps(number, position)

		- 数值。这个很好理解，表示把我们的动画分成了多少段
		- position

			- 关键字。表示动画是从时间段的开头连续还是末尾连续。支持start和end两个关键字，含义分别如下：
			- start：表示直接开始

				- start：表示结束。分段结束的时候，时间才开始走。于是，动画执行的5个分段点是后5个点：

			- end：表示戛然而止。是默认值

				- end：表示开始。分段开始的时候，时间跟着一起走。于是，动画执行的5个分段点是前5个点：

		- step-start

			- step-start和step-end是steps()功能符简化关键字，注意，是step-*，step，后面没有s。
			- step-start等同于steps(1, start)

		- step-end

			- step-end等同于steps(1, end)或者steps(1)。

		- 牢记这么一句话：一切都是反的！start不是开始，而是结束；end不是结束，而是开始
		- step-start和step-end用中文短句解读就是：一步到位和延迟到位

## position

### sticky

- sticky 元素的相对偏移是离它最近的具有滚动框的祖先元素，如果祖先都不可以滚动，那么是相对于 viewport 来计算元素的偏移量（指的是粘性定位元素最近的可滚动元素，如果没有可滚动元素，则表示浏览器视窗盒子）
- 多个粘性元素公用一个粘性约束矩形，滚动的时候会一个一个发生重叠，粘性约束矩形：包含块（父元素）和流盒矩形的重叠区域
- 如果粘性元素高度和父元素高度相等，粘性定位元素已经完全没有了实现粘性效果的空间，所以滚动失效
- sticky 元素在其父元素内生效、
父元素高度不能低于 sticky 元素高度、
父元素不能有任何的 overflow: visible、
必须设置 top、right、bottom、left 任意之一，否则处于相对定位

## inherit、initial、unset

### inherit

### initial

### unset

## 块级元素、行内元素（内联元素）

### 块级元素

### 行内元素

## 贝塞尔函数

## float原理

### 意义

- 浮动出现的意义其实只是用来让文字环绕图片而已，仅此而已

### 本质

- 带有方位的 display:inline-block 属性，display:inline-block 某种意义上的作用就是包裹 (wrap)，float 无法等同于 display:inline-block,其中原因之一就是浮动 的方向 性,display:inline-block 仅仅一个水平排列方向,就是从左往右,而 float 可以从右往左排列, 这就是两者的差异

### 规则

- 浮动元素不在文档的普通流中（仍旧处于标准文档流中，会占据标准文档流空间，对其他元素有影响），如果一个父元素只有一个子元素，那么它将会塌陷
- 向左（向右）移动直到遇到父元素内容区的边界(不包含padding) 或着 另一个浮动元素为止
- 不会影响到块级框的布局而只会影响内联框（通常是文本）的排列
- 前面的元素会将浮动元素向下推

### 浮动的破坏性

- 
- 对其父元素的影响

	- 造成父元素的高度塌陷
	- 从布局上“消失”

- 对其兄弟元素（非浮动）的影响

	- 块级元素

		- 该元素会忽视浮动元素的而占据它的位置，并且元素会处在浮动元素的下层（根据层叠顺序），但它的内部文字和其他行内元素都会环绕浮动元素

	- 内联元素

		- 元素会环绕浮动元素排列

### 清除浮动

- clear 只能在作用在`块级元素`上，both 左右两侧均不允许浮动元素
- 使用clear的属性

	- 结尾空元素或者after等伪元素或者br 来clear

		- 缺点：添加了很多无意义的空标签

	- 父元素同样浮动

		- 缺点：使得与父元素相邻的元素的布局会受到影响，不可能一直浮动到body

	- .clearfix

	  .fix:after{
	  display:block; 
	  content:'.'; 
	  clear:both; 
	  line-height:0; 
	  visibility:hidden;
	  }
	  或者用 table

- 触发BFC

	- 父元素设置overflow为hidden或者auto 

		- 缺点：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素
auto: 多层嵌套后，firefox与IE 可能会出现显示错误

	- 父元素display：table

		- 缺点：盒模型属性已经改变，由此造成的一系列问题，得不偿失

## line-height

### 行高构成

- 在inline box模型中，有个line boxes（包裹每行文字），一行文字一个line boxes
- 行高是由 line-box 组成
- line-box 是由一行里面一个或多个 inline-box 组成
- inline-box 中最高的那个决定行高

### 如何理解 line-height

- 指一行文字的高度，实际上是下一行基线到上一行基线的距离
- 如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中

### 带单位、纯数字、百分比）有啥区别

- 单位：px 是固定值，em会参考父元素font-size 计算自身行高
- 纯数字：会把比例传递给后代。
先继承1.5这个值，遍历到了该标签再计算去line-height的像素值
例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
- 百分比：使用百分比会计算line-height的值，然后以px像素为单位继承下去

## 盒模型

### 

### 盒模型是由 内容(content)、内边距(padding)、边框(border)、外边距(margin)组成

### W3C 标准盒子模型

- 宽高指的是 content 

### IE 怪异盒子模型

- 宽高指的是 content + padding +  border

### 如何设置

- box-sizing: content-box;(标准)
- box-sizing: border-box;(怪异)

## 遗留问题

### 屏幕分辩率 屏幕尺寸等等关系

## 

*XMind - Trial Version*