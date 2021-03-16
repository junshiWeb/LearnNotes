## Sass 介绍

​	层叠样式表语言，是一个 CSS 预处理器，是 CSS 扩展语言，可以帮助我们减少 CSS 重复的代码，提高开发效率，兼容所有版本的 CSS

特点：

- 扩展了 CSS3，增加了规则，变量，混入，选择器，继承，内置函数等等特性

- 易于组织和维护

## 安装

- npm 安装

```
npm install -g sass
```

- 其他方式，需要另外查



## 使用

#### Sass 变量

- 变量用于存储信息，它可以重复使用
  - 字符串
  - 数字
  - 颜色值
  - 布尔值
  - 列表
  - null
- 变量需要使用 `$` 符号

```css
$myChar: blue;
$myNumber: 400;
$myColor: #ffffff;
$myBoolean: true;
$myList: 
$myNull:
```

- 作用域
  - 全局和局部
  - `!global` 设置全局作用域

> 注意所有的全局变量一般定义在一个文件内，如_globals.scss 使用，@include 包含该文件

#### Sass 嵌套规则

```css
div {
	width: 100px;
  height: 100px;
  p {
    htight: 50px;
  }
}
```

#### Sass @import 与 Partials

- @import

​	@import 可以导入其他文件等内容，与 CSS 不同的是，CSS 每次调用创建一个额外的 HTTP 请求，但是 Sass 不会

使用：

```css
@import filename 
```

> 不需要添加后缀，sass 会默认添加 .scss

- Partials 语法

  Sass 不要将其编译到 CSS 文件

> 创建一个 _colors.scss 的文件，引用的时候不需要加 _ 下划线
>
> 不要将带下划线和不带下划线的同名文件放在一个目录下，读取的时候默认读取不带下划线的文件

#### Sass @mixin 与 @include

​	@mixin 指令可以在整个样式表中重复使用样式，@include 指令可以将混入（mixin）引入到文档中

Sass 的连接符号 - 和 _ 下划线是相同的

- 基本使用

```css
@mixin important-text {
  color:red;
}
.test {
  @include important-text;
  background-color: green;
}
```

- 参数的使用

```css
@mixin border($color, $width: 2px) {
  border: $width solid $color;
}
.test {
  @include border(blue);
  background-color: green;
}
```

> 可以传入默认参数

- 可变参数和浏览器前缀的混入

```css
@mixin box-shadow($args...) {
  -moz-box-shadow: $args;
  -webkit-box-shadow: $args;
  box-shadow: $args;
}
.shadows {
  @include box-shadow(0 4px 2px #ccc, 2px 6px 10px #555);
}
```



#### Sass @extend 与继承

​	当一个样式和另一个样式只有少量差距的时候使用继承会方便很多

​	疑问：继承和直接使用 CSS 中的 .box, .box1, .box2 {} 有差别吗？

使用

```css
.button-basic {
  border: none;
  padding: 10px;
  text-align: center;
}
.button-report {
  @extend .button-basic;
  background-color: red;
}
.button-submit {
  @extend .button-basic;
  background-color: blue;
}
```

> 解决的是不需要在标签中指定多个类？实际值 button-basic 不一定要在标签上添加

#### Sass 函数

- 字符串相关函数

- 数字相关函数

- 列表相关函数

- 映射相关函数

- 选择器相关函数

- introspection 相关函数

- 颜色相关函数

  SASS提供了一些内置的颜色函数，以便生成系列颜色

```css
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
```

## 高级用法

#### 条件语句

@if 用法

```css
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
}
```

@else 用法

```css
div {
  @if 1 + 1 == 3 { border: 1px solid; }
  @else { border: 2px solid }
}
```

#### 循环语句

@for 用法

```css
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue
  }
}
```

@while 用法

```css

$i: 10;
@while $i > 0 {
  .item#{$i} { border: #{$i}px;}
    $i: $i - 1;
  
}
```

@each 用法 作用和 for 类似

```css
@each $member in a, b, c, d, {
  .img-#{$member} {
    background-image: url("/image/#{$member}.jpg")
  }
}
```

自定义函数

```css
@function double($n) {
  @return $n * 2;
}
#sidebar {
  width: double(5px);
}
```

## 总结

> 总结：Sass 优化 CSS 代码，减少 CSS 的代码量，提高开发效率
>
> 主要功能，变量命令，全局变量写在一个文档中，嵌套规则，可以嵌套父子元素之间的关系，@import引入和 Partials 不使用改文件，@mixin 混入和 @include 引入混入， @extend 继承减少类的命名，函数可以减少频繁命名的麻烦（if else，for，while，each，自定义函数） 