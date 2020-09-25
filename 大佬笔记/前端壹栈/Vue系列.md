# Vue系列

## Vue项目如何做性能优化

### 一、代码层面的优化

- v-if 和 v-show 区分使用场景

	- v-if 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	- v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。
	- v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

- computed 和 method 区分使用场景

	- computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；
	- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

	- 在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 。
	- v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性

- 长列表性能优化

	- Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。
	- 虚拟列表进行优化

- 事件的销毁
- 图片资源懒加载

	- 对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件

- 路由懒加载

## 软件架构模式

### MVC

- 概述：传统的 MVC 指的是,用户操作会请求服务端路由，路由会调用对应的控制器来处理,控制器会获取数据。将结果返回给前端,页面重新渲染
- 视图（View）：用户界面。
- 控制器（Controller）：业务逻辑
- 模型（Model）：数据保存（数据库访问）
- 简单理解就是：(用户)View 传送指令到 Controller==>Controller 完成业务逻辑后，要求 Model 改变状态==>Model 将新的数据发送到 View，用户得到反馈

### MVVM

- 概述：在 MVVM 模式中，View(视图) 和 Model(数据) 是不可以直接通讯的，在它们之间存在着 ViewModel 这个中间介充当着观察者的角色。当用户操作 View(视图)，ViewModel 感知到变化，然后通知 Model 发生相应改变；反之当 Model(数据) 发生改变，ViewModel 也能感知到变化，使 View 作出相应更新。这个一来一回的过程就是我们所熟知的双向绑定。
- Model模型层，泛指后端进行的各种业务逻辑处理和数据操控，主要围绕数据库系统展开（ajax数据）
- View视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewMode视图模型层：用来连接Model和View，是Model和View之间的通信桥梁（vue的核心）
- MVVM的主要核心就是双向绑定

	- 数据绑定

		- 数据绑定（英語：Data binding）是将“提供器”的数据源与“消费者”绑定并使其同步的一种通用技术。 这通常用两种不同语言的数据/信息源完成，如XML数据绑定。 在UI数据绑定中，相同语言但不同逻辑功能的数据与信息对象被绑定在一起（例如Java UI元素到Java对象）。

	- vue如何实现双向绑定

		- 注意这里的双向绑定功能指的是ViewModal<===>View，因为Modal层不是vue来实现，我们可以不管（但要注意MVVM模式双向绑定还有这种情况modal<===>ViewModal）
		- Vue是数据劫持和观察者模式结合的一种数据绑定方式
		- 数据劫持+事件实现数据双向绑定
		- v-model只是一个语法糖，并不是等同于双向数据绑定

## 变化侦测

### 对象的侦测

- 基于Object.defineProperty方法，递归调用这个方法去初始化data的属性

### 数组的侦测

- 使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化
- 索引不会去侦测，所以官方采用vue.$set去修改数组元素才会触发更新

## Vue响应式原理

### 什么是响应式

- 数据改变，视图自动更新

### 主要通过Object.defineProperty+观察者模式实现的
Object.defineProperty里面 get ，用于 依赖收集
Object.defineProperty里面 set ，用于 派发更新
每个 data 声明的属性，都拥有一个的专属依赖收集器 dep,我们理解为观察目标
收集依赖也就是收集watcher，通过watcher来通知依赖进行更新，这里的watcher就是观察者

## Vue组件化原理

### 我们写的组件实际就是一个options对象

### 当我们声明完一个组件时候,Vue内部通过extend全局方法继承Vue构造函数生成一个子类，同时会合并options
如果是全局组件注册调用Vue.components，会将组件（我们实际写的组件就是一个options再转化为一个组件类）
转化为一个组件类然后挂载Vue.options.components，同时Vue内部也把Vue构造函数挂载到options._base，方便以后我们局部注册组件拿到extend方法，然后转化为组件类
当我们去使用这个组件的时候，会创建一个组件实例，实例会调用mount方法 生成真实的dom，通过el拿到真实的dom然后挂载到页面
通过上面所说，为什么组件中data必须是一个函数，防止多个组件实例互相影响

