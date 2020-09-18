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
```

## 3. 防抖节流

- 防抖：在一段时间时间内多次触发一个事件，会重置事件，知道这段时间没有在触发这个事件

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
```

- bind：修改 this 指向，并且立即执行

```js
Function.prototype.mybind = function(context, args) {
	let _this = this
  return fucntion() {
    _this.call(context, ...args)
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
```

- 柯里化：是给函数分步传递参数，每次传递部分参数，并返回一个更具体的函数接收剩下的参数，这中间可嵌套多层这样的接收部分参数的函数，直至返回最后结果。

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

```

