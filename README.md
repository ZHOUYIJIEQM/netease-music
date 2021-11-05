# netease-music

## 用到的一些文档
1. [网易云音乐API 文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
1. [swiper 文档](https://www.swiper.com.cn/api/start/new.html)
1. [vant 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
1. [日期处理 Moment.js](http://momentjs.cn/)

## 已实现
1. 发现页
1. 我的页
1. 云村页
1. 主页菜单 (退出登录在底部)
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
> swiper 使用 5.x 的版本, npm view swiper versions 查看有哪些版本, 再安装 swiper@xxx 版本  
> [vant 自动按需引入组件需要先配置, 否则使用时没有样式](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)

## 记录
1. 请求设置
    - ```axios```请求中, 在登录后需要携带的参数```cookie```。 ```POST```请求```url```必须添加时间戳, 不然得到的是缓存结果
1. 发现
    - 根据登录状态, 从[首页-发现](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e9%a6%96%e9%a1%b5-%e5%8f%91%e7%8e%b0)接口获取数据, 没登录, 一次性得到全部数据, 登录后, 则需要传入```cursor```参数, 不然只得到一部分数据
    - 登录后滚动到底部, 再获取新的数据
    - 获取到的数据看起来挺繁杂, 只提取需要的数据
    - 登录后, 推荐歌单数据里没有第一项轮播的内容, 可以从[歌单分类](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e5%8d%95%e5%88%86%e7%b1%bb)获取分类类型, 再随机获取分类类型, 根据类型从[精品歌单](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e5%8d%95-%e7%bd%91%e5%8f%8b%e7%b2%be%e9%80%89%e7%a2%9f-)中获取数据, 这样, 每次刷新就得到不同的数据, 看起来就像是得到推荐数据
    - ```swiper```设置了自动轮播, 但离开当前路由再返回后又不能自动播放, 需要在离开时设置暂停播放, 返回后再重新开始播放
1. 我的
    - 登录后根据用户id[获取用户歌单](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95), 判断是否是歌单创建者, 分出创建的歌单和收藏的歌单
1. 云村
    - 推荐视频需要登录, 未登录前, 使用[全部mv](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%85%a8%e9%83%a8-mv)接口
    - 因为页面存在多个```video```, 切换其他```video```播放时, 卸载/销毁当前的播放器
    ```js
      vdoEle.pause()
      vdoEle.removeAttribute('src')
      vdoEle.load()
    ```
    - 播放器播放时, 离开当前可视范围, 暂停播放, 使用交叉观察器```IntersectionObserver```, 判断是否离开了可视范围, 离开后暂停
    - 用于一个全局变量保存视频id, 监听它, 改变后卸载与视频id不同的video元素
    - 移动端chrome video 切换到后台后会自动暂停, 不能继续播放
1. 登录
    - 记录进入登录页前的路由, 登录后返回改路径
    - 输入手机号后判断是否已经注册过, 未注册则弹框提示去注册
    - 登录后保存用户信息
1. 菜单
    - 主要功能是: 登录/退出
    - 菜单使用 vant 弹出层, 弹出层的css中设置了```transform```, 所以在子孙元素css中设置```position:fixed;```无效
1. 歌单详情页面
    - [获取歌单详情](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85), 并从里面 trackIds 提取歌单的所有歌曲 id, 根据 id [获取歌曲信息](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85), 每次最多加载100首曲, 滚动到底触发加载更多歌曲
    - 添加触碰离开事件, 滚动高度在歌单介绍处, 向上/下滚动到指定内容
    - 添加滚动事件, 设置头部背景透明度, 歌单介绍背景弧度, playlistbar透明度
    - 点击订阅, 如果未登录, 此时显示未订阅(+)图标, 点击则弹窗提示去登录, 如果登录, 且是自己创建的歌单, 显示已订阅(勾选)图标且颜色为灰色, 如果不是自己创建的歌单, 判断是否已经订阅过, 显示对应图标, 点击后切换图标, 订阅人数加1
    - 点击歌单介绍内容, 弹出另一个歌单详情介绍, 保存封面, 处理直接按返回键()
1. 歌单广场
    - 用轮播来显示对应的tab
    - 用对象数组来保存分页, 对应滚动高度
    - 轮播项切换时, 如果还未存在数据, 则加载, 每个轮播项上拉到底加载更多数据
    - 每次离开页面后返回, 每个轮播项滚动到离开前保留的位置

## 遇到的一些问题
1. 移动端chrome, 滚动页面隐藏地址栏, 体验不太好, 可以添加到主屏幕
1. 使用```flex: 1;```时, 子元素```text-overflow: ellipsis;```不起作用, 可在```flex: 1;``` 所在元素设置 ```overflow: hidden;``` 或 ```width: 0;```
1. 因为设置了超出显示省略号, 出现了文字底部显示不全，可设置行高
![文字底部显示不全](./preview/文字底部显示不全.jpg)  
1. 元素设置了```display: flex;```, 该元素不能同时设置 css 超出显示省略号, 因为设置后无效 :), 可以在里面套一个元素, 在里面设置 超出显示省略号
1. swiper 设置了循环自动播放, 切换到其它路由再换回来, 不能自动播放。监听路由, 离开就暂停播放, 换回来就继续播放
1. 如果浏览器在歌单页面关闭, 下次打开按导航返回没有效果

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
