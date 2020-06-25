const log = console.log.bind(console);

const e = (selector) => document.querySelector(selector);

const es = (selector) => document.querySelectorAll(selector);

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback);
};

const bindAll = (selector, eventName, callback) => {
  let elements = es(selector);
  for (let i = 0; i < elements.length; i++) {
    let e = elements[i];
    bindEvent(e, eventName, callback);
  }
};

const removeClassAll = function (className) {
  let selector = '.' + className;
  let elements = es(selector);
  for (let i = 0; i < elements.length; i++) {
    let e = elements[i];
    e.classList.remove(className);
  }
};

// <-------- 图片索引 ---------->
const imageIndex = (index) => {
  let slide = e('.slide-image-all');
  slide.dataset.active = String(index);
  let imageActive = 'img-active';
  removeClassAll(imageActive);
  let nextImg = '#slide-image-' + String(index);
  let newImg = e(nextImg);
  newImg.classList.add(imageActive);
};
// <---------- 底栏索引 --------->
const sliderIndex = (index) => {
  let currentDot = 'dot-active';
  removeClassAll(currentDot);
  let nextDot = '#slide-image-dot' + String(index);
  let slideDot = e(nextDot);
  slideDot.classList.add('dot-active');
};
// <------- index 集成 --------->
const switchIndex = (index) => {
  imageIndex(index);
  sliderIndex(index);
};
// <---------- 下一张图片 ------------->
const nextIndex = (slide, offset) => {
  let numberOfImgs = parseInt(slide.dataset.images, 10);
  let activeIndex = parseInt(slide.dataset.active, 10);
  let index = (activeIndex + offset + numberOfImgs) % numberOfImgs;
  return index;
};
// <---------- 图片前进后退 ----------->
const bindEventSlideControl = () => {
  let selector = '.class-slide-control';
  bindAll(selector, 'click', (event) => {
    let self = event.target;
    let slide = e('.slide-image-all');
    let offset = Number(self.dataset.offset);
    let index = nextIndex(slide, offset);
    switchIndex(index);
  });
};
// <----- 鼠标移入底栏轮播 ------>
const bindEventSlider = () => {
  let slider = '.class-slide-dot';
  bindAll(slider, 'mouseover', (event) => {
    let self = event.target;
    let index = Number(self.dataset.index);
    switchIndex(index);
  });
};
// <- 暂停开关初始化 ->
let pause = false;

// <----- 鼠标移入页面时轮播暂停 ------>
const bindEventSlideSwitch = () => {
  let container = e('.slide-image-container');
  let slide = e('.slide-image-all');
  let index = nextIndex(slide, 1);

  container.addEventListener('mouseenter', () => {
    pause = true;
  });
  container.addEventListener('mouseleave', () => {
    pause = false;
  });

  if (pause) {
    //
  } else {
    switchIndex(index);
  }
};
// <------- 图片轮播 -------->
const SlideAutoPlay = () => {
  setInterval(() => {
    bindEventSlideSwitch();
  }, 2000);
};
// <------- 事件绑定 ------->
const bindEvents = () => {
  bindEventSlideControl();
  bindEventSlider();
  SlideAutoPlay();
};
// <------ main 函数 ------->
const __main = function () {
  bindEvents();
};

__main();
