# JavaScript

## 数据类型

### 概念篇

- 7种原始数据类型

	- boolean
	- string
	- number
	- undefined
	- null
	- Symbol
	- bigInt

- 引用类型

	- 对象Object

		- 普通对象-Object
		- 数组对象-Array
		- 正则对象-RegExp
		- 日期对象-Date
		- 数学函数-Math
		- 函数对象-Function
		- 基本包装类型 Boolean String Number

- null是对象吗？为什么？

	- 结论: null不是对象
	- 解释: 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。JS在运行之前编译成二进制形式，在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

- 1 .toString()或者(1).toString为什么可以调用？

	- 数字后面的第一个点会被解释为小数点，而不是点调用。只不过不推荐这种使用方法，而且这样做也没什么意义
	- 基本包装类型:为什么基本类型却可以直接调用引用类型的方法呢？其实是js引擎在解析上面的语句的时候，会把这三种基本类型解析为包装对象（就是下面的new String()），而包装对象是引用类型可以调用Object.prototype上的方法。大概过程如下：

- 0.1+0.2为什么不等于0.3？

	- 在JS中数字采用的IEEE 754的双精度标准进行存储，到这里我们都理解只要采取IEEE 754 FP的浮点数编码的语言均会出现上述问题，只是它们的标准类库已经为我们提供了解决方案而已
	- 而对于像0.1这样的数值用二进制表示你就会发现无法整除，最后算下来会是 0.000110011….由于存储空间有限（双精度是64位存储空间），最后根据IEEE 754的规则会舍弃后面的数值，所以我们最后就只能得到一个，此时就已经出现了精度的损失
	- 简单理解 0.1和02不能被二进制浮点数精确表示
	- 在0.1 + 0.2这个式子中，0.1和0.2都是近似表示的，在他们相加的时候，两个近似值进行了计算，导致最后得到的值是0.30000000000000004，此时对于JS来说，其不够近似于0.3），于是就出现了0.1 + 0.2 != 0.3 这个现象
	- 既然十进制0.1不能被二进制浮点数精确存储，那么为什么console.log(0.1)打印出来的确确实实是0.1这个精确的值？

		- 实际IEEE 754标准就是采用一套规则去近视于0。1 虽然无法精确存储，但是可以用一个近视值去表示，比如：0.100000000000000002 ==
0.100000000000000010 // true
		- 当64bit的存储空间无法存储完整的无限循环小数，而IEEE 754 Floating-point采用round to nearest, tie to even的舍入模式，因此0.1实际存储时的位模式是0-01111111011-1001100110011001100110011001100110011001100110011010；

	- 解决浮点数运算精度

		- 换算成整数进行运算，整数运算就不存在精度缺失问题,  我们可以把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完成后再进行降级（除以10的n次幂），这是大部分编程语言处理精度问题常用的方法。例如：
		- 但是换算也是浮点数运算的操作，同样也会存在问题，所以解决的方法就是采用字符串形式进行换算 比如：3.14===> {times: 100, num: 314}    ===>有点类似大数相加的原理
		- 利用第三方库:Math.js，decimal.js
		- 解题思路：

			- 二进制换算后（不会出现循环被截断，这是前提条件，这样换算后值落在这个区间就保证了精度无误，所以我们想办法使运算的数字落在这个区间 这个就是解搭问题的关键）由于仅位于Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER间的整数才能被精准地表示，也就是只要保证运算过程的操作数和结果均落在这个阀值内，那么运算结果就是精准无误的
			- 问题的关键落在如何将小数和极大数转换或拆分为Number.MIN_SAFE_INTEGER至Number.MAX_SAFE_INTEGER阀值间的数了
			- 小数转换为整数，自然就是通过科学计数法表示，并通过右移小数点，减小幂的方式处理；(如0.000123 等价于 123 * 10-6)

	- Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

可以这样判断：0.1+0.2-0.3<Number.EPSILON

### 检测篇

- typeof 是否能正确判断类型？

	- 对于原始类型来说，除了 null 都可以调用typeof显示正确的类型。
	- 但对于引用数据类型，除了函数之外，都会显示"object"。

- instanceof能判断基本数据类型
- Object.is和===的区别？

	- Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0(false)，NaN和NaN(true)。

- Object.prototype.toString

### 转换篇

- JS中类型转换有哪几种？

	- 转换成数字
	- 转换成布尔值
	- 转换成字符串

- == 和 ===有什么区别？

	- ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1'===1的结果是false，因为一边是string，另一边是number。
	- ==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下：（比较最终都是转化为数字的）

		- 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
		- 判断的是否是null和undefined，是的话就返回true
		- 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
		- 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
		- 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较

	- ==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下：（比较最终都是转化为数字的）

		- 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
		- 判断的是否是null和undefined，是的话就返回true
		- 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
		- 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
		- 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较

- 对象转原始类型是根据什么流程运行的

	- 如果存在Symbol.toPrimitive()方法，优先调用再返回
	- 调用valueOf()，如果转换为原始类型，则返回
	- 调用toString()，如果转换为原始类型，则返回
	- 如果都没有返回原始类型，会报错
	- 如何让if(a == 1 && a == 2)条件成立？

		- 其实就是上一个问题的应用。
		- var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2);// true

## 拷贝

### 浅拷贝:shallowClone

- 一个新的对象直接拷贝已存在的对象的对象属性的引用，即浅拷贝。（对象的属性）
- Object.assign
- ...展开运算符
- concat浅拷贝数组
- slice浅拷贝

