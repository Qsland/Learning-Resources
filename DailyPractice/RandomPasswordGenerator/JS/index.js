const sliderProps = {
  fill: "#0b1edf",
  background: "rgba(225, 255, 255, .214)",
};

const slider = document.querySelector('.range-slider');
const sliderValue = document.querySelector('.length-title');
const sliderInput = slider.querySelector('input');

// slider track's style
applyFill(sliderInput);
sliderInput.addEventListener('input', event => {
  // console.log(event)
  // console.log(event.target.value)
  sliderValue.setAttribute('data-length', event.target.value);
  applyFill(event.target);
});


const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('slider');

const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy-btn');
const resultContainer = document.querySelector('.result');
const copyInfo = document.querySelector('.result-info.-right');
const copiedInfo = document.querySelector('.result-info.-left');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

let generatedPassword = false;



// add a mouseover listener to the container to update the position of the copy button based on mouse position
/**思路：
 * 在generatedPassword为true时，也就是已经产生了password的时候改变位置
 * 否则就还是没反应
 * 当光标在container上移动的时候根据MouseMove事件的位置信息
 * 改变copybtn的位置
 */
resultContainer.addEventListener('mousemove', event => {
  // resultContainer's position
  // 这个信息需要实时获取，不然当window resize的时候就会发生光标和图标位置不一致的情况
  // 就可以不用监听window了
  let resultContainerBound = {
    // Element.getBoundingClientRect()
    // 返回一个DOMRect对象，提供元素的大小，以及相对于**视口**的位置
    left: resultContainer.getBoundingClientRect().left,
    top: resultContainer.getBoundingClientRect().top,
  };
  // MouseEvent包含位置信息，继承于UIEvent -> Event
  // x, y === clientX, clientY
  console.log('x, y: ', event.x, event.y)
  console.log(resultContainerBound.left, resultContainerBound.top);

  if (generatedPassword) {
    copyBtn.style.opacity = '1';
    // 鼠标指针在元素内部或边界时，svg元素会成为鼠标事件的目标
    copyBtn.style.pointerEvents = 'all';
    copyBtn.style.setProperty('--x', `${event.x - resultContainerBound.left}px`);
    copyBtn.style.setProperty('--y', `${event.y - resultContainerBound.top}px`);
  } else {
    copyBtn.style.opacity = '0';
    copyBtn.style.pointerEvents = 'none';
  }

});

// copy password in clipboard
// cool hahahaha 好可怜，我第一次遇到这个，应该很有趣？
/** copy -> document.execCommand()  
 * 先创建textarea
 * 给textarea赋值
 * 添加到DO0M树中
 * 选中textarea中的文本
 * 使用document.execCommand()执行copy命令
 * 从DOM树中删除
 */
copyBtn.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerHTML;

  if(!password || password === 'click generate') {
    return;
  }


  textarea.value = password;
  document.body.appendChild(textarea);
  /**HTMLInputElement.select() 方法选中一个 <textarea> 元素
   * 或者一个带有 text 字段的 <input> 元素里的所有内容 
   */
  textarea.select();
  document.execCommand('copy');
  // 从dom中彻底删除
  textarea.remove();
});

// generate password
generateBtn.addEventListener('click', event => {
  const length = +lengthEl.value;
  console.log(length);
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  generatedPassword = true;

  resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
  
  copyInfo.style.transform = 'translateY(0%)';
  copyInfo.style.opacity = '.75';
  copiedInfo.style.transform = 'translateY(200%)';
  copiedInfo.style.opacity = '0';
});

// forEach 不会直接改变调用它的对象，但是那个对象可能会被 callbackFn 函数改变
[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
  el.addEventListener('click', () => {
    disableOnlyCheckbox();
  });
});



// 滑块的颜色是用渐变实现的
function applyFill(sliderInput) {
  const percentage = (100 * (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min));
  // console.log(percentage)
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + .1}%)`;
  sliderInput.style.background = bg;
  sliderValue.setAttribute('data-length', sliderInput.value);
}

// randomFunc
function getRandomLower() {
  // Math.floor() 返回小于等于一个给定数字的最大整数
  // Math.random() 返回一个浮点数，伪随机数在范围从0 到小于1 [0, 1]
  // Math.fromCharCode() 返回由指定的 UTF-16 代码单元序列创建的字符串。
  // 小写字母的UTF-16 代码单元序列a-z -> 97-122  共26个
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  // 大写字母的代码单元序列A-Z -> 65-90
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function getRandomNumber() {
  // 数字0-9 -> 48-57
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function getRandomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(length, lower, upper, number, symbol) {
  let generatedPassword = '';
  const typeCount = lower + upper + number + symbol;

  // filter -> 过滤 -> 合格的元素 -> 浅拷贝
  // Object.values()返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同，不枚举原型链中的元素
  const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); 

  if (typeCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i++) {
    typeArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  console.log(generatedPassword)
  // slice[beginInedx[, endIndex]]
  // 生成何时长度的密码后，打乱重排
  return generatedPassword.slice(0, length)
                          .split('').sort(() => Math.random() - 0.5)
                          .join('');
}

function disableOnlyCheckbox() {
  let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked);

  // disabled 不可输入不可提交，readonly不可输入，可以提交
  totalChecked.forEach(el => {
    if (totalChecked.length === 1) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
  });
}