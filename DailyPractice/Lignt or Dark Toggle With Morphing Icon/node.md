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
9. 响应式调整font-size和按钮的size

### 一些没碰到过的东西
#### role="switch"
- ARIA Accessible Rich Internet Applications
- 添加了这个的checkbox，含以上更倾向于开关而不是选中
- 提高访问性，无障碍？
[ARIA switch role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role)

### 响应式设置字体大小
```css
  font-size: calc(16px + (32 - 16) * (100vw - 320px) / (1280 - 320));
```
如果屏幕大小为320px，font-size为16px；如果屏幕大小为1280px，font-size为32px；否则就根据屏幕大小放大缩小；

其中320px为常见的移动设备屏幕宽度；那为什么是1280呢？

### 一些百分比值
- margin的百分比值相对于父级元素的宽度计算
- top、left的百分比值，相对于父级元素计算
- transform: translate()中的百分比值相对于自己计算

### ~通用兄弟选择器
- 选择某一元素同级的所有元素
- 不包含自身

### transform
- 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。
>记住这里，你先写了transform再写了rotate，发现就是位置不对，你还以为是tranform-origin的原因
- 话说tranform-origin的位置有影响吗？
  - 应该是渲染的时候先对transform-origin进行确认，不管位置在哪里都不影响

### littlesun
这个小太阳没有那个小太阳简洁，这里是设定好了原点位置，然后每次都先旋转到确切位置，再在那个方向上平移（注意，这里每次都是Y方向）


> 呜呜呜~我怎么这么菜，这都是什么东西，我写的都是什么弱智问题
> 3.13今天又差点犯同样的错误，这个的CSS命名好多，一点点相同的也要分开来写，一时间拿不准到底该从哪里入手，呆呆地坐在那里浪费了不少时间，还傻傻得考虑到底该怎么学哈哈哈！有那时间抄也抄完了，不过，我发现一个很恐怖的事实，我记得之前得那些东西得一部分东西，但是有一些细节我已经忘记了，该怎么办呢？
