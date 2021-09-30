import Vue from 'vue';

import { 
  Slider,
  Toast,
  Lazyload,
  Sticky,
  Divider, 
  Tab,
  Tabs,
  Loading,
  Popup,
  List,
  NoticeBar,
  ShareSheet,
  Dialog,
} from 'vant';

Vue.use(Toast)
  .use(Slider)
  .use(Sticky)
  .use(Lazyload, {
    loading: require('@/assets/default.png')
  })
  .use(Divider)
  .use(Tab)
  .use(Tabs)
  .use(Loading)
  .use(Popup)
  .use(List)
  .use(NoticeBar)
  .use(ShareSheet)
  .use(Dialog)