### 深拷贝:deepClone

- 深拷贝会另外拷贝一份一个一模一样的对象,从堆内存中开辟一个新的区域存放新对象,新对象跟原对象不共享内存，修改新对象不会改到原对象。
- JSON.parse(JSON.stringify());

	- 无法解决循环引用的问题。举个例子：
	- 无法拷贝一写特殊的对象，诸如 RegExp, Date, Set, Map等
	- 无法拷贝函数(划重点)

- 动手实现一个深拷贝

	- 普通类型

		- 直接返回就行

	- 引用类型

		- 循环引用

			- 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

		- 可遍历类型

			- Set
			- Map
			- Array
			- Object

		- 不可遍历类型（考虑基本包装类型（引用类型））

			- Boolean
			- Number
			- String
			- Date

				- Unix时间戳:value
一个 Unix 时间戳（Unix Time Stamp），它是一个整数值，表示自1970年1月1日00:00:00 UTC（the Unix epoch）以来的毫秒数，忽略了闰秒。请注意大多数 Unix 时间戳功能仅精确到最接近的秒。
				- 重新生成一个Date实例，参数传入一个Unix

			- Error
			- Symbol

				- Object(Symbol('foo'))
				- es6过后就不提倡用new 直接类似Symbol（xxx）这样执行就行

		- WeakMap、WeakSet、ArrayBuffer对象、TypedArray视图和DataView视图、Float32Array、Float64Array、Int8Array
		- Blob、File、FileList、ImageData

	- 拷贝函数

		- lodash对函数的处理 因为拷贝函数没有啥意义
		- 函数（prototype来区分下箭头函数和普通函数，箭头函数是没有prototype）

			- 箭头函数

				- 我们可以直接使用eval和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。

			- 非箭头函数

				- 分别使用正则取出函数体和函数参数，然后使用new Function ([arg1[, arg2[, ...argN]],] functionBody)构造函数重新构造一个新的函数

### 赋值

- 基本数据类型：赋值，赋值之后两个变量互不影响
- 引用数据类型：赋**址**，两个变量具有相同的引用，指向同一个对象，相互之间有影响
- 为什么需要浅拷贝和深拷贝？

	- 对引用类型进行赋**址**操作，两个变量指向同一个对象，改变变量 a 之后会影响变量 b，哪怕改变的只是对象 a 中的基本类型数据
	- 通常在开发中并不希望改变变量 a 之后会影响到变量 b，这时就需要用到浅拷贝和深拷贝。
	- 这就是为什么需要浅拷贝和深拷贝的缘由，因为我们在赋值操作时候，操作引用类型的时候不想b影响a,所以需要浅拷贝或者深拷贝，这也从中可以看出赋值与拷贝深拷贝的区别
	- 通常深浅拷贝是解决引用类型之间互相影响的，要明白这点  

- ❗️当我们进行赋值，考虑到引用类型赋值完做修改会相互影响，就引出了对应的深浅拷贝方案去解决

## this指向

### 其实JS中的this是一个非常简单的东西，只需要理解它的❗️执行规则就行

### 显示绑定

- call
- apply
- bind

### 隐式绑定

- 全局上下文

	- 全局上下文默认this指向window, 严格模式下指向undefined。

- 直接调用函数

	- this相当于全局上下文的情况

- 对象.方法的形式调用

	- 谁调用这个方法，它就指向谁

- DOM事件绑定(特殊)

	- onclick和addEventerListener中 this 默认指向绑定事件的元素。

IE比较奇异，使用attachEvent，里面的this默认指向window。

- new构造函数绑定

	- 此时构造函数中的this指向实例对象

- 箭头函数

	- 箭头函数没有this, 因此也不能绑定。里面的this会指向当前最近的非箭头函数的this，找不到就是window(严格模式是undefined)

## JS数组

### 函数的arguments为什么不是数组？如何转化成数组？

- 常见的类数组

	- 用getElementsByTagName/ClassName()获得的HTMLCollection
	- 用querySelector获得的nodeList

- 转换成数组

	- Array.prototype.slice.call()
	- Array.from()
	- ES6展开运算符
	- 利用concat+apply

### forEach中return有效果吗？如何中断forEach循环？

- 在forEach中用return不会返回，函数会继续执行。
- 中断方法：

	- 使用try监视代码块，在需要中断的地方抛出异常
	- 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环 （面试问到团队规范✅）

### JS判断数组中是否包含某个值

- array.indexOf
- array.includes(searcElement[,fromIndex]) 推荐✅
- array.find(callback[,thisArg])
- array.findeIndex(callback[,thisArg])

### JS中flat---数组扁平化

- 递归
- reduce+递归
- 原型链上的flat方法(数组实例上的方法) [1,2,3].flat(2)

### JS数组的高阶函数

- 什么是高阶函数：一个函数就可以接收另一个函数作为参数或者返回值为一个函数，这种函数就称之为高阶函数。
- 数组中的高阶函数

	- map
	- reduce
	- filter
	- sort

## JS如何实现继承

### 什么是继承

- 继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。通过使用继承我们能够非常方便地复用以前的代码，能够大大的提高开发的效率

### 第一种: 借助call（构造函数式继承
）

### 第二种: 借助原型链（原型链继承）

### 第三种：将前两种组合（组合继承）

### 第四种：原型式继承（如果我要继承的父类是一个普通对象而不是构造函数（因为JavaScript 语言中，生成实例对象的传统方法是通过构造函数），那么如何实现）

