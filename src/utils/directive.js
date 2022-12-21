import Vue from 'vue';

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/**
 * 全局左右滑动手势
 * 示例: v-gesture="{'funcName': hideMenu, 'distanceX': 90, 'distanceY': 60}"
 * funcName: 左右滑动触发的函数
 * distanceX: 左右滑动超过数值才触发
 * distanceY: 上下滑动不超过数值才触发(因为上下滑动时, 距离可能会太大, 就当是误触)
 * type: 单向限制, left是向左滑, right是向右滑
 */
Vue.directive('gesture', {
  bind(el, binding) {
    // 距离左侧小于15, 才触发, 也就是从边缘开始滑动才触发
    let startX = 15
    let touchX = 0;
    let touchY = 0;
    let distanceX = binding.value.distanceX || 80;
    let distanceY = binding.value.distanceY || 80;
    el.addEventListener("touchstart", (e) => {
      // 获取滑动的初始位置
      touchX = e.changedTouches[0].clientX;
      touchY = e.changedTouches[0].clientY;
    });
    // 阻止浏览器自带的后台操作
    el.addEventListener("touchmove", (e) => {
      if (touchX < startX) {
        e.stopPropagation()
        e.preventDefault();
      }
    }, { passive: false, capture: true })
    el.addEventListener("touchend", (e) => {
      if (e.changedTouches[0].clientX === touchX) {
        return
      }
      // 从左向右滑
      if (
        e.changedTouches[0].clientX - touchX > distanceX &&
        Math.abs(e.changedTouches[0].clientY - touchY) <= distanceY 
      ) {
        // 执行 传入函数 参数为 字符串'right'
        // 如果没有传入 type, 也执行
        if ((binding.value.type === 'right' || !binding.value.type) && touchX <= startX) {
          return binding.value.funcName("right");
        }
      } else if (
        binding.value.type === 'left' &&
        e.changedTouches[0].clientX - touchX < -distanceX &&
        Math.abs(e.changedTouches[0].clientY - touchY) <= distanceY 
      ) {
        // 从右向左滑
        // 执行 传入函数 参数为 字符串'left'
        if (binding.value.type === 'left' || !binding.value.type) {
          return binding.value.funcName("left");
        }
      }
    });
  },
})