### props原理

- 首先要明白，props是相对于组件来说的
- 生成组件虚拟dom时会增加一个属性叫propsData存放着用户传递的数据

在初始化过程中会进行属性的初始化操作。会用用户编写的props和propsData进行检测（进行校验 validateProp）。最终将属性存放到_props上。并使用proxy方法进行代理，将其代理到实例上。
- 跟React不同的是，React的props是挂载在props对象上的，而Vue还要在组件显示声明传递过来的Props,所以这就是为什么要进行校验了

### 组件通信

- 父子通信基于Props实现

	- 

## vue-router

### 前端路由

- 什么是前端路由?

	- 在 Web 前端单页应用 SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即在无需刷新页面的情况下 URL 变化引起 UI 更新

- 如何实现前端路由？

	- 概述：要实现前端路由，需要解决两个核心

		- 如何改变 URL 却不引起页面刷新？
		- 如何检测 URL 变化了？

	- 两种实现方式

		- hash

			- hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 hash 部分不会引起页面刷新
			- 通过 hashchange 事件监听 URL 的变化，t通过hash改变 URL 的方式只有这三种：

				- 通过浏览器前进后退改变 URL
				- 通过<a>标签改变 URL
				- 通过window.location改变URL

		- history

			- 概述：(HTML API)History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
			- 属性

				- History.length 

					- 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。

				- History.state 

					- 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态的方式。

			- 方法

				- History.back() 前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1)
				- History.forward() 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1).
				- History.go()

					- 通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面

				- History.pushState()

					- 按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象

				- History.replaceState()

					- 按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象

			- history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新
			- 如何监听URL变化

				- history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同：
				- 通过浏览器前进后退改变 URL 时会触发 popstate 事件
				- 通过pushState/replaceState或<a>标签改变 URL 不会触发 popstate 事件
				- 拦截 pushState/replaceState的调用和<a>标签的点击事件来检测 URL 变化
				- 通过js 调用history的back，go，forward方法课触发该事件

## Vuex

### 概述：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
Vuex 是单向数据流的一种实现。

### 单向数据流

- state：驱动应用的数据源
- view：以声明方式将 state 映射到视图
- actions，响应在 view 上的用户输入导致的状态变化
- 单向数据流的使用场景

	- 多个组件会共享状态时，共享状态和组件间（兄弟组件）通信变的不容易。我们把共享状态抽取出来，用单向数据流的方式会变得容易。

### 如何使用Vuex

- 一图胜千言

	- 

### Vuex 和单纯的全局对象有以下两点不同：

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新
- 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

### Vuex的实现原理

- 暴露Store和install

	- 首先提供一个Store类和install方法，通过install将store注入到vue组件上，install方法通过Vue.mixin混入breforeCreate生命周期函数，然后注入store实例

- 实现模块机制

	- Vuex有个模块类 Module
	- 内部有一个ModuleCollection模块收集类，该类有一个注册模块的方法，它干了两件事情，一是收集模块处理成一个模块树，二是格式化模块（就是处理modules字段转化成_children）,内部的处理是通过path数组变量记录模块的父子关系，进行递归格式成一个模块树
	- 实现命名空间

		- ModuleCollection收集模块类提供了getNamespace获取命名空间的方法，通过传入的path就能知道模块之间的父子关系，然后进行拼接返回就行

- 实现Vuex响应式

	- Vuex的原理是通过new Vue产生实例，达到响应式数据变化的目的
	- state

		- state作为data属性$$state传入，通过new Vue初始化后变成响应式数据

	- getters

		- getters本质上就是一个计算属性computed,Vuex内部会声明一个computed对象，然后将getters遍历成key value形式，然后添加到computed上，然后通过new Vue 处理，另外getters通过Object.defineProperty代理挂载到store实例上