- Object.create方法

### 第五种：寄生继承

- 核心：在原型式继承的基础上，增强对象，返回构造函数(类似工厂函数进行包装)

### 第六种：寄生组合继承

## 原型链

### 原型对象和构造函数有何关系？

- 在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。
- 当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。

### 能不能描述一下原型链

- 首先要明白实例的proto属性与构造函数的protype属性都是指向原型对象，原型对象的constructor属性又是指向构造函数
- JavaScript对象通过__proto__ 指向父类的原型对象，直到指向Object的原型对象为止，这样就形成了一个原型指向的链条, 即原型链。
- 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
- 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

## DOM事件

### 绑定事件的⽅法

- 1. HTML的内联属性
- 2. 元素的onXXX属性添加事件
- 3. addEventListener

	- 标准方法

		- el.addEventListener(eventNam
e, handle, useCapture | 
options)

			- {String} eventName 事件名称
			- {Function} handle 事件函数
			- {Boolean} useCapture 是否在事
件捕获阶段触发事件，true 代表
捕获阶段触发，false 代表在冒
泡阶段触发
			- {Object} options 选项对象

		- el.removeEventListener(eventN
ame, handle)

	- IE⽅法

		- el.attachEvent(eventName,
handle)
		- el.detachEvent(eventName,
handle)

	- 对⽐：

		- 由于IE8不⽀持 事件捕获 ，所以
通过 attachEvent/detachEvent 
绑定的时间也只能在 冒泡阶段 
触发
		- 通过 attachEvent/detachEvent 
绑定的事件函数会在全局作⽤域
中运⾏，即： this === window
		- 通过 attachEvent/detachEvent
绑定的事件函数以绑定时的先后
顺序 “倒序” 被执⾏
		- attachEvent/detachEvent 的第
⼀个参数要在事件名称前⾯加 
'on'

- 评价

	- 1. 违反最佳实践
	- 2. 由于只能赋值⼀个handler，
因此会存在覆盖的问题
	- 3. 调⽤addEventListener时，要
注意销毁组件时回收handler，
removeEventListener。但是这
样的话，handler⼜必须⽤⼀个变
量保持引⽤

### 事件对象

- 标准

	- 属性

		- currentTarget：currentTarget
的值始终等于 this，即指向事件
所绑定到的元素
		- target：真正触发事件的元素
		- bubbles：表示事件是否冒泡
		- cancelable：是否可以取消默认
⾏为
		- defaultPrevented：为真则被调
⽤了preventDefault()
		- detail：描述事件的细节
		- eventPhase：描述事件处理函数
的阶段

			- 1：捕获
			- 2：处于⽬标
			- 3：冒泡

		- trusted：为真则是浏览器原⽣事
件，为假则是⼿动添加的事件
		- type：事件类型

	- 方法

		- event.preventDefault()：阻⽌默
认事件
		- event.stopIPropagation()：阻⽌
冒泡 也可以阻止捕获(根据dom事件流 捕获阶段被阻止了 处于目标阶段和事件冒泡也不会被触发了)
		- stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果

			- react使用合成事件，如果出现点击空白区域弹框消失，可以利用stopImmediatePropagation阻止事件的其它函数执行 （只执行我这个事件的回调函数,其它不执行）因为我都冒泡到document上了，阻止冒泡没什么用了，另外一种解决方法关闭操作注册到window上
			- e.nativeEvent.stopImmediatePropagation 这个解决问题的不是阻止冒泡 而是不允许其他的事件回调触发 因为我们这时候事件已经冒泡到document上了 为document再绑定了一个click事件 此时我们想触发按钮这个click事件（实际绑定到document上）触发以后，不允许再触发其他document上click的事件回调函数

- IE

	- 属性

		- srcElement：与target的值相同
		- returnValue：默认为真，若设置
为false，可以阻⽌默认事件
		- cancelBubble：默认为假，设置
为true可以阻⽌冒泡

	- 方法

		- el.onclick = function () {
    window.event
}
		- el.attachEvent：回调中的event
可以为传⼊的event参数也可为
window.event

### DOM事件流（统一这两种事件流）

- 事件流：描述的是从页面中接收事件的顺序。但有意思的是
- 执行的三个阶段

	- 事件捕获

		- 当事件发生时，首先发生的是事件捕获，为父元素截获事件提供了机会

	- 处于⽬标

		- 事件到了具体元素时，在具体元素上发生，并且被看成冒泡阶段的一部分。

	- 事件冒泡

		- 冒泡阶段发生，事件开始冒泡

- 注意点

	- DOM事件流确实会按照这三个阶段执行，我们可以通过addEventListener注册事件时候指定useCapture的值来规定事件在捕获阶段还是冒泡阶段中执行（如果该对象是目标对象，则会在目标阶段执行）
	- 你会注意到按照DOM事件流这种执行顺序，事件不会被触发两次吧，造成重复触发，并不是的，我们可以有选择是在冒泡阶段触发还是捕获阶段，默认是冒泡阶段
	- // 这段代码表示该click事件会在事件捕获阶段执行（❗️注意得判断是不是目标对象，如果是目标对象就是表示它在处于目标这个阶段执行）
			// 如何判断是否是目标对象：最具体的元素（文档中嵌套层次最深的那个节点）
			document.querySelector("#button").addEventListener(
				"click",
				function () {
					console.log("处于目标button click");
				},
				true
			);

