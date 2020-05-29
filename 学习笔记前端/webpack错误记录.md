### less-loader 安装打包报错

错误来源：

ERROR in ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/bbb.less

错误原因：

Module build failed: TypeError: loaderContext.getResolve is not a function

模块构建失败：类型错误：loadercontext不是一个函数

 解决方法：

less-loader版本过高导致部分函数没有，安装低版本解决这个问题



### loader图片解析

Module parse failed: 
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)

可能需要一个适当的加载程序来处理这种文件类型。

解决方法

安装url-loader

##### 使用大图片时

Module build failed: Error: Cannot find module 'file-loader'
模块构建失败:错误:无法找到模块“文件加载器”

解决方法：

安装file-loader

​	产生新问题：图片不显示

​	原因：图片路径不对

​	解决方法：webpack配置文件的出口处配置

​	output:{ publicPath: 'dist/'}

### webpack使用vue时

浏览器报错：

 You are using the **runtime-only** build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

您使用的是Vue的仅运行时构建，其中模板编译器不可用。要么将模板预编译为呈现函数，要么使用编译器包含的构建

解决方法：

webpack.config中添加配置

resolve: {

  // alias:别名

  alias: {

   //指定vue使用vue.esm.js

   'vue$': 'vue/dist/vue.esm.js'

  }

 }

1.`runtime-only`模式，代码中不可以有任何template，因为无法解析。

2.`runtime-complier`模式，代码中可以有template，因为complier可以用于编译template。

