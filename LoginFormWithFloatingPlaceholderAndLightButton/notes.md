# Login Form with Floating Placeholder and Light Button
## 今天尝试写一下我第一眼看到的东西，看到的啥也不是也得写
1. login box页面居中，相对于body
> 使用position + transform
2. 内部login水平居中，login相当于标题
> 使用text-align，该属性用于定义块级盒子内的**行内内容**相对于父级元素（块级元素本身）的对齐方式
> 可以被继承
> 行内内容包含内联、内联块、文字
3. username和password应该是同样的布局
4. 标题说form with floating placeholder，应该是说form中采用float布局；username和password输入聚焦之后username和password被挤上去，难道是这里和placeholder有关系？
> 猜错了，是position布局，在不同状态下略微调整label的位置。还要结合required和:valid，不然label会掉下来
5. submit的周围一直在跑的线不知道怎么搞的，看结构写了四个span，难道是这四个span轮流转圈圈？float还是position呢？没见过，今天长长见识
6. submit应该是hover + filter: blur()?
## 百分比计算规则
- html、body、块级元素的默认高度都为auto，开始为0，根据内部元素的高度自动调整
- 百分比计算基于父元素
  - 如果父元素宽高没有绝对单位设置，且子元素没有用绝定位，百分比值相当于auto
  - 如果子元素是绝对定位，
### reference
[详解CSS中的百分比的应用](https://zhuanlan.zhihu.com/p/93084661)

## ~ 通用兄弟选择器
- 匹配属于指定元素的同级元素的所有元素

## :valid伪类
- 表示内容验证正确的<input> 或其他 <form> 元素
(选择值有效的input元素)
### [客户端验证 required and :valid](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#client-side_validation)
- required 确保输入的值是有效的（根据给定的min、max、patter等来确定那个是否合法）
- required并不会认为空字符串是非法的
- 没有required属性且没有值（或者值为空字符串）是合法的

## text-transform
- 指定如何将元素的文本大写
- 可以用于使文本显示为全大写或全小写，也可单独对每一个单词进行操作。