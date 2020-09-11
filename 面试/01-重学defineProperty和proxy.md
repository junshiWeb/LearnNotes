#### defineProperty 

数据劫持

```js
var obj = {}

// 数据劫持，有三个参数，第一个为对象，第二个为传入的值，第三个为回调函数
Object.defindeProperty(obj, 'prop', {
  // 可修改的，默认false
  configurable: true,
  // 可枚举，可用，默认为false
  enumerable: true,
  // prop的值
  value: 'val',
  // 值是否可修改，默认false
  writable: true,
  // 获取值，如果没有setter，则为undefined
  get(value) {
    return value
  },
  // 设置值，如果没有该setter，则为undefined
  set(newValue) {
    value = newValue
  }
})
```



#### Proxy

数据拦截

```js
const obj = {};

```

