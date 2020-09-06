# Day01

#### 1.1 面向过程与面向对象

- 面向过程
  - 通过函数一步步的实现，在使用时在一步步的调用
- 面向对象
  - 把事务分解成一个个对象，然后由对象之间分工与合作
- 对比：

|      | 面向过程                                                     | 面向对象                                                     |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | 性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程。 | **易维护、易复用、易扩展**，由于面向对象有**封装、继承、多态**性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护 |
| 缺点 | 不易维护、不易复用、不易扩展                                 | 性能比面向过程低                                             |

- 高内聚、低耦合
  - 高内聚：指相关度高的东西尽可能集中，不要分散
  - 低耦合：两个相关模块的尽可能把依赖部分降低到最小，不要让两个系统产生强依赖

#### 1.2 对象和类

- 对象

  由属性和方法组成：无序键值对的集合，指一个具体的事物

  - 属性：事物的特征（名字）
  - 方法：事物的行为（动作）

- 类

  ES6中新增的概念，可以使用class关键字声明类，之后将这个类类实例化对象

```js
 // 1. 创建类 class  创建一个类
class Star {
    // 类的共有属性放到 constructor 里面 constructor是 构造器或者构造函数
    constructor(uname, age) {
      this.uname = uname;
      this.age = age;
    }//------------------------------------------->注意,方法与方法之间不需要添加逗号
    sing(song) {
      console.log(this.uname + '唱' + song);
    }
}
// 2. 利用类创建对象 new
var ldh = new Star('刘德华', 18);
console.log(ldh); // Star {uname: "刘德华", age: 18}
ldh.sing('冰雨'); // 刘德华唱冰雨
```

> 注意：
>
> - 通过class创建类，类名首字母习惯性大写
> - 类中的constructor函数，可以接受参数，同时返回实例对象
> - constructor函数，只要new生成实例时，会自动调用这个函数，如果不写这个函数，类也会自动生成这个函数
> - 多个函数方法之间不需要添加逗号分隔
> - 生成实例new不能省略
> - 构造函数用于创建对象

- 类的继承

```js
// 父类
class Father{   
} 

// 子类继承父类
class  Son  extends Father {  
}
```

> 注意
>
> - 继承中，如果实例化的子类有这个方法，则调用子类，没有，则调用父类，一级一级往上找，知道找到该方法，如果没有该方法，则报错
> - 如果想继承父类的方法，子类又想扩展自己的方法，利用super调用父类的构造函数，super必须在子类this之前调用
> - 时刻注意继承中this指向问题
>   - constructor的this指向new出来的实例
>   - 自定义的方法，一般也指向new出来的实例
>   - 绑定事件之后this指向触发的事件源
> - ES6中没有变量提升，需要先定义类，在实例化对象

```js
 // 父类有加法方法
 class Father {
   constructor(x, y) {
   this.x = x;
   this.y = y;
   }
   sum() {
   console.log(this.x + this.y);
   }
 }
 // 子类继承父类加法方法 同时 扩展减法方法
 class Son extends Father {
   constructor(x, y) {
   // 利用super 调用父类的构造函数 super 必须在子类this之前调用,放到this之后会报错
   super(x, y);
   this.x = x;
   this.y = y;

  }
  subtract() {
  console.log(this.x - this.y);
  }
}
var son = new Son(5, 3);
son.subtract(); //2
son.sum();//8
```



#### 案例

1. 面向对象的tab拦切换
   - tab栏切换，点击添加新增tab栏选择，点击显示切换后界面
   - 切换
   - 添加
   - 删除

# Day02

#### 2.1 构造函数和原型

- 对象的三种创建方式
  - 字面量方式
    - var obj = {}
  - new关键字
    - var  obj  =  new Object( )
  - 构造函数的方式

```js
function Person(name, age ){
    this.name = name 
    this.age = age
}
var obj = new Person('zzm', 18)
```

#### 2.2 静态成员和实例成员

- 实例成员
  - 构造函数中内部this添加的成员，实例成员只能通过实例化对象进行访问
- 静态成员
  - 静态成员在构造函数本身上添加的成员  Person.sex

