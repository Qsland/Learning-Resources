# on-event
- on-event(onclick)是DOM元素的事件处理程序属性
- 每一个事件类型都对应一个事件处理程序属性，属性名区分大小写
- on-event 事件处理器将事件处理程序绑定到目标DOM元素对应的事件处理程序属性上
- 缺点：只能绑定一个事件，因为是作为属性被绑定，所以重复绑定会覆盖之前的绑定
- 有两种设置事件程序处理属性的方法
	- 通过HTML
		- 直接在HTML文件中设置为对应标签的属性
		- 属性值
			-  一段Javascript代码字符串
				- 是处理程序的函数体而非函数声明
			- 调用的在单独的script中或在外部文件中定义的函数
		- 浏览器会将属性值的JavaScript的字符串转换为一个函数
			- 这段代码的作用域链也因此被扩展
				- 以`<div onclick="console.log(0)"></div>`为例子，会有如下函数：
				```javascript
				function(event) {
					with(document) {
						with(this) {
						`...`
						}
					}
				}
				```
				- 通过with扩展作用域链后，代码段可以直接的访问自身以及document对象的属性
				- 缺陷：JS与HTML的强耦合；作用域扩展在不同浏览器中的表现可能不同，有兼容性问题；
		- 注意事项
			- 多行代码用分号分隔或使用回车将属性值分成多行
			- 包含HTML语法字符时需要使用转义字符
		- 移除
			- 使用`dom.onclick = null;`
		- this值为注册事件处理程序的对象，元素本身
	- 通过JavaScript
		- 在第四代Web浏览器中开始被支持，属于DOM0事件处理程序
		- 赋值给属性的方法被视为元素的方法
		- this值等于元素
		- 通过this可以访问元素的任意属性和方法
		- 移除：`dom.onclick = null;`
- 在事件流的冒泡阶段注册事件处理程序

# addEventListener
- addEventListener是所有可以作为目标对象的方法
	- 包括Document对象、Window对象以及所有文档元素
>使用这个方法为目标对象注册事件处理函数时，对象的内部会有一个事件监听列表，事件监听列表是一个对象，用于存储该目标对象上所注册的所有事件处理函数。
>事件监听列表对象的属性对应事件类型，属性值为一个数组，存储注册了该事件类型的事件处理函数，数组添加是从最后面添加，这也解释了为什么多个事件处理函数是按顺序执行的。
>``` javascript
>{
>	click: [
>		{
>			handlerClick1: function () {},
>			options: { passive: true }
>		}, 
>		handlerClick2]
>}
>```
>当事件被触发时，浏览器会遍历属性对应的数组，依次执行其中的每个事件处理函数。
- 用于注册目标为调用对象的事件处理程序。想要为某个对象注册事件就调用对象的这个方法。
- 属于DOM2事件处理程序
- 接收三个参数
	- 事件类型
		- 事件类型（名称）
		- 字符串
	- 事件处理函数
	- 布尔值 / 对象
		- 布尔值 useCapture
			- 默认值为false
			- true：注册为捕获事件处理程序
				- 指定为true时，在移除事件处理程序时也需要传递true
			- false/省略：注册为冒泡事件处理程序
		- 对象
			- capture
				- true -> 捕获事件处理程序
				- false/省略 -> 冒泡事件处理程序
			- once
				- true -> 事件监听器触发一次后自动移除
				- false/省略 -> 永远不会自动移除
			- passive
				- true -> 永远不调用preventDefault()取消默认动作
					- 如果仍然调用 -> 客户端将会忽略它并抛出一个控制台警告
					- 使用passive改善滚屏性能
				- false/省略 -> 允许调用
- 移除：只能使用removeEventListener()并传入与添加事件处理函数时相同的参数
	- 无法移除匿名函数
		- 因为匿名函数不能通过函数名称来引用
		- 类似的一个你踩到的坑，下面的代码是给test的click事件添加了两个事件处理函数，因为都是在局部作用域中重新定义了一个非全局变量，两个互不干扰
>		```
>			test.addEventListener('click', function a() {});
>			test.addEventListener('click', function a() {})
>		```
		
	- 第三个参数中只有capture有用
		- once 和 passive即使传入也会被忽略
- 优势：可以为同一个目标对象的同一个事件类型注册多个处理程序
- 顺序
	- 按照注册的顺序依次执行
	- 并且不会影响on-event属性的值，并且也会顺序执行
	- 但是用完全相同的参数使用addEventListener多次注册不会影响执行顺序
## 事件监听对象（Event Listener Object）与事件监听列表（Event Listener List）
### 事件监听对象   
>是一个包含了事件监听相关信息的对象，包括要监听的事件类型、事件处理函数以及选项对象等.
>每次调用该方法都会创建一个新的事件监听对象，并将其添加到事件监听列表中。这也解释了为什么你踩到的那个坑里边传入的都是局部变量了。

### 事件监听列表
>是指一个存储所有事件监听对象的列表，用于管理元素上注册的所有事件监听。
>触发事件时，浏览器会遍历事件监听列表，并依次执行每个事件监听对象中存储的事件处理函数。
>捕获阶段的事件处理函数会被添加到事件监听列表的头部，而冒泡阶段的事件处理函数会被添加到事件监听列表的尾部

## 移除匿名函数
[移除匿名函数的事件监听 - 掘金 (juejin.cn)](https://juejin.cn/post/7041143073212104741)
# reference 
- [前端面试之onclick与addEventListener区别 - 掘金 (juejin.cn)](https://juejin.cn/post/7082742553769934879)
- [on-event事件处理器与addEventListener区别](https://blog.csdn.net/qq799028706/article/details/99672934)
- JavaScript权威指南-15.2事件(382)
- JavaScript高级程序设计（第四版）-17 事件(490)
- [EventTarget.addEventListener() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)