- mutations、actions的实现

	- Store类内部维护了_actions和_mutatios，我们通过这两个属性即可获取到
	- 不同的是mutation传入的是该模块下state，而action传入的是store，所以它就可以拿到commit方法

- 插件机制的实现

	- Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数
	- 在new Store时，会执行插件传入store，Store里维护了_subscribers数组，用来存放插件的订阅，基于发布订阅，会在mutation触发执行时候发布事件，Store还提供了一个replace方法，用来替换state

- 严格模式的实现

	- 概述：使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
	- Vuex中修改state的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing标志变量为true，然后才能修改state，修改完毕还需要还原_committing变量。外部修改虽然能够直接修改state，但是并没有修改_committing标志位，所以只要watch一下state，state change时判断是否_committing值为true，即可判断修改的合法性。

- 辅助函数的实现

	- 根据传递过来的数组选项，循环遍历生成对应的key-value然后返回一个对象

### Vuex常问问题

- 使用Vuex只需执行 Vue.use(Vuex)，并在Vue的配置中传入一个store对象的示例，store是如何实现注入的？

	- Vue.use(Vuex) 方法执行的是install方法，它通过Vue.mixin中beforeCreate生命周期钩子注入了$store,因此在Vue Component任意地方都能够通过this.$store访问到该store。

- state内部支持模块配置和模块嵌套，如何实现的？

	- 内部有个installModule方法，该方法的参数是modules也就是模块树，path是记录了模块的父子关系，遍历这个模块树，根据path的父子关系，然后依次往state添加属性

- 在执行dispatch触发action(commit同理)的时候，只需传入(type, payload)，action执行函数中第一个参数store从哪里获取的？

	- store初始化时，所有配置的action和mutation以及getters均被封装过。在执行如dispatch('submitOrder', payload)的时候，actions中type为submitOrder的所有处理方法都是被封装后的，其第一个参数为当前的store对象，所以能够获取到 { dispatch, commit, state, rootState } 等数据。

- Vuex如何区分state是外部直接修改，还是通过mutation方法修改的？

	- Vuex中修改state的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing标志变量为true，然后才能修改state，修改完毕还需要还原_committing变量。外部修改虽然能够直接修改state，但是并没有修改_committing标志位，所以只要watch一下state，state change时判断是否_committing值为true，即可判断修改的合法性。

- 调试时的”时空穿梭”功能是如何实现的？

	- devtoolPlugin中提供了此功能。因为dev模式下所有的state change都会被记录下来，’时空穿梭’ 功能其实就是将当前的state替换为记录中某个时刻的state状态，利用 store.replaceState(targetState) 方法将执行this._vm.state = state 实现

- 什么时候用vuex，vuex的缺点有哪些

	- 多组件通信时可以采用Vuex，vuex缺点是无法持久化数据，可用插件解决

## 虚拟DOM及DIFF算法

### 什么是虚拟DOM

- 虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象
- Vue为什么需要虚拟DOM

	- 要进行diff检测差异，操作真实DOM浪费性能。 速度快，减小了页面渲染过程的次数

### DIFF算法

- vue中的diff算法由patch方法实现 传入旧节点和新节点进行同层级比对

	- 比对标签

		- 如果标签类型不一样： 直接替换
		- 判断是否是文本节点 是的直接更新文本节点
		- 如果标签类型一样：

			- 比对属性
			- 比对子元素

				- 旧节点没有子元素，新节点有子元素
				- 旧节点有子元素，新节点没有子元素
				- 旧节点和新节点都有子元素（核心 采用双端比较）

					- vue中调用updateChildren这个核心方法，它是这样操作的：
             声明四个指针，老节点的首尾指针，新节点的首尾指针，然后进行新旧节点双端比较
