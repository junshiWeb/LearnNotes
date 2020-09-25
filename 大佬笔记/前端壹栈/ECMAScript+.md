# ECMAScript+

## let 和 const 命令

### ES6 新增了let、const命令，用来声明变量，let声明的变量值可以改变,const不行（const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动）

### 特性

- 不存在变量提升
- 暂时性死区 

	- 只要块级作用域内存在let、const命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响,如果使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

- 不允许重复声明
- 块级作用域

	- let、const实际上为 JavaScript 新增了块级作用域
	- ES6 在这个基础上引申出来一个叫做“块级作用域”的概念，即“ {} 中间的部分是一个块级作用域”。例如：for 循环、 if 逻辑判断、while 循环等语句后面的 {} 都是一个块级作用域,变量在离开定义的块级代码后立即被回收
	- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

### ES6 声明变量的六种方法

- var
- function
- let
- const
- class
- import

## globalThis 对象

### JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self
- Node 里面，顶层对象是global，但其他环境都不支持

### ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis

### // 模拟实现
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
} 

## 变量的解构赋值

### 概念：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

### 数组的解构赋值

- 基本用法let [a, b, c] = [1, 2, 3]
- let [x, y, z] = new Set(['a', 'b', 'c'])
- 默认值

	- let [foo = true] = []

- 本质：事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

	- function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

### 对象的解构赋值

- let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
- 默认值

	- const {x = 3} = {};

### 字符串的解构赋值

- const [a, b, c, d, e] = 'hello'
- 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值   
 let {length : len} = 'hello';  // len为5

### 数值和布尔值的解构赋值

- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。涉及到基本包装类型知识点
- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
- let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

### 函数参数的解构赋值

- function add([x, y]){
  return x + y;
}

add([1, 2]); // 3

### 原理：解构是ES6提供的语法糖，其实内在是针对可迭代对象的Iterator接口，通过遍历器按顺序获取对应的值进行赋值

## 数组的扩展

### 扩展运算符

- 替代函数的 apply 方法
- 复制数组（浅拷贝）
- 合并数组
- 与解构赋值结合
- 与解构赋值结合
- 实现了 Iterator 接口的对象

	- 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组
	- const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] 

### Array.from()

- Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

### Array.of()

- Array.of方法用于将一组值，转换为数组

### 数组实例

- copyWithin() 

	- 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组

- find() 和 findIndex()

	- 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined

- 数组实例的 fill()

	- fill方法使用给定值，填充一个数组。
	- 可用于声明二维数组

- entries()，keys() 和 values()

	- keys()是对键名的遍历
	- values()是对键值的遍历
	- entries()是对键值对的遍历。

- includes() 

	- Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法

- flat()

	- 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

- flatMap()

	- flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
	- flatMap()只能展开一层数组

### Array.prototype.sort() 的排序稳定性

- 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变

## 对象的新增方法

### Object.is()

### Object.assign()

### Object.getOwnPropertyDescriptors()

### __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf() 

### Object.setPrototypeOf() 

### Object.getPrototypeOf()

### Object.keys()，Object.values()，Object.entries()

## Symbol（知识链中的宝藏）

### 概述

- ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因
- ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）
- 生成Symbol值

	- Symbol 值通过Symbol函数生成，凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突
	- 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值（❗️ES也不推荐用new来生成原始类型，并不是不推荐用new生成对象 注意外面文章的坑法）

### Symbol.prototype.description

- 创建 Symbol 的时候，可以添加一个描述
- 可以用显示转化为字符串来读取

	- const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

- ES2019 提供了一个实例属性description

	- const sym = Symbol('foo');

sym.description // "foo

### 作为属性名的 Symbol

- 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖
- 注意，Symbol 值作为对象属性名时，不能用点运算符。（❗️因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值）

	- a[mySymbol]=123 // 这样赋值

### 消除魔术字符串

