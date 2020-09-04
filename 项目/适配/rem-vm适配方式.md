

#### rem 是什么？

根元素 html 进行计算

font-size: 16px   1rem = 16px  

375px = 23.44rem

100px =4.26rem

#### vm 是什么？

vm 根据 viewport 视图窗口来计算

1vm = 1% = 3.75px

设备物理宽度为375px  1vm = 3.75px



#### dpr 是什么？

设备像素比，物理像素和设备独立像素的比值 

iPhone6实际物理像素为 750 x 1334 ，开发者工具中我们看到的是 375 x667

设备刑诉比 dpr = 2

200px = 200/2dp = 100dp

#### VM 方案

100px = 100/375% = 26vm

> 在转换 VM 方案设置媒体查询超过宽度范围后固定body宽度， 内容居中，会出现样式影响

```css
@media screen and (min-width: 1024px) {
  html {
    max-width: 1024px;
  }
}
```



#### REM 方案

避免不同浏览器默认字体大小不一样，固定 root 元素中 font-size 

