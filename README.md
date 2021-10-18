# netease-music

## 用到的一些文档
1. [swiper 文档](https://www.swiper.com.cn/api/start/new.html)
1. [vant 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
1. [网易云音乐API 文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
1. [日期处理 Moment.js](http://momentjs.cn/)

## 实现功能
1. 发现页
1. 我的页
1. 云村页
1. 主页菜单
1. 登录/注册 (验证码登录, 密码登录, 找回账号, 注册)
1. 每日推荐
1. 排行榜
1. 搜索功能
1. 歌单广场
1. 歌单详情
1. 歌单评论
1. 歌曲播放


## 用到的一些模块
```
npm install -S swiper@5.4.5 vue-awesome-swiper js-md5 moment vant axios
```
> swiper 使用 5.x 的版本, npm view swiper versions 查看有哪些版本  
> [vant 自动按需引入组件需要先配置, 否则使用时没有样式](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)

## 遇到的一些问题记录
1. 使用```flex: 1;```时, ```text-overflow: ellipsis;```不起作用, 可在```flex: 1;``` 所在元素设置 ```overflow: hidden;``` 或 ```width: 0;```
1. 因为设置了超出显示省略号, 出现了文字底部显示不全
![文字底部显示不全](./preview/文字底部显示不全.jpg)  
1. 元素设置了```display: flex;```, 该元素不能同时设置 css 超出显示省略号, 因为设置后无效 :), 可以在里面套一个元素, 在里面设置 超出显示省略号
1. swiper 设置了循环自动播放, 切换到其它路由再换回来, 不能自动播放。监听路由, 离开就暂停播放, 换回来就继续播放

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