- 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，❗️改由含义清晰的变量代替。
- 变量的值没有什么意义，随意取就行，所以可以用Symbol代替 简化很多

### 属性名的遍历

- Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回（深拷贝要注意这种场景）
- 注意Symbol属性也不是私有属性，❗️只是这种属性名比较特殊
- 遍历API

	- Object.getOwnPropertySymbols可以获取所有 Symbol 属性名

		- const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]

	- Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名

		- let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]

### Symbol.for()

- 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

### Symbol.keyFor()

- Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key

### 对象内置的 Symbol 值

- 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法(❗️除了Date、Symbol类原型上有这个方法，其它对象没有对外暴露，但是我们可以去覆盖它)

	- Symbol.hasInstance

		- 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，❗️会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)

	- Symbol.iterator 

		- 对象的Symbol.iterator属性，Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，❗️就会返回一个遍历器  这个遍历器可以供扩展运算符和for...of...消费

	- 对象 — 原始值转换（Symbol.toPrimitive）

		- toString/valueOf

			- toString

				- Object.prototype.toString 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串,然而 JavaScript 下的很多类根据各自的特点，定义了更多版本的 toString 方法(❗️一般我们是以Object.prototype.toString来判断，不用各自对象内部的方法，他们大部分自己重写了)
				- 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串
				- 函数的 toString 方法返回源代码字符串
				- 日期的 toString 方法返回一个可读的日期和时间字符串
				- RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串

			- valueOf

				- 默认的 valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数
				- JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同

		- 对象转字符串和数字

			- Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数（在 ES6 之后提供了 Symbol.toPrimitive 方法，该方法在类型转换的时候优先级最高）
			- 如何转字符串

				- primValue = ToPrimitive(input, String)

					- 1.如果 obj为 基本类型，直接返回
					- 2.否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回
					- 3.否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回
					- 4.否则，JavaScript 抛出一个类型错误异常

			- 如何转数字

				- primValue = ToPrimitive(input, Number)

					- 1.如果 obj为 基本类型，直接返回
					- 2.否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回
					- 3.否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回
					- 4.否则，JavaScript 抛出一个类型错误异常

			- 什么时候对象会转字符串或者数组呢？（转换规则）

				- 显示类型转换(使用JS提供的API显示转换类型)

					- String()
					- Number()

				- 隐式类型转换(当处理一些运算操作和比较操作等就会触发系统自动转换类型，JS 的隐式转换主要涉及的是两个操作符， + 和 ==)

					- 运算符

						- +一元运算符 会调用Number()方法转换
						- 我们在对各种非Number类型运用数学运算符(- * /)时，会先将非Number类型转换为Number类型，所以你会看到两个new Date相减实际是调用Number(new Date())那么这是对象转数值的操作，new相加得到的是字符串，new Date对象如果没有明确传递hint类型，则hint默认是string
						- + 二元运算符（无法确定hint类型）

							- 两侧都是数值类型 进行相加
							- 一侧为字符串则走字符串拼接操作
							- 一侧为引用类型，我们无法确定hint值，所以走默认的，对象非Date，hint会number，最后得到的是个String类型 走拼接

					- 比较语句
					- 判断语句

			- 搞清楚隐式转换的规则和toPrimitive如何将对象转换为原始值，这两个概念不要混淆了

				- 转换规则是按照某个规则进行转换
				- toPrimitive是定义如何把原始值转化为string或者number
				- 像显示转换是相当于明确hint类型 然后toPrimitive就根据对应的类型进行转换，而隐式转换也是找到对应的规则后进行确定hint转换，❗️如果不能缺hint类型就走默认的，默认

					- 当没有给ToPrimitive方法传类型时，通常的表现就像是传递了Number类型。但是在ES6中，用户是可以自定义@@toPrimitive方法从而进行重写这个行为。在本标准中，Symbol对象(§19.4.3.4)和Date对象(§20.3.4.45)已经默认定义了@@toPrimitive方法。Date对象不传类型时，表现就像是传递了String类型

			- 题目：重温(a==1&&a==2&&a==3)(宽松相等)问题

				- const a = { value : 0 };
