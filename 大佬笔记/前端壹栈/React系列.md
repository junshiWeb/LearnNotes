# React系列

## refs

### 概述

- Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素

### 何时使用 refs

- 管理焦点，文本选择或媒体播放
- 触发强制动画
- 集成第三方 DOM 库

### React.createRef()

- React.createRef主要用在class组件中，用于创建refs
- Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们

### React.useRef

- React.useRef作为react hooks的一种，主要用在函数组件中

### React.forwardRef

- 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例
- 转发 refs 到 DOM 组件
- 主要用于穿过父元素直接获取子元素的 ref。在提到 forwardRef 的使用场景之前，我们先来回顾一下，HOC（higher-order component）在 ref 使用上的问题，HOC 的 ref 是无法通过 props 进行传递的，因此无法直接获取被包裹组件（WrappedComponent），需要进行中转

## 生命周期

### 废弃

- 为什么废弃

	- 主要是这些生命周期方法经常被误用和滥用

- componentWillMount

	- 在挂载之前被调用

- componentWillReceiveProps

	- 会在已挂载的组件接收新的 props 之前被调用

- componentWillUpdate

	- 当组件收到新的 props 或 state 时，会在渲染之前调用

### 挂载阶段

- constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
- getDerivedStateFromProps: 这是个静态方法,会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
- componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面

### 更新阶段:

- getDerivedStateFromProps: 此方法在更新和挂载阶段都可能会调用
- shouldComponentUpdate: 有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
- render: 更新阶段也会触发此生命周期
- getSnapshotBeforeUpdate: 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
- componentDidUpdate: 

	- 会在更新后会被立即调用。首次渲染不会执行此方法

### 卸载阶段:

- componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

## Redux

### 概述：Redux是一个可预测化的JavaScript状态管理容器

### 三大原则

- 单一数据源

	- 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

- State 是只读的

	- 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

- 使用纯函数来执行修改

	- 为了描述 action 如何改变 state tree ，你需要编写 reducers。action是描述修改操作，而真正去操作修改state是reducers

## 状态逻辑复用

### Mixin

- Mixin的缺陷

	- 组件与 Mixin 之间存在隐式依赖（Mixin 经常依赖组件的特定方法，但在定义组件时并不知道这种依赖关系）
	- 多个 Mixin 之间可能产生冲突（比如定义了相同的state字段）
	- Mixin 倾向于增加更多状态，这降低了应用的可预测性（The more state in your application, the harder it is to reason about it.），导致复杂度剧增
	- 隐式依赖导致依赖关系不透明，维护成本和理解成本迅速攀升

		- 难以快速理解组件行为，需要全盘了解所有依赖 Mixin 的扩展行为，及其之间的相互影响
		- 组价自身的方法和state字段不敢轻易删改，因为难以确定有没有 Mixin 依赖它
		- Mixin 也难以维护，因为 Mixin 逻辑最后会被打平合并到一起，很难搞清楚一个 Mixin 的输入输出

### Render Props

- Render Props缺陷

	- 使用繁琐: HOC使用只需要借助装饰器语法通常一行代码就可以进行复用,Render Props无法做到如此简单
	- 嵌套过深: Render Props虽然摆脱了组件多层嵌套的问题,但是转化为了函数回调的嵌套

### 高阶组件HOC

- HOC相比Mixin的优势

	- HOC通过外层组件通过 Props 影响内层组件的状态，而不是直接改变其 State不存在冲突和互相干扰,这就降低了耦合度
	- 不同于 Mixin 的打平+合并，HOC 具有天然的层级结构（组件树结构），这又降低了复杂度

- HOC的缺陷

	- 扩展性限制: HOC 无法从外部访问子组件的 State因此无法通过shouldComponentUpdate滤掉不必要的更新,React 在支持 ES6 Class 之后提供了React.PureComponent来解决这个问题
	- Ref 传递问题: Ref 被隔断,后来的React.forwardRef 来解决这个问题
	- Wrapper Hell: HOC可能出现多层包裹组件的情况,多层抽象同样增加了复杂度和理解成本
	- 命名冲突: 如果高阶组件多次嵌套,没有使用命名空间的话会产生冲突,然后覆盖老属性
	- 不可见性: HOC相当于在原有组件外层再包装一个组件,你压根不知道外层的包装是啥,对于你是黑盒

### react-hooks

- React Hooks优点

	- 简洁: React Hooks解决了HOC和Render Props的嵌套问题,更加简洁
	- 解耦: React Hooks可以更方便地把 UI 和状态分离,做到更彻底的解耦
	- 组合: Hooks 中可以引用另外的 Hooks形成新的Hooks,组合变化万千
	- 函数友好: React Hooks为函数组件而生,从而解决了类组件的几大问题:

		- this 指向容易错误
		- 分割在不同声明周期中的逻辑使得代码难以理解和维护
		- 代码复用成本高（高阶组件容易使代码量剧增）

- React Hooks缺陷

	- 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本
	- 破坏了PureComponent、React.memo浅比较的性能优化效果（为了取最新的props和state，每次render()都要重新创建事件处函数）
	- 在闭包场景可能会引用到旧的state、props值（闭包陷阱）

## 组件通信

### 基于Props

### Context跨层级通信

### 全局状态管理工具Redux

## API

### setState(updater, [callback])

- setState到底是异步还是同步?

	- 有时表现出异步,有时表现出同步
	- setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
	- setState 的“异步”并不是说内部由异步代码实现，❗️其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

## 受控组件和非受控组件

### 受控组件

- 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

### 非受控组件

- 使用非受控组件，这时表单数据将交由 DOM 节点来处理
- 有defaultValue值
- value通过ref获取

*XMind - Trial Version*