## 4 HTML标签

#### 4.1 排版标签

- div（布局，块级标签）
- span（布局，内联）

- h1~6（标题标签）

- p（文本标签）
- hr（分割线）
- br（换行标签）
- pre（预样式）

#### 4.2 字体标签

- font（字体）

- 字体样式标签

  b：家粗

  u：下划线

  sup：上标

  sub：下标

  i和em：斜体

- 特殊字符（转移字符）

  - `&nbsp;`：空格	（non-breaking spacing，不断打空格）
  - `&lt;`：小于号（less than）
  - `&gt;`：大于号（greater than）
  - ` &copy`;：版权©
  
- a（超链接）

#### 4.3 图片标签

- img（图片）

```html
<img src="html://" width="20px" height="20px" alt="空的" title="显示" align="center">
```

src：图片路径

width和height：图片宽高

alt：图片链接不存在时显示内容

title：鼠标移动到图片上显示内容

align：图片与文字的位置 bottom（默认），center，top，left，right

#### 4.4 列表标签

- ul（无序列表）

需要跟li标签，一个li标签占一行

type：`disc`(实心原点，默认)，`square`(实心方点)，`circle`(空心圆)。

- ol（有序列表）

需要跟li标签，一个li标签占一行

type：属性值可以是：1(阿拉伯数字，默认)、a、A、i、I。结合`start`属性表示从几开始

- dl（自定义列表）

  dl、dt、dd（行，第一行，第二行缩进）

  ![image-20200604203018086](${img}/image-20200604203018086.png)

#### 4.5 表格标签

