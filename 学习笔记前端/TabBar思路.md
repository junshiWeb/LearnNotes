TabBar思路

1.通过app.vue简单布局

2.为了app.vue中尽量简洁，将结构和样式抽离到TabBar.vue中，并且通过app.vue中动态添加图片和文字

3.为了使TabBar满足动态添加，将文字图片抽离到TabBarItem中通过插槽添加，需要一个高亮显示表示选中，并且选中的时候显示show

4.app.vue通过插槽添加的之后，结构又过于混乱，并且便于复用，重新抽离出一个maintabbar，将所有tabbar 的样式统一进行管理

5.在app中引用maintabbar，

