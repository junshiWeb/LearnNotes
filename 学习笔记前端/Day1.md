## 一.Vue介绍

#### 1.1 认识Vuejs

- 为什么学习Vuejs
- Vue的读音
- Vue的渐进式
- Vue的特点

#### 1.2 安装Vue

- CDN引入
- 下载引入
- npm安装

#### 1.3 Vue的初体验

- Hello Vuejs
  - mustache 体验vue响应式
- Vue列表展示
  - v-for
  - 后面给数组追加元素的时候，新的元素也可以在界面中渲染出来
- Vue计数器小案例
  - 事件监听：click->methods

#### 1.4 Vue中的MVVM



#### 1.5创建vue时，options可以放那些东西

```vue
let vm = new Vue({
	el:'元素',
	data: {	 },
	methods: {	},
	computed：{  }
})
```

- el：
- data:
- methods:
- 生命周期函数

## 二.插值语法

- mustache语法
- v-one   
  -  只执行一次无法修改
- v-html  
  - 包含html标签元素进行解析
- v-text
  - 获取文本，不灵活
- v-pre:{()}
  - textarea文本框相似
- v-cloak:斗篷
  - 隐藏，类型添加display：none

## 三.v-bind

#### 3.1 v-bind绑定基本属性

- v-bind:str
  - str可以是元素的任意属性
- :href
  - 语法糖写法 简写

#### 3.2 v-bind动态绑定class

- 对象语法：
- 数组语法：

## 四.计算属性

- 案例一：firstName + lastName
- 案例二：books -> price

