#### defineProperty 

语法

> Object.defineProperty(obj, prop, descriptor)

参数

> obj：要定义属性的对象
>
> prop：要定义或修改的属性名称
>
> descriptor：将定义或修改的属性的描述符（必须的）

数据劫持

```js
var obj = {}

// 数据劫持，有三个参数，第一个为对象，第二个为传入的值，第三个为回调函数
Object.defindeProperty(obj, 'prop', {
  // 只有该属性为 true 时可以修改，默认false
  configurable: true,
  // 可枚举，可用，默认为false
  enumerable: true,
  // prop的值
  value: 'val',
  // 为 true 赋值运算符改变，默认 false
  writable: true,
  // 获取值，如果没有 getter，则为 undefined
  get(value) {
    return value
  },
  // 设置值，如果没有该 setter，则为undefined
  set(newValue) {
    value = newValue
  }
})
```



#### Proxy

数据拦截

```js
var proxy = new Proxy({}, {
    get: function(obj, prop) {
        console.log('设置 get 操作')
        return obj[prop];
    },
    set: function(obj, prop, value) {
        console.log('设置 set 操作')
        obj[prop] = value;
    }
});

proxy.time = 35; // 设置 set 操作

console.log(proxy.time); // 设置 get 操作 // 35

```