### 多种事件

- UI 事件

	- load

		- window上触发：⻚⾯完全加载
完，包括所有图像、js⽂件、css
⽂件、<object>内嵌对象等等
		- window上触发：⻚⾯完全加载
完，包括所有图像、js⽂件、css
⽂件、<object>内嵌对象等等
		- <script>/<link>：脚本或css加
载成功后。注意：script标签只
⽀持内联属性

	- resize
	- scroll

		- window上触发：滚动⻚⾯时
		- 元素：可滚动元素滚动时

	- 焦点：可以捕获，但不会冒泡

		- focus
		- blur

- ⿏标与滚轮事件

	- click
	- dblclick
	- mousedown
	- mouseup
	- mouseenter/mouseleave 与
mouseover/mouseout 

		- 触发时机

			- 不论⿏标指针穿过被选元素或其
⼦元素，都会触发 mouseover 
事件。
			- 只有在⿏标指针穿过被选元素
时，才会触发 mouseenter 事件

		- 是否冒泡

			- mouseenter/leave不⽀持冒泡
			- mouseover/mouseout⽀持冒泡

	- 位置信息

		- 客户区坐标：event.clientX/Y
		- ⻚⾯坐标：event.pageX/Y
		- 屏幕坐标：event.screenX/Y

	- 修改键

		- event.shiftKey 
		- event.ctrlKey
		- event.altKey
		- event.metaKey

- 键盘事件

	- keydown
	- keypress
	- keyup
	- 注意：通过 event.keyCode 获取
键码

- ⽂本事件

	- ⽂本框插⼊⽂字之前：textInput

- HTML5事件

	- ⿏标右键：contextmenu
	- ⻚⾯卸载前：beforeunload
	- 形成完成DOM树：
DOMcontentLoaded
	- 页面可见性

		- pageshow
		- pagehide
		- 注意

			- pageshow/pagehide 必须添加
到 window对象上
			- pageshow可⽤来监听⻚⾯前进
后退：⻚⾯显示时触发，load 事
件只会在第⼀次加载⻚⾯是触
发，之后⻚⾯会被 bfcache（往
返缓存）管理，通过前进后退按
钮来显示⻚⾯时，load 事件并不
会触发，但是 pageshow 事件会
触发

	- 路由的哈希值变化：
hashchange

### DOM事件模型

- DOM0级事件

	- on-event (HTML 属性)

- DOM1级事件

	- 没有1级DOM。DOM级别1于1998年10月1日成为W3C推荐标准。1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型

- DOM2级事件

	- el.addEventListener(event-name, callback, useCapture)
	- 规定DOM事件流

- DOM 3级事件

	- 在DOM 2级事件的基础上添加了更多的事件类型。（同多种事件）

### 事件代理(事件委托)

- 由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
- 优点:减少内存消耗，提高性能
- 通过e.currentTarget拿到目标对象

## JavaScript三大家族

### client家族(只读)

- Element.clientWidth：元素内部的宽度(单位像素)，包含内边距(padding)，但不包括竖直滚动条、边框(border)和外边距(margin)
- Element.clientHeight：元素内部的高度(单位像素)，包含内边距(padding)，但不包括水平滚动条、边框(border)和外边距(margin)
- MouseEvent.clientX：鼠标距离可视区域左侧距离
- MouseEvent.clientY：鼠标距离可视区域上侧距离
- Element.clientTop：表示一个元素顶部边框的宽度
- Element.clientLeft：表示一个元素的左边框的宽度

### Scroll家族

- Element.scrollWidth(只读):对内容宽度的一种度量，包括由于overflow溢出而在屏幕上不可见的内容，元素内部的高度(单位像素)，包含内边距(padding)，但不包括竖直滚动条、边框(border)和外边距(margin)
- Element.scrollHeight(只读)：对内容高度的一种度量，包括由于overflow溢出而在屏幕上不可见的内容，元素内部的高度(单位像素)，包含内边距(padding)，但不包括水平滚动条、边框(border)和外边距(margin)
- Element.scrollTop(读取或设置)：一个元素的 scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0
- Element.scrollLeft(读取或设置):一个元素的 scrollLeft 值是这个元素的内容左部（卷起来的）到它的视口可见内容（的左部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollLeft 值为0

### offset家族(只读)

- Element.offsetWidth：通常，元素的offsetWidtht是一种元素CSS宽度度的衡量标准，包含元素的边框(border)、水平线上的内边距(padding)、水平方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
- Element.offsetHeight：通常，元素的offsetHeight是一种元素CSS宽度的衡量标准，包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。
- Element.offsetLeft：返回当前元素左上角相对于  Element.offsetParent 节点的左边界偏移的像素值
- Element.offsetTop：返回当前元素相对于其 Element.offsetParent 元素的顶部内边距的距离。
- Element.offsetParent：返回父系盒子中带有定位的盒子节点，1.返回该对象带有定位的父级 2.如果当前元素的父级元素没有CSS定位， offsetParent为body；如果当前元素的父级元素中有CSS定位，offsetParent 取最近的那个有定位的父级元素。和盒子本身有无定位无关。
- Element.offsetX:规定了事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量。(目标节点坐上角为原点)
- Element.offsetY

### 拓展

