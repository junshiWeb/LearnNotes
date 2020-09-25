# axios学习

## ajax原理

### 概述：实际利用XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。

### XMLHttpRequest属性和方法

- XMLHttpRequest.onreadystatechange

	- 只要 readyState 属性发生变化，就会调用相应的处理函数。这个回调函数会被用户线程所调用。XMLHttpRequest.onreadystatechange 会在 XMLHttpRequest 的readyState 属性发生改变时触发 readystatechange 事件的时候被调用

- XMLHttpRequest.readyState （只读）

	- XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest  代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个

		- 0	UNSENT	代理被创建，但尚未调用 open() 方法
		- 1	OPENED	open() 方法已经被调用。
		- 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得
		- 3	LOADING	下载中； responseText 属性已经包含部分数据
		- 4	DONE	下载操作已完成

- XMLHttpRequest.status

	- 只读属性 XMLHttpRequest.status 返回了XMLHttpRequest 响应中的数字状态码。status 的值是一个无符号短整型。在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0
	- status码是标准的HTTP status codes。举个例子，status 200 代表一个成功的请求。如果服务器响应中没有明确指定status码，XMLHttpRequest.status 将会默认为200

- XMLHttpRequest.response（只读）

	- XMLHttpRequest response 属性返回响应的正文。返回的类型为 ArrayBuffer 、 Blob 、 Document 、 JavaScript Object 或 DOMString 中的一个。 这取决于 responseType 属性

- XMLHttpRequest.responseText（只读）

	- XMLHttpRequest.responseText 在一个请求被发送后，从服务器端返回文本

- XMLHttpRequest.responseType
- XMLHttpRequest.timeout

	- XMLHttpRequest.timeout 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。超时并不应该用在一个 document environment 中的同步 XMLHttpRequests  请求中，否则将会抛出一个 InvalidAccessError 类型的错误。当超时发生， timeout 事件将会被触发

- XMLHttpRequest.withCredentials

	- 一个布尔值，用来指定跨域 Access-Control 请求是否应当带有授权信息，如 cookie 或授权 header 头。

- XMLHttpRequest.abort()

	- 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。当一个请求被终止，它的 readyState 属性将被置为0（ UNSENT )

- XMLHttpRequest.open()

	- XMLHttpRequest.open() 方法初始化一个请求。该方法要从JavaScript代码使用；从原生代码初始化一个请求，使用openRequest()替代。

- XMLHttpRequest.send()

	- XMLHttpRequest.send() 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

- XMLHttpRequest.setRequestHeader()

	- 设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用 setRequestHeader() 方法

## 为什么URL参数要进行utf-8转码 

### 对于Url来说，之所 以要进行编码，是因为Url中有些字符会引起歧义。

### 例子：
如Url参数字符串中使用key=value键值对这样的形式来传参，键值对之间以&符号隔，如/s?q=abc&ie=utf- 8。如果你的value字符串中包含了=或者&，那么势必会造成接收Url的服务器解析错误，因此必须将引起歧义的&和=符号进行转义， 也就是对其进行编码。 如：我想把 username 整个当做参数传递给 CGI, 而不让 CGI 将username 分割掉。这话听不明白的话我换种方式来说，如果 username = 'a&foo=boo' 而不用 encodeURIComponent 的话，整个参数就成了 name=a&foo=boo, 这样 CGI 就获得两个参数 name 和 foo. 这不是我们想要的。
又如，Url的编码格式采用的是ASCII码，而不是Unicode，这也就是说你不能在Url中包含任何非ASCII字符，例如中文。否则如果客户端浏 览器和服务端浏览器支持的字符集不同的情况下，中文可能会造成问题。

### 方法

- 统一资源标识符，或叫做 URI，是用来标识互联网上的资源（例如，网页或文件）和怎样访问这些资源的传输协议（例如，HTTP 或 FTP）的字符串。除了encodeURI、encodeURIComponent、decodeURI、decodeURIComponent四个用来编码和解码 URI 的函数之外 ECMAScript 语言自身不提供任何使用 URL 的支持。
- encodeURI
- encodeURIComponent
- decodeURI
- decodeURIComponent

## api层

### 1. 使⽤⼯⼚模式导出对象。以
Axios原型上的request⽅法为本
体

### 2. 在request⽅法上扩展类原型
上的⽅法属性

### 3. 在request⽅法上扩展实例⽅
法属性

## Axios类

### 1. 构造函数

- 默认初始化配置
- 初始化请求前与请求后的拦截器
实例

### 2. 核⼼！request⽅法

- 格式化参数

	- 变参
	- 合并默认选项

- 核⼼！组装拦截器

	- 1. 拦截器的组成

		- ⼀个传递给.then⽅法的
“fulﬁlled”回调函数
		- ⼀个传递给.then⽅法的
“rejected”回调函数

	- 2. 如何组装拦截器

		- 1. 设计模式：职责链模式
		- 2. 以let p =
Promise.resolve(conﬁg)，即转
为Promise的配置项会职责链开
端
		- 3. 职责链以核⼼的拦截器为起
点，前⾯拼接请求前的拦截器，
后⾯拼接请求后的拦截器

			- ！核⼼拦截器为
[{“dispatchRequest”, 
undeﬁned}]

		- 4. Promise的then⽅法均会返回
⼀个新Promise，通过拼
接.then，完成⼀条已conﬁg为开
端的职责链

### 3. 以HTTP规范method为键名的
快捷调⽤⽅式。具体实现只是在
request⽅法上抽象⼀层

- ['delete', 'get', 'head', 'options’]等
简单请求为⼀类抽象
- ['post', 'put', 'patch’]等请求为另
⼀类

## 适配器adaptor(也就是XHR处理模块)

### 多处细节

- 1. 请求数据若为FormData，则
去除请求头的Content-Type字
段，让浏览器⾃动设置
- 2. 若配置了HTTP basic授权，
则需要设置请求头的
Authorization字段

### 1. 构建url（buildUrl）

- ❗️可以理解为专门处理get请求的
- 若配置指定了序列化参数的函
数，则使⽤指定函数
- 若参数为URLSearchParams类
型，则直接执⾏toString⽅法
- ⼿动格式化

	- 数组格式化为类似
[]foo=1&[]foo=2&[]foo=3的结
构
	- Date类型执⾏toISOString做格
式化
	- 为纯对象则转为json字符串
	- 拼接所有的参数键值对，导出格
式化结果

### 2. 调⽤open，设置请求⽅法、
url、是否异步（默认异步）

### 3. 设置超时时间

### 4. 核⼼回调
onreadystatechange

- 1. readyState与状态码符合要
求，则resolve，否则reject
- 2. 格式化response对象

	- 1. 原⽣返回的响应状态：status
与statusText
	- 2. 按照responseType，返回响
应值responseData
	- 3. getAllResponseHeaders获取
响应头。再使⽤预先准备的格式
化函数，格式化响应头
	- 4. ⽅便请求的调试，保留conﬁg
配置对象与request请求对象

### 5. 失败回调

- ontimeout
- onerror
- onabort

### 6. 设置请求头：调⽤原⽣的
setRequestHeader⽅法

### 7. 设置withCredentials

### 8. 设置responseType

### 9.发送请求

*XMind - Trial Version*