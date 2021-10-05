# netease-music

## 用到的一些文档
1. [swiper 文档](https://www.swiper.com.cn/api/start/new.html)
1. [vant 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
1. [网易云音乐API 文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
1. [日期处理 Moment.js](http://momentjs.cn/)

## 用到的一些模块
```
npm install -S swiper@5.4.5 vue-awesome-swiper js-md5 moment vant axios
```
> swiper 使用 5.x 的版本, npm view swiper versions 查看有哪些版本
> [vant 自动按需引入组件需要先配置, 否则使用时没有样式](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)

## 遇到的一些问题记录
1. 使用```flex: 1;```时, ```text-overflow: ellipsis;```不起作用, 可在```flex: 1;``` 所在元素设置 ```overflow: hidden;``` 或 ```width: 0;```
1. 因为设置了超出显示省略号, 出现了文字底部显示不全
![文字底部显示不全](./preview/文字底部显示不全1.jpg)  
![文字底部显示不全](./preview/文字底部显示不全2.jpg)
1. 元素设置了```display: flex;```, 该元素不能同时设置 css 超出显示省略号, 因为设置后无效 :), 可以在里面套一个元素, 在里面设置 超出显示省略号

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