a.valueOf = function() {
    return this.value += 1;
};

console.log(a==1 && a==2 && a==3); //true
				- ==会存在隐式转换 a==1 对象转化为原始类型 内部调用toPrimitive 接着重写valueOf就可实现

			- 评价：隐式转换令人头疼，规则多，所以这就是为什么要引入TS的原因

## Reflect

### 概述：Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个

### 评价：改变编程习惯 不推荐使用

## Promise 对象

### 概述：Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象

### promise的特性

- Promise的立即执行性
- Promise 三种状态
- Promise 状态的不可逆性
- resolve&reject

	- resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），`在操作成功时调用，并将操作的结果，作为参数传递出去`；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），`在操作失败时调用，并操作报出的错误，作为参数传递出去`
	- resolve具有拆箱功能，reject不具备

- Promise then() 回调异步性

	- Promise接收的函数参数`executor`是同步执行的，但`then方法中的回调函数执行则是异步的

- Promise then() 回调函数的返回值

	- Promise then() 方法返回的实例Promise对象`这里我们为了方便记为promiseA`，如果 then 中的回调函数：

		- 返回了一个值，那么 then 返回的 Promise 将会成为成功状态，并且将返回的值作为成功操作的结果（❗️结果会传递给下一个then回调参数）
		- 没有返回任何值，那么 then 返回的 Promise 将会成为成功状态，并且成功操作的结果为 undefined。
		- 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且拒绝操作结果为抛出的错误
		- 如果返回的是个Promise类型，将会进行`拆箱操作`

- Promise 中的异常处理

	- ❗️通常我们都用catch属性来捕获异常，`Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名`，`用于指定发生错误时的回调函数`
	- ❗️catch属性本质是由`then实现的`，所以也会返回一个新的实例Promise对象，该实例对象的状态的规则跟`Promise then() 回调函数的返回值`章节里所讲的规则保持一致，`❗️千万不要误认为`catch属性返回的Promise对象的状态是`rejected`

### Promise的方法

- Promise.prototype.then()

	- then() 方法返回一个 Promise。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

- Promise.prototype.catch() 

	- Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

- Promise.prototype.finally() 

	- finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的

- Promise.all()

	- Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
	- Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果。

- Promise.race()

	- Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
	- Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

- Promise.resolve()

	- 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
	- Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

- Promise.reject()

	- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected
	- const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了

### 实现Promise

- 1.同步操作✅
- 2.异步操作✅ - 发布订阅模式（可以解决异步问题）
- 3.链式调用✅
- 4.实践中要确保 onFulfilled 和 onRejected 方法异步执行 ✅
- 5.resolve具有拆箱功能✅
- 6.其它方法✅

## Generator 函数的语法

### 语法特征：函数声明处具备 *
号。通过yield表达式移动内部的
迭代指针

### 迭代器可以被for...of遍历。迭代
器调⽤next⽅法可以将内部指针
移动到下⼀个yield表达式指向的
值。每次返回的值均为{ value: 
any, done: boolean } 的形式

### 调⽤⽣成器函数会返回⼀个迭代
器对象

- next⽅法，移动内部指针得出下
⼀个切⽚的值。若传⼊⼀个值，
则该值会替换yield表达式的值，不传则为undefined
- throw⽅法，相当于把yield表达
式替换成⼀个抛出错误的语句
- return⽅法，相当于把yield语句
替换成⼀个return语句

### 与 Iterator 接口的关系

- 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象
- 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口

### next 方法的参数

- yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
- 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
- ❗️下一次调用next的时候，传的参数会被作为上一个yield前面接受的值

### Generator 函数的this

- Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。

	- function* g() {}
g.prototype.hello = function () {
  return 'hi!';
};
let obj = g();
obj instanceof g // true
obj.hello() // 'hi!'

- 不能当做构造函数，执行new操作

### 应用 

- （1）异步操作的同步化表达
- （2）控制流管理 
- （3）部署 Iterator 接口

	- 调⽤⽣成器函数会返回⼀个迭代对象，也就是提供 Iterator 接口

### Generator 函数的异步应用

- 异步：所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段
- 同步：相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着
- Generator 函数的流程管理

	- ❗️Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因
	- 相当于这样的

		- {value:asyncFn,done:false}
		- 每次走完next操作，遇到yield表达式就停下来，next操作会把yield后面的值返回也就是value,value就是我们的异步操作
		- 然后我们的异步回调（简单说就是我们在异步完成后要做什么）可以放到yield表达式后面下一行，如果此时asyncFn完成
		- 执行next传入异步完成后得到的结果result，也就是会被当做yield表达式的返回值,这样我们的回调操作就可以拿到值了
		- 实际async await就是比generator多了个执行操作
		- ❗️注意异步函数可以用Promise封装取值更加简单，这就是为啥有了Generator 函数处理异步为啥还要Promise，注意Generator yield返回的值(这里返回不是指这种let res =yield x,而是{value...})什么的都不是Promise对象，跟await不一样，await后面跟的是Promise对象 
		- done状态为true的情况下，value的值是读generator函数返回的值，如果没有返回值value则为undefined

	- 与Promise对比

		- Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意
		- generator的出现可以让我们用同步的方式写异步代码，Promise可以帮助我们轻松封装异步函数,我们可以轻松获取返回值

- async函数

	- 概念：async 函数是什么？一句话，它就是 Generator 函数的语法糖。
	- async函数对 Generator 函数的改进，体现在以下四点

		- （1）内置执行器。
		- （2）更好的语义。
		- （4）async函数返回值是 Promise。

## Class 

### 概述：ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类（ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已）

### 静态方法

- 如何实现

### 私有方法和私有属性

- 如何实现

### ❗️搞清楚子类和实例化对象的区别

### new.target 属性

- new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的

### 继承

## Iterator 和 for...of 循环

### 概述：遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

### Iterator的作用

- 一是为各种数据结构，提供一个统一的、简便的访问接口
- 二是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费
- 三是使得数据结构的成员能够按某种次序排列

### Iterator 的遍历过程

- （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象
- （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
- （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
- （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

### 默认 Iterator 接口

- 当使用for...of循环遍历某种数据结构时，该
循环会自动去寻找 Iterator 接口。一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
- 原生具备 Iterator 接口的数据结构如下。

	- Array
	- Map
	- Set
	- String
	- TypedArray
	- 函数的 arguments 对象
	- NodeList 对象

### 调用 Iterator 接口的场合

- （1）解构赋值
- 2）扩展运算符
- 3）for...of...

### 计算生成的数据结构

- 有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
- entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法
- keys() 返回一个遍历器对象，用来遍历所有的键名
- values() 返回一个遍历器对象，用来遍历所有的键值

### for...of...与for...in...的区别

- for...in循环有几个缺点。

	- 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
	- for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
	- 某些情况下，for...in循环会以任意顺序遍历键名。
	- 总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。
	- 推荐用Object.keys()代替for...in...

		- Object.keys({name:'vnues'})
		- 注意Object.keys()方法跟其它对象类型的keys方法做区别，其它对象的keys是返回相对应的key遍历器接口
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}

- for...of循环相比上面几种做法，有一些显著的优点。

	- 有着同for...in一样的简洁语法，但是没有for...in那些缺点
	- 不同于forEach方法，它可以与break、continue和return配合使用。
	- 提供了遍历所有数据结构的统一操作接口

## Proxy

### 概念：Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### const p = new Proxy(target, handler)

- target:要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler:一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

### ProxyHandler（Proxy 支持的拦截操作一览，一共 13 种）

- get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值
- has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值
- deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值
- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

### this 问题

- 缺点：目标对象内部的this关键字会指向 Proxy 代理

### 与Object.defineProperty()的区别

- ES5 提供了 Object.defineProperty 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象

	- obj: 要在其上定义属性的对象。
	- prop:  要定义或修改的属性的名称。
	- descriptor: 将被定义或修改的属性的描述符。
数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者

		- // 数据描述符
// configurable	enumerable	value	writable
{
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
}
		- // 存取描述符
//  configurable	enumerable get set
{
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
}

			- get：属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
默认为 undefined
			- set：属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
默认为 undefined

		- 可枚举性（enumerable）：用来控制所描述的属性，是否将被包括在for...in循环之中。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。❗️简单理解属性(数组元素的属性是下标)可被遍历

			- for..in循环
			- Object.keys方法
			-  JSON.stringify方法

		- ❗️注意for...of...是消费迭代器的，而且他是遍历属性的值，所以跟enumerable没有联系

- Object.defineProperty()的使用注意事项

	- Object.defineProperty()的功能是增加一个对象的属性或者修改一个对象的属性并返回该对象，所以我们想对数据做劫持则每个对象都要经过Object.defineProperty()处理，按照平常的思考🤔，如果在get方法再次访问该属性就会无限引用了，想想我们解决深拷贝无限引用是咋实现的，只不过我们这里针对单独的熟悉，一个属性会单独经过一个Object.defineProperty()处理，所以可以通过一个变量指向对应的属性
	- set操作如果内部也要对象.xxx进行修改也会无限引用 因为在set内部进行this.xx=a也是一个修改操作
	- Proxy不会存在这样的问题，因为它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写，所以并不会像Object.defineProperty一样 这样访问触发无限引用

- Object.defineProperty()的缺陷

	- Object.defineProperty 在数组中的表现和在对象中的表现是一致的，数组的索引就可以看做是对象中的 key

		- 1. 通过索引访问或设置对应元素的值时，可以触发 getter 和 setter 方法
		- 2. 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被observe。
		- 3. 通过 pop 或 shift 删除元素，会删除并更新索引，也会触发 setter 和 getter 方法。
		- 所以，Object.defineProperty 是有监控数组下标变化的能力的，只是vue2.x放弃了这个特性，尤大回复是性能代价

	- Object.defineProperty本身有一定的监控到数组下标变化的能力，但是在Vue中，从性能/体验的性价比考虑，弃用了这个特性

		- vue是如何处理的？

			- Object.defineProperty对于push这种尾部追加确实监控不到，但是对于unshift pop是可以监控得到的
			- 重写数组的方法  'push', 'pop','shift',’unshift','splice',  'sort', 'reverse'
			- 增加vm.$set方法

- Proxy的优势

	- Proxy可以直接监听对象而非属性：它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
	- Proxy可以直接监听数组的变化
	- Proxy有多达13种拦截方法，不限于apply/ownKeys/deleteProperty/has等，是Object.defineProperty不具备的
	- Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
	- Proxy作为新标准将受到浏览器厂商重点持续的性能优化

## Set 和 Map 数据结构

### Set

- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
- Set 实例的属性和方法

	- Set.prototype.constructor：构造函数，默认就是Set函数
	- Set.prototype.size：返回Set实例的成员总数
	- Set.prototype.add(value)：添加某个值，返回 Set 结构本身
	- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
	- Set.prototype.clear()：清除所有成员，没有返回值

- 遍历操作

	- Set.prototype.keys()：返回键名的遍历器
	- Set.prototype.values()：返回键值的遍历器
	- Set.prototype.entries()：返回键值对的遍历器
	- Set.prototype.forEach()：使用回调函数遍历每个成员

- 如何实现Set

	- 实现一个数据结构最主要就是实现底层存储特性以及其对应的API
	- 去重

		- 对于NAN判断使用includes代替indexOf

	- 暴露对应的生成迭代器的接口供for...of...消费

### WeakSet

### Map

- ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适
- 实例的属性和操作方法

	- size属性返回 Map 结构的成员总数
	- Map.prototype.set(key, value)：set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键
	- Map.prototype.get(key)：get方法读取key对应的键值，如果找不到key，返回undefined
	- Map.prototype.has(key)：has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
	- Map.prototype.delete(key)：delete方法删除某个键，返回true。如果删除失败，返回false
	- Map.prototype.clear()：clear方法清除所有成员，没有返回值

- 遍历方法

	- Map.prototype.keys()：返回键名的遍历器。
	- Map.prototype.values()：返回键值的遍历器。
	- Map.prototype.entries()：返回所有成员的遍历器。
	- Map.prototype.forEach()：遍历 Map 的所有成员。

### WeakMap

- WeakMap结构与Map结构类似，也是用于生成键值对的集合。
- WeakMap与Map的区别有两点

	- 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
	- 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制

		- 强引⽤与弱引⽤的区别

			- 强引⽤：假如引⽤没有被解除，
则不可回收
			- 弱引⽤：对象被认为是不可访问
的，因此可以在任何时刻被回收

		- 强引⽤的不⽅便之处

			- 1.假如使⽤了Map储存数据
			- 2. 键（变量key）为⼀个对象
			- 3. 键赋值为null--并不会回收对
象，因为Map中原来的键仍然保
留了原引⽤。这⾥只是解除了
key变量的引⽤。
			- 4. 回收的⽅法：先delete掉值，
再接触key变量的引⽤

		-  假如采⽤弱引⽤的
WeakMap，只需要解除key变量
的引⽤即可

- 应用场景

	- 1. Dom为键储存数据：若采⽤
WeakMap，只要Dom节点引⽤
为赋值为null，这份数据也会随
之回收，不需要⼿动先删除数据
再接触引⽤。
	- 2. 数据缓存：当⽆法获知数据索
引的引⽤什么时候会被解除时。（记忆函数的map可用WeakMap代替）
	- 3. 私有变量：理论上私有变量可
以⽤Map实现，只要加私有变量
存在独⽴与实例的哈希表中即
可。但实例有可能会被回收，这
个时候私有变量若为强引⽤则⽆
法回收，使⽤弱引⽤则不需要关
注这个问题

		- 
		- 类的私有属性和私有方法，注意❗️也会被实例化对象继承，这样就理解为什么使用WeaKMap）类的方法也是会被实例化继承，类的方法在外部通过prototype可以拿到，因为确实是挂载在原型对象上的
		- ❗️脑海里不要老是觉得是实例化对象的方法和属性，这同样也是类的方法和属性，因为是❗️继承过来的啊，改掉这种认知和说法

	- 我的理解：就是WeaKMap使用这份数据，不会造成多一份计数引用，你销毁这份数据不需要考虑我，❗️尝试多使用，可以优化内存

## 对象的扩展

### 属性的简洁表示法

- ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
- ❗️方法简写（ES6新增的简写方式）

	- // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

### 属性名表达式

- 是直接用标识符作为属性名
- 表达式作为属性名，这时要将表达式放在方括号之内

### 方法的 name 属性

- 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性

### 属性的可枚举性和遍历

- 可枚举性:对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象

	- 有四个操作会忽略enumerable为false的属性

		- for...in循环：只遍历对象自身的和继承的可枚举的属性
		- Object.keys()：返回对象自身的所有可枚举的属性的键名（❗️不包含原型链上的）
		- JSON.stringify()：只串行化对象自身的可枚举的属性
		- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

	- ES6 规定，所有 Class 的原型的方法都是不可枚举的

- 属性的遍历（ES6 一共有 5 种方法可以遍历对象的属性。）

	- for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
	- Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。✅

		- 数组的keys方法返回的是个遍历器对象

	- Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
	- Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
	- Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

### super 关键字

- 我们知道，this关键字总是指向方法所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
- super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
- ❗️这不是Class里的super关键字

### 对象的扩展运算符

- 《数组的扩展》一章中，已经介绍过扩展运算符（...）。ES2018 将这个运算符引入了对象

### 链判断运算符

-  ES2020 引入了“链判断运算符”（optional chaining operator）?.
- 避免：// 错误的写法
const  firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

### Null 判断运算符

- 读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值，❗️但是属性的值如果为空字符串或false或0（0转化为false），默认值也会生效（不过实际场景中还是用||比较多）
- 为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。

## 函数的扩展

### 函数参数的默认值

- function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
- ❗️指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真
- ❗️一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

### rest 参数

- ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
- ❗️rest参数代替arguments变量

### 严格模式

- 从 ES5 开始，函数内部可以设定为严格模式。
- ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

### name 属性

- 函数的name属性，返回该函数的函数名

### 箭头函数

- ES6 允许使用“箭头”（=>）定义函数
- 使用注意点

	- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
	- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
	- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
	- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

- 不适用场合

	- 由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数
	- 第一个场合是定义对象的方法，且该方法内部包括this
	- 事件的回调函数

### 尾调用优化

- 概念

	- 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数

- 函数调用会在内存形成一个“调用记录”，又称“调用帧”
- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了
- 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。
- ❗️我的理解：在没有尾调用优化出来之前，外部函数要等到内部代码执行完上下文才会销毁，引入了尾调用优化后大大节省栈开辟的空间，节省内存
- 场景

	- 使用尾递归优化递归

## 数值的扩展

### 二进制和八进制表示法

- ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示

### Number.isFinite()

- Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity

### Number.isNaN()

- Number.isNaN()用来检查一个值是否为NaN

### Number.parseInt(), Number.parseFloat()

- ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
- 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化

### Number.isInteger()

- Number.isInteger()用来判断一个数值是否为整数。
- 自己实现：思路是转成字符串正则匹配是否有小数点

### Number.EPSILON

- ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。（Number.EPSILON可以用来设置“能够接受的误差范围”）
- 0.1 + 0.2 - 0.3<Number.EPSILON

### Math 对象的扩展

- Math.sign()

	- 参数为正数，返回+1
	- 参数为负数，返回-1
	- 参数为 0，返回0
	- 参数为 0，返回0
	- 其他值，返回NaN Math.sign(NaN) // NaN

### BigInt 数据类型

- JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity
- ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示

## 字符串的新增方法

### String.fromCodePoint()

- ES5 提供String.fromCharCode()方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。
- ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。在作用上，正好与下面的codePointAt()方法相反

### 实例方法

- codePointAt()

	- ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点

- normalize()

	- ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化

- includes()

	- 返回布尔值，表示是否找到了参数字符串。
	- 与indexOf的区别

		- indexOf() 返回索引值，用于判断某一个元素在数组(字符串)中的位置
		- indexOf无法判断NAN情况，includes可以
		- 当数组的有空的值的时候，includes会认为空的值是undefined（数组元素没有初始化赋值默认初始化为undefined），而indexOf无法判断

- startsWith()

	- 返回布尔值，表示参数字符串是否在原字符串的头部

- endsWith()

	- 返回布尔值，表示参数字符串是否在原字符串的尾部

- repeat()

	- repeat方法返回一个新字符串，表示将原字符串重复n次

- padStart()

	- ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全

- padEnd()

	- padEnd()用于尾部补全

- trimStart()

	- ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致
	- trimStart()只消除头部的空格，保留尾部的空格

- trimEnd()

	- rimEnd()也是类似行为
	- 自定义trim方法

		- String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/gm,'');
}

*XMind - Trial Version*