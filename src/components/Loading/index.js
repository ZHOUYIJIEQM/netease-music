import Vue from 'vue'
import loadingComponent from '@/components/Loading/index.vue'

const loadingC = {}
const LoadingComp = Vue.extend(loadingComponent);
loadingC.install = (Vue) => {
  const instance = new LoadingComp();
  instance.isShow = false;
  // console.log(instance)
  document.body.appendChild(instance.$mount().$el)
  Vue.prototype.$loading = {
    show() {
      instance.isShow = true
    },
    hide() {
      instance.isShow = false
    }
  }
}

export default loadingC