然后我们接着进入 diff 过程，每一轮都是同样的对比，其中某一项命中了，就递归的进入patchVnode 针对单个 vnode 进行的过程（如果这个 vnode 又有 children，那么还会来到这个 diff children 的过程
					- 旧首节点和新首节点用 sameNode 对比
					- 旧尾节点和新尾节点用 sameNode 对比
					- 旧首节点和新尾节点用 sameNode 对比
					- 旧尾节点和新首节点用 sameNode 对比
					- 暴力比对：如果以上逻辑都匹配不到，再把所有旧子节点的 key 做一个映射到旧节点下标的 key -> index 表，然后用新 vnode 的 key 去找出在旧节点中可以复用的位置

## Vue插件开发

### 通过Vue.use来注册插件（如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入）

### vue-lazyload

- 懒加载原理

	-  一开始不给src添加值 这样渲染的时候不加载图片
判断图片是否在可视区域 根据滚动事件判断 记得节流
是的话通过new Image()请求图片 核心
再设置setAttribute
	- 判断是否在可视区域

		-  let { top } = this.el.getBoundingClientRect();
 return top < window.innerHeight

	- 加载图片

		- const loadImageAsync = (src, resolve, reject) => {
    let image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject
}

- vue-lazyload插件原理

	- 声明一个ReactiveListener类，一个图片相当于ReactiveListener一个实例
	- 只要通过v-lazy指令就会创建一个实例，然后push到listenerQueue队列，实例具有checkInView判断该实例是否在可视区域，load请求加载图片
	- 监听最外层父级dom滚动事件，触发scroll事件时，其回调函数就会调用checkInView，如果为true则调用load进行加载图片

## 指令

### 概述：vue中的指令,vue中都是以v-开头 (一般用来操作dom)

### v-for

- v-for和v-if连用问题

	- v-for 会比 v-if 的优先级高一些,如果连用的话会把 v-if 给每个元素都添加一下,会造成性能问题 (使用计算属性优化)

- 从AST转化成JS语法的时候内部会调用一个_l的函数，参数为n表示循环几次

### v-if

- v-if 如果条件不成立不会渲染当前指令所在节点的 dom 元素
- 从AST转化成JS语法的时候v-if会被转化为三元表达式

### v-show

- v-show 只是通过样式切换当前 dom 的显示或者隐藏

### v-model

- v-model本质就是一个语法糖，可以看成是value + input方法的语法糖。 可以通过model属性的prop和event属性来进行自定义。原生的v-model，会根据标签的不同生成不同的事件和属性
- 应用在组件上

	- 就是一个语法糖 解析成value和事件 挂载到propsData，被当成组件的props属性(一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件)

- 应用在标签上

	- 真正的一个指令

### v-on

- v-on：绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。缩写：@
- 注意不要跟$on混淆

	- vm.$on:监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。

### v-bind

- v-bind:动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。缩写：：
- 主要是通过ast语法解析，实现的将对应属性转化成变量

### 自定义指令

- 概述：我们可以自定义vue中的指令来实现功能的封装 (全局指令、局部指令)
- 指令定义对象可以提供如下几个钩子函数:


	- bind：只调用一次，指令第一次绑定到元素时调用
	- inserted：被绑定元素插入父节点时调用
	- update：所在组件的 VNode 更新时调用,组件更新前状态
	- componentUpdated：所在组件的 VNode 更新时调用,组件更新后的状态
	- unbind：只调用一次，指令与元素解绑时调用

## 实例属性和方法

### $nextTick

- nextTick批量异步更新策略，一句话概括在下次DOM更新循环结束之后执行延迟回调。它主要是为了解决：例如一个data中的数据它的改变会导致视图的更新，而在某一个很短的时间被改变了很多次，假如是1000次，每一次的改变如果都都将促发数据中的setter并按流程跑下来直到修改真实DOM，那DOM就会被更新1000次，这样的做法肯定是非常低效的。
- 而在目前浏览器平台并没有实现nextTick方法，所以Vue.js 源码中分别用 Promise、Observer、setTimeout、setImmediate 等方式定义了一个异步方法nextTick，它接收的是一个回调函数，多次调用nextTick会将传入的回调函数存入队列中，当当前栈的任务都执行完毕之后才来执行这个队列中刚刚存储的那些回调函数，并且通过这个异步方法清空当前队列。
- MutationObserver

	- 监听dom变化，是个微任务

		- let observe = new MutationObserver(flushCallbacks)