#### 2.3 构造函数的三角关系

- 构造函数的原型prototype
  - 构造函数的原型可以由所有对象共享使用
  - 使用：
    - Person.prototype.sex = function() { }
- 对象原型
  - `__proto__`原型对象
  - 非标准对象，开发过程中不能使用
  - 内部指向原型对象prototype
- constructor构造函数
  - 对象原型和构造函数原型对象里面都有一个constructor属性
  - 称为够着函数，它指向构造函数本身
  - 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数如:

```js
 function Star(uname, age) {
     this.uname = uname;
     this.age = age;
 }
 // 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
 Star.prototype = {
 // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
   constructor: Star, // 手动设置指回原来的构造函数
   sing: function() {
     console.log('我会唱歌');
   },
   movie: function() {
     console.log('我会演电影');
   }
}
var zxy = new Star('张学友', 19);
console.log(zxy)
```

> 关系:
>
> star构造函数通过----》star.prototype指向---》**star原型对象prototype**
>
> star构造函数指向----》xxx实例对象通过xxx.`__proto__`指向 ----》 **star原型对象prototype**



![image-20200706122805634](C:\Users\Administrator\Desktop\Project\前端笔记\07-10 JavaScript网页编程\04-JavaScript高级资料\image-20200706122805634.png)

#### 2.4 原型链

- 每个实例对象都有一个proto属性，指向构造函数原型对象，构造函数原型对象也是一个对象，也有proto属性，一层一层往上找就形成了原型链

![](img5.png)

- 构造函数中三角关系
  - **构造函数**属性prototype指向**构造函数的原型对象**
  - **实例对象**由够着函数创建，实例对象`__proto__`属性指向**构造函数的原型对象**
  - **构造函数的原型对象**的constructor属性指向**构造函数**，
- 原型链的查找机制
  - 任何对象都有原型对象，任何原型对象也都有一个proto属性，这样一层一层往上找就形成了原型链

> 查找方式：
>
> 当访问一个对象的属性（方法），首先查找对象自身有没有这个属性，没有找原型proto指向的prototype对象，没有找到就继续找，直到找到为止

- 原型对象中this指向
  - 构造函数中的this和原型对象this，都指向new出来的实例对象
- 通过原型为数组扩展内置方法
  - 格式：Array.prototype.sum

```js
Array.prototype.sum = function() {
   var sum = 0;
   for (var i = 0; i < this.length; i++) {
   sum += this[i];
   }
   return sum;
 };
```



#### 2.5 继承

- call()
  - 可以调用函数
  - 可以修改this的指向，有多个参数，第一个参数修改this指向，参数2，参数3为实参
- 子构造函数继承父构造函数中的属性
  - 先定义一个父构造函数
  - 再定义一个子构造函数
  - 子构造函数继承父构造函数的属性(使用call方法)

```js
 // 1. 父构造函数
 function Father(uname, age) {
   // this 指向父构造函数的对象实例
   this.uname = uname;
   this.age = age;
 }
  // 2 .子构造函数 
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  3.使用call方式实现子继承父的属性
  Father.call(this, uname, age);
  this.score = score;
}
var son = new Son('刘德华', 18, 100);
console.log(son);
```

- 通过原型对象继承方法

```js
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function() {
  console.log(100000);
 };
 // 2 .子构造函数 
  function Son(uname, age, score) {
      // this 指向子构造函数的对象实例
      Father.call(this, uname, age);
      this.score = score;
  }
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
  Son.prototype = new Father();
  // 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
  Son.prototype.constructor = Son;
  // 这个是子构造函数专门的方法
  Son.prototype.exam = function() {
    console.log('孩子要考试');

  }
  var son = new Son('刘德华', 18, 100);
  console.log(son);
```



#### 2.6 ES5新增的方法

