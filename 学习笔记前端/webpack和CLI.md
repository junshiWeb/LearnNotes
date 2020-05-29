### 1. webpack

- 什么是webpack

  - 是js应用一种静态模块打包工具

- webpack安装

  - 需要node环境的支持
  - 全局安装

  ```vue
  npm install webpack -g
  指定版本安装
  npm install webpack@3.6.0 -g
  ```

  - 局部安装

  ```
  npm install webpack --save-dev
  ```

- webpack基本使用

  - 目录结构
    - src  开发文件
    - dict 打包文件
  - 命令 webpack  ./src/main.js ./dict/bundel.js

- webpack配置

  - npm init	初始化node包
  - 入口出口配置  webpack.config.js中
  - npm run dev //开发环境
  - npm run build //生成环境

- webpack中的loader

  - 什么是loader
    - webpack可以将js、图片、css处理打包，本身不能处理
    - 需要依赖loader相关扩展
  - 基本使用
    - 安装对应loader
    - 在webpack.config.js中的modules中配置相关内容

- webpack中的vue

  - 安装  npm install vue --save
  - vue中组件化开发思想，抽取进行模块化

- webpack中的plugin

  - 是一个webpack的扩展器
  - 使用（无须安装，webpack自带）
    - 添加版权的epugin
    - 代码丑化（代码压缩）

- webpack搭建本地服务器

  - npm install --save-dev webpack -dev-server@2.9.1
  - 配置webpack.config.js
  - 配置package.json的快捷启动
  - 执行 npm run dev

- webpack配置分离



### 2.Vue-cli

什么是Vue-cli

- 是一个基于Vue.js进行快速开发完整系统

CLI是什么意思

- CLI是Command-Line Interface，即命令行界面，也叫脚手架。
- vue cli 是vue.js官方发布的一个vue.js项目的脚手架
- 使用vue-cli可以快速搭建vue开发环境和对应的webpack配置

cli基本使用

- 依赖node环境
- 安装
  - cli3  npm install -g @vue/cli
  - cli2  npm install -g @vue/cli -init
  - vue init webpack my-project     初始化项目

目录结构

- cli2目录结构

  - build和config配置文件
  - src和static
  - .babelrc     es语法配置
  - .editorconfig  编码配置
  - .gitignore  git提交忽略一些文件
  - .postcssrc.js   css转换的配置
  - index.html   index模板

- runtime-compiler和runtime-only区别

  - **runtime-compiler**

    template会被解析 => ast(抽象语法树) => 然后编译成render函数 => 渲染成虚拟DOM（vdom）=> 真实dom(UI)

  - **runtime-only**

    render => vdom => UI

    1.性能更高，2.需要代码量更少

```
runtime-compiler
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
runtime-only
new Vue({
  el: '#app',
  render: h => h(App)
})
```

- cli3

  cli2和cli3的区别

  - vue-cli3的设计原则是"0配置"，移除了配置文件，build和config等
  - vue-cli3提供`vue ui`的命令，提供了可视化配置
  - 移除了static文件夹，新增了public文件夹，并将index.html移入了public文件夹

- 目录结构

  - public   和static文件类似
  - src    源码文件夹

- cli3配置

  - 配置文件被隐藏

    - node_modules中找到@vue=>cli0service=>webpack.config.js

    - 自定义配置文件

      vue.config.js

```
//在module.exports中修改配置
module.exports = {
  
}
```

### 3.Vue-router

- 什么是路由

  - 通过互联网络吧信息用源地址传送到目的地的活动
  - 路由提供了两种机制：路由和传送
    - 路由是决定数据包从来源到目的地的路径
    - 传送就是将数据转移
  - 路由表
    - 路由表本质就是一个映射表，决定了数据包的指向

- 前端/后端路由   发展

  1. 后端渲染（服务器渲染）  JSP技术
  2. 前后端分离（ajax请求数据）
     - 后端只提供数据
     - ajax发送网络请求到后端服务器，服务器回传数据
     - JS代码渲染dom   静态资源服务器（html+css+js）
  3. 单页面富应用（SPA页面）
     - 前后端分离+前端路由
     - 整个网址只有一个html页面像后端发送请求

