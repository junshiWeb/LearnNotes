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



#### defineProerty 实现双向绑定

 

```js
1. 修改 data 数据， vue 内部如何监听 data 数据的改变
Object.defineProperty -> 监听对象属性的改变

2. 当数据发送改变，Vue 是如何知道要通知那些人，界面发送刷新
发布订阅者模式
function render() {
  console('模拟视图渲染')
}
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push[sub]
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this
    this.obj = obj
    this.key = key
    this.cb = cb
    Dep.target = null
  }
  update() {
    this.value = this.obj[this.key]
    this.cb(this.value)
  }
}
function Observe(obj) {
	Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
})
  function defineReactive(obj, key, value) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return value
      },
      set(newValue) {
        render() // 渲染界面
        value = newValue
        dep.notify()
      }
    })
  }
}
class Vue {
  constroctor(option) {
    this._data = option
    Observer(this._data)
    new Watchar()
  }
}

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
===
var proxy = new Proxy({}, {
    get(obj, prop) {
        console.log('设置 get 操作')
        return obj[prop];
    },
    set(obj, prop, value) {
        console.log('设置 set 操作')
        obj[prop] = value;
    }
});

proxy.time = 35; // 设置 set 操作

console.log(proxy.time); // 获取 get 操作 // 35

```

