

### 1.Vue的简单介绍

- 命令式编程：原生JS
  - 一步一步的进行操作
- 声明式编程：vue
  - 响应式的

### 2.插值操作

- Mustache语法
  - {{}}	也称胡子语法
- v-once  
  - 只执行一次
- v-html  
  - 可将html格式的文本进行解析
- v-text  
  - 可直接获取文本，也可直接替换文本内容
- v-pre
  - 显示文本原型，类型text area
- v-cloak
  - 斗篷语法，和v-show有点相似，不过这个是元素会直接消失

### 3.动态绑定元素v-bind

- 基本使用

  ```vue
  动态绑定元素属性
  <h v-bind:src(元素属性)=""></h>
  语法糖
  v-bind:src == :src
  动态绑定class（数组用法）直接添加类
  <div :class="[active,line]"> </div>
  动态绑定class（对象用法）
  <h :class="{active:true}"></h>
  动态绑定style（数组用法） data定义style样式
  <h :style="[baseStyle]"></h>
  动态绑定style（对象用法） 字符串直接解析，不加则做变量
<h :style="{fontSize:'20px'}"></h>
  <h :style="{fontSize:size}"></h>
  v-bind 和 v-for 结合使用练习
  
  动态绑定方法
  <h :class="getStyle()"></h>
  <h :style="getStyle()"></h>
  ```
  

### 4.事件监听v-on

- 基本使用

  ```vue
  监听点击事件
  <h v-on:click="btnclick"></h>
  语法糖
  <h @click="btnclick"></h>
  参数传递
  1.不带括号
  <h @click="btnclick"></h>
  2.带括号不传参
  <h @click="btnclick()"></h>
  3.带括号传参
  <h @click="btnclick(123)"></h>
  4.带event事件对象,必须加$ 否则报错，顺序没要求
  event为原生事件
  <h @click="btnclick($enent,123)"></h>
  ```

- 修饰词

  - .stop	  阻止事件冒泡
    - 调用event.stipPropagation()
  - .prevent   阻止事件的默认行为
    - 调用event.preeventDefault()
  - .enter     监听键盘事件
    - keyup
    - keydown

### 5.计算属性和侦听器

- 计算属性基本使用
  - 需要动态监听属性的变化时使用

```vue
基本使用
<h>{{计算属性}}</h>
computed:{计算属性:(){
	return this.xxx
}}
复杂使用
computed:{计算属性:(){
	业务逻辑
	return result
}}
```

- computed中的getter和setter方法
  - 一般情况只使用get方法，set方法设置值，一般不使用
- computed和methods对比
  - computed有缓存，methods没缓存
  - 性能上要好于methods
- 侦听器
  - watch（异步场景）
  - 监听数据变化，监听一个变量或数组

### 6.条件判断v-if

- v-if=“条件”
- v-else（不需要参数）
- v-else-if （一般不用）
- v-show和v-if、v-cloak
  - v-show是改变display显示
  - v-if和v-cloak直接修改dom元素

### 7.循环遍历v-for

- 基本使用

  ```vue
  遍历数组
  <li v-for="item in Array">{{item}}</li>
  <li v-for="(item,index) in Array">{{item+index}}</li>
  遍历对象
  <li v-for=(item,index,value) in obj>{{item+index+value}}</li>
  绑定key可以增强性能
  <li :key="index" v-for=(item,index,value) in obj></li>
  ```

- 注意点

  - 循环中插入key，赋值为唯一值时提升效率
  - 使用的diff算法

- 数组的响应方式

  - push()  追加最后一个元素
  - pop()  删除最有一个元素
  - shift()  删除第一个元素
  - unshift()  追加第一个元素 
  - splice()  删除、替换、添加都可以
    - splice(index,2，"a") 索引，个数，元素
    - splice(1,2)从索引为1的元素开始删除两个元素
    - splice(1,1,"新元素")在索引为1后面，删除一个元素，添加一个元素（替换）
    - splice(1,0,“追加”)某个位置添加元素
  - sort()  排序可以传入函数
  - reverse()  倒序

### 8.双向绑定v-model

- 基本使用

  输入框修改，message也修改，message修改，input也修改

  ```vue
  基本使用
  <input type="text" v-model="message">{{message}}
  原理v-bind + v-on =v-model
  <input type="text" :value="message" @input="valueChange($event.target.value)">{{message}}
  radio类型
  <label for="male">
        <input type="radio" id="male" name="sex" value="男" v-model="sex">男
      </label>
      <label for="female">
          <input type="radio" id="female" name="sex" value="女" v-model="sex">女
      </label>
      <div>你选择的性别是：{{sex}}</div>
  
  checkbox类型
   <label for="agree">
        <input type="checkbox" id="agree" v-model="isAgree">同意协议
      </label>
  
      <div>你选择的结果是：{{isAgree}}</div>
  
  select类型
  <!-- select多选 -->
      <select name="fruits" v-model="fruits" multiple>
        <option value="苹果">苹果</option>
        <option value="香蕉">香蕉</option>
        <option value="西瓜">西瓜</option>
      </select>
  ```