- Element.getBoundingClientRect()： 方法返回元素的大小及其相对于视口的位置。以CSSS设置宽高作为衡量标准
- MouseEvent.pageX: pageX 是一个由MouseEvent接口返回的相对于整个文档的x（水平）坐标以像素为单位的只读属性。
(pageY一样)
-  MouseEvent.creenX 是只读属性，他提供了鼠标相对于屏幕坐标系的水平偏移量。

## GC回收机制

### 原始数据类型是存储在栈空间中的，引用类型的数据是存储在堆空间中的，也就是去分析如何回收这两种类型的内存空间

### 调用栈中的数据是如何回收的

- JS引擎中以栈的形式来处理执行上下文，而原始数据类型就存储在栈中，调用栈有一个记录当前执行状态的指针（称为 ESP），指向当前正在处理的执行上下文
- 当函数执行完后，对应的执行上下文就可以销毁了，JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文。 
- 如果存在内部函数引用变量（基本类型或者引用类型的都行），这时候是放入到闭包对象中的，闭包对象是储存在堆内存空间中的，这属于堆内存那块的知识点了

### 堆中的数据是如何回收的

- 垃圾回收的策略：代际假说和分代收集

	- 概念：不过在正式介绍 V8 是如何实现回收之前，你需要先学习下代际假说（The Generational Hypothesis）的内容，这是垃圾回收领域中一个重要的术语，后续垃圾回收的策略都是建立在该假说的基础之上的，所以很是重要。
	- 代际假说有以下两个特点：

		- 第一个是大部分对象在内存中存在的时间很短，简单来说，就是很多对象一经分配内存，很快就变得不可访问；
		- 第二个是不死的对象，会活得更久。

- 堆

	- 在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象
	- 新生代

		- 新生代中存放的是生存时间短的对象（新生区通常只支持 1～8M 的容量）
		- 副垃圾回收器，主要负责新生代的垃圾回收

	- 老生代

		- 老生代中存放的生存时间久的对象
		- 主垃圾回收器，主要负责老生代的垃圾回收

- 垃圾回收器的工作流程

	- 现在你知道了 V8 把堆分成两个区域——新生代和老生代，并分别使用两个不同的垃圾回收器。其实不论什么类型的垃圾回收器，它们都有一套共同的执行流程。
	- 第一步是标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。
	- 第二步是回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。
	- 第三步是做内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为内存碎片。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如接下来我们要介绍的副垃圾回收器。

- 副垃圾回收器

	- 副垃圾回收器主要负责新生区的垃圾回收。而通常情况下，大多数小的对象都会被分配到新生区，所以说这个区域虽然不大，但是垃圾回收还是比较频繁的。
	- 新生代中用 Scavenge 算法来处理。所谓 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域
	- 在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。
	- 完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，同时这种角色翻转的操作还能让新生代中的这两块区域无限重复使用下去。
	- 由于新生代中采用的 Scavenge 算法，所以每次执行清理操作时，都需要将存活的对象从对象区域复制到空闲区域。但复制操作需要时间成本，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以为了执行效率，一般新生区的空间会被设置得比较小。

- 对象晋升策略

	- 也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript 引擎采用了对象晋升策略，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

- 主垃圾回收器

	- 垃圾回收器是采用标记 - 清除（Mark-Sweep）的算法进行垃圾回收的
	- 首先是标记过程阶段。标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。然后就是擦除这些垃圾数据
	- 标记 - 整理（Mark-Compact）

		- 上面的标记过程和清除过程就是标记 - 清除算法，不过对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了另外一种算法——标记 - 整理（Mark-Compact），这个标记过程仍然与标记 - 清除算法里的是一样的，但后续步骤不是直接对可回收对象进行清理，而是让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内

	- 增量标记算法

		- 在 V8 新生代的垃圾回收中，因其空间较小，且存活对象较少，所以全停顿的影响不大，但老生代就不一样了。如果在执行垃圾回收的过程中，占用主线程时间过久，就像上面图片展示的那样，花费了 200 毫秒，在这 200 毫秒内，主线程是不能做其他事情的。比如页面正在执行一个 JavaScript 动画，因为垃圾回收器在工作，就会导致这个动画在这 200 毫秒内无法执行的，这将会造成页面的卡顿现象。
		- 为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为增量标记（Incremental Marking）算法
		- 使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行，这样当执行上述动画效果时，就不会让用户因为垃圾回收任务而感受到页面的卡顿了。（❗️将大的任务拆分成小 减少卡顿）

### ❗️注意什么时候进行标记 什么时候进行清除

- 当执行上下文创建时，变量进入该环境，我们就可以对该变量对应的内存进行标记。如果执行上下文执行完毕，这个时候，就可以将所有进入该环境的变量标记为可清除状态。我们通俗的说法就是，当一份内存失去了引用，那么它就会被垃圾回收工具回收。
- 不过还有两个需要注意的地方。

一个是全局上下文。在程序结束之前，全局上下文始终存在。通常来说，JS程序运行期间，全局上下文不会有执行结束的时间节点。因此定义在全局上下文的状态永远都不会被标记。除非我们手动将变量设置为null，它对应的内存都不会被回收
- JS引擎执行代码是边解释边执行，对于未执行的函数代码段 都还没到到编译阶段呢，也不会分配变量内存给他们了，执行到这个阶段才会的

## 闭包

### 什么是闭包

- 在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包

### 从内存模型的角度来分析闭包