- URL中的hash和HTML5的history

- vue-router安装

  npm install vue-router --save

  - scr创建router目录  创建index.js 
  - 创建路由实例，传入路由映射配置
  - 在vue实例中挂载创建路由实例对象

- router基本使用

```
1.导入vue实例和vue-router实例
import Vue from 'Vue'
import Router from 'vue-router'
2.通过vue.use，安装插件
Vue.use(Routre)
3.创建路由对象
const router = new Router{
	routes
}
4.导出router实例
export default router
简单写法
export default new router{
	routes
}
```

- vue-router的使用

  - 创建路由组件
  - 配置路由映射：组件和路径映射关系

  ```vue
  const routes = [
  	{
  		path：'/home'  //前端路由地址
  		component：Home  //组件名
  	}
  ]
  加载方式：
  1.import Home from '../components/Home'
  2.() => import('../components/Home')   //懒加载
  ```

  - 使用路由：通过<router-link/>  <router-view>
    - router-link：全局组件，最终被渲染成a标签
    - router-view：用来占位，组件展示的位置
      - 默认为hash模式，需要手动修改为history模式
  - 路由的默认值和history模式

  ```
  默认初始界面   缺省==初始化
  {
  	path:''
  	redirect:'/Home'   //缺省时重定向
  }
  ```

  - router-link的属性
    - to：用于跳转到指定路径
    - tag：指定渲染的标签名称
    - relapce：浏览器的返回按钮不能使用，默认是pushState
    - active-class：默认设置的class名称
  - 通过方法修改路由跳转
    - 将router-link换成方法
    - this.$router.push('/home')进行跳转

- vue-router动态路由

  - this.$route.params.userId：获取处于活动状态的路由参数user
  - 需要通过:userId 动态绑定 

- vue-router打包文件解析

- 嵌套路由

```
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'',
			redirect:'/home/news'
		},
		{
			path:'news',
			component:() => import('../components/Home')
		}
	]
}
```

- vue-router参数传递

```
> params的类型也就是动态路由形式
- 配置路由的格式：`/user/:userId`
- 传递的方式：在path后面跟上对应的userId
- 传递形成的路径：`/user/123`，`/user/xxx`
- 通过`$route.params.userId`获取指定userId
> query的类型
- 配置路由的格式：`/profile`，也就是普通的配置
- 传递的方式：对象中使用query的key作为传递的方式
- 传递形成的路径：`/profile?name=zty&age=24&height=177`（这个传递的是三个键值对），`/profile?profileInfo=%5Bobject%20Object%5D`（这个query传递的是一个对象的键值对，key为profileInfo，value是一个对象）
```

- router和route的由来
- vue-router导航守卫
  - 路由跳转时监控路由的来自哪，要去哪

```
/**
 * 前置钩子：从from跳转到to
 * from 来的路由
 * to 要去的路由
 */
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title //给目标路由的页面的title赋值
  next()//必须调用，不调用不会跳转
})
to，from，next都是$router
```

- keep-alive
  - Vue内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染

- 别名配置  '@'



## 封装TabBar



### 4.Promise

- 什么是Promise
  - 一种异步编程的解决方案
- 基本使用

```vue
new Promise((resolve,reject) => {})

最终方案：
	
```

- 三种状态
  - pending：等待状态
  - fullfill：满足状态，主动调用resolve，回调then()
  - reject：拒绝状态，主动调用reject，回调catch()

- 链式调用

```
new Promise((resolve,reject) => {
	setTimeout(() => {
		resolve('hello')
	},1000)
}).then(res => {
	console.log(res)
	return new Promise((resolve,reject) => {
		resolve(res + '11')
	}).then(res => {
		console.log(res)
	})
})
```

- Promise的all使用

```
Promise.all([
	new Promise(()),
	new Promise(())
])
```

### 5.Vue-x

- 什么是Vue-x
  
  - 状态管理插件
  
  