- table

  属性：

  - `border`：边框。像素为单位。
  - `style="border-collapse:collapse;"`：单元格的线和表格的边框线合并（表格的两边框合并为一条）
  - `width`：宽度。像素为单位。
  - `height`：高度。像素为单位。
  - `bordercolor`：表格的边框颜色。
  - `align`：**表格**的水平对齐方式。属性值可以填：left right center。 注意：这里不是设置表格里内容的对齐方式，如果想设置内容的对齐方式，要对单元格标签`进行设置）
  - `cellpadding`：单元格内容到边的距离，像素为单位。默认情况下，文字是紧挨着左边那条线的，即默认情况下的值为0。 注意不是单元格内容到四条边的距离哈，而是到一条边的距离，默认是与左边那条线的距离。如果设置属性`dir="rtl"`，那就指的是内容到右边那条线的距离。
  - `cellspacing`：单元格和单元格之间的距离（外边距），像素为单位。默认情况下的值为0
  - `bgcolor="#99cc66"`：表格的背景颜色。
  - `background="路径src/..."`：背景图片。 背景图片的优先级大于背景颜色。
  - `bordercolorlight`：表格的上、左边框，以及单元格的右、下边框的颜色
  - `bordercolordark`：表格的右、下边框，以及单元格的上、左的边框的颜色 这两个属性的目的是为了设置3D的效果。
  - `dir`：公有属性，单元格内容的排列方式(direction)。 可以 取值：`ltr`：从左到右（left to right，默认），`rtl`：从右到左（right to left） 既然说`dir`是共有属性，如果把这个属性放在任意标签中，那表明这个标签的位置可能会从右开始排列。

- tr ：行

  **属性：**

  - `dir`：公有属性，设置这一行单元格内容的排列方式。可以取值：
    - `ltr`：从左到右（left to right，默认）
    - `rtl`：从右到左（right to left）
  - `bgcolor`：设置这一行的单元格的背景色。 注：没有background属性，即：无法设置这一行的背景图片，如果非要设置，可以用css实现。
  - `height`：一行的高度
  - `align="center"`：一行的内容水平居中显示，取值：left、center、right
  - `valign="center"`：一行的内容垂直居中，取值：top、middle、bottom

- th：第一行的列，加粗

- td：列

  属性：

  - `align`：内容的横向对齐方式。属性值可以填：left right center。如果想让每个单元格的内容都居中，这个属性太麻烦了，以后用css来解决。
  - `valign`：内容的纵向对齐方式。属性值可以填：top middle bottom
  - `width`：绝对值或者相对值(%)
  - `height`：单元格的高度
  - `bgcolor`：设置这个单元格的背景色。
  - `background`：设置这个单元格的背景图片。
  - `colspan`：横向合并。例如`colspan="2"`表示当前单元格在水平方向上要占据两个单元格的位置。
  - `rowspan`：纵向合并。例如`rowspan="2"`表示当前单元格在垂直方向上要占据两个单元格的位置。

ps：表格的`<thead>`标签、`<tbody>`标签、`<tfoot>`标签

- 1、如果写了，那么这三个部分的**代码顺序可以任意**，浏览器显示的时候还是按照thead、tbody、tfoot的顺序依次来显示内容。如果不写thead、tbody、tfoot，那么浏览器解析并显示表格内容的时候是从按照代码的从上到下的顺序来显示。
- 2、当表格非常大内容非常多的时候，如果用thead、tbody、tfoot标签的话，那么**数据可以边获取边显示**。如果不写，则必须等表格的内容全部从服务器获取完成才能显示出来。

#### 4.6 表单标签

- form 

用于与服务器的交互。表单就是收集用户信息的，就是让用户填写的、选择

**属性：**

 - `name`：表单的名称，用于JS来操作或控制表单时使用；
 - `id`：表单的名称，用于JS来操作或控制表单时使用；
 - `action`：指定表单数据的处理程序，一般是PHP，如：action=“login.php”
 - `method`：表单数据的提交方式，一般取值：get(默认)和post

**get提交和post提交的区别：**

GET方式：
将表单数据，以"name=value"形式追加到action指定的处理程序的后面，两者间用"?"隔开，每一个表单的"name=value"间用"&"号隔开。
特点：只适合提交少量信息，并且不太安全(不要提交敏感数据)、提交的数据类型只限于ASCII字符。

POST方式：
将表单数据直接发送(隐藏)到action指定的处理程序。POST发送的数据不可见。Action指定的处理程序可以获取到表单数据。
特点：可以提交海量信息，相对来说安全一些，提交的数据格式是多样的(Word、Excel、rar、img)。

#### 4.7 输入标签

##### input 文本框

**属性：**

- **`type="属性值"`**：文本类型。属性值可以是：
  - `text`（默认）
  - `password`：密码类型
  - `radio`：单选按钮，名字相同的按钮作为一组进行单选（单选按钮，天生是不能互斥的，如果想互斥，必须要有相同的name属性。name就是“名字”。
    ）。非常像以前的收音机，按下去一个按钮，其他的就抬起来了。所以叫做radio。
  - `checkbox`：多选按钮，**name 属性值相同的按钮**作为一组进行选择。
  - `checked`：将单选按钮或多选按钮默认处于选中状态。当`<input>`标签设置为`type="radio"`或者`type=checkbox`时，可以用这个属性。
  - `hidden`：隐藏框，在表单中包含不希望用户看见的信息
  - `button`：普通按钮，结合js代码进行使用。
  - `submit`：提交按钮，传送当前表单的数据给服务器或其他程序处理。这个按钮不需要写value自动就会有“提交”文字。这个按钮真的有提交功能。点击按钮后，这个表单就会被提交到form标签的action属性中指定的那个页面中去。
  - `reset`：重置按钮，清空当前表单的内容，并设置为最初的默认值
  - `image`：图片按钮，和提交按钮的功能完全一致，只不过图片按钮可以显示图片。
  - `file`：文件选择框。
    提示：如果要限制上传文件的类型，需要配合JS来实现验证。对上传文件的安全检查：一是扩展名的检查，二是文件数据内容的检查。
- **`value="内容"`**：文本框里的默认内容（已经被填好了的）
 - `size="50"`：表示文本框内可以显示**五十个字符**。一个英文或一个中文都算一个字符。
   注意**size属性值的单位不是像素哦**。

 - `readonly`：文本框只读，不能编辑。因为它的属性值也是readonly，所以属性值可以不写。
   用了这个属性之后，在google浏览器中，光标点不进去；在IE浏览器中，光标可以点进去，但是文字不能编辑。

 - `disabled`：文本框只读，不能编辑，光标点不进去。属性值可以不写。

##### select 下拉标签 

`<select>`标签里面的每一项用`<option>`表示

select标签和ul、ol、dl一样，都是组标签。

**`<select>`标签的属性：**

- `multiple`：可以对下拉列表中的选项进行多选。属性值为 multiple，也可以没有属性值。也就是说，既可以写成 `multiple=""`，也可以写成`multiple="multiple"`。
- `size="3"`：如果属性值大于1，则列表为滚动视图。默认属性值为1，即下拉视图。

##### textacra 多行文本输入

**属性：**

 - `rows="4"`：指定文本区域的行数。
 - `cols="20"`：指定文本区域的列数。
 - `readonly`：只读。

##### label 标签

一般用在input标签后面

#### 4.8 多媒体标签

##### bgsound 音频标签

**属性：**

 - `src="音乐文件的路径"`
 - `loop="-1"`：属性值代表播放次数，-1代表循环播放

##### 多媒体标签（音频、视频等）

- embed

```
<embed src="王菲 - 清风徐来.mp3"></embed>
```

- object

用于iE浏览器，是W3C规范

##### marquee 滚动字幕标签

**属性：**

 - `direction="right"`：移动的目标方向。属性值可以是：`left`（从右向左移动，默认值）、`right`（从左向右移动）、`up`（从下向上移动）、`down`（从上向下移动）。

 - `behavior="slide"`：行为方式。属性值可以是：`slide`（只移动一次）、`scroll`（循环移动，默认值）、`alternate`（循环移动）、。
   `alternate`和`scroll`属性值都是循环移动，区别在于：假设在`direction="right"`的情况下，`behavior="scroll"`表示从左到右、从左到右、从左到右···`behavior="alternate"`表示从左到右、从右到左、从左到右···

 - `scrollamount="30"`：移动的速度
 - `loop="3"`: 循环多少圈。负值表示无限循环
 - `scrolldelay="1000"`：移动一次休息多长时间。单位是毫秒。