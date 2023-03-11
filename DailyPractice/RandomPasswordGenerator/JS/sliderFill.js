// 输入：
// 1. sliderProps
// 2. slider容器需要range-slider类
// 3. 显示input实时值的容器需要有length-title类
// 4. length-title容器需要有data-length属性方便后期实时设置值

class SliderFill {
  constructor(sliderProps) {
    this.fill = sliderProps.fill;
    this.bg = sliderProps.background;

    this.slider = document.querySelector('.range-slider');
    this.sliderValue = document.querySelector('.length-title');
    this.sliderInput = this.slider.querySelector('input');

    this.applyAll(this.sliderInput);
  }
  applyAll() {
    const sliderInput = this.sliderInput;
    this.applyFill(sliderInput);

    sliderInput.addEventListener('input', event => {

      this.applyFill(event.target);
    });
  }
  applyFill(sliderInput) {
    const fill = this.fill;
    const background = this.bg;
    const sliderValue = this.sliderValue;

    const percentage = (100 * (sliderInput.value - sliderInput.min)
      / (sliderInput.max - sliderInput.min));
    const bg = `linear-gradient(90deg, ${fill} ${percentage}%, ${background} ${.1 + percentage}%`;

    sliderInput.style.background = bg;
    sliderValue.setAttribute('data-length', sliderInput.value);
  }
}

const sliderProps = {
  fill: "#0b1edf",
  background: "rgba(225, 255, 255, .214)",
};

const sliderFill = new SliderFill(sliderProps);


// ;(function() {
//   const SliderFill = function(sliderProps) {
//     this.fill = sliderProps.fill;
//     this.bg = sliderProps.background;

//     this.slider = document.querySelector('.range-slider');
//     this.sliderValue = document.querySelector('.length-title');
//     this.sliderInput = this.slider.querySelector('input');

//     this.applyAll(this.sliderInput);
//   };

//   SliderFill.prototype = {
//     applyAll: function() {
//       const sliderInput = this.sliderInput;
//       this.applyFill(sliderInput);

//       sliderInput.addEventListener('input', event => {
        
//         this.applyFill(event.target);
//       });
//     },

//     applyFill: function(sliderInput) {
//       const fill = this.fill;
//       const background = this.bg;
//       const sliderValue = this.sliderValue;

//       const percentage = (100 * (sliderInput.value - sliderInput.min) 
//                          / (sliderInput.max - sliderInput.min));
//       const bg = `linear-gradient(90deg, ${fill} ${percentage}%, ${background} ${.1 + percentage}%`;
      
//       sliderInput.style.background = bg;
//       sliderValue.setAttribute('data-length', sliderInput.value)
//     }

//   };
//   console.log(1);
//   window.SliderFill = SliderFill;
// })();