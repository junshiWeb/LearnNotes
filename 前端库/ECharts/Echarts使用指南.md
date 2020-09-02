ECharts官方地址：https://echarts.apache.org/zh/index.html

ECharts菜鸟教程地址：https://www.runoob.com/echarts/echarts-tutorial.html



#### 一、介绍

官方介绍：

- ECharts 是一个使用 JavaScript 实现的开源可视化库，涵盖各行业图表，满足各种需求。

- ECharts 遵循 Apache-2.0 开源协议，免费商用。

- ECharts 兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等）及兼容多种设备，可随时随地任性展示



#### 二、EChart特性

- **丰富的可视化类型**: 提供了常规的折线图、柱状图、散点图、饼图、K线图，用于统计的盒形图，用于地理数据可视化的地图、热力图、线图，用于关系数据可视化的关系图、treemap、旭日图，多维数据可视化的平行坐标，还有用于 BI 的漏斗图，仪表盘，并且支持图与图之间的混搭。
- **多种数据格式无需转换直接使用**: 内置的 dataset 属性（4.0+）支持直接传入包括二维表，key-value 等多种格式的数据源，此外还支持输入 TypedArray 格式的数据。
- **千万数据的前端展现**: 通过增量渲染技术（4.0+），配合各种细致的优化，ECharts 能够展现千万级的数据量。
- **移动端优化**: 针对移动端交互做了细致的优化，例如移动端小屏上适于用手指在坐标系中进行缩放、平移。 PC 端也可以用鼠标在图中进行缩放（用鼠标滚轮）、平移等。
- **多渲染方案，跨平台使用**: 支持以 Canvas、SVG（4.0+）、VML 的形式渲染图表。
- **深度的交互式数据探索**: 提供了 图例、视觉映射、数据区域缩放、tooltip、数据刷选等开箱即用的交互组件，可以对数据进行多维度数据筛取、视图缩放、展示细节等交互操作。
- **多维数据的支持以及丰富的视觉编码手段**: 对于传统的散点图等，传入的数据也可以是多个维度的。
- **动态数据**: 数据的改变驱动图表展现的改变。
- **绚丽的特效**: 针对线数据，点数据等地理数据的可视化提供了吸引眼球的特效。
- **通过 GL 实现更多更强大绚丽的三维可视化**: 在 VR，大屏场景里实现三维的可视化效果。
- **无障碍访问（4.0+）**: 支持自动根据图表配置项智能生成描述，使得盲人可以在朗读设备的帮助下了解图表内容，让图表可以被更多人群访问！

> 丰富的可视化类型、多种数据格式无序转换、千万数据的前端展现、移动端优化、多渲染方案，跨平台使用、深度的交互数据探索、多为数据的支持以及丰富的视觉编码手段、动态数据、蓄力特效、通过GL实现更多更强大绚丽的三维可视化、无障碍访问



#### 三、安装

1. 直接<script>标签引用

源代码下载：

[生产环境](https://cdn.staticfile.org/echarts/4.7.0/echarts.min.js)

[开发环境](https://cdn.staticfile.org/echarts/4.7.0/echarts.js)

官网下载：https://www.echartsjs.com/zh/download.html

- 完全版：`echarts/dist/echarts.js`，体积最大，包含所有的图表和组件，所包含内容参见：`echarts/echarts.all.js`。
- 常用版：`echarts/dist/echarts.common.js`，体积适中，包含常见的图表和组件，所包含内容参见：`echarts/echarts.common.js`。
- 精简版：`echarts/dist/echarts.simple.js`，体积较小，仅包含最常用的图表和组件，所包含内容参见：`echarts/echarts.simple.js`。

2.CDN引用：不建议，建议下载到本地

3.npm安装：速度慢

```
# 升级或安装 cnpm
npm install cnpm -g
# 最新稳定版
$ cnpm install echarts --save
```

安装完成后使用

```js
var echarts = require('echarts');
 
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
```



#### 四、ECharts使用

1. 创建HTML页面，引入echarts.min.js文件

   ```js
   <script src="echarts.min.js"> </script>
   ```

2. 为ECharts准备一个具备宽高的盒子

   ```html
   <div id="main" style="width: 600px;height:400px;"></div>
   ```

3. 设置配置信息

   ECharts库使用json格式来配置

   ```
   echarts.init(获取文档节点).setOption(option)
   ```

   配置文件信息

   ```json
   var option = {
     // 标题
     title: {
         text: '第一个 ECharts 实例'
     },
     // 提示信息
     tooltip: {},
     // 图例组件
     legend: {
         data:['销量']
     },
     // X轴显示项
     xAxis: {
         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
     },
     // Y轴显示项
     yAxis: {},
     // 系列列表
     series: [{
       	// 图形名称
         name: '销量',
         type: 'bar',
       	// 高亮样式。
         emphasis: {
         	itemStyle: {
           	// 高亮时点的颜色
             color: 'red'
             },
             label: {
                show: true,
                // 高亮时标签的文字
                formatter: '高亮时显示的标签内容'
               }
         },
         data: [5, 20, 36, 10, 10, 20]
     }]
   };
   ```

- 图例组件

  图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。

  

- 系列列表

  - type
    - **type: 'bar'**：柱状/条形图
    - **type: 'line'**：折线/面积图
    - **type: 'pie'**：饼图
      - 只需要配置name、type、redius（半径）、data（数据）
      - data：[{ value:234, name:'名称' }，.......]
      - rosetype:  'angel'  南丁格尔图
      - itemStyle: { normal: { }} 设置阴影、透明度、颜色、边框颜色、边框宽度等
    - **type: 'scatter'**：散点（气泡）图
    - **type: 'effectScatter'**：带有涟漪特效动画的散点（气泡）
    - **type: 'radar'**：雷达图
    - **type: 'tree'**：树型图
    - **type: 'treemap'**：树型图
    - **type: 'sunburst'**：旭日图
    - **type: 'boxplot'**：箱形图
    - **type: 'candlestick'**：K线图
    - **type: 'heatmap'**：热力图
    - **type: 'map'**：地图
    - **type: 'parallel'**：平行坐标系的系列
    - **type: 'lines'**：线图
    - **type: 'graph'**：关系图
    - **type: 'sankey'**：桑基图
    - **type: 'funnel'**：漏斗图
    - **type: 'gauge'**：仪表盘
    - **type: 'pictorialBar'**：象形柱图
    - **type: 'themeRiver'**：主题河流
    - **type: 'custom'**：自定义系列

- 样式和主题设置

```js
var chart = echarts.init(dom, 'light');  // dark
```

#### 五、异步加载

使用JQuery，axios等异步方式请求json格式数据

```js
var myChart = echarts.init(document.getElementById('main'));
myChart.showLoading() // 开启 loading 效果
$.get('https://www.runoob.com/static/js/echarts_test_data.json', function (data) {
  myChar.hideLoading()  // 隐藏 loading
  myChart.setOption({
    series : [
      {
        name: '访问来源',
        type: 'pie',   
        radius: '55%',  
        data:data.data_pie
      }
    ]
  })
}, 'json')
```



#### 六、数据集

```json
option = {
    legend: {},
    tooltip: {},
    // 方式1
    dataset: {
        // 提供一份数据。
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
  	// 方式2
  	dataset: {
      	dimensions: ['product', '2015', '2016', '2017']
      	source: [
      		{product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
          {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
          {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
          {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
      ]
    }
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {type: 'category'},
    // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
}
```

- 