- 数组方法

  - forEach：遍历数组

  ```js
   arr.forEach(function(value, index, array) {
         //参数一是:数组元素
         //参数二是:数组元素的索引
         //参数三是:当前的数组
   })
    //相当于数组遍历的 for循环 没有返回值
  ```

  - filter：过滤数组

  ```js
    var arr = [12, 66, 4, 88, 3, 7];
    var newArr = arr.filter(function(value, index,array) {
    	 //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
       return value >= 20;
    });
    console.log(newArr);//[66,88] //返回值是一个新数组
  ```

  - some：查找数组是否满足条件

  ```js
   var arr = [10, 30, 4];
   var flag = arr.some(function(value,index,array) {
      //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
       return value < 3;
    });
  console.log(flag);//false返回值是布尔值,只要查找到满足条件的一个元素就立马终止循环
  ```

> some和forEach区别：
>
> 如果查询数组唯一的元素，用some方法更加适合，return true会终止遍历，迭代效率更高
>
> forEach里面return 不会终止迭代

- trim()方法
  - 去除字符串两端的空格
- Object.keys( 对象 )
  - 获取当前对象的属性名，返回一个数组
- Object.defineProperty（对象， 修改或新增的属性名， {}）
  - 设置或修改对象中的属性

#### 案例：

1. 筛选商品

# Day03

#### 3.1 函数定义和调用

- 函数的定义方式

  - 方式1 函数恒美方式

  ```js
  function fn() {}
  ```

  - 方式2 函数表达式（匿名函数）

  ```js
  var  fn = function () {}
  ```

  - 方式3 new Function( )

  ```js
  var fn  = new Function( '参数'，'函数体' )
  ```

- 函数的调用

```js
/* 1. 普通函数 */
function fn() {
	console.log('人生的巅峰');
}
 fn(); 
/* 2. 对象的方法 */
var o = {
  sayHi: function() {
  	console.log('人生的巅峰');
  }
}
o.sayHi();
/* 3. 构造函数*/
function Star() {};
new Star();
/* 4. 绑定事件函数*/
 btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
/* 5. 定时器函数*/
setInterval(function() {}, 1000);  这个函数是定时器自动1秒钟调用一次
/* 6. 立即执行函数(自调用函数)*/
(function() {
	console.log('人生的巅峰');
})();
```

> - 普通调用
> - 对象方法调用
> - 构造函数调用
> - 绑定事件函数
> - 定时器函数
> - 立即执行函数（自调用）

#### 3.2 this

- 函数内部的this指向
  - 普通调用：window
  - 对象方法调用：方法调用对象
  - 构造函数调用：实例对象
  - 绑定事件函数：绑定事件对象
  - 定时器函数：window
  - 立即执行函数（自调用）：window
- 改变函数内部this指向
  - call()方法
    - fn.call( this 参数1，参数2)
    - 调用一个对象（函数），改变函数this指向
    - 应用场景：经常做继承使用
  - apply()方法
    - fn.apply( this， [参数1，参数2])
    - 调用一个对象（函数），改变this指向
    - 应用场景：经常跟数组有关系
  - bind()方法
    - var fn2 = fn1.bind( this , [参数1，参数2]) ； fn2()；
    - 不会调用函数，但是会改变函数的this指向，赋值给一个新的函数
    - 应用场景：不调用函数，但是想改变this指向

> 区别：
>
> - call和apply都会调用函数，bind不用调用函数，都能改变this的指向
> - call和apply传递的参数不一样，call传递参数逗号隔开，apply使用数组传递

#### 3.3 严格模式（strict mode）

- 什么是严格模式

  - 严格模式对正常的JavaScript语义做了一些修改
    1. 消除了js语法中一些不合理，不严谨之处，减少一些怪异的行为
    2. 消除代码运行的一些不安全之处，保证代码运行的安全
    3. 提高编译器效率，增加运行速度
    4. 禁用了在ECMAScript的未来版本中可能定义的一些语法（方法名等）

- 开启严格模式

  - 可以为脚本或者函数开启严格模式、
  - 脚本开启严格模式

  ```js
  (function() {
      //立即执行函数，开启严格模式，该函数之外还是普通模式
      "use strict"
      var num = 10
      function fn() {}
  })()
  <script> 
  	"use strict"    
  </script>
  ```

  - 函数开启严格模式

  ```js
  function fn() {
  	"use strict"
  	return "123"
  }
  ```

