## React 介绍

#### 1. React 基本介绍



#### 2.React 特点

1. 声明式设计
2. 高效：通过虚拟 DOM，减少 DOM 之间的操作
3. 灵活：可以和已知库和框架很好的配合
4. JSX：javascript 语法扩展
5. 组件
6. 单项响应的数据流

#### 3. 核心

虚拟DOM 和 diff 算法

- 虚拟 DOM
- diff 算法



## JSX 介绍

JSX：JavaScript XML，一种类似于XML的JS扩展语法。

**JSX语法的本质**：以 React.createElement 的形式来实现的，并没有直接把 用户写的 HTML代码，渲染到页面上。

**babel 转换工具**

babel包的作用是：将 JSX语法 转换为 JS语法



**JSX 的基本语法**

1. JSX 内部写 JS 代码：如果要在 JSX 语法内部，书写 JS 代码，那么，所有的JS代码必须写到 `{}` 的内部
2. 编译引擎遇到 `<` 会当成 HTML 代码编译，遇到`{}`会当成 JS 代码编译
3. 在 JSX 内部需要添加 class 属性，需要携程 classname，class 是 es6 中的类，label 标签的 for 需要替换为 htmlFor
4. JSX 创建 DOM，所有的节点，必须有唯一的根元素包裹
5. 注释必须写到 `{/* xxx */}` 内部

```js
var vDom = {
  <div>
  	hello, React!
  	<button onClick="{}"> 点击 </button>
  	<h1>{i == 1 ? 'True!' : 'False'}</h1>
  	<p className="lei"> 明明说好不哭 </p>
  	{/*注释*/}
  </div>
}
```



## React 使用

#### 1. 创建组件的方式

- 方式一：

  通过构造函数的方式创建组件

> - props 的数据在组件中是只读的不能修改
> - 传入组件的数据有多个值的时候只能  `{...props}`

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React</title>
    <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
    <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/babel">
	const person = {
        name: "mz",
        age: 25,
        gender: "男",
        address: "上海"
      };
      function Hello(props) {
	  	return (
			<div>
				<h2> 这是第一种方式组件 </h2>
				<p> 这是子组件定义的元素:{props.name} </p>
			</div>
		);
	  }
	  ReactDOM.render(
	  	<div>
			<Hello {...person} > </Hello>
		</div>,
		document.getElementById('app')
	)
    </script>
  </body>
</html>
```

- 方式二：

  通过 class 的方式继承：封装、继承、多态

> - 组件自定义组件私有属性前，需要调用 super()
> - 组件使用属性的时候需要添加 this
> - 组件中有许多的默认参数： state 和 Vue.data 相似

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React</title>
    <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
    <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/babel">
	const person = {
        name: "mz",
        age: 25,
        gender: "男",
        address: "上海"
      };
	class Hello2 extends React.Component {
		constructor(props) {
			super(props)
			this.state ={
				msg: "这是私有属性"
			}
		}
		render() {
			return (
				<div>
					<h2> 这是第二种方式组件 </h2>
					<p> {this.state.msg}</p>
          <p> {this.props.name}</p>
				</div>
			)
		}
	}
	ReactDOM.render(
	  	<div>
			<Hello2 {...person} > </Hello2>
		</div>,
		document.getElementById('app')
	)
    </script>
  </body>
</html>
```

> 对比：
>
> 方式一：内部没有 state 等属性，需要调用外部传过来的属性 props
>
> 方式二：除了外部传过来的属性 props ，还可以自定义私有属性和方法（state）
>
> - function 定义的属性也叫无状态组件，使用 class 的叫做有状态组件
>
> **本质区别**：就是 class 有内置属性和生命周期，但是 function 由于没有这些属性，所以运行速度会快一点



## 组件的生命周期

三个阶段，创建阶段，运行阶段，销毁阶段

#### 1. 组件创建阶段：Mounting

- getDefaultProps：初始化 props 默认值
- getInitialState：初始化组件私有数据 state 
- componentWillMount()：组将将要挂载，所以虚拟 DOM 没有生成
- render()：第一次渲染虚拟 DOM，虚拟 DOM 在内存中生成完毕，但是没有 return 所以还不能操作 DOM
- componentsDidMount()：虚拟 DOM 挂载到页面，组件显示到页面，可以放心的操作组件中的 DOM

#### 2. 组件运行阶段：Updataing

> 根据组件中 state 和 props 的改变，控制这阶段的触发次数