observe.observe  采用文本节点 文本节点内容一变化 触发flushCallbacks回调

### computed计算属性

- 计算属性即是依赖也是观察目标，同时具有缓存特点，所以实现这三个特点也就实现了计算属性
计算属性作为依赖，初始的时候会创建计算属性watcher，观察者存在 values 属性和 get 方法。computed 属性的 getter 函数会在 get 方法中调用，并将返回值赋值给 value，一旦计算属性所依赖的数据更新，就会通知计算属性watcher,就会执行get方法，我们就可以拿到value
- 在初始化计算属性watcher的时候，我们会传入lazy属性，表明它是一个计算属性watcher,而其内部也会初始化一个dirty属性，计算属性所依赖的数据更新，这时候dirty会置为true,会重新执行getter方法重新拿到值，如果数据依赖没有发生变化，此时dirty就会false，会拿到缓存的值，这样就实现了计算属性
- 当computed做为观察目标时，因为我们会在模板中使用到它，所以要为它收集依赖，但是实际computed实际是依赖于data属性变化而变化，为computed收集依赖实际就是帮computed所依赖的data属性收集依赖，所以watcher内部会维护一个dep,存储了watcher被哪些dep所存储，vue内部还还维护了一个watcher栈，此时通过这个栈我们就可以为观察目标dep推入一个渲染watcher
达到了为计算属性收集依赖的目的

### $watch

- watch用于监控用户的data变化，数据变化后会触发对应的watch的回调方法
watch属性实现是合并配置，将对象形式、数组形式、字符串形式统统转化为key-value形式
内部调用$watch方法，这个方法会创建一个用户watcher，传入user为true的配置
watcher存在  get 方法。而watch属性传入的getter方法是key值，会内部将这个key转化为函数，目的是触发依赖收集
当这个data变化时候，再触发callback
- Vue 中 computed 和 watch 的区别？

	- computed 和 watch 都是基于 Watcher来实现的，computed是具有缓存特性 （默认不执行）只有当取值时执行，内部依靠dirty变量实现缓存效果。 watch则是默认会执行一次，属性值变化后触发回调函数

### $set

- 如果修改的是数组对象，则通过splice来进行修改
- 如果是对象通过defineReactive内置方法将该新增的属性变为响应式数据，每个引用类型属性都绑定了一个__ob__这个ob指向vm,通过vm.dep.notify触发依赖更新

### $forceUpdate

- 每个组件就是一个vue实例，实例下都有一个对应的渲染watcher属性_watcher，触发vm._watcher.update就会更新页面

### $on、$emit...

- 自定义事件基于发布订阅实现，然后是存在实例的_events对象上的（vm就是一个调度中心）

## 全局组件

### keep-alive

- 用途：主要用于保留组件状态(比如离开一个页面再回来，组件会被重新创建)或避免重新渲染

	- 动态组件
	- 路由组件

