const sliderProps = {
  fill: "#0b1edf",
  background: "rgba(225, 255, 255, .214)",
};

const slider = document.querySelector('.range-slider');
// console.log(slider);
const sliderValue = document.querySelector('.length-title');
// console.log(sliderValue);
const sliderInput = slider.querySelector('input');

applyFill(sliderInput);
sliderInput.addEventListener('input', event => {
  console.log(event)
  // console.log(event.target.value)
  sliderValue.setAttribute('data-length', event.target.value);
  applyFill(event.target);
});

// 滑块的颜色是用渐变实现的
function applyFill(sliderInput) {
  const percentage = (100 * (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min));
  console.log(percentage)
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + .1}%)`;
  sliderInput.style.background = bg;
  sliderValue.setAttribute('data-length', sliderInput.value);
}