- 代码例子：
function foo() {
    var myName = "极客时间"
    let test1 = 1
    const test2 = 2
    var innerBar = { 
        setName:function(newName){
            myName = newName
        },
        getName:function(){
            console.log(test1)
            return myName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("极客邦")
bar.getName()
console.log(bar.getName())
- 当 JavaScript 引擎执行到 foo 函数时，首先会编译，并创建一个空执行上下文
- 在编译过程中，遇到内部函数 setName，JavaScript 引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了 foo 函数中的 myName 变量，由于是内部函数引用了外部函数的变量，所以 JavaScript 引擎判断这是一个闭包，于是在堆空间创建换一个“closure(foo)”的对象（这是一个内部对象，JavaScript 是无法访问的），用来保存 myName 变量。
- 接着继续扫描到 getName 方法时，发现该函数内部还引用变量 test1，于是 JavaScript 引擎又将 test1 添加到“closure(foo)”对象中。这时候堆中的“closure(foo)”对象中就包含了 myName 和 test1 两个变量了。
- 由于 test2 并没有被内部函数引用，所以 test2 依然保存在调用栈中。
- ❗️闭包对象的创建在编译的时候创建，在编译过程中，遇到内部函数 setName，JavaScript 引擎还要对内部函数做一次快速的词法扫描，所以这也解释了闭包对象的名称是外部函数，这是对的 （外面的文章写内部函数是闭包，这是错误的❌）
- ❗️总的来说，产生闭包的核心有两步：第一步是需要预扫描内部函数；第二步是把内部函数引用的外部变量保存到堆中，在编译阶段就会产生闭包对象（前提是函数跟函数之前），如果闭包对象存在引用，就不会被销毁，这也是要注意到内存泄漏的地方（❗️总注意形成闭包的前提是 外部函数和内部函数）

### 闭包对象是编译阶段就产生的，如果存在引用则不会被GC回收机制回收

### 闭包的应用

- 模仿块级作用域
- 私有变量

## 执行上下文

### 概念：JavaScript代码在执行时，会进入一个执行上下文中。执行上下文可以理解为当前代码的运行环境

### 执行上下文的三种类型

- 全局环境：代码运行起来后会首先进入全局环境
- 函数环境：当函数被调用执行时，会进入当前函数中的执行代码
- eval环境：不建议使用，不做介绍

### 执行上下文的生命周期

- 编译阶段（创建阶段）

	- 经过JS引擎编译后，会生成两部分内容：执行上下文（Execution context）和可执行代码
	- 在这个阶段，执行上下文会分别创建变量对象、确定作用域链，以及this指向，明白这个阶段也就会明白变量提升的现象,（也就是在编译阶段我们就确定了作用域链和this指向等）

- 执行阶段

	- 创建阶段之后，就会开始执行代码，这个时候会完成变量赋值，函数引用，以及执行其它可执行代码，如图所示

### 变量对象

- 在JavaScript代码中声明的所有变量都保存在变量对象中，除此之外，变量对象中还可能包含以下内容
- 函数的所有参数（Firefox中为参数对象arguments）
- 当前上下文中的所有函数声明（通过function声明的函数）
- 当前上下文的所有变量声明（通过var声明的变量）
- 变量对象创建过程

	- 在Chrome浏览器中，变量对象会首先获得函数的参数变量及其值；在Firefox浏览器中，是直接将参数对象arguments保存在变量对象中
	- 依次获取当前上下文中所有的函数声明，也就是使用function关键字声明的函数。在变量中会以函数名建立一个属性，属性值为指向该函数所在的内存地址引用。如果函数名的属性已经存在，那么该属性的值会被新的引用覆盖
	- 依次获取当前上下文的变量声明，也就是以var关键字声明的变量。每找到一个变量声明，就在变量对象中就以变量名建立一个属性，属性值为undefined，如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined,则会直接跳过，原属性不会被修改,也就是如果变量与函数同名，则在这个阶段，以函数值为准

### 作用域和作用域链

- 作用域

	- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
	- 词法作用域

		- 词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。（简单理解书写✍️代码的时候，词法作用域是代码阶段就决定好的，和函数是怎么调用的没有关系）

			- 全局作用域

				- 最外层函数和在最外层函数外面定义的变量
				- 没有通过关键字"var"声明的变量(包括嵌套的函数内)
				- 浏览器中，window对象的属性

			- 函数作用域
			- 块级作用域

- 动态作用域
- 作用域链

	- 作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。
	- 编译阶段就创造了作用域链，内部函数copy拷贝外部函数的作用域，在函数内部有[[scope]]属性就是表示作用域链
	- ❗️理解作用域链是理解闭包的基础

## V8

### 高级语言

- 编译型语言在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了。比如 C/C++、GO 等都是编译型语言。

	- 在编译型语言的编译过程中，编译器首先会依次对源代码进行词法分析、语法分析，生成抽象语法树（AST），然后是优化代码，最后再生成处理器能够理解的机器码。如果编译成功，将会生成一个可执行的文件。但如果编译过程发生了语法或者其他的错误，那么编译器就会抛出异常，最后的二进制文件也不会生成成功

- 而由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行。比如 Python、JavaScript 等都属于解释型语言。

	- 在解释型语言的解释过程中，同样解释器也会对源代码进行词法分析、语法分析，并生成抽象语法树（AST），不过它会再基于抽象语法树生成字节码，最后再根据字节码来执行程序、输出结果。

### V8 是如何执行一段 JavaScript 代码的

- 生成抽象语法树（AST）和执行上下文

	- 将源代码转换为抽象语法树，并生成执行上下文，主要是代码在执行过程中的环境信息
	- 高级语言是开发者可以理解的语言，但是让编译器或者解释器来理解就非常困难了。对于编译器或者解释器来说，它们可以理解的就是 AST 了。所以无论你使用的是解释型语言还是编译型语言，在编译过程中，它们都会生成一个 AST（解释器和编译器先把源代码编译成AST）
	- 如何生成AST

		- 第一阶段是分词（tokenize），又称为词法分析，其作用是将一行行的源码拆解成一个个 token。所谓 token，指的是语法上不可能再分的、最小的单个字符或字符串。你可以参考下图来更好地理解什么 token
		- 第二阶段是解析（parse），又称为语法分析，其作用是将上一步生成的 token 数据，根据语法规则转为 AST。如果源码符合语法规则，这一步就会顺利完成。但如果源码存在语法错误，这一步就会终止，并抛出一个“语法错误”。（❗️有了 AST 后，那接下来 V8 就会生成该段代码的执行上下文）

- 生成字节码

	- 有了 AST 和执行上下文后，那接下来的第二步，解释器 Ignition 就登场了（解释器也负责了解释源代码到AST任务），它会根据 AST 生成字节码，并解释执行字节码。
	- 字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行。

- 执行代码

	- 生成字节码之后，接下来就要进入执行阶段了。
	- 通常，如果有一段第一次执行的字节码，解释器 Ignition 会逐条解释执行。到了这里，相信你已经发现了，解释器 Ignition 除了负责生成字节码之外，它还有另外一个作用，就是解释执行字节码。在 Ignition 执行字节码的过程中，如果发现有热点代码（HotSpot），比如一段代码被重复执行多次，这种就称为热点代码，那么后台的编译器 TurboFan 就会把该段热点的字节码编译为高效的机器码，然后当再次执行这段被优化的代码时，只需要执行编译后的机器码就可以了，这样就大大提升了代码的执行效率。

## 内存机制

### 三种类型内存空间

- 代码空间
- 栈空间

	- 原始类型的数据值都是直接保存在“栈”中的

- 堆空间

	- 引用类型的值是存放在“堆”中的

## 事件循环

### 起因：在 JS 中，大部分的任务都是在主线程上执行，常见的任务有渲染事件，用户交互事件，js脚本执行，网络请求、文件读写完成事件等等，为了让这些事件有条不紊地进行，JS引擎需要对之执行的顺序做一定的安排，V8 其实采用的是一种队列的方式来存储这些任务， 即先进来的先执行。

### 注意❗️事件循环不单单是为了解决JS是单线程（渲染主线程）解决异步的原因，而是更大更全的去理解他是浏览器渲染主线程的调度系统，通过这个调度系统去有条不紊的安排任务执行（JavaScript没有自己循环系统，它依赖的就是浏览器的循环系统，也就是渲染进程提供的循环系统！） 

### 宏任务

- 渲染事件（如解析 DOM、计算布局、绘制）
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）
- JavaScript 脚本执行事件；
- 网络请求完成、文件读写完成事件。

### 微任务

- 起因

	- 宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合了，比如后面要介绍的监听 DOM 变化的需求

		- 如何处理高优先级的任务。

	- 监听 DOM 变化技术方案的演化史

		- 从轮询到 Mutation Event 再到最新使用的 MutationObserver。MutationObserver 方案的核心就是采用了微任务机制，有效地权衡了实时性和执行效率的问题

- 我们知道当 JavaScript 执行一段脚本的时候，V8 会为其创建一个全局执行上下文，在创建全局执行上下文的同时，V8 引擎也会在内部创建一个微任务队列。顾名思义，这个微任务队列就是用来存放微任务的，因为在当前宏任务执行的过程中，有时候会产生多个微任务，这时候就需要使用这个微任务队列来保存这些微任务了。不过这个微任务队列是给 V8 引擎内部使用的，所以你是无法通过 JavaScript 直接访问的
- ❗️也就是说每个宏任务都关联了一个微任务队列
- 微任务的工作流程

	- 微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列
	- 微任务的执行时长会影响到当前宏任务的时长。比如一个宏任务在执行过程中，产生了 100 个微任务，执行每个微任务的时间是 10 毫秒，那么执行这 100 个微任务的时间就是 1000 毫秒，也可以说这 100 个微任务让宏任务的执行时间延长了 1000 毫秒。所以你在写代码的时候一定要注意控制微任务的执行时长。
	- 在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。

- MutationObserver
- Promise.then(或.reject) 以及以 Promise 为基础开发的其他技术(比如fetch API)

### 消息队列

- 基于不同的场景来动态调整消息队列的优先级

	- 可以创建输入事件的消息队列，用来存放输入事件。
	- 可以创建合成任务的消息队列，用来存放合成事件。
	- 可以创建默认消息队列，用来保存如资源加载的事件和定时器回调等事件。
	- 还可以创建一个空闲消息队列，用来存放 V8 的垃圾自动垃圾回收这一类实时性不高的事件。

### 事件循环的流程

- 宏任务==>清空所有的微任务===>UI渲染

### rAF

- window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
- VSync

	- 当显示器将一帧画面绘制完成后，并在准备读取下一帧之前，显示器会发出一个垂直同步信号（vertical synchronization）给 GPU，简称 VSync

- 为什么需要用rAF代替setTimeout

	- 我们知道 CSS 动画是由渲染进程自动处理的，所以渲染进程会让 CSS 渲染每帧动画的过程与 VSync 的时钟保持一致, 这样就能保证 CSS 动画的高效率执行。
	- 用户体验动画流畅的帧率大概是60FPS，使用setTimout很难精确控制，可所以使用rAF交由系统控制，保持跟显示器的帧率大概一致
	- 但是 JavaScript 是由用户控制的，如果采用 setTimeout 来触发动画每帧的绘制，那么其绘制时机是很难和 VSync 时钟保持一致的，所以 JavaScript 中又引入了 window.requestAnimationFrame，用来和 VSync 的时钟周期同步
	- VSync 和系统的时钟不同步就会造成掉帧、卡顿、不连贯等问题

- requestAnimationFrame 在 EventLoop 中是一个什么位置？

	- rAF会在UI渲染之前

### 问题

- UI渲染也会产生宏任务，那么按照实际循环流程，是会无限递归的那种

	- 消息队列也是分为优先级的（虽然微任务是高优先级任务 但是依赖于宏任务 比如交互操作 点击事件产生的回调是个宏任务 ）也就是这个每次执行一次宏任务，触发UI渲染 这个宏任务应该属于交互消息队列的类型的， 应该是根据消息队列类别来判断的 （本身属于合成消息队列就不会再触发UI渲染了）

- 触发一次宏任务就一定会执行UI渲染吗

	- 进入更新渲染阶段，判断是否需要渲染，这里有一个 rendering opportunity 的概念，也就是说不一定每一轮 event loop 都会对应一次浏览 器渲染，要根据屏幕刷新率、页面性能、页面是否在后台运行来共同决定，通常来说这个渲染间隔是固定的。（所以多个 task 很可能在一次渲染之间执行）

- 静止不动的页面需要每隔16ms触发一次UI渲染吗

	- 我觉得完全没必要，因为没啥意义，都静止不动了，根据浏览器FPS观察几乎为0，所以说浏览器不一定非跟显示器保持百分百的帧率一致

- 16ms

	- 渲染帧是指浏览器一次完整绘制过程，帧之间的时间间隔是 DOM 视图更新的最小间隔。 由于主流的屏幕刷新率都在 60Hz，那么渲染一帧的时间就必须控制在 16ms 才能保证不掉帧。 也就是说每一次渲染都要在 16ms 内页面才够流畅不会有卡顿感
	- 为什么需要这个判断，为了动画顺畅性，所以不存在时间基点判定，你交互开始时候就算，保持一帧16ms左右就是流畅，也就是满足这个帧率间隔就不会卡顿 （我这个交互或者动画是帧率60左右就是流畅   静止的页面都不需要流畅这个概念 帧率为0就行  所以不要有绝对的那种时间线）

		- scroll
		- resize

	- 这段时间内浏览器需要完成如下事情

		- 脚本执行（JavaScript）：脚本造成了需要重绘的改动，比如增删 DOM、请求动画等
		- 样式计算（CSS Object Model）：级联地生成每个节点的生效样式。
		- 布局（Layout）：计算布局，执行渲染算法
		- 重绘（Paint）：各层分别进行绘制（比如 3D 动画）
		- 合成（Composite）：合成各层的渲染结果

## 函数式编程

### 高阶函数

- 高阶函数(higher-order function)指操作函数的函数，一般地，有以下两种情况
- 函数可以作为参数被传递
- 函数可以作为返回值输出
- 作用

	- 增强函数的功能，Redux中间件就是高阶函数的产物

### 纯函数

- 定义：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。
- 场景：比如 slice 和 splice，这两个函数的作用并无二致——但是注意，它们各自的方式却大不同，但不管怎么说作用还是一样的。我们说 slice 符合纯函数的定义是因为对相同的输入它保证能返回相同的输出。而 splice 却会嚼烂调用它的那个数组，然后再吐出来；这就会产生可观察到的副作用，即这个数组永久地改变了。

### 函数柯里化

- 概念：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
- 作用

	- 参数复用
	- 提前返回

		- 比如判断一次类型以后下次直接使用该类型对应的特性就行

	- 延迟计算/运行

- /** 利用递归加函数的length熟悉实现柯里化 */
const curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (arg) => judge(...args, arg)


### 偏函数

- 概念：在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
- 柯里化与局部应用

	- 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
	- 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。

- 实现

	- 使用bind:add.bind(null, 1),然而使用 bind 我们还是改变了 this 指向，我们要写一个不改变 this 指向的方法。
	- function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};

### 惰性函数

- 概念：惰性载入表示函数执行的分支只会在函数第一次调用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。

- const foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
}; // 重写覆盖foo函数
- 应用

	- DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断

### 函数组合

- 概念：函数组合就是组合两到多个函数来生成一个新函数的过程。 将函数组合在一起，就像将一连串管道扣合在一起，让数据流过一样。 简而言之，函数 f 和 g 的组合可以被定义为 f(g(x)) ，从内到外（从右到左）求值
- function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}  
- f1(f2(f3(..args))) 从右到左  compose(f1,f2,f3)(...args)   函数f3执行过后把值return给f2
- reduce方法

	- callback：执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：

		- accumulator：累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）
		- currentValue：数组中正在处理的元素。
		- index 可选
数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
		- array：调用reduce()的数组
		- initialValue：作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。没有提供initialValue的话累计计算就从数组下标1开始

### 函数记忆

- 函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。(简单点讲就是缓存函数)
- let memoize = function (func, content) {
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}

*XMind - Trial Version*