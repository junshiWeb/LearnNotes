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

   所有项目配置文件

   ```json
   theme = {
     // 全图默认背景
     // backgroundColor: 'rgba(0,0,0,0)',
   
     // 默认色板
     color： ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0','#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700','#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
   
   // 图表标题
   title: {
     x: 'left',                 // 水平安放位置，默认为左对齐，可选为：
     // 'center' ¦ 'left' ¦ 'right'
     // ¦ {number}（x坐标，单位px）
     y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
     // 'top' ¦ 'bottom' ¦ 'center'
     // ¦ {number}（y坐标，单位px）
     //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
     backgroundColor: 'rgba(0,0,0,0)',
     borderColor: '#ccc',       // 标题边框颜色
     borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
     padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
     // 接受数组分别设定上右下左边距，同css
     itemGap: 10,               // 主副标题纵向间隔，单位px，默认为10，
     textStyle: {
       fontSize: 18,
       fontWeight: 'bolder',
       color: '#333'          // 主标题文字颜色
     },
     subtextStyle: {
       color: '#aaa'          // 副标题文字颜色
     }
   },
   
   // 图例
   legend: {
     orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
     // 'horizontal' ¦ 'vertical'
     x: 'center',               // 水平安放位置，默认为全图居中，可选为：
     // 'center' ¦ 'left' ¦ 'right'
     // ¦ {number}（x坐标，单位px）
     y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
     // 'top' ¦ 'bottom' ¦ 'center'
     // ¦ {number}（y坐标，单位px）
     backgroundColor: 'rgba(0,0,0,0)',
     borderColor: '#ccc',       // 图例边框颜色
     borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
     padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
     // 接受数组分别设定上右下左边距，同css
     itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
     // 横向布局时为水平间隔，纵向布局时为纵向间隔
     itemWidth: 20,             // 图例图形宽度
     itemHeight: 14,            // 图例图形高度
     textStyle: {
       color: '#333'          // 图例文字颜色
     }
   },
   
   // 值域
   dataRange: {
     orient: 'vertical',        // 布局方式，默认为垂直布局，可选为：
     // 'horizontal' ¦ 'vertical'
     x: 'left',                 // 水平安放位置，默认为全图左对齐，可选为：
     // 'center' ¦ 'left' ¦ 'right'
     // ¦ {number}（x坐标，单位px）
     y: 'bottom',               // 垂直安放位置，默认为全图底部，可选为：
     // 'top' ¦ 'bottom' ¦ 'center'
     // ¦ {number}（y坐标，单位px）
     backgroundColor: 'rgba(0,0,0,0)',
     borderColor: '#ccc',       // 值域边框颜色
     borderWidth: 0,            // 值域边框线宽，单位px，默认为0（无边框）
     padding: 5,                // 值域内边距，单位px，默认各方向内边距为5，
     // 接受数组分别设定上右下左边距，同css
     itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
     // 横向布局时为水平间隔，纵向布局时为纵向间隔
     itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
     itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
     splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
     color:['#1e90ff','#f0ffff'],//颜色 
     //text:['高','低'],         // 文本，默认为数值文本
     textStyle: {
       color: '#333'          // 值域文字颜色
     }
   },
   
   toolbox: {
     orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
     // 'horizontal' ¦ 'vertical'
     x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
     // 'center' ¦ 'left' ¦ 'right'
     // ¦ {number}（x坐标，单位px）
     y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
     // 'top' ¦ 'bottom' ¦ 'center'
     // ¦ {number}（y坐标，单位px）
     color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
     backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
     borderColor: '#ccc',       // 工具箱边框颜色
     borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
     padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
     // 接受数组分别设定上右下左边距，同css
     itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
     // 横向布局时为水平间隔，纵向布局时为纵向间隔
     itemSize: 16,              // 工具箱图形宽度
     featureImageIcon : {},     // 自定义图片icon
     featureTitle : {
       mark : '辅助线开关',
       markUndo : '删除辅助线',
       markClear : '清空辅助线',
       dataZoom : '区域缩放',
       dataZoomReset : '区域缩放后退',
       dataView : '数据视图',
       lineChart : '折线图切换',
       barChart : '柱形图切换',
       restore : '还原',
       saveAsImage : '保存为图片'
     }
   },
   
   // 提示框
   tooltip: {
     trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
     showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
     hideDelay: 100,            // 隐藏延迟，单位ms
     transitionDuration : 0.4,  // 动画变换时间，单位s
     backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
     borderColor: '#333',       // 提示边框颜色
     borderRadius: 4,           // 提示边框圆角，单位px，默认为4
     borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
     padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
     // 接受数组分别设定上右下左边距，同css
     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
       type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
       lineStyle : {          // 直线指示器样式设置
         color: '#48b',
         width: 2,
         type: 'solid'
       },
       shadowStyle : {                       // 阴影指示器样式设置
         width: 'auto',                   // 阴影大小
         color: 'rgba(150,150,150,0.3)'  // 阴影颜色
       }
     },
     textStyle: {
       color: '#fff'
     }
   },
   
   // 区域缩放控制器
   dataZoom: {
     orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
     // 'horizontal' ¦ 'vertical'
     // x: {number},            // 水平安放位置，默认为根据grid参数适配，可选为：
     // {number}（x坐标，单位px）
     // y: {number},            // 垂直安放位置，默认为根据grid参数适配，可选为：
     // {number}（y坐标，单位px）
     // width: {number},        // 指定宽度，横向布局时默认为根据grid参数适配
     // height: {number},       // 指定高度，纵向布局时默认为根据grid参数适配
     backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
     dataBackgroundColor: '#eee',            // 数据背景颜色
     fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
     handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
   },
   
   // 网格
   grid: {
     x: 80,
     y: 60,
     x2: 80,
     y2: 60,
     // width: {totalWidth} - x - x2,
     // height: {totalHeight} - y - y2,
     backgroundColor: 'rgba(0,0,0,0)',
     borderWidth: 1,
     borderColor: '#ccc'
   },
   
   // 类目轴
   categoryAxis: {
     position: 'bottom',    // 位置
     nameLocation: 'end',   // 坐标轴名字位置，支持'start' | 'end'
     boundaryGap: true,     // 类目起始和结束两端空白策略
     axisLine: {            // 坐标轴线
       show: true,        // 默认显示，属性show控制显示与否
       lineStyle: {       // 属性lineStyle控制线条样式
         color: '#48b',
         width: 2,
         type: 'solid'
       }
     },
     axisTick: {            // 坐标轴小标记
       show: true,       // 属性show控制显示与否，默认不显示
       interval: 'auto',
       // onGap: null,
       inside : false,    // 控制小标记是否在grid里 
       length :5,         // 属性length控制线长
       lineStyle: {       // 属性lineStyle控制线条样式
         color: '#333',
         width: 1
       }
     },
     axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
       show: true,
       interval: 'auto',
       rotate: 0,
       margin: 8,
       // formatter: null,
       textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
         color: '#333'
       }
     },
     splitLine: {           // 分隔线
       show: true,        // 默认显示，属性show控制显示与否
       // onGap: null,
       lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
         color: ['#ccc'],
         width: 1,
         type: 'solid'
       }
     },
     splitArea: {           // 分隔区域
       show: false,       // 默认不显示，属性show控制显示与否
       // onGap: null,
       areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
         color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
       }
     }
   },
   
   // 数值型坐标轴默认参数
   valueAxis: {
     position: 'left',      // 位置
     nameLocation: 'end',   // 坐标轴名字位置，支持'start' | 'end'
     nameTextStyle: {},     // 坐标轴文字样式，默认取全局样式
     boundaryGap: [0, 0],   // 数值起始和结束两端空白策略
     splitNumber: 5,        // 分割段数，默认为5
     axisLine: {            // 坐标轴线
       show: true,        // 默认显示，属性show控制显示与否
       lineStyle: {       // 属性lineStyle控制线条样式
         color: '#48b',
         width: 2,
         type: 'solid'
       }
     },
     axisTick: {            // 坐标轴小标记
       show: false,       // 属性show控制显示与否，默认不显示
       inside : false,    // 控制小标记是否在grid里 
       length :5,         // 属性length控制线长
       lineStyle: {       // 属性lineStyle控制线条样式
         color: '#333',
         width: 1
       }
     },
     axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
       show: true,
       rotate: 0,
       margin: 8,
       // formatter: null,
       textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
         color: '#333'
       }
     },
     splitLine: {           // 分隔线
       show: true,        // 默认显示，属性show控制显示与否
       lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
         color: ['#ccc'],
         width: 1,
         type: 'solid'
       }
     },
     splitArea: {           // 分隔区域
       show: false,       // 默认不显示，属性show控制显示与否
       areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
         color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
       }
     }
   },
   
   polar : {
     center : ['50%', '50%'],    // 默认全局居中
     radius : '75%',
     startAngle : 90,
     splitNumber : 5,
     name : {
       show: true,
       textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
         color: '#333'
       }
     },
     axisLine: {            // 坐标轴线
       show: true,        // 默认显示，属性show控制显示与否
       lineStyle: {       // 属性lineStyle控制线条样式
         color: '#ccc',
         width: 1,
         type: 'solid'
       }
     },
     axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
       show: false,
       textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
         color: '#333'
       }
     },
     splitArea : {
       show : true,
       areaStyle : {
         color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
       }
     },
     splitLine : {
       show : true,
       lineStyle : {
         width : 1,
         color : '#ccc'
       }
     }
   },
   
   // 柱形图默认参数
   bar: {
     barMinHeight: 0,          // 最小高度改为0
     // barWidth: null,        // 默认自适应
     barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
     barCategoryGap : '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
     itemStyle: {
       normal: {
         // color: '各异',
         barBorderColor: '#fff',       // 柱条边线
         barBorderRadius: 0,           // 柱条边线圆角，单位px，默认为0
         barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       },
       emphasis: {
         // color: '各异',
         barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
         barBorderRadius: 0,                // 柱条边线圆角，单位px，默认为0
         barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       }
     }
   },
   
   // 折线图默认参数
   line: {
     itemStyle: {
       normal: {
         // color: 各异,
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         lineStyle: {
           width: 2,
           type: 'solid',
           shadowColor : 'rgba(0,0,0,0)', //默认透明
           shadowBlur: 5,
           shadowOffsetX: 3,
           shadowOffsetY: 3
         }
       },
       emphasis: {
         // color: 各异,
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       }
     },
     //smooth : false,
     //symbol: null,         // 拐点图形类型
     symbolSize: 2,          // 拐点图形大小
     //symbolRotate : null,  // 拐点图形旋转控制
     showAllSymbol: false    // 标志图形默认只有主轴显示（随主轴标签间隔隐藏策略）
   },
   
   // K线图默认参数
   k: {
     // barWidth : null          // 默认自适应
     // barMaxWidth : null       // 默认自适应 
     itemStyle: {
       normal: {
         color: '#fff',          // 阳线填充颜色
         color0: '#00aa11',      // 阴线填充颜色
         lineStyle: {
           width: 1,
           color: '#ff3200',   // 阳线边框颜色
           color0: '#00aa11'   // 阴线边框颜色
         }
       },
       emphasis: {
         // color: 各异,
         // color0: 各异
       }
     }
   },
   
   // 散点图默认参数
   scatter: {
     //symbol: null,      // 图形类型
     symbolSize: 4,       // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
     //symbolRotate : null,  // 图形旋转控制
     large: false,        // 大规模散点图
     largeThreshold: 2000,// 大规模阀值，large为true且数据量>largeThreshold才启用大规模模式
     itemStyle: {
       normal: {
         // color: 各异,
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       },
       emphasis: {
         // color: '各异'
         label: {
           show: false
           // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
           //           'inside'|'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       }
     }
   },
   
   // 雷达图默认参数
   radar : {
     itemStyle: {
       normal: {
         // color: 各异,
         label: {
           show: false
         },
         lineStyle: {
           width: 2,
           type: 'solid'
         }
       },
       emphasis: {
         // color: 各异,
         label: {
           show: false
         }
       }
     },
     //symbol: null,         // 拐点图形类型
     symbolSize: 2           // 可计算特性参数，空数据拖拽提示图形大小
     //symbolRotate : null,  // 图形旋转控制
   },
   
   // 饼图默认参数
   pie: {
     center : ['50%', '50%'],    // 默认全局居中
     radius : [0, '75%'],
     clockWise : false,          // 默认逆时针
     startAngle: 90,
     minAngle: 0,                // 最小角度改为0
     selectedOffset: 10,         // 选中是扇区偏移量
     itemStyle: {
       normal: {
         // color: 各异,
         borderColor: '#fff',
         borderWidth: 1,
         label: {
           show: true,
           position: 'outer'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         labelLine: {
           show: true,
           length: 20,
           lineStyle: {
             // color: 各异,
             width: 1,
             type: 'solid'
           }
         }
       },
       emphasis: {
         // color: 各异,
         borderColor: 'rgba(0,0,0,0)',
         borderWidth: 1,
         label: {
           show: false
           // position: 'outer'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         labelLine: {
           show: false,
           length: 20,
           lineStyle: {
             // color: 各异,
             width: 1,
             type: 'solid'
           }
         }
       }
     }
   },
   
   map: {
     mapType: 'china',   // 各省的mapType暂时都用中文
     mapLocation: {
       x : 'center',
       y : 'center'
       // width    // 自适应
       // height   // 自适应
     },
     showLegendSymbol : true,       // 显示图例颜色标识（系列标识的小圆点），存在legend时生效
     itemStyle: {
       normal: {
         // color: 各异,
         borderColor: '#fff',
         borderWidth: 1,
         areaStyle: {
           color: '#ccc'//rgba(135,206,250,0.8)
         },
         label: {
           show: false,
           textStyle: {
             color: 'rgba(139,69,19,1)'
           }
         }
       },
       emphasis: {                 // 也是选中样式
         // color: 各异,
         borderColor: 'rgba(0,0,0,0)',
         borderWidth: 1,
         areaStyle: {
           color: 'rgba(255,215,0,0.8)'
         },
         label: {
           show: false,
           textStyle: {
             color: 'rgba(139,69,19,1)'
           }
         }
       }
     }
   },
   
   force : {
     // 数据map到圆的半径的最小值和最大值
     minRadius : 10,
     maxRadius : 20,
     density : 1.0,
     attractiveness : 1.0,
     // 初始化的随机大小位置
     initSize : 300,
     // 向心力因子，越大向心力越大
     centripetal : 1,
     // 冷却因子
     coolDown : 0.99,
     // 分类里如果有样式会覆盖节点默认样式
     itemStyle: {
       normal: {
         // color: 各异,
         label: {
           show: false
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         nodeStyle : {
           brushType : 'both',
           color : '#f08c2e',
           strokeColor : '#5182ab'
         },
         linkStyle : {
           strokeColor : '#5182ab'
         }
       },
       emphasis: {
         // color: 各异,
         label: {
           show: false
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         nodeStyle : {},
         linkStyle : {}
       }
     }
   },
   
   chord : {
     radius : ['65%', '75%'],
     center : ['50%', '50%'],
     padding : 2,
     sort : 'none', // can be 'none', 'ascending', 'descending'
     sortSub : 'none', // can be 'none', 'ascending', 'descending'
     startAngle : 90,
     clockWise : false,
     showScale : false,
     showScaleText : false,
     itemStyle : {
       normal : {
         label : {
           show : true
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         },
         lineStyle : {
           width : 0,
           color : '#000'
         },
         chordStyle : {
           lineStyle : {
             width : 1,
             color : '#666'
           }
         }
       },
       emphasis : {
         lineStyle : {
           width : 0,
           color : '#000'
         },
         chordStyle : {
           lineStyle : {
             width : 2,
             color : '#333'
           }
         }
       }
     }
   },
   
   island: {
     r: 15,
     calculateStep: 0.1  // 滚轮可计算步长 0.1 = 10%
   },
   
   markPoint : {
     symbol: 'pin',         // 标注类型
     symbolSize: 10,        // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
     //symbolRotate : null, // 标注旋转控制
     itemStyle: {
       normal: {
         // color: 各异，
         // borderColor: 各异,     // 标注边线颜色，优先于color 
         borderWidth: 2,            // 标注边线线宽，单位px，默认为1
         label: {
           show: true,
           position: 'inside' // 可选为'left'|'right'|'top'|'bottom'
           // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
         }
       },
       emphasis: {
         // color: 各异
         label: {
           show: true
           // position: 'inside'  // 'left'|'right'|'top'|'bottom'
           // textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
         }
       }
     }
   },
   
   markLine : {
     // 标线起始和结束的symbol介绍类型，如果都一样，可以直接传string
     symbol: ['circle', 'arrow'],  
     // 标线起始和结束的symbol大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
     symbolSize: [2, 4],
     // 标线起始和结束的symbol旋转控制
     //symbolRotate : null,
     itemStyle: {
       normal: {
         // color: 各异,           // 标线主色，线色，symbol主色
         // borderColor: 随color,     // 标线symbol边框颜色，优先于color 
         borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
         label: {
           show: false,
           // 可选为 'start'|'end'|'left'|'right'|'top'|'bottom'
           position: 'inside',  
           textStyle: {         // 默认使用全局文本样式，详见TEXTSTYLE
             color: '#333'
           }
         },
         lineStyle: {
           // color: 随borderColor, // 主色，线色，优先级高于borderColor和color
           // width: 随borderWidth, // 优先于borderWidth
           type: 'solid',
           shadowColor : 'rgba(0,0,0,0)', //默认透明
           shadowBlur: 5,
           shadowOffsetX: 3,
           shadowOffsetY: 3
         }
       },
       emphasis: {
         // color: 各异
         label: {
           show: false
           // position: 'inside' // 'left'|'right'|'top'|'bottom'
           // textStyle: null    // 默认使用全局文本样式，详见TEXTSTYLE
         },
         lineStyle : {}
       }
     }
   },
   
   textStyle: {
     decoration: 'none',
     fontFamily: 'Arial, Verdana, sans-serif',
     fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
     fontSize: 12,
     fontStyle: 'normal',
     fontWeight: 'normal'
   },
   
   // 默认标志图形类型列表
   symbolList : [
     'circle', 'rectangle', 'triangle', 'diamond',
     'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond'
   ],
   loadingText : 'Loading...',
   // 可计算特性配置，孤岛，提示颜色
   calculable: false,              // 默认关闭可计算特性
   calculableColor: 'rgba(255,165,0,0.6)',       // 拖拽提示边框颜色
   calculableHolderColor: '#ccc', // 可计算占位提示颜色
   nameConnector: ' & ',
   valueConnector: ' : ',
   animation: true,
   animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
   addDataAnimation: true,         // 动态数据接口是否开启动画效果
   animationDuration: 2000,
   animationEasing: 'ExponentialOut'    //BounceOut
   }
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

ECharts 所有配置属性

#### 图表标题：

```json
title: {
  x: '20px',  // 水平坐标，默认左对齐，可选参数(单位 px )和left/right/center
  y: '20px',  // 垂直坐标，默认顶端，可选参数(单位 px )和 top/bottom/center
  textAlign: null, //水平对齐方式，默认根据 x 轴调整 没啥用？
  backgroundColor: 'rgba(0,0,0,0)',  // 标题背景颜色
  borderColor: '#ccc',  // 边框颜色
  borderWidth: 0,   // 边框宽度
  padding: 5,     // 内边距
  itemGap: 10,   // 主副标题纵向间隔
  textStyle: {  // 主标题配置
    fontSize: 18,
    fontWeigth: 'bolder',
    color: '#333'
  },
  subtextStyle: { // 副标题颜色
    color: '#aaa' 
  },
  text: '费用报销',
  subtext: '副标题'  
},
```



#### 图例

```json
legend: {
  orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
  // 'horizontal' ¦ 'vertical'
  x: 'center',               // 水平安放位置，默认为全图居中，可选为：
  // 'center' ¦ 'left' ¦ 'right'
  // ¦ {number}（x坐标，单位px）
  y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
  // 'top' ¦ 'bottom' ¦ 'center'
  // ¦ {number}（y坐标，单位px）
  backgroundColor: 'rgba(0,0,0,0)',
  borderColor: '#ccc',       // 图例边框颜色
  borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
  padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
  // 接受数组分别设定上右下左边距，同css
  itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
  // 横向布局时为水平间隔，纵向布局时为纵向间隔
  itemWidth: 20,             // 图例图形宽度
  itemHeight: 14,            // 图例图形高度
  textStyle: {
    color: '#333'          // 图例文字颜色
  }
},
```

#### 值域

```json
dataRange: {
  orient: 'vertical',        // 布局方式，默认为垂直布局，可选为：
  // 'horizontal' ¦ 'vertical'
  x: 'left',                 // 水平安放位置，默认为全图左对齐，可选为：
  // 'center' ¦ 'left' ¦ 'right'
  // ¦ {number}（x坐标，单位px）
  y: 'bottom',               // 垂直安放位置，默认为全图底部，可选为：
  // 'top' ¦ 'bottom' ¦ 'center'
  // ¦ {number}（y坐标，单位px）
  backgroundColor: 'rgba(0,0,0,0)',
  borderColor: '#ccc',       // 值域边框颜色
  borderWidth: 0,            // 值域边框线宽，单位px，默认为0（无边框）
  padding: 5,                // 值域内边距，单位px，默认各方向内边距为5，
  // 接受数组分别设定上右下左边距，同css
  itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
  // 横向布局时为水平间隔，纵向布局时为纵向间隔
  itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
  itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
  splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
  color:['#1e90ff','#f0ffff'],//颜色 
  //text:['高','低'],         // 文本，默认为数值文本
  textStyle: {
    color: '#333'          // 值域文字颜色
  }
},
```

#### 工具箱

```json
toolbox: { //可视化的工具箱
  show: true,
  feature: {
    mark : { // '辅助线开关'
      show: true
    },
    dataView: { //数据视图
      show: true
    },
    restore: { //重置
      show: true
    },
    dataZoom: { //数据缩放视图
      show: true
    },
    saveAsImage: {//保存图片
      show: true
    },
    magicType: {//动态类型切换
      type: ['bar', 'line']
    }
  }
},
// 属性
toolbox: {
  orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
  // 'horizontal' ¦ 'vertical'
  x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
  // 'center' ¦ 'left' ¦ 'right'
  // ¦ {number}（x坐标，单位px）
  y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
  // 'top' ¦ 'bottom' ¦ 'center'
  // ¦ {number}（y坐标，单位px）
  color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
  backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
  borderColor: '#ccc',       // 工具箱边框颜色
  borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
  padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
  // 接受数组分别设定上右下左边距，同css
  itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
  // 横向布局时为水平间隔，纵向布局时为纵向间隔
  itemSize: 16,              // 工具箱图形宽度
  featureImageIcon : {},     // 自定义图片icon
  featureTitle : {
    mark : {
      show: true  //配置，其他类型
    }'辅助线开关',
    markUndo : '删除辅助线',
    markClear : '清空辅助线',
    dataZoom : '区域缩放',
    dataZoomReset : '区域缩放后退',
    dataView : '数据视图',
    lineChart : '折线图切换',
    barChart : '柱形图切换',
    restore : '还原',
    saveAsImage : '保存为图片'
  }
},
```

