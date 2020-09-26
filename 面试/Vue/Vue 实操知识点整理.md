## 6 种组件中的通信

- props / @on + $emit
  - props：通过父组件像子组件传递数据，v-bind：父组件传递数据，props：接收数据
  - $emit：子组件像父组件传递数据，@on：父组件接收收据
- $attrs 和 $listeners
  - $attrs：可以进行子孙的传递，除了不作为 prop，class，style 的属性之外的属性，度可以作为$attrs接收
    - 注意：需要进行重重传递，子组件也需要传递v-bin = "$attrs"才能使用
  - $listeners：也是类似方法进行子孙像父传递信息
    - 注意：孙向子传递：this.$listeners.xx()，子向父：v-on="$listeners"

- provide / inject 组合

  组合以允许一个祖先组件向其所有子孙后代注入一个依赖，可以注入属性和方法，从而实现跨级父子组件通信

  - 父组件通过 provide 函数传递数据给子孙组件
  - 子孙组件通过 inject 属性接收数据 

  > 子孙组件改变了值不会造成

```js
// 父组件 index.vue
data() {
    return {
        title: 'bubuzou.com',
    }
}
provide() {
    return {
        detail: {
            title: this.title,
            change: (val) => {
                console.log( val )
            }
        }
    }
}

// 孙子组件 detail.vue
inject: ['detail'],
mounted() {
    console.log(this.detail.title)  // bubuzou.com
    this.detail.title = 'hello world'  // 虽然值被改变了，但是父组件中 title 并不会重新渲染
    this.detail.change('改变后的值')  // 执行这句后将打印：改变后的值 
}

```

- EventBus
  - 可以进行任意两个组件中的通信，兄弟组件，父子组件等

使用：

需要在 main.js 中初始化一个全局事件

```js
Vue.prototype.$eventBus = new Vue()
```

组件中：

```js
// 需要发布的地方
this.$eventBus.$emit('update', '更新信息')
// 需要订阅的地方
this.$eventBus.$on('update', val => {})
// 移除事件监听
this.$eventBus.$off('updata', {})
```

- Vuex 进行全局的数据管理
  - 专门服务于 vue.js 应用的状态管理工具，适用中大型项目
  - State：用于数据存储，唯一的数据源
  - Getter：类似于计算属性，就是对数据的二次处理和获取等
  - Mutation：类似事件，改变 State 的唯一途径
  - Action：类似 Mutation，但是进行操作的是异步操作，不建议直接操作 State，会造成属性管理的不便
  - Module：当业务量大时，可以将 state 拆分成多个模块，便于管理维护

- refs / children / parent / root
  - refs：给子组件定义 ref 属性，可以使用 $refs 来操作子组件的属性和方法

## 常用的修饰符

- 表单修饰符
- 事件修饰符
- 鼠标修饰符
- 按键修饰符
- .exact 和  .sync



## 复用模块的方式

- 组件封装
- 使用混入 mixins
- 自定义插件
- 过滤器 



## 代码优化

- 自动化导入模块
- 模块化注册插件
- 优雅导出请求接口

