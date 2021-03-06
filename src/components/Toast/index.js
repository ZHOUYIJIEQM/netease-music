import Vue from 'vue'
import vueToastMessage from './index.vue'
const ToastTem = Vue.extend(vueToastMessage)
let instance
let timer = null
const toastMessage = (options) => {
  if (!instance) {
    instance = new ToastTem();
    // console.log('toast', instance === instance.$mount()) //true
    // console.log('toast $mount()', instance.$mount())
    document.body.appendChild(instance.$mount().$el);
  }
  if (timer) {
    clearTimeout(timer);
    timer = null;
    instance.show = false;
    instance.message = '';
  }
  instance.time = 3000;
  if (typeof options === 'string') {
    instance.message = options;
  } else if (typeof options === 'object') {
    const { message, time } = options;
    instance.message = message;
    instance.time = time || 3000;
  } else {
    return;
  }
  instance.show = true;
  timer = setTimeout(() => {
    instance.show = false;
    clearTimeout(timer);
    timer = null;
    instance.message = '';
  }, instance.time)
};
toastMessage.close = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
}
toastMessage.install = (Vue) => {
  Vue.prototype.$Toast = toastMessage
}
export default toastMessage
