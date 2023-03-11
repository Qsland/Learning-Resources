// import Matter from 'matter-js'

const splitWords = () => {
  // document.querySelector()返回文档中
  // 与指定选择器或选择器组匹配的第一个Element对象
  const textElement = document.querySelector('.text');
  // Node.textContent 返回一个节点及其后代的文本内容
  const text = textElement.textContent;
  // String.prototype.split()使用指定的分隔符字符串将一个String对象分割成子字符串数组
  // Array.prototype.map()创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
  const newDomElements = text.split(' ').map(text => {
    // String.prototype.startsWith()判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false
    if (text == "") {return;}
    const highlighted = 
      text.startsWith('the') ||
      text.startsWith('s') ||
      text.startsWith('ex');

    return `<span class="word ${
      highlighted ? 'highlighted' : null
    }">${text}</span>`;
  });

  // 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，
  // 用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将
  // 返回该元素而不使用分隔符。
  textElement.innerHTML = newDomElements.join(' ');
};

// 创建物理场景
const renderCanvas = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Runner = Matter.Runner;

  const params = {
    // 创建物体为静态，不受外力影响
    // 是为了束缚中间的元素
    isStatic: true,
    render: {
      // 物体填充色为透明  怎么修改？
      fillStyle: "transparent"
    }
  };

  // window.innerWidth 返回以像素为单位的窗口的内部宽度
  // 如果垂直滚动条存在，则这个属性将包括它的宽度。
  // window.innerHeight浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // console.log([...canvasSize]);
  // Creates a new engine, the parameter is optional
  // 新的实例？
  // {} => 使用默认配置
  const engine = Engine.create({});

  // Matter.Render模块是一个基于 HTML5 canvas 的渲染器，用于可视化
  // 创建一个新的渲染器，新的画布？
  const render = Render.create({
    // 渲染器将在body内渲染物体
    element: document.body,
    // 使用目标引擎
    engine: engine,
    options: {
      ...canvasSize,
      // 渲染器背景为透明，不设置效果等于black
      background: "transparent",
      // wireframes是决定是否使用线框渲染物体
      wireframes: false
    }
  });

  // 四面墙
  // rectangle的前两个参数是矩形的中心点
  // 中间两个是宽高
  const floor = Bodies.rectangle(
    canvasSize.width / 2,
    canvasSize.height,
    canvasSize.width,
    50,
    params
  );

  const wallLeft = Bodies.rectangle(
    0,
    canvasSize.height / 2,
    50,
    canvasSize.height,
    params
  );

  const wallRight = Bodies.rectangle(
    canvasSize.width,
    canvasSize.height / 2,
    50,
    canvasSize.height,
    params
  );

  const wallTop = Bodies.rectangle(
    canvasSize.width / 2,
    0,
    canvasSize.width,
    50,
    params
  );


  const wordElements = document.querySelectorAll('.word');
  console.log(wordElements);
  console.log(...wordElements);
  console.log([...wordElements]);

  const wordBodies = [...wordElements].map(elemRef => {
    // HTMLElement.offsetWidth只读属性，返回一个元素的布局宽度
    // offsetWidth 是测量包含元素的边框 (border)、水平线上的内边距 (padding)、竖直方向滚动条 (scrollbar)（如果存在的话）、以及 CSS 设置的宽度 (width) 的值。
    const width = elemRef.offsetWidth;
    const height = elemRef.offsetHeight;

    return {
      body: Matter.Bodies.rectangle(
        canvasSize.width / 2,
        0,
        width,
        height,
        {
          render: {
            fillStyle: "transparent"
          }
        }
      ),

      elem: elemRef,

      render() {
        // {x, y} ES6的结构语法
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - 20}px`;
        this.elem.style.left = `${x - width / 2}px`;
        // this.body.angle获取旋转角度
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      }
    };
  });
  
  // 创建了一个名为 mouse 的 Matter.js 鼠标对象
  // 将其绑定到 HTML document.body 上
  // 被用于创建 MouseConstraint
  const mouse = Matter.Mouse.create(document.body);
  
  // 创建了一个鼠标约束，将其绑定到引擎 engine 上
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    // mouse作为输入
    mouse,
    // 约束的设置
    constraint: {
      // 约束强度值，值越大越难拖动，不是很懂
      // 控制约束的弹性程度
      // 取值范围为0到1，其中0代表无弹性，1代表非常弹性
      // stiffness值越大，约束就越强，对物体施加的力就越大
      stiffness: 0.2,
      // 渲染属性
      render: {
        // 是否可见
        visible: false
      }
    }
  });

  // 分别是不同浏览器中鼠标滚轮事件的名称，这里对两种事件进行了移除监听器操作，避免出现不必要的行为。
  mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

  World.add(engine.world, [
    floor,
    ...wordBodies.map(box => box.body),
    wallLeft,
    wallRight,
    wallTop,
    mouseConstraint
  ]);

  // 将鼠标对象与渲染器关联起来，使得鼠标的行为能够被捕获并交给物理引擎处理
  render.mouse = mouse;
  // 运行物理引擎，该引擎会在一个循环中不断地更新物理状态，计算物体的位置、速度、角度等信息
  Runner.run(engine);
  // 将渲染器启动，渲染器会根据物理引擎的计算结果，将物体的位置、形态等信息渲染到画布上，从而实现物理效果的展示
  Render.run(render);
  

  // 这里是一个递归循环
  (function rerender() {
    wordBodies.forEach(element => {
      // 调用了 element.render() 方法来更新渲染画布上的物体的位置和角度等信息，从而实现了实时监视画布中的动作
      element.render();
    });
    // 调用了 Matter.Engine.update(engine) 函数来更新物理引擎，使得物体的位置、速度等属性得到计算和更新
    Matter.Engine.update(engine);
    // 主循环使用了一个递归函数 rerender() 来更新画布和物理引擎
    // 使用了 requestAnimationFrame() 函数来在每一帧中递归调用自身，从而不断更新引擎和渲染画布
    requestAnimationFrame(rerender);
  })();
};


// DOMContentLoaded 当初始的 HTML文档被完全加载和解析完成之后，
// DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
window.addEventListener('DOMContentLoaded', event => {
  splitWords();
  renderCanvas();
});