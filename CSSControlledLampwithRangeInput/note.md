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