- 严格模式中的变化

  - 不能使用未声明的变量
  - 不允许删除变量
  - 全局作用中的this是undefind
  - 构造函数不加new调用，this指向undefind，赋值会报错
  - 定时IQ的this还是指向window

#### 3.4 高阶函数

- 高阶函数就是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出
- 常见高阶函数
  - 回调函数
  - 立即执行函数

#### 3.5 闭包（closure）

- 变量作用域
  - 全局变量
  - 局部变量
    - 函数内部可以使用全局变量，函数外部不可使用局部变量，
    - 当函数执行完毕，局部变量被销毁
- 什么是闭包
  - 指有权访问另一个函数作用域中变量的函数
  - 一个作用域可以访问另一个函数内部的局部变量
- 闭包的作用
  - 延伸变量的作用范围

```js
 function fn() {
   var num = 10;
   function fun() {
       console.log(num);
 	}
    return fun;
 }
var f = fn();
f();
```

#### 3.6 递归

- 什么是递归
  - 如果一个函数在内部调用其自身，那么这个函数就是递归函数，（函数自己调用了自己）

> 注意：
>
> 递归和循环效果是一样的，递归容易发生"栈溢出（stack overflow）"错误，所以要加退出条件return

#### 案例：

1. 闭包的案例

2. 递归1-n阶乘

   ```
   function fn(count) {
       if (count == 1){
           return 1
       }else {
           return n * fn( n-1 )
       }
   }	
   ```

3. 利用递归且斐波那契数列

   ```js
   
   ```

4. 递归遍历数组

# Day04

#### 4.1正则表达式

- 什么是正则表达式
  - 用特定的字符来匹配查询
  - 在JavaScript中正则表达式也是对象
- 特点：
  1. 灵活性、逻辑性和功能性非常的强。
  2. 可以迅速地用极简单的方式达到字符串的复杂控制。

#### 4.2 JS中使用正则

- 创建正则表达式

  - 方式一：通过调用RegExp对象的构造函数创建 

  ```js
  var regexp = new RegExp(/123/);
  console.log(regexp);
  ```

  - 方式二：利用字面量创建 正则表达式


  ```js
   var rg = /123/;
  ```


#### 4.3 正则表达式中特殊字符

- 正则表达式的组成

  - /xxxxxxx/

- 边界符

  - ^：表示行首
  - $：表示行尾

  ^和$一起表示精确匹配

- 字符类

  - [abc]：只要包含abc三个字符中的一个返回true
  - ^[abc]$：只有是a或b或c 才返回true

- 量词符

  | 量词  | 说明            |
  | ----- | --------------- |
  | *     | 重复0次或更多次 |
  | +     | 重复1次或更多次 |
  | ?     | 重复0次或1次    |
  | {n}   | 重复n次         |
  | {n,}  | 重复n次或更多次 |
  | {n,m} | 重复n到m次      |

- 括号总结
  - 大括号  量词符.  里面表示重复次数
  - 中括号 字符集合。匹配方括号中的任意字符. 
  - 小括号表示优先级
- 预定义类

#### 4.4 正则替换replace

- replace()
  - 实现替换字符串操作

#### 案例:

1. 用户表单验证
2. 过滤敏感词

# Day05

#### 5.1 ES6语法

- 什么是ES6

  - ES的全称是ECMAScript,它是有ECMA国际标准化组织，指定的一项脚本语言

- 新增语法

  - let：
    - 声明变量
    - 不存在变量提升
    - 暂时性死区：利用let声明的变量会绑定在这个会计作用域，不回收外界影响
    - 具有块级作用域
    - 防止循环变量变成全局标量
  - const：
    - 声明常量
    - 声明常量必须赋值
    - 常量赋值后，简单数据类型不能修改，复杂数据类型，不能更爱地址值

  let、const和var区别

  - var 声明：其作用域为该语句所在的**函数内**，且存在变量提升现象、值可修改
  - let声明：其作用域为该语句所在的**代码块内**，且**不存在变量提升**现象、值可修改
  - const 声明：其作用域为该语句所在的**代码块内**，且**不存在变量提升**现象、值**不可修改**

