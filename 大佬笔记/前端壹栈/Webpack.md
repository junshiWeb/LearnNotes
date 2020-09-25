# Webpack

## 基础

### entry

- 概念：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的，每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。
- 单入口: string
- 多入口: entry 是⼀一个对象或者数组(我们告诉 webpack 需要多个独立分离的依赖图)

### output

- 概念: output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程
- option

	- filename 用于输出文件的文件名
	- chunkFilename

		- 个人理解chunkname就是未被列在entry中，但有些场景需要被打包出来的文件命名配置。比如按需加载（异步）模块的时候，这样的文件是没有被列在entry中的使用CommonJS的方式异步加载模块(通常一个entry对应一个bundle，比如按需加载单独抽离的文件就按chunkFilename命名)

	- path目标输出目录 path 的绝对路径
	- publicPath

		- webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(publicPath)。
		- 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径 举个例子🌰：publicPath: "https://cdn.example.com/assets/"
前端打包的出来的文件📃实际就是静态资源

	- library

		- library指定的就是你使用require时的模块名

	- libraryTarget

		- 配置如何暴露 library的方式（通常library不是开发库等在项目中不需要配置）

### loaders

- 概念：我们在前端构建中会遇见需要使用各式各样的文件，例如 css 代码，图片，模板代码等。webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。（注意始终理解一个概念就是babel是处理模块module的,你引入了一个模块资源就要用对应的loader去处理）

	- 举个例子🌰：举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，需要 css-loader 来处理 .css 文件（这里其实还需要 style-loader，后续详解），最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行。

- 常用loader

	- css-loader
	- less-loader
	- scss-loader
	- file-loader
	- url-loader
	- babel-loader
	- ts-loader
	- eslint-loader
	- thread-loader 多进程

### plugins

- 概念：loader 被用于转换某些类型的模块（与模块挂钩），而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
- 常用插件

	- HotModuleReplacementPlugin

		- 模块热更新插件。Hot-Module-Replacement 的热更新是依赖于 webpack-dev-server，后者是在打包文件改变时更新打包文件或者 reload 刷新整个页面，HRM 是只更新修改的部分

	- HtmlWebpackPlugin

		- 生成 html 文件。将 webpack 中entry配置的相关入口 chunk 和 extract-text-webpack-plugin抽取的 css 样式 插入到该插件提供的template或者templateContent配置项指定的内容基础上生成一个 html 文件，具体插入方式是将样式link插入到head元素中，script插入到head或者body中。

	- clean-webpack-plugin

		- clean-webpack-plugin 用于在打包前清理上一次项目生成的 bundle 文件，它会根据 output.path 自动清理文件夹；这个插件在生产环境用的频率非常高，因为生产环境经常会通过 hash 生成很多 bundle 文件，如果不进行清理的话每次都会生成新的，导致文件夹非常庞大。

	- mini-css-extract-plugin

		- 将 CSS 提取为独立的文件的插件，对每个包含 css 的 js 文件都会创建一个 CSS 文件，支持按需加载 css 和 sourceMap
		- 这个插件应该只用在生产环境配置，并且在 loaders 链中不使用 style-loader, 而且这个插件暂时不支持 HMR

	- purifycss-webpack

		- 有时候我们 css 写得多了或者重复了，这就造成了多余的代码，我们希望在生产环境进行去除。

	- optimize-css-assets-webpack-plugin

		- 我们希望减小 css 打包后的体积（进行压缩），可以用到 optimize-css-assets-webpack-plugin。

### mode

- production
- development
- none

### devltool

- 空 不生成Source Map
- eval  用eval语句包裹需要安装的模块
- source-map 生成独立的Source Map文件
- hidden-source-map  不在Javascript文件中指出Source Map文件的所在,这样浏览器就不会自动加载Source Map
- inline-source-map 将生成的Source Map转换成base64格式 内嵌在JavaScript文件中
- eval-source-map
- cheap-source-map 和source-map类似，但生成的Source Map文件中没有列的信息，因此生成的速度更快
- cheap-module-source-map 

## Webpack原理

### three-shaking

### 热更新原理

- js css直接直接热更新
- 因为框架天然支持热更新

## 拓展知识点

### babel

- 概念：Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
- 使用方法

	- 使用单体文件 (standalone script)
	- 命令行 (cli)
	- 构建工具的插件 (webpack 的 babel-loader, rollup 的 rollup-plugin-babel)。

