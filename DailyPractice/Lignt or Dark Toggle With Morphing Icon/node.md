### [source address](https://codepen.io/jkantner/pen/eYygqJm)

### 今天这个很简单，按钮上加了小太阳，且换按钮的时候更改主题色？
___
1. 按钮为input: checkbox
  - 为什么使用checkbox而不是radio
2. 只有一个input，所以整体就是一个和input绑定的label
3. 包含"Light"和"Dark"的区域应该也属于label，因为不管点哪里都可以切换状态
4. 按钮的颜色切换应该是在中间的那个时刻
5. 小太阳和小月亮应该是分别实现？
6. 切换的时候小太阳和小月亮是相互覆盖吗？还是说直接一个不可见？
7. 切换主题，为什么要用span？
8. CSS中的双下划线，又碰到了，到底是为什么？有什么用？

### 一些没碰到过的东西
#### role="switch"
- ARIA Accessible Rich Internet Applications
- 添加了这个的checkbox，含以上更倾向于开关而不是选中
- 提高访问性，无障碍？
[ARIA switch role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role)

> 呜呜呜~我怎么这么菜，这都是什么东西，我写的都是什么弱智问题
