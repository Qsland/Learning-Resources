[源地址](https://codepen.io/gayane-gasparyan/pen/WqMeQp)
## CSS变量 / CSS自定义属性
- 规则
  - 以--开始
  - 值：任意有效的CSS值
  - 写在规则集内
    - :root 写在:root伪类中可以保证在HTML文档的任意地方都能访问到
      - :root 匹配文档树的根元素
- 优势
  - 便于维护
  - 自定义变量一般是语义化较强的标识，方便阅读理解
- 级联约束（CSS规则顺序），可以从父元素继承
### Reference
https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

## input-range
- 滑块输入值
- 适用于精确度不那么重要的
- 允许用户指定一个数值，该数值必须不小于给定值，不大于另一个给定值
- min、max默认为0和100
- step默认为1

### 是不是应该先分析一下都是什么样的布局，即便不是说的术语，不要无脑冲，脑袋瓜转起来
- 比如那个小太阳
  - position布局 + transform: rotate() 旋转


## 3.6 昨天没看到底是怎么控制range的value联动到lamp的，今天看到了，有一丝丝印象是我之前忘记是什么原因去专门查了一下on-event和addEventListener，就记得HTML里的on-event可以访问到所有docuent节点，今天也算复习了吧，前途堪忧哈哈哈哈