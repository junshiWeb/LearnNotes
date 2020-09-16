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

