## 介绍

基于 echarts 封装的 v-charts 图标，只需要提供统一



## 使用

- 全部引入

```js
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/index.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts/lib/style.min.css">
  
```

- 单独引用

```js
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
// 区别在这里 line.min.js ....
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/line.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts/lib/style.min.css">
  
```

- Vue 使用

```js
// main.js
import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'

Vue.use(VCharts)

new Vue({
  el:'#app',
  render: h => h(App)
})
```

- 按需引入

```js
import VcLine from 'v-charts/lib/line.common'
|- lib/
    |- line.common.js  -------------- 折线图
    |- bar.common.js  --------------- 条形图
    |- histogram.common.js  --------- 柱状图
    |- pie.common.js  --------------- 饼图
    |- ring.common.js  -------------- 环图
    |- funnel.common.js  ------------ 漏斗图
    |- waterfall.common.js  --------- 瀑布图
    |- radar.common.js  ------------- 雷达图
    |- map.common.js  --------------- 地图
    |- sankey.common.js  ------------ 桑基图
    |- heatmap.common.js  ----------- 热力图
    |- scatter.common.js  ----------- 散点图
    |- candle.common.js  ------------ k线图
    |- gauge.common.js  ------------- 仪表盘
    |- tree.common.js  -------------- 树图
    |- bmap.common.js  -------------- 百度地图
    |- amap.common.js  -------------- 高德地图
```

## 图表属性

#### 自有属性

- 每个图表都有只有属性，不完全相同，这样的属性被置于 settings 内

#### 共有属性

- 所有图标都具有的属性，如 width，events 等

```js
<ve-line :data="chartData" width="100px" :events="chartEvents"></ve-line>
```

#### 基本属性

| 配置项              | 简介                                                         | 类型           | 默认值 |
| ------------------- | ------------------------------------------------------------ | -------------- | ------ |
| data                | 数据，[参考文档](https://v-charts.js.org/#/data)             | object         | -      |
| settings            | 配置项                                                       | object         | -      |
| width               | 宽度                                                         | string         | auto   |
| height              | 高度                                                         | string         | 400px  |
| events              | 事件绑定，[参考文档](https://v-charts.js.org/#/event)        | object         | -      |
| init-options        | init 附加参数，[参考文档](http://echarts.baidu.com/api.html#echarts.init) | object         | -      |
| tooltip-visible     | 是否显示提示框                                               | boolean        | true   |
| legend-visible      | 是否显示图例                                                 | boolean        | true   |
| theme               | 自定义主题                                                   | object         | -      |
| theme-name          | 自定义主题名称                                               | string         | -      |
| judge-width         | 是否处理生成图表时的宽度问题                                 | boolean        | false  |
| width-change-delay  | 容器宽度变化的延迟                                           | number         | 300    |
| resizeable          | 是否处理窗口 resize 事件                                     | boolean        | true   |
| cancel-resize-check | 是否禁用 resize 时的容器检测                                 | boolean        | false  |
| resize-delay        | 窗口 resize 事件回调的延迟                                   | number         | 200    |
| change-delay        | 属性修改触发图表重绘回调的延迟                               | number         | 0      |
| set-option-opts     | echarts setOption 的第二个参数, [参考文档](http://echarts.baidu.com/api.html#echartsInstance.setOption) | boolean object | true   |
| not-set-unchange    | 未发生变化时不参加 setOption 的属性                          | array          | -      |
| log                 | 在控制台打印内部生成的echarts options                        | boolean        | false  |

#### 标识属性

| 配置项     | 简介     | 类型   |
| ---------- | -------- | ------ |
| mark-line  | 标线     | object |
| mark-area  | 标点     | object |
| mark-point | 标志区域 | object |

#### 状态属性

| 配置项                            | 简介         | 类型    | 默认值 |
| --------------------------------- | ------------ | ------- | ------ |
| loading                           | 加载状态     | boolean | false  |
| data-empty                        | 暂无数据状态 | boolean | false  |
| ?> **使用时需先引入样式**         |              |         |        |
| `import 'v-charts/lib/style.css'` |              |         |        |

#### 钩子函数

| 配置项                | 说明                                                         | 参数                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------- |
| before-config         | 对数据提前进行额外的处理， 在数据转化为配置项开始前触发      | 参数为 data，返回值为表格数据         |
| after-config          | 对生成好的echarts配置进行额外的处理， 在数据转化为配置项结束后触发 | 参数为 options，返回值为 echarts 配置 |
| after-set-option      | 生成图之后获取echarts实例                                    | 参数为echarts实例                     |
| after-set-option-once | 生成图后获取echarts实例 （只执行一次）                       | 参数为echarts实例                     |

#### 事件

| 方法名     | 说明                                     |
| ---------- | ---------------------------------------- |
| ready      | 图表渲染完成后触发，每次渲染都会触发一次 |
| ready-once | 只会在首次渲染完成后触发                 |

总结：边用边学边调试比较好