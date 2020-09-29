#### 1. 创建项目和配置文件

- cli3 和 cli2 创建项目的方式
  - 项目中文件的意思
- webpack 基本配置
  - 入口文件和出口文件配置
  - loader
  - babel-plugin

#### 2. tabbar 封装和引用

- 考虑封装之后的复用问题
  - TabBar
  - TabBarItem
  - MainTabBar

#### 3. 路由的配置

- 路由使用

```js
路由文件的配置
1. 引入 vue 和 vue-router
2. 安装路由
3. 创建路由
4. 导出路由
main.js 引入路由 render 渲染路由
路由在组件中的使用
routerView 路由渲染的位置
routerLinkTo 路由跳转的位置
keep-alive 保持路由不被销毁 include exclude
```

- 路由的基本配置
  - hash 模式：带有用 # 号，不会像服务器发出请求，因此也不会刷新页面，并且每次 hash 值发生改变的时候，会触发 hashchange 事件
  - history 模式：不会刷新页面，url 地址会改变 ，但是刷新的时候，如果服务器没有配置对应的界面会返回 404，有 pushstate，replaceState 前进后退等事件
  - location：
    - location. href  完整 URL
    - location. protocol  URL协议
    - location. host  主机名和端口号
    - location. hostname  主机名
    - location. port  端口号
    - location. pathname  url 文件路径
    - location. search  查询参数 ？ 开始
    - location. hash  页面片段 # 之后

```js
const routers = [
  {
    path: '/path' // 路由路径
    path: '/path/:id' // 动态路由
    redirect: '/path', // 路由重定向
    alias: '/user', // 别名
    $route.params.id,
    components: { // 一个路由渲染多个组件
    	defalut: Home, 
    	a: Bara,
    	b: Barb
  	}
    children: [  // 嵌套路由
    	{
    	path: '/children' 
  		}
    ]
  }
]
const router = new Router({
  reouters,
  mode: 'history',
  
})
```

- 路由对象 $route 和路由实例 $router

- 导航路由
  - 

#### 3.nav-bar 的封装和引入

#### 4. scroll 的封装

​	移动端的原生滚动纯在 300ms 延迟问题，引入 better-scroll 解决 300ms 的问题

- 二次封装 better-scroll 方面下次如果该插件不在维护后可以快速替换替他插件
  - 封装 刷新，下拉加载等方法

#### 5. back-top 封装

#### 6. 网络请求的封装

​	分析了 ajax，JSONP，axios 等请求方式，最后使用封装好的 axios   