- 配置文件
- babel可以解析js jsx ts tsx ，所以这部分工作是由babel做的 没必要交给webpack

## 打包组件库

### 提供umd、es、commonjs打包模块，提供按需加载功能

### 提供sideEffect字段，告诉webpack哪些文件是有副作用的

### 配置ts,配置tsconfig

- typescript有提供类型注解和编译的功能
- 所以你是否要编译成那种类型的js取决于你的场景

### 配置jest

### 发布到npm

### 如何进行单元测试（我的做法）

- react项目需要渲染出render才能模拟测试，你不渲染就是一个函数，都不生成html布局
- 模拟各种场景，参照测试用例
- 进行断言，查看覆盖率是否遗漏
- 值得注意的是一些框架或者库最终都是要转化为js，所以需要不同的babel去解析他们

## 性能优化

### 性能分析

- 体积分析

	- 初级分析

		- 可以通过官方提供的 stat.json 文件帮助我们分析打包结果，stat.json 文件可以通过下面语句快速生成：
		- webpack --profile --json > stats.json

	- 第三方工具

		- webpack-bundle-analyzer 是打包分析神器
		- webpack-bundle-analyzer 其底层也是依赖 stat.json 文件的，通过对 stat.json 的分析，得出最后的分析页面

- 速度分析

	- speed-measure-webpack-plugin 这个插件帮助我们分析整个打包的总耗时，以及每一个loader 和每一个 plugins 构建所耗费的时间，从而帮助我们快速定位到可以优化 Webpack 的配置

### 优化策略

- 使用新版本

	- 这个是 webpack 性能优化的万能膏药，升级版本必定能带来性能提升，而且提升很明显
	- webpack4.0 带来的优化

		- v8 引擎带来的优化（for of 替代 forEach、Map 和 Set 替代 Object、includes 替代 indexOf）
		- 默认使用更快的 md4 hash 算法
		- webpack AST 可以直接从 loader 传递给 AST，减少解析时间
		- 使用字符串方法替代正则表达式

- 体积优化

	- js 压缩

		- webpack4.0 默认在生产环境的时候是支持代码压缩的，即 mode=production 模式下
		- 实际上 webpack4.0 默认是使用  terser-webpack-plugin 这个压缩插件，在此之前是使用 uglifyjs-webpack-plugin，两者的区别是后者对 ES6 的压缩不是很好，同时我们可以开启 parallel 参数，使用多进程压缩，加快压缩

	- CSS 压缩

		- 压缩 CSS

			- 我们可以借助 optimize-css-assets-webpack-plugin 插件来压缩 css，其默认使用的压缩引擎是 cssnano

		- 擦除无用的 CSS

			- 使用purgecss-webpack-plugin来完成对无用 css 的擦除，它需要和 mini-css-extract-plugin 配合使用

	- 图片压缩

		- 一般来说在打包之后，一些图片文件的大小是远远要比 js 或者 css 文件要来的大，所以我们首先要做的就是对于图片的优化，我们可以手动的去通过线上的图片压缩工具，如 tiny png 帮我们来压缩图片
		- 但是这个比较繁琐，在项目中我们希望能够更加自动化一点，自动帮我们做好图片压缩，这个时候我们就可以借助 image-webpack-loader 帮助我们来实现。它是基于 imagemin 这个 Node 库来实现图片压缩的

	- 拆分代码

		- 有时候我们写的某些模块根本没有使用，但是还是被打包了，这样实际上会拖累 webpack 的打包速度，而且也会增加打包文件的体积，所以我们可以使用 tree-shaking 将这些代码剔除掉
		- 或者也可以使用 splitChunksPlugin 把一个大的文件分割成几个小的文件，这样也可以有效的提升 webpack 的打包速度

	- 使用动态Ployfill服务 

		- 根据浏览器user-agent动态识别 没必要全部加载上来，因为有些浏览器已经支持了 例如谷歌

	- 开启Scope Hoisting

