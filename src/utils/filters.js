import Vue from "vue";
import moment from 'moment'

/**
 * @description 转换播放数量
 */
Vue.filter("formatNum", function(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return num;
  }
});

/**
 * @description 格式化时间
 */
Vue.filter("formatTime", function(time) {
  moment.locale('zh-cn')
  let timestamp = Number(time)
  let now = Date.now()
  let gap = now - timestamp
  let oneDay = 60 * 60 * 24 * 1000
  if (gap <= oneDay * 2) {
  // 2天内
    return moment(timestamp).calendar();
  } else if (gap > 2 * oneDay && gap <= oneDay * 365) {
  // 2天以上 一年以内
    return moment(timestamp).format("MM月DD日")
  } else {
    return moment(timestamp).format("YYYY年MM月DD日")
  }
});