- 原理

	- keep-alive是Vue.js的一个内置组件（实际所有组件都是options配置对象）。它能够不活动的组件实例保存在内存中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中。
	- 它提供了include与exclude两个属性，允许组件有条件地进行缓存 include表示白名单 exclude表示黑名单
	- 保存组件缓存实际就是保存其对应的虚拟dom节点就行
	- 其实就是在created时将需要缓存的VNode节点保存在this.cache中 key值保存再this.keys,在render时,如果VNode的name符合在缓存条件（可以用include以及exclude控制），则会从this.cache中取出之前缓存的VNode实例进行渲染,判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 key 在 keys 中的位置（移除 keys 中 key ，并放入 keys 数组的最后一位）
	- 存在max原因，所以该组件内部采用LRU淘汰缓存算法来控制最大缓存数量

		- LRU （ Least Recently Used ：最近最少使用 ）缓存淘汰策略，故名思义，就是根据数据的历史访问记录来进行淘汰数据，其核心思想是 如果数据最近被访问过，那么将来被访问的几率也更高 ，优先淘汰最近没有被访问到的数据。

			- 

		- 在 keep-alive 缓存超过 max 时，使用的缓存淘汰算法就是 LRU 算法，它在实现的过程中用到了 cache 对象用于保存缓存的组件实例及 key 值，keys 数组用于保存缓存组件的 key ，当 keep-alive 中渲染一个需要缓存的实例时：

			- 判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 key 在 keys 中的位置（移除 keys 中 key ，并放入 keys 数组的最后一位）
			- 如果没有缓存，则缓存该实例，若 keys 的长度大于 max （缓存长度超过上限），则移除 keys[0] 缓存
			- 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个

		- vue中是通过数组实现的,LRU本质上是通过散列表和双向链表实现效率比较高。在js中通过array实现，V8会优化增删元素的效率

			- 我明白了  因为这里vue是用了数组所以如果直接index==>0 表示头 那么每次都unshift头部
会牵一发而动全身
所以这里是这样理解的 数组尾部表示优先级最高的 头部是优先级最低的 溢出就会被淘汰

## 全局API

### mixin

- 主要调用mergeOptions方法合并options配置

### extend

- 基于原型式继承也就是Object.create继承Vue构造函数，并且调用mergeOptions合并配置，返回一个新的Vue子类

### set

- 同vm.$set

### nextTick

- 同vm.$nextTick

### use

- 用途

	- 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入
	- 当 install 方法被同一个插件多次调用，插件将只会被安装一次

- 原理

	- 实例有个插件数组变量installedPlugins专门存放插件，执行插件提供的install方法，如果插件是一个函数，它会被作为 install 方法，执行完后该插件为被标记为installed为true,主要避免多次调用安装插件

## 生命周期

### beforeCreate 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

### created 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el

### beforeMount 在挂载开始之前被调用：相关的 render 函数首次被调用。

### mounted el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

### beforeUpdate 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。

### updated发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新

### beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。

### destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

## 模板编译

### 概述：Vue的编译过程就是将template转化为render函数的过程，会经历三个阶段

### 生成AST树

### 优化

### codegen(将优化后的AST树转换为可执行的代码)

## 设计模式

### 观察者模式

### 发布订阅模式

## 区别

### 发布订阅：Event的就是调度中心 只有一个类 提供发布和订阅功能 解耦

### 观察者模式是有两个类 观察目标observer 观察者subject 耦合 一旦观察目标变化 需要观察者做出反应

### 所以单纯从结构来看可以看出这两个设计模式的区别

### 发布订阅模式

- 可以认为是观察者模式的升级版
- 优点

	- • 灵活由于订阅发布模式的发布者和订阅者是解耦的，只要引入订阅发布模式的事件中心，无论在何处都可以发布订阅。同时订阅发布者相互之间不影响。（发布订阅 订阅者不把自身this放入调度中心 而是注册回调就行，同时这也是为啥父子通信是单向的原因）

- 缺点

	- 容易导致代码不好维护灵活是有点，同时也是缺点，使用不当就会造成数据流混乱，导致代码不好维护

### 观察者模式

- 优点

	- • 响应式目标变化就会通知观察者，这是观察者最大的有点，也是因为这个优点，观察者模式在前端才会这么出名。

- 缺点

	- • 不灵活相比订阅发布模式，由于目标和观察者是耦合在一起的，所以观察者模式需要同时引入目标和观察者才能达到响应式的效果。而订阅发布模式只需要引入事件中心，订阅者和发布者可以不再一处。

*XMind - Trial Version*