#### 1. JavaScript 基础和组成

组成：ECMAScript（ESx） + DOM + BOM

特点：脚本语言，面向对象，简单，易学，跨平台

prompt()

alert()

#### 2. 基础知识

- 变量的特点和相关知识

> - 变量提升
> - 变量命名有意义
> - ES6
>   - 变量作用域
>   - let const

- 数据类型

> - 基础数据类型
>
>   - null，undefined，Number，String，Boolean
>   - ES6+：symbol，Bigint
>     - symbol：唯一值
>     - BigInt：扩展最大值，2的53次方
>
> - 引用类型：Object  =》对象，数组，函数
>
> - 常用的数据类型检测
>
>   - typeof xx ：检测字符串类型，返回数据类型
>   - instanceof xx：检测引用类型，返回 false/true，不能检测 null 和undefined
>   - xx.constructor：检测除了 null 和 undefined的类型，修改原型链失效
>   - Object.prototype.toString.call(xx)：检测所有数据类型
>   - isNaN()：数字检测，是数字，则返回 false
>
> - 数据类型的转换
>
>   - 转换为字符串
>
>     - toString()
>
>     - String()：强制转换为字符串
>     - 加拼接字符串： +'字符串'
>
>   - 转换为数字
>
>     - parseInt(string)：转换为整数
>     - parseFloat(string)：转换为浮点数
>     - Number()：强制转换
>     - 利用算术来隐式转换
>
>   - 转换为布尔
>
>     - Boolean()
>
> - null 和undefined的区别

- 运算符

  - 算术运算符：+ - * / &
  - 比较运算符： 大于，小于，大于等于...  == 和 === 的区别 ==有**强制转换类型**
  - 逻辑运算符： && || ！ 

  > 短路运算符：左右的表达式可以确定结果是，就不计算右边的值
  >
  > - 123 && 456：左边的表达式为真则返回右边表达式，否则返回左边
  > - 123 || 456：左边表达式为真则返回左边，否则返回下一个为真的表达式

  - 赋值运算符：= (+ - * / %)=

> 注意：
>
> 不要判断两个浮点数是否相等

- 分支语句
  - if else语句
  - switch
- 三元表达式：表达式1 ？ 表达式2：表达式3；

#### 3. 数组，对象，函数

- 数组

> 数组的创建方式
>
> ```js
> // 字面量
> var arr = []
> // new Array()
> var arr = new Array()
> ```
>
> 判断是否为数组
>
> - Array.isArray()

- 对象

> 对象的创建
>
> ```js
> // 字面量
> var obj = {	}
> // new Object
> var obj = new Object()
> // 构造函数
> function Obj(arg1, arg2, arg3, ...) {
>   this.property1 = arg1
>   this.property2 = arg2
>   this.methood = {}
> }
> var obj1 = new Obj('get', 'set', ...)
> ```
>
> 对象的遍历
>
> ```js
> for (var k in obj) {
> 	k;
> 	obj[k]
> }
> ```
>
> 对象的类型：
>
> - 自定义对象，内置对象，浏览器对象
>
> - 内置对象：Math，Date，Array，String等
>
> - **Math**对象
>
>   ​		Math 对象不是构造函数，它具有数学常数和函数的属性和方法
>
>   | 属性、方法名          | 功能                                         |
>   | --------------------- | -------------------------------------------- |
>   | Math.PI               | 圆周率                                       |
>   | Math.floor()          | 向下取整                                     |
>   | Math.ceil()           | 向上取整                                     |
>   | Math.round()          | 四舍五入版 就近取整   注意 -3.5   结果是  -3 |
>   | Math.abs()            | 绝对值                                       |
>   | Math.max()/Math.min() | 求最大和最小值                               |
>   | Math.random()         | 获取范围在[0,1)内的随机值                    |
>
> - Date 实例的方法和属性
>
>   ​	Date 对象是构造函数，需要 new 使用
>
>   | 属性、方法名       | 功能     |
>   | ------------------ | -------- |
>   | date.getFullYear() | 获取当年 |
>   | date.getMouth()    | 当月     |
>   | date.getDay()      | 星期几   |
>   | date.getData()     | 当天     |
>   | date.getHours()    | 小时     |
>   | date.getMiuntes()  | 分钟     |
>   | date.getSecounds() | 秒       |
>   | data.getTime()     | 时间戳   |

- 函数

> 声明函数的方法
>
> - 字面量声明
> - 构造函数声明
>
> 函数的参数：
>
> - 形参
> - 实参
> - ES6：函数参数的声明值
> - 函数体内不确定有多少参数时可以使用arguments

#### 4. 作用域

- 全局作用域：所有函数都可以使用
- 局部作用域：只有函数局部可以使用
- 块级作用域：JS没有块级作用域，但是let const会生成块级作用域
- 作用域链：当前
- 变量：
  - 全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存
  - 局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间
- 预解析，变量提升，函数提升
  - 一样的意思，在js代码执行之前，解析器会把一些变量和函数提前声明和定义

#### 5. 数据结构

- 堆栈空间分配区别

　　1、栈：由操作系统自动分配释放存放函数的参数值、局部变量的值等。其操作方式类似于数据结构中的栈；

简单数据类型存放到栈里面

　　2、堆：存储复杂类型(对象)，一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。



#### 6. 常用的API

- 数组

> push(arg)  末尾添加多个元素
>
> pop()  删除最后一个元素
>
> unshift (arg) 开头添加多个元素
>
> shift() 删除第一个元素
>
> slice() 对数组进行切面
>
> splice(1，2，3)
>
> concat() 合并数组 
>
> reverse() 倒序排序，返回新数组
>
> sort() 正序排序，返回新数组
>
> 其他
>
> forEach(fn) 遍历数组，
>
> find() 查找数组
>
> some() 查找数组
>
> 高阶处理
>
> map(fn)：处理数组的数据
>
> flter(fn)：过滤数组的元素
>
> reduce(fn)：对数组进行累加

字符串

> indexOf('查找的字符串',开始的位置)
>
> lastIndex() 后往前找