- componentWillReceiveProps()：props 中的属性变化
- shouldComponentUpdate()：判断组件是否需要被更新
- componentWillUpdate()：组件将要被更新，虚拟 DOM 和页面 DOM 都是旧的
- render()：state 或 props 发生改变，重新渲染一颗DOM 树，虚拟 DOM 已更新，页面未更新
- componentDidUpdata()：组件更新，页面也渲染

#### 3. 组件销毁阶段：Unmounting

> 一辈子只执行一次

- componentWillUnmount：组件将被卸载



## React 中绑定 this 并传参

> 该函数点击的时候会报错，提示方法没有定义

```js
<script type="text/babel">
	class Hello2 extends React.Component {
		constructor(props) {
			super(props)
			this.state ={
				msg: "这是私有属性"
			}
		}
		render() {
			return (
				<div>
					<h2> 绑定this的并传参 </h2>
					<input type="button" value="点击" onClick={this.changeMsg} />
					<p> {this.state.msg}</p>
          <p> {this.props.name}</p>
				</div>
			)
		}
    changeMsg() {
		this.setState({
			msg: '设置 msg 的值'
		})
	}
	}
	ReactDOM.render(
	  	<div>
			<Hello2 {...person} > </Hello2>
		</div>,
		document.getElementById('app')
	)
```

- 方法一： 使用 bind(this)

> 通过 bind 修改该方法的指向，并且进行传参
>
> - 不能通过 ...args 的方式传参，传入的 ...args 是一个 proxy值，不过可以通过 arguments[] 来获取不确定参数的值

```js
onClick={this.changeMsg.bind(this, ...args)}

changeMsg(...args) {
  this.setState({
    msg: "设置 msg 值" + arguments[0] + argument[1] 
  })
}

```

- 方法二：构造函数方式

> 在构造函数中设置 bind 的值，意思就是通过两次调用的方式，本质上的方式和第一种方式一样，只是当代码复杂的时候将他添加到构造函数中，让 render 函数简洁些

```js
constructor(props) {
  ...
  this.changeMsg = this.changeMsg.bind(this, ..args)
  ...
}
onClick = {this.changeMsg}

```

- 方法三：箭头函数（荐）

> 通过箭头函数的方式，利用箭头函数中 this 指向指向上下文的特点

```
onClick = {() => {
	this.changeMsg(...args)
}}
```



## 单项数据绑定

React 只支持，把数据从 state 上传输到 页面，但是，无法自动实现数据从 页面 传输到 state 中 进行保存。

> Vue 可以通过 v-model 指令实现双向数据的绑定，React 默认不支持双向数据绑定

当使用 input 中的 value，浏览器会报错

#### 通过 onChange 方法，实现双向数据绑定

> 用于绑定表单元素 input

- readOnly：这个元素为只读的不能修改，控制台没有警告

```js
<input type="text" value={this.state.msg} readOnly />
```



- onChange：表示这个元素值可以进行修改，但是需要定义修改逻辑

通过逻辑来修改 value 的三种方式

1. 使用 document.getElementById
2. 使用 ref 的方式， this.refs.txt.value
3. 使用事件对象参数 e.target.value 来获取

```js
class myChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '默认的 msg 值'
    }
  }
  render() {
    return (
    	<div> 
      	<input type="text" value={this.state.msg} onChange={this.txtChange} ref="txt"/>
      </div>
    )
  }
  txtChange = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
}

ReactDOM.render(
	<div>
  	<MyChange />
  </div>,
  document.getElementById('app')
)
```



## React 路由的使用

需要安装 `react-router-dom` 这个包



> - 路由匹配规则是使用**模糊匹配**的，只要对应路由匹配成功就会展示对应的组件
> - 如果想进行**精确匹配**，需要在 Route 添加 exact 属性
> - 动态路由，匹配路由参数，`:`修饰符
> - 获取路由的参数，props.match.params

```js
// 引入路由组件
import Home from './Home'
// 设置路由跳转，在 render 中设置 
<Link to="/home"> 主页 </Link>
// 1.他是路由匹配规则 2.他是一个占位符
<Route path="/home" component={Home} />
```

模糊匹配

```js
<Link to="/movie/top250">电影</Link>

<Route path="/movie" component={Movie} />
```

精确匹配 匹配参数

```js
<Link to="/movie/top250/20">电影</Link>

<Route path="/movie/top250/:id" component={Movie} exact/>
```