- 速度优化

	- 分离

		- 一般来说在项目开发中，我们会区分开发和生产环境两套配置，各司其职

	- 减少查找过程

		- resolve

			- 对 webpack 的 resolve 参数进行合理配置，使用 resolve 字段告诉 webpack 怎么去搜索文件

		- 合理使用 resolve.extensions

			- 在导入语句没带文件后缀时，webpack 会自动带上后缀后去尝试询问文件是否存在，查询的顺序是按照我们配置 的 resolve.extensions 顺序从前到后查找，webpack 默认支持的后缀是 js 与 json

		- 优化 resolve.modules

			- 这个属性告诉 webpack 解析模块时应该搜索的目录，绝对路径和相对路径都能使用。使用绝对路径之后，将只在给定目录中搜索，从而减少模块的搜索层级

		- 使用 resolve.alias 减少查找过程

			- alias 的意思为 别名，能把原导入路径映射成一个新的导入路径
			- 比如我们经常使用的 react 库，其实我们可以直接使用其 dist 目录下打包好的 react.min.js，这样就能跳过耗时的模块解析

	- 缩小构建目标

		- 排除 Webpack 不需要解析的模块，即使用 loader 的时候，在尽量少的模块中去使用。
		- 我们可以借助 include 和 exclude 这两个参数，规定 loader 只在那些模块应用和在哪些模块不应用

	- 利用多线程提升构建速度

		- thread-loader

			- webpack 官方推出的一个多进程方案，用来替代 HappyPack
			- 原理和 HappyPack 类似，webpack 每次解析一个模块，thread-loader 会将它及它的依赖分配给 worker 线程中，从而达到多进程打包的目的

	- 预先编译资源模块（DllPlugin）

		- 我们在打包的时候，一般来说第三方模块是不会变化的，所以我们想只要在第一次打包的时候去打包一下第三方模块，并将第三方模块打包到一个特定的文件中，当第二次 webpack 进行打包的时候，就不需要去 node_modules 中去引入第三方模块，而是直接使用我们第一次打包的第三方模块的文件就行。
		- webpack.DllPlugin 就是来解决这个问题的插件，使用它可以在第一次编译打包后就生成一份不变的代码供其他模块引用，这样下一次构建的时候就可以节省开发时编译打包的时间

	- 缓存 Cache 相关

		- 我们可以开启相应 loader 或者 plugin 的缓存，来提升二次构建的速度。一般我们可以通过下面几项来完成

			- babel-loader 开启缓存
			- terser-webpack-plugin 开启缓存

	- 合理使用 sourceMap

		- 之前我们有讲过，之前我们打包生成 sourceMap 的时候，如果信息越详细，打包速度就会越慢

## 文件指纹策略

### 概述：打包后输出的文件名后缀，用于做版本管理

### 文件指纹类型

- hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改。
- chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值

	- 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件(存在内存中)，webpack 会对这个 chunk 文件进行一些操作，所以我们根据entry还有模块之间的依赖关系来判断模块是否处于同一个chunk

- contenthash：根据文件内容来定义hash，文件内容不变，contenthash不变

	- 它的出现主要是为了解决，让css文件不受js文件的影响。比如foo.css被foo.js引用了，所以它们共用相同的chunkhash值。但这样子是有问题的，如果foo.js修改了代码，css文件就算内容没有任何改变，由于是该模块的 hash 发生了改变，其css文件的hash也会随之改变

### JS、CSS文件的指纹策略

- JS资源

	- 采用chunkhash
	- 如果采用contenthash根据JS文件内容来生成hash,但是一旦样式修改了，css文件名会变化，此时JS文件应该也要变化，重新引入正确✅的文件才对

- 当使用mini-css-extract-plugin插件抽离css文件时候，该插件可以获取到webapck中hash以及其该chunk下的hash，当然改插件还可以自己根据文件内容生成hash也就是contenthash

### 图片的文件指纹

- 当我们使用file-loader处理图片等资源时候，其选项contenthash以及hash选项是自己内部生成的，❗️不采用webpack中的hash

## 模块

###  module

- 对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 module 

### chunk

- 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作
- 一般来说一个 chunk 对应一个 bundle，比如上图中的 utils.js -> chunks 1 -> utils.bundle.js；但也有例外，比如说上图中，我就用 MiniCssExtractPlugin 从 chunks 0 中抽离出了 index.bundle.css 文件。
- ❗️通常存在于内存中

### bundle

- webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

### 本质

- module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字
- 我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle

## 参考文章

### webpack 中那些最易混淆的 5 个知识点
https://juejin.im/post/5cede821f265da1bbd4b5630#heading-1

### 一口(很长的)气了解 babel（https://juejin.im/post/5c19c5e0e51d4502a232c1c6#heading-3）

## 

*XMind - Trial Version*