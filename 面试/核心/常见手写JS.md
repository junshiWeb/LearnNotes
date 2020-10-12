## 1.手动实现一个浅克隆

浅克隆：只拷贝对象或数组的第一层内容

```js
const shallClone = (target) => {
  // 判断传入的数值是否是对象还是不是空
  if (typeof target === 'object' && target !== 'null') {
    // 判断传入数值是数组还是对象
    const cloneTarget = Array.isArray(target) ? []:{};
    // 遍历这个数值
    for (let prop in target) {
      // 判断自身属性是否存在 ？
      if(target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
      return cloneTarget;
    }else {
      return target;
    }
  }
}
const shallClone = (target) => {
  if (typeof target !== 'null' && typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      cloneTarget[key] = target[key]
    }
    return cloneTarget
  }
  return target
}

```

## 2. 手动实现一个深克隆

深克隆：层层拷贝对象或数组的每一层内容

```js
function deepClone(target) {
  if (target === null) return null;
  if (typeof target !== 'object') return target;
  const cloneTarget = Arrgy.isArrgy(target) ? []：{};
  
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop]);
    }
  }
  return cloneTarget;
}

const deepClone = (target) => {
  if (target === null) return null
  if (typeof target !== 'object') return target
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let key in cloneTarget) {
    cloneTarget[prop] = deepClone(target[prop])
  }
  return cloneTarget
}
```

## 3. 防抖节流

- 防抖：在一段时间时间内多次触发一个事件，会重置事件，直到这段时间没有在触发这个事件

```js
function debounce(fn, delay) {
  var timer = null;
  return function() {
    clearsetTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, arguments)
      timer = null
    }, delay)
  }
}

function buounce(fn, delay) {
  var timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, arguments)
      timer = null
    }, delay)
  }
}
```

- 节流：一个事件在短时间内触发多次，只会在指定时间内触发一次

```js
function throttle(fn, delay) {
	var timer = null
  return function() {
    if(!timer) {
    	timer = setTimeout(() => {
        fn.call(this, arguments)
        timer = null
      }, delay)  
    }
  }
}
function throttle(fn, delay = 1000) {
  var timer = null
  return function() {
    if(!timer) {
      timer = setTimerout(() => {
        fn.call(this, arguments)
        timer = null
      }, delay)
    }
  }
}
```

## 4. call，apply，bind，new，this

- call：修改 this 指向，可以传多个参数

```js
Function.prototype.mycall = function(context, ...args) {
  context = context == null? window:context
  let result
  context['fn'] = this
  result = context['fn'](...args)
  	delete context['fn']
  return result
}

Function.prototype.mycall = function(context, ...args) {
  fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}
```

- apply：修改 this 指向，可以传入数组

```js
Fucntion.prototype.myapply = function(context, args) {
  context = context == null? window:context
  if (Array.isArray(args)) {
    let result 
    context['fn'] = this
    result = context['fn'](...args)
    	delete context['fn']
    return result
  } else {
    return console.log('输入数组')
  }
}
Function.prototype.myApply = function(context, args) {
  let res
  context['fn'] = this
  res = context['fn'](...args)
  delete context['fn']
  return res
}
```

- bind：修改 this 指向，并且立即执行

```js
Function.prototype.mybind = function(context, args) {
	let _this = this
  return fucntion() {
    _this.call(context, ...args)
  }
}

Function.prototype.myBind = function(context, ...args) {
  let that = this
  return function() {
    that.apply(context, ...args)
  }
}
```

## 5. 数组扁平化，柯里化

- flat：扁平化，对内嵌的数组拆分合并成只有一个数组

```js
function myFlat(num) {
  _this = this
  let newArr = []
  let cycleArray = (arr) => {
    for (let i=0; i< arr.length; i++) {
			let item = arr[i]
      if (Array.isArray(item)) {
        cycleArray(item)
      } else {
        newArr.push(item)
      }
    }
  }
  // 执行函数
  cycleArray(_this)
  return newArr
}
// reduce 实现 flat 方法
const myFlat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur);
  }, []);
};
// flat 方法
const res1 = arr.flat(Infinity)

// JSON方法
const res2 = JSON.stringify(arr).replace(/\[}\]/, '').split(',')
const res3 = JSON.parse('[' + JSON.stringif(arr).replace(/\[|\]/, '') + ']')

```

- 柯里化：把接收多个参数的函数变成接收一个单一参数的函数，并且返回接受余下参数而且返回结果的新函数

```js
// add的参数不固定，看有几个数字累计相加
function add (a,b,c,d) {
  return a+b+c+d
}

function currying (fn, ...args) {
  // fn.length 回调函数的参数的总和
  // args.length currying函数 后面的参数总和 
  // 如：add (a,b,c,d)  currying(add,1,2,3,4)
  if (fn.length === args.length) {  
    return fn(...args)
  } else {
    // 继续分步传递参数 newArgs 新一次传递的参数
    return function anonymous(...newArgs) {
      // 将先传递的参数和后传递的参数 结合在一起
      let allArgs = [...args, ...newArgs]
      return currying(fn, ...allArgs)
    }
  }
}

let fn1 = currying(add, 1, 2) // 3
let fn2 = fn1(3)  // 6
let fn3 = fn2(4)  // 10

// ES6 的实现
function currying(func, args = []) {
    let arity = func.length;

    return function (..._args) {
        _args.unshift(...args);

        if(_args.length < arity) {
            return currying.call(null, func, _args);
        }

        return func(..._args);
    }
}
// 被转换函数，用于检测传入的字符串是否符合正则表达式
function checkFun(reg, str) {
    return reg.test(str);
}

// 转换柯里化
let check = currying(checkFun);

// 产生新的功能函数
let checkPhone = check(/^1[34578]\d{9}$/);
let checkEmail = check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);


```

## 发布订阅者

```js
function Observe() {
  var list = {}, addList, sub, once, remove;
  // 订阅者
  addList = function(key, fn) {
    if (!list[key]) {
      list[key] = []
    }
    list[key].push(fn)
  }
  // 发布者
  sub = function() {
    var key = [].shift.call(arguments) // 取出消息类型
    var fns = list[key] // 取出该类型的消息集合
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach( item => {
      item.apply(this, arguments)
    })
    
  }
 	// 只执行一次
  once = function() {
    
  }
  // 删除
  remove = function(key, fn) {
    var fns = list[key] // 取出该消息的集合
    if (!fns) { // 如果没有对应的消息则直接返回
      return false
    }
    if (!fn) { // 如果没有对象的回调，则取消所有消息
      fns && (fns.length = 0)
    } else { // 遍历数组，删除对应的回调
			fns.forEach((item, index) => {
        if(item === fn) {
          fns.splice(index, 1)
        }
      })
    }
  }
}
```

## **双向绑定**