- v-model修饰符

  - .lazy  
    - 输入框失去焦点，按下enter更新数据
  - .number 默认为string，修改为number类型
  - .trim  	去空格	

### 9.组件化开发

- 组件化的基本使用

  - 创建组件
    - const cpn = Vue.extend({})
  - 注册组件
    - Vue.component("my-cpn",cpn) 
  - 使用组件
    - <my-cpn> <my-cpn>

- 组件全局注册和局部注册

  - 全局注册：Vue.component
  - 局部注册：components:{cpn:cpn}

- 父组件和子组件

  ```vue
  父组件
  template:`<div>
      <h></h>
      <cpn>子组件</cpn>
  </div>`
  ```

- 组件语法糖

  - 全局：Vue.component('cpn1',{template:模板})
  - 局部：components:{cpn2:{template:模板}}

- 组件的分离写法

  - <template id="cpn"> <template>

  - <script type="text/x-template" id="cpn"> 

  - 通过注册方式使用

- 组件中的数据

  ```vue
  components:{
  	cpn:{
  		template:"<div>{{msg}}</div>",
  		data(){
  			return{
  				msg:"我是组件中的数据
  }}}}
  ```

  - 组件中的数据必须是函数，必须有返回值，或则**组件作用域**问题会影响其他组件中的数据

- 父组件=>子组件

  - 父组件传递数据到子组件

  ```
  调用子组件
  <cpn :cmessage="message"></cpn>
  父组件
  data：{
  	message:
  }
  子组件
  props:{
  	cmessage:{
  		type:string,//定义类型
  		default:zzz,//默认值
  		required:true//必传值
  	}
  }
  ```

  - 注意点：
    1. 类型为数组时，默认值必须为一个**函数**
    2. 驼峰命名冲突，**v-bind不支持驼峰命名**
  - 父组件访问子组件
    - $children
    - $**refs** 

  ```html
  <component ref="xxxx"> </component>
  <script> 
  this.$refs.xxxx
  </script>
  ```

  > 总结：父组件传数据到子组件使用props，父组件要访问子组件使用$refs

- 子组件=>父组件

  - $emit

  ```html
  <cpn @itemclick='cpnClick'></cpn>
  this.$emit('itemclick', item)
  父组件点击，子组件触发事件itemclick，将item传出
  使用：一般是父组件需要子组件某个数据，通过触发事件来触发
  ```

  - $parent 	获取父组件
  - $root  获取根节点

  使用：this.$parent   this.$root

  > 总结：子组件创数据到父组件使用$emit，子组件要访问父组件使用$parent or $root

- 组件插槽 slot

  - 插槽的基本使用

```vue
<template>
基本使用
定义：<slot></slot>
使用：<span>插槽</span>  可以定义任何标签
默认值
<slot>我是默认值</slot>
具名插槽
<slot name="left"></slot>
使用：
	<cpn slot="left"></cpn>
	<cpn v-slot="left"></cpn>
	<cpn #left></cpn>//新语法缩写
</template>	
```

- 插槽注意事项
  
  - 组件中动态绑定数据
  
    <slot :data="pLanguage">  </slot>

### 10. Vue生命周期

- created		生命周期创建后调用
- mounted     实例被挂载后调用 
- destroyed    实例被销毁后调用
- updated       数据导致虚拟DOM重新渲染调用
- activated      keep-alive 缓存的组件激活时调用
- deactivated      keep-alive 缓存的组件停用时调用

> 总结使用场景：
>
> created：

### 11.前端模块化

- CommonJs模块化
  - 导出对象module.exprots ={flag,sum}
  - 导入对象 var {flag,sum} = require(".....")
- ES6模块化
  - 直接导出
    - export let name = 'x'
    - import  {name} from  'x'
  - 统一导出
    - export{  flag ，sum}
    - import { flag， sum} from 'x'
  - 函数类导出
    - export function say(){   x  }  导出函数
    - export class Person{ run(){ 要是一个函数 } }  导出类
    - import {say，person}
  - 默认导出
    - export default{ flay,sum }
    - export name from './name'
  - 统一全部导入
    - import * as name from './name'