- 解构赋值

  - 数组解构

  ```js
   let [a, b, c] = [1, 2, 3];
   console.log(a)//1
   console.log(b)//2
   console.log(c)//3
  //如果解构不成功，变量的值为undefined
  ```

  - 对象解构

  ```js
   let person = { name: 'zhangsan', age: 20 }; 
   
  let { name, age } = person;
   console.log(name); // 'zhangsan' 
   console.log(age); // 20
  
   let {name: myName, age: myAge} = person; // myName myAge 属于别名
   console.log(myName); // 'zhangsan' 
   console.log(myAge); // 20
  ```

  > 小结：
  >
  > - 解构赋值就是把数据结构分解，然后给变量进行赋值
  > - 如果结构不成功，变量跟数值个数不匹配的时候，变量的值为undefined
  > - 数组解构用中括号包裹，多个变量用逗号隔开，对象解构用花括号包裹，多个变量用逗号隔开
  > - 利用解构赋值能够让我们方便的去取对象中的属性跟方法

- 箭头函数

  - 语法

  ```js
  fn = () => {} //代表把一个箭头赋值给fn () 代表参数 指向一个代码块（函数） {}函数体
  ```

  - 代码中只有一句话，可以省略函数体（大括号）
  - 代码中只有一个参数，可以省略小括号
  - 箭头函数不绑定this，箭头函数的this指向函数的上下文this
  - 优点：
    - 解决了this执行环境中的一些问题
    - 比如：解决了匿名函数this指向的问题（匿名函数的执行环境具有全局性），包括setTimeout和setInterval中使用this所造成的问题

- 剩余参数：

  - 剩余参数语法允许我们将一个不定数量的参数表示为一个数组，不定参数定义方式，这种方式很方便的去声明不知道参数情况下的一个函数

  ```
  function sum (first, ...args) {
       console.log(first); // 10
       console.log(args); // [20, 30] 
   }
   sum(10, 20, 30)
  ```

> 总结：就是当数组参数不固定时使用

- 内置对象扩展

  - 扩展运算符

  ```js
  let ary = [1, 2, 3];
   ...ary  // 1, 2, 3
   console.log(...ary);    // 1 2 3,相当于下面的代码
   console.log(1,2,3);
  ```

> 总结：需要打印的数组对象多时
>
> - 使用
>   - 可以用于合并数组
>   - 可以将类数组转换成真正的数组

- 构造函数方法

  - Array.from()
    - 可以将伪数组或遍历对象转换为真正的数组

  ```js
  //定义一个集合
  let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
  }; 
  //转成数组
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  ```

  有两个参数，相当于数组的map方法，对每个元素进行处理，将处理后的元素放到返回的数组

  注意：如果是对象，则要填写对应的索引

  - find()
    - 查找出第一个符合条件的数组成员，如果没有找到返回undefined
  - findIndex()
    - 找到第一个符合条件的数组成员位置，如果没有返回-1
  - includes()
    - 判断某个数组是否包含给定的值，返回布尔值

- String的扩展方法

  - 模板字符串

    - 可以解析变量：${name}
    - 字符串之间可以换行
    - 可以调用函数：${ sayHello() }

    ```js
    let name = `zhangsan`;  //格式`模板字符串`
    ```

  - 实例方法：

    - startsWidth()

      - 表示参数字符串是否在原字符串的头部，返回布尔值

    - endsWidth()

      - 表示参数字符串是否在原字符串的尾部，返回布尔值

      使用：str.startsWidth()

    - repeat( n)

      - 将元字符重复n次，返回一个新字符串

- set数据结构

  - ES6 提供了新的数据结构  Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

  - Set本身是一个构造函数，用来生成  Set  数据结构

    ```javascript
    const s = new Set();
    ```

    Set函数可以接受一个**数组**作为参数，用来初始化。

    ```javascript
    const set = new Set([1, 2, 3, 4, 4]);//{1, 2, 3, 4}
    ```

    #### 实例方法

    - add(value)：添加某个值，返回 Set 结构本身
    - delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
    - has(value)：返回一个布尔值，表示该值是否为 Set 的成员
    - clear()：清除所有成员，没有返回值

  > 注意：可以使用数组的方法
  >
  > - 遍历：forEach

