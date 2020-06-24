**1.如何居中`div`？如何居中一个浮动元素？如何让绝对定位的`div`居中？**

**水平居中**

```css
方法1：使用margin： 0 auto居中
css：
    * {margin: 0; padding: 0;}
    .content {
        margin: 0 auto;
    		width: 100px;
    		height: 100px;
        background: pink;
    }
注意：需要有一个固定宽度

// 方式2： 使用 定位 + left 居中

css: 
    * {
      margin: 0;
      padding: 0;
    }
    .content {
      width: 100px;
      height: 100px;
      background: pink;
      position: relative;
      left: 50%;
      margin-left: -50px;
    }
特点：无须知道


```

