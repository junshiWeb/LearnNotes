# 首页开发

### 一、FeatureView

- 独立组件封装FeatureView
  - div>a>img



### 二、TabControl

- 独立组件的封装
  - pros>titles
  - div>根据titles v-for遍历 div -> span{{title}
  - css相关
  - 选中哪个tab，哪一个tab的文字颜色变色，下面border-bottom
    - currentindex



### 三、**首页商品数据的请求**

**3.1 设计数据结构，用于保存数据**

```html
goods: {
	pop: page/list
	new: page/list
	sell: page/list
}
```



### 四、对商品数据进行展示

**4.1封装GoodsList.vue组件**

- props：goods -> list[30]
- v-for goods -> GoodsListItem[30]
- GoodsListItem -> GoodsItem(数据)



**4.2 封装GoodsListItem.vue组件**

props：goodItem

goodsItem：取出数据，并且使用正确的div/span/img基本标签进行展示



### 五、对滚动进行重构：Better-Scroll

**5.1 在index.html中使用Better-Scroll**

- const bscroll = new Bscroll(el,{   })
- 注意：wrapper -> content -> 很多内容
- 1.监听滚动
  - probeType：0/1/2(手指滚动)/3(只要是滚动)
  - bscroll .on('scroll',(position) => {  })
- 2.上拉加载
  - pullUpLoad:true
  - bscroll .on('pullingUp',() => {  })
- 3.click:false  （点击事件监听）
  - button可监听点击
  - div监听不了

**5.2 在Vue项目中使用Better-Scroll**

- 在Profile.vue中简单的演示

- 对Better-Scroll进行封装:scroll.vue

- Home.vue和Scroll.vue之间进行通信

  - Home.vue将probeType设置为3
  - Scroll.vue需要通过$emit,实时将事件发送到Home.vue

  

### 六、回到顶部BackTop

**6.1 对BackTop.vue组件进行封装**



**6.2 如何监听组件的点击**

- 直接监听back-top的点击，但是可以之间监听？
  - 不可以，必须添加修饰.native
- 回到顶部
  - scroll对象，scroll，scrollTo(x, y, time)
  - this.$refs.scroll.scrollTo(0,0,500)



**6.3 BackTop组件的显示和隐藏**

- isShowBackTop: false
- 监听滚动，拿到滚动的位置:
  - -position.y -> 1000 -> isShowBackTop: true
  - isShowBackTop = -position.y > 1000



### 七、解决首页中可滚动区域的问题

- Better-Scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
  - scrollerHeight属性是根据放Better-Scroll的content中的子组件高度
  - 但是我们的首页中，刚开始在计算scrollerHeight属性是，是没有将图片计算在内所以，计算出来的结果是错误的
  - 后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有更新，所以滚动出现了问题
- 如何解决这个问题？
  - 监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次refresh()
  - 如何监听图片加载完成了？
    - 原生js监听图片：img .onload = function() { }
    - Vue中监听: @load='方法'
  - 调用scroll的refresh()
- 如何将GoodsListItem.vue中的事件传入到Home.vue中
  - 因为涉及到非父子组件的通信，所以这里我们选择的了事件总线
    - bus -> 总线
    - Vue .prototype .$bus = new Vue()
    - this.bus.emit('事件名称',参数)
- 问题一：refresh找不到问题
  - 第一：在scroll.vue中，调用this.scroll的方法之间，判断this.scroll对象是否有值
  - 第二：在mounted生命周期函数中使用 this.$refs.scroll而不是cereated中
- 问题二：对于refresh非常频繁的问题，进行防抖操作
  - 防抖debuunce/节流throttle
  - 防抖函数起作用的过程：
    - 如果我们直接执行refresh，那么refresh函数会被执行30次
    - 可以将refresh函数传入到debounce函数中，生成一个新的函数
    - 之后再调用非常频繁的时候，就是用新生成的函数
    - 而新生成的函数，并不会非常频繁的调用，如果下次执行来的非常快，那么会将上一次的取消了

```html
debounce(func, delay) {
	let time = null
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay )
	}
}
```



### 八、上拉加载更多的功能

y ifu



### 九、tabControl的吸顶效果

**9.1 获取到tabControl的offsetTop**

- 必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
- 但是，如果直接在mounted中获取tabControl的offsetTop，那么值时不正确的
- 如何获取正确的值？
  - 监听HomeSwiper中的img加载完成
  - 加载完成后，触发事件，在Home.vue中，获取正确的值
  - 补充：
    - 为了让HomeSwiper多次发出事件
    - 可以使用isLoad的变量进行状态的记录
  - 注意：这里不进行多次调用和debounce的区别

**9.2 监听滚动，动态的该表tabControl的样式**

- 问题：动态的改变tabControl的样式时，会出现两个问题：
  - 问题一：下面的商品内容，会突然上移
  - 问题二：tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚出去了
- 其他方案来解决停留问题
  - 在最上面，多复制了一份PlaceHolderTabControl组件对象，利用它来实现停留效果
  - 当用户滚动到一定位置时，PlaceHolderTabControl显示出来
  - 当用户滚动没达到一定位置时，PlaceHolderTabControl隐藏起来



### 十、让Home保持原来的状态

**10.1 让Home不要随意摧毁掉**

- keep-alive

**10.2 让Home中的内容保持原来的位置**

- 离开时，保存一个位置信息saveY
- 进来时，将位置设置为原来保存的位置saveY信息
  - 注意：最好回来时，进行一次refresh()





# 详情页开发

### 一、点击商品进入详情页





### 二、解决-首页保持位置状态





### 三、详情页的导航栏实现





### 四、请求详情的数据





### 五、轮播图的实现





### 六、商品基本信息的展示





### 七、店铺信息的展示





### 八、商品图片的展示







### 九 、参数信息的展示





### 十、评论信息的展示

- 时间格式化
- 服务器返回的时间戳 -> data -> 格式化
- yyyy-MM-dd hh:mm:ss



### 十一、推荐数据的展示

- 请求推荐数据
- GoodLis展示数据



### 十二、mixin的使用

- 创建混入对象：const mixin = { }
- 组件对象中：mixins:[ ]



### 十三、处理两个BUG

- 首页tabControl
- 详情页的bug



### 十四、标题和内容的联动效果

**14.1 点击标题，滚动到对应的主题**

- 在detail中监听标题的点击，获取index
- 滚动到对应的主题：
  - 获取所有主题的offsetTop
  - 问题：在哪里能获取到正确的offsetTop
    1. created肯定不行，压根不能获取元素
    2. mounted也不行，数据还有获取到
    3. 获取到数据的回调也不行，DOM没有渲染完
    4. $nextTick也不行，因为图片的高度没有被计算
    5. 在图片加载完成后，获取的高度才正确

**14.2 内容滚动，显示正确的标题**

普通做法：

```javascripthtml
(this.currentIndex !== i)  && 
((i < length -1 && positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1]) || 
(i === length - 1 && positoinY >= this.themtopYs[i]))
条件成立：this.currentIndex = i
条件一：防止赋值的过程过于频繁
条件二：((xx && xx &&)  || (xx && xx))
	条件1：判断区间：在0和某个数字之间 ( i < length - 1 )
	条件2：判断大于等于 ( i === length-1 )
```

hack做法：

```js
this.currentIndex !== i && 
(positoinY >= this.themeTopYs[i] &&  
positoiny < this.themeTopYs[i+1] )
```



### 十五、顶部工具栏的封装





### 十六、详情页的回到顶部

- home.vue 和 detail.vue 回到顶部：mixin



### 十七、点击加入购物车

**17.1 监听加入购物车按钮的点击，并且获取商品信息**

- 监听点击
- 获取商品信息：iid/price/image/title/desc



**17.2 将商品添加到Vuex中**

- 安装Vuex
- 配置Vuex
- 定义mutations，将商品添加到state.cartList



### 十八、 添加购物车弹窗

**18.1Vuex的补充**

- Actions可以返回一个Promise
- mapACtions的映射关系



**18.2 Toast(吐司)封装**

- 普通封装方式
- 插件封装方式



# 购物车

### 一、购物车展示

**1.1 购物车导航栏的展示**



**1.2 购物车商品的展示**

- CarList -> Scroll(滚动问题)
- CartLIstItem -> CheckButton



**1.3 商品的选中和不选中切换**

- 修改模型对象，改变选中和不选中



**1.4 底部工具栏的汇总**

- 全选按钮
- 计算总价格
- 结算



### 二、购物车的全选按钮

- 显示的状态

  - 判断视频有一个不选中，全选就是不选中

- 点击全选按钮

  - 如果原来都是选中，点击一次，全部不选中
  - 如果原来都是不选中（某些不选中），全部选中

  



# 细节补充

#### 1.1 fastClick减少点击延迟

- 安装fastClick
- 导入
- 调用attach函数



#### 1.2 图片的懒加载

- 什么是图片懒加载
  - 图片需要出现在屏幕时，再加载这张图片
- 使用vue-lazyload
  - 安装
  - 导入
  - Vue.use
  - 修改img:src -> v-lazy

#### 1.3 px2vw插件使用

- 安装插件
- 在postcss.config.js中配置

