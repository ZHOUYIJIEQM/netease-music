# netease-music
> 界面模仿网易云音乐app, 基于 vue+vuex+vue-router+axios 开发, 仅供学习使用。

## <a id="流程记录标题">[记录项目过程中遇到的一些问题](#流程记录)</a>

## 用到的一些文档
1. [网易云音乐API 文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
1. [swiper 文档](https://www.swiper.com.cn/api/start/new.html)
1. [vant 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
1. [日期处理 Moment.js](http://momentjs.cn/)


## 线上效果(都是在国外, 速度慢)
1. [点此链接查看效果, F12后切换到移动端预览](https://app.yjsjyb.top/music)

## <a id="feature">实现的功能</a>
1. [发现页](#发现页)
  > 推荐歌单 推荐歌曲 精选音乐视频 热门播客 专属场景歌单 新歌,新碟,数字专辑 音乐日历 云村KTV 广播电台 视频歌单
2. [我的页](#我的页)
  > 创建歌单 收藏歌单
3. [云村页](#云村页)
  > 推荐视频(播放,离开视图区域暂停播放)
4. [菜单(退出登录在底部)](#菜单)
5. [登录/注册](#登录)
  > 登录 手机号 验证码 密码
6. [每日推荐](#每日推荐)
7. [排行榜](#排行榜)
  > 滚动导航
8. [歌单广场](#歌单广场)
  > 标签轮播切换
9. [歌单详情](#歌单详情)
10. [歌单评论](#歌单评论)
11. [搜索功能](#搜索功能)
  > (默认搜索页, 搜索提示页, 搜索结果页) 待完善
12. [播放器](#播放器)
  > 收藏/取消 歌曲切换(循环,单曲,随机) 歌词滚动 播放列表
13. [视频播放器](#mv播放器)

<hr>

## <a id="发现页">[发现页](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/发现页1.jpg" alt="发现页1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/发现页2.jpg" alt="发现页2.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/发现页3.jpg" alt="发现页3.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/发现页4.jpg" alt="发现页4.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/发现页5.jpg" alt="发现页5.jpg">

<hr>

## <a id="我的页">[我的页](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/我的页1.jpg" alt="我的页1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/我的页2.jpg" alt="我的页2.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/我的页3.jpg" alt="我的页3.jpg">

<hr>

## <a id="云村页">[云村页](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/云村页1.jpg" alt="云村页1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/云村页2.jpg" alt="云村页2.jpg">

<hr>

## <a id="菜单">[菜单](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/菜单1.jpg" alt="菜单1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/菜单2.jpg" alt="菜单2.jpg">

<hr>

## <a id="登录">[登录](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/登录页1.jpg" alt="登录页1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/手机号.jpg" alt="手机号.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/密码.jpg" alt="密码.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/验证码.jpg" alt="验证码.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/找回账号 密码.jpg" alt="找回账号 密码.jpg">

<hr>

## <a id="每日推荐">[每日推荐](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/每日推荐.jpg" alt="每日推荐.jpg">

<hr>

## <a id="排行榜">[排行榜](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/排行榜.jpg" alt="排行榜.jpg">

<hr>

## <a id="歌单广场">[歌单广场](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单广场1.jpg" alt="歌单广场.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单广场2.jpg" alt="歌单广场.jpg">

<hr>

## <a id="歌单详情">[歌单详情](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单详情1.jpg" alt="歌单详情.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单详情2.jpg" alt="歌单详情.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单详情3.jpg" alt="歌单详情.jpg">

<hr>

## <a id="歌单评论">[歌单评论](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/歌单评论.jpg" alt="歌单评论.jpg">

<hr>

## <a id="搜索功能">[搜索功能](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索页.jpg" alt="搜索页.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索提示.jpg" alt="搜索提示.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索结果1.jpg" alt="搜索结果1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索结果2.jpg" alt="搜索结果2.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索结果3.jpg" alt="搜索结果3.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/搜索结果4.jpg" alt="搜索结果4.jpg">

<hr>

## <a id="播放器">[播放器界面](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/播放器界面1.jpg" alt="播放器界面1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/播放器界面2.jpg" alt="播放器界面2.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/播放列表界面.jpg" alt="播放列表界面.jpg">

## <a id="mv播放器">[mv播放器界面](#feature)</a>
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/mv播放器1.jpg" alt="mv播放器1.jpg">
<img style="display: block; width: 360px; margin: 20px 0; box-shadow: 0px 0px 20px -6px #868686" src="./preview/mv播放器2.jpg" alt="mv播放器2.jpg">



## 用到的一些模块
```
npm install -S swiper@5.4.5 vue-awesome-swiper js-md5 moment vant axios
```
> swiper 使用 5.x 的版本, npm view swiper versions 查看有哪些版本, 再安装 swiper@xxx 版本  
> [vant 自动按需引入组件需要先配置, 否则使用时没有样式](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)

## <a id="流程记录">[记录一下遇到的问题](#流程记录标题)</a>
> ★ 表示难点问题
1. 关于 v-for 时的 key, 最好绑定 item.id, 绑定 index 在某些情况下可能出现问题, 比如删除操作
1. 请求配置
    - 在向这个后端```axios```请求时, [请求参数需携带```cookie```](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%b0%83%e7%94%a8%e5%89%8d%e9%a1%bb%e7%9f%a5), 不带相当于未登录, 携带正确的```cookie```会得到推荐给该用户的数据, ```POST```请求```url```必须添加时间戳, 没有会返回缓存结果。
1. 发现
    - 请求是否携带```cookie```,从[首页-发现接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e9%a6%96%e9%a1%b5-%e5%8f%91%e7%8e%b0)获取不同数据, 没登录, 一次性得到全部数据, 登录后, 获取一部分推荐数据
    - 登录后滚动到底部(上拉加载新数据), 传入```cursor```参数, 获取更多推荐数据
    - 得到的数据很繁杂, 提取需要的内容
    - 登录后, [首页-发现](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e9%a6%96%e9%a1%b5-%e5%8f%91%e7%8e%b0)返回的数据里, 推荐歌单第一项没有滚动轮播的数据, 可以从[歌单分类](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e5%8d%95%e5%88%86%e7%b1%bb)获取分类类型, 再随机从中提取几个类型, 根据类型从[精品歌单](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e5%8d%95-%e7%bd%91%e5%8f%8b%e7%b2%be%e9%80%89%e7%a2%9f-)中获取数据, 这样, 每次刷新就得到不同的数据, 看起来就像是得到推荐数据
    - 推荐歌曲部分, 把扁平数组转为二维数组
    ```js
    /**
    * @description 一维数组转二维
    * @param {Array} arr 要转换的数组
    * @param {Number} num 二维数组每项包含几个
    */
    function arrTurnTwo(arr, num) {
      let temp = [],
        result = [];
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
        if (temp.length === num) {
          result.push(temp);
          temp = [];
        }
      }
      temp.length && result.push(temp);
      return result;
    }
    ```
    - ```swiper``` 设置了循环自动播放, 切换到其它路由再换回来, 不自动播放。监听路由, 离开就暂停播放, 换回来就继续播放
1. 云村
    - [推荐视频](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%8e%a8%e8%8d%90%e8%a7%86%e9%a2%91)需要登录, 未登录前, 使用[全部mv](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%85%a8%e9%83%a8-mv)接口
    - 因为页面存在多个```video```, 切换其他```video```播放时, 为避免性能消耗, 应卸载/销毁当前的```video```
    ```js
      vdoEle.pause()
      vdoEle.removeAttribute('src')
      vdoEle.load()
    ```
    - ```video```播放时, 离开当前可视范围, 暂停播放, 使用交叉观察器```IntersectionObserver```, 判断是否离开了可视范围, 离开后```video```自动暂停
    ```js
    // 可视范围限制
    let gap = '-30px'
    
    let v = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 可见时
            // console.log("出现在视图", this.rcmdMv.name, entry);
          } else {
            // 不可见时
            if (!this.$refs.rcmdVideo.paused) {
              // console.log("暂停播放", this.rcmdMv.name, entry);
              this.$refs.rcmdVideo.pause();
            }
          }
        });
      },
      // 在离顶/底部还有一小段距离时触发(顶/底部有个导航条,)
      { rootMargin: `${gap} 0px ${gap} 0px` }
    )
    // 观察 video 元素
    v.observe(this.$refs.rcmdVideo)
    ```
    - 用于一个全局变量保存视频```id```, 监听它, 改变后销毁与视频```id```不同的```video```元素
    - 移动端```chrome浏览器的video```切换到后台后会自动暂停, 不能继续播放
1. 登录
    - 记录进入登录页前的路由, 登录后返回该路径
    - 输入手机号后判断是否已经注册过, 未注册则弹框提示去注册
    - 登录后把用户信息存入```Vuex```和```localStorage```, 下次进入浏览器则从```localStorage```里获取用户信息
1. 菜单
    - 主要功能是: 登录/退出(退出按钮在底部)
    - 菜单弹出层, 弹出层的```css```中设置了```transform```, 如果子孙元素```css```中设置```position:fixed;```会无效
    - 弹出后使用自定义的左滑手势指令退出弹出层
1. 歌单详情页面
    - [获取歌单详情](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85), 并从里面 trackIds 提取歌单的所有歌曲 id, 根据 id [获取歌曲信息](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85), 每次最多加载100首曲, 滚动到底触发加载更多歌曲
    - 顶部歌单描述区域有一个滑动到指定高度触摸松开后跳转的操作, 在触摸松开时由于滑动惯性可能还会滑动一段距离, 所以不要直接在```touchend```里处理操作
    - 思路: 要用到3个事件 ```touchstart```, ```touchend```, ```scroll```, 定义一个变量表示触摸状态, 在```touchstart```时, 表示按下, ```touchend```表示松开。定义一个定时器, 做防抖操作, 在```scroll```与```touchend```使用这个定时器, 如果触发这2个事件时, 不管触发了哪个事件, 只执行最后触发的一次
    - 需要注意如果是按住状态时触发了```scroll```事件, 不要执行滚动的回调里的高度跳转
    - 滚动事件回调里, 需要设置头部背景透明度, 歌单介绍背景弧度, ```playlistbar```透明度
    - 点击订阅, 如果未登录, 此时显示未订阅(+)图标, 点击则弹窗提示去登录, 如果登录, 且是自己创建的歌单, 显示已订阅(勾选)图标且颜色为灰色, 如果不是自己创建的歌单, 判断是否已经订阅过, 显示对应图标, 点击后切换图标, 订阅人数加1
    - 点击歌单介绍内容, 弹出另一个歌单详情介绍, 保存封面, 处理直接按返回键(如果显示了弹出层, 返回阻止路由跳转, 并取消显示弹出层)
    - 保存封面的图片, 利用一个a标签, 把要下载的图片放到它的href属性, 点击它就可以下载, 但点击后图片直接在当前标签页打开了, 需要转为bolb:xxx的格式, 才可以点击下载到本地
    ```js
    // 图片地址直接放到a标签,点击后会直接打开, 无法达到预期的下载图片效果
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = fileName
    link.click()

    // 以blob格式请求图片, 再转为url放到a标签, 这样可以点击下载图片
    let {data} = await axios({
      url: imageSrc,
      responseType: 'blob'
    })
    // 返回一个字符串url, 该URL可用于指定源object的内容
    const imgData = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = imgData
    link.download = fileName
    link.click()
    ```
1. 音乐播放器
    - 歌曲id需要在多个组件使用, 在```vuex```中用一个变量保存选中的歌曲id, 切歌后更改歌曲id
    - 监听歌曲id, 变化时修改当前歌曲信息, 重新获取歌词, 修改背景图。 如果背景图放在```div```里的```background-image```上, 再设置过渡时间```transition```, 可以让图片切换时不显得太生硬
1. **★ 根据播放时间滚动的歌词组件** 
    - 从后端获取到的歌词格式:
    ```js
    {
      // 省略...
      // 原版歌词
      "lrc": {
        "lyric": "[00:00.000] 作词 : Taylor Swift\n[00:01.000] 作曲 : Taylor Swift\n[00:15.840]We were both young when I first saw you\n[00:19.680]I close my eyes and the flashback starts\n[00:23.140]I'm standing there\n[00:26.440]On a balcony in summer air\n[00:31.940]See the lights see the party the ball gowns\n[00:36.030]see you make your way through the crowd\n[00:39.290]And say hello\n[00:42.600]Little did I know\n[00:47.860]That you were Romeo you were throwing pebbles\n[00:51.610]And my daddy said stay away from Juliet\n[00:55.410]And I was crying on the staircase\n[00:58.200]Begging you please don't go\n[01:02.710]And I said\n[01:04.220]Romeo take me somewhere we can be alone\n[01:08.350]I'll be waiting all there's left to do is run\n[01:12.260]You'll be the prince and I'll be the princess\n[01:16.320]It's a love story\n[01:18.350]Baby just say yes\n[01:24.340]So I sneak out to the garden to see you\n[01:28.350]We keep quiet cause we're dead if they knew\n[01:31.610]So close your eyes\n[01:34.900]Escape this town for a little while\n[01:38.390]Oh oh\n[01:40.550]Cause you were Romeo I was  a scarlet letter\n[01:44.000]And my daddy said stay away from Juliet\n[01:47.820]But you were everything to me\n[01:50.090]I was begging you please don't go\n[01:55.130]And I said\n[01:56.720]Romeo take me somewhere we can be alone\n[02:00.720]I'll be waiting all there's left to do is run\n[02:04.750]You'll be the prince and I'll be the princess\n[02:08.720]It's a love story\n[02:10.810]Baby just say yes\n[02:12.770]Romeo save me\n[02:14.590]They’re trying to tell me how to feel\n[02:17.070]This love is difficult but it's real\n[02:20.890]Don't be afraid we'll make it out of this mess\n[02:24.880]It's a love story\n[02:26.890]Baby just say yes\n[02:31.890]Oh oh\n[02:44.080]I got tired of waiting\n[02:48.000]Wondering if you were ever coming around\n[02:51.910]My faith in you was fading\n[02:56.770]When I met you on the outskirts of town\n[02:59.980]And I said\n[03:01.160]Romeo save me\n[03:03.260]I've been feeling so alone\n[03:05.240]I keep waiting for you but you never come\n[03:09.070]Is this in my head\n[03:10.850]I don't know what to think\n[03:12.810]He knelt to the ground and pulled out a ring\n[03:16.600]And said\n[03:17.300]Marry me Juliet you'll never have to be alone\n[03:21.360]I love you and that's all I really know\n[03:25.440]I talked to your dad\n[03:26.940]Go pick out a white dress\n[03:29.440]It's a love story\n[03:31.410]Baby just say yes\n[03:36.700]Oh oh oh\n[03:40.440]Oh oh oh oh\n[03:45.390]'Cause we were both young when I first saw you\n"
      },
      // 歌词翻译
      "tlyric": {
        "lyric": "[00:15.840]第一次见到你的时候我们都还很年轻\n[00:19.680]我闭上眼 我们的故事在我脑海里一幕幕回放\n[00:23.140]我站在那里\n[00:26.440]炎炎夏日的阳台上\n[00:31.940]看着这些灯光，派对和舞会礼服\n[00:36.030]我看见你穿过拥挤的人群\n[00:39.290]向我打招呼\n[00:42.600]我却一无所知\n[00:47.860]你就是罗密欧，你扔石子（敲打窗户来找我）\n[00:51.610]我爸爸说：“离朱丽叶远点”\n[00:55.410]我在楼梯上不停地哭泣\n[00:58.200]心中乞求你不要离开\n[01:02.710]我说\n[01:04.220]罗密欧，带我去一个我们能单独相处的地方吧\n[01:08.350]我等待着这一天，只有逃离才能让我们摆脱束缚\n[01:12.260]你会成为王子，而我也将会是公主\n[01:16.320]这是一个爱情故事\n[01:18.350]亲爱的，你只需答应我\n[01:24.340]于是，我偷偷地到花园去见你\n[01:28.350]我们保持低调因为如果被他们知道的话我们就死定了\n[01:31.610]所以请闭上你的眼睛\n[01:34.900]逃避尘世 即使如此短暂的一刻\n[01:38.390]oh oh\n[01:40.550]因为你是罗密欧，世俗不允许我们相恋\n[01:44.000]我爸爸说：“离朱丽叶远点”\n[01:47.820]但是你就是我的一切\n[01:50.090]心中乞求你不要离开\n[01:55.130]然后我说\n[01:56.720]罗密欧，带着我去一个只有我们两个人的地方吧\n[02:00.720]我等待着这一天，只有逃离才能让我们摆脱束缚\n[02:04.750]你会成为我的王子，而我也将会是你的公主\n[02:08.720]这是一个爱情故事\n[02:10.810]亲爱的，你只需答应我\n[02:12.770]罗密欧，拯救我\n[02:14.590]他们总在试图左右我的思想\n[02:17.070]这种的爱是困难的，但它是真实的\n[02:20.890]别害怕，我们终究会冲破困境\n[02:24.880]这就是我们的爱情\n[02:26.890]亲爱的，你只需答应我\n[02:31.890]Oh oh\n[02:44.080]我厌倦了等待\n[02:48.000]怀疑你是否会如期出现在我的面前\n[02:51.910]曾经坚定的信念开始动摇\n[02:56.770]当我在城郊与你相会\n[02:59.980]我说\n[03:01.160]罗密欧，救救我\n[03:03.260]孤独的感觉一直缠绕着我\n[03:05.240]我一直在等你，而你却沓然无踪\n[03:09.070]我的脑海里\n[03:10.850]一片空白\n[03:12.810]他跪在地上，并掏出一枚钻戒\n[03:16.600]对我说\n[03:17.300]嫁给我吧 朱丽叶，我不会再让你感到孤单\n[03:21.360]我知道我一直深爱着你\n[03:25.440]我和你的爸爸谈了\n[03:26.940]快去挑选一件洁白的婚纱\n[03:29.440]这是一个爱情故事\n[03:31.410]宝贝，你只需答应我\n[03:36.700]Oh oh oh\n[03:40.440]Oh oh oh oh\n[03:45.390]因为当我第一次见到你的时候我们都还很年轻"
      },
      // 省略...
    }
    ```
    - 为了方便后续操作, 要把它转换为这种格式:
    ```js
    [
      { time: 0, lyric: "作词 : Taylor Swift", tlyric: "" },
      { time: 1, lyric: "作曲 : Taylor Swift", tlyric: "" },
      { time: 15.84, lyric: "We were both young when I first saw you", tlyric: "第一次见到你的时候我们都还很年轻" },
      ...
      { time: 225.39, lyric: "'Cause we were both young when I first saw you", tlyric: "因为当我第一次见到你的时候我们都还很年轻" },
    ]
    ```
    - 处理过程
    ```js
    let lyric = "[00:00.000] 作词 : Taylor Swift\n[00:01.000] 作曲 : Taylor Swift\n[00:15.840]We were both young when I first saw you\n[00:19.680]I close my eyes and the flashback starts\n[00:23.140]I'm standing there\n[00:26.440]On a balcony in summer air\n[00:31.940]See the lights see the party the ball gowns\n[00:36.030]see you make your way through the crowd\n[00:39.290]And say hello\n[00:42.600]Little did I know\n[00:47.860]That you were Romeo you were throwing pebbles\n[00:51.610]And my daddy said stay away from Juliet\n[00:55.410]And I was crying on the staircase\n[00:58.200]Begging you please don't go\n[01:02.710]And I said\n[01:04.220]Romeo take me somewhere we can be alone\n[01:08.350]I'll be waiting all there's left to do is run\n[01:12.260]You'll be the prince and I'll be the princess\n[01:16.320]It's a love story\n[01:18.350]Baby just say yes\n[01:24.340]So I sneak out to the garden to see you\n[01:28.350]We keep quiet cause we're dead if they knew\n[01:31.610]So close your eyes\n[01:34.900]Escape this town for a little while\n[01:38.390]Oh oh\n[01:40.550]Cause you were Romeo I was  a scarlet letter\n[01:44.000]And my daddy said stay away from Juliet\n[01:47.820]But you were everything to me\n[01:50.090]I was begging you please don't go\n[01:55.130]And I said\n[01:56.720]Romeo take me somewhere we can be alone\n[02:00.720]I'll be waiting all there's left to do is run\n[02:04.750]You'll be the prince and I'll be the princess\n[02:08.720]It's a love story\n[02:10.810]Baby just say yes\n[02:12.770]Romeo save me\n[02:14.590]They’re trying to tell me how to feel\n[02:17.070]This love is difficult but it's real\n[02:20.890]Don't be afraid we'll make it out of this mess\n[02:24.880]It's a love story\n[02:26.890]Baby just say yes\n[02:31.890]Oh oh\n[02:44.080]I got tired of waiting\n[02:48.000]Wondering if you were ever coming around\n[02:51.910]My faith in you was fading\n[02:56.770]When I met you on the outskirts of town\n[02:59.980]And I said\n[03:01.160]Romeo save me\n[03:03.260]I've been feeling so alone\n[03:05.240]I keep waiting for you but you never come\n[03:09.070]Is this in my head\n[03:10.850]I don't know what to think\n[03:12.810]He knelt to the ground and pulled out a ring\n[03:16.600]And said\n[03:17.300]Marry me Juliet you'll never have to be alone\n[03:21.360]I love you and that's all I really know\n[03:25.440]I talked to your dad\n[03:26.940]Go pick out a white dress\n[03:29.440]It's a love story\n[03:31.410]Baby just say yes\n[03:36.700]Oh oh oh\n[03:40.440]Oh oh oh oh\n[03:45.390]'Cause we were both young when I first saw you\n"
    let tlyric = "[00:15.840]第一次见到你的时候我们都还很年轻\n[00:19.680]我闭上眼 我们的故事在我脑海里一幕幕回放\n[00:23.140]我站在那里\n[00:26.440]炎炎夏日的阳台上\n[00:31.940]看着这些灯光，派对和舞会礼服\n[00:36.030]我看见你穿过拥挤的人群\n[00:39.290]向我打招呼\n[00:42.600]我却一无所知\n[00:47.860]你就是罗密欧，你扔石子（敲打窗户来找我）\n[00:51.610]我爸爸说：“离朱丽叶远点”\n[00:55.410]我在楼梯上不停地哭泣\n[00:58.200]心中乞求你不要离开\n[01:02.710]我说\n[01:04.220]罗密欧，带我去一个我们能单独相处的地方吧\n[01:08.350]我等待着这一天，只有逃离才能让我们摆脱束缚\n[01:12.260]你会成为王子，而我也将会是公主\n[01:16.320]这是一个爱情故事\n[01:18.350]亲爱的，你只需答应我\n[01:24.340]于是，我偷偷地到花园去见你\n[01:28.350]我们保持低调因为如果被他们知道的话我们就死定了\n[01:31.610]所以请闭上你的眼睛\n[01:34.900]逃避尘世 即使如此短暂的一刻\n[01:38.390]oh oh\n[01:40.550]因为你是罗密欧，世俗不允许我们相恋\n[01:44.000]我爸爸说：“离朱丽叶远点”\n[01:47.820]但是你就是我的一切\n[01:50.090]心中乞求你不要离开\n[01:55.130]然后我说\n[01:56.720]罗密欧，带着我去一个只有我们两个人的地方吧\n[02:00.720]我等待着这一天，只有逃离才能让我们摆脱束缚\n[02:04.750]你会成为我的王子，而我也将会是你的公主\n[02:08.720]这是一个爱情故事\n[02:10.810]亲爱的，你只需答应我\n[02:12.770]罗密欧，拯救我\n[02:14.590]他们总在试图左右我的思想\n[02:17.070]这种的爱是困难的，但它是真实的\n[02:20.890]别害怕，我们终究会冲破困境\n[02:24.880]这就是我们的爱情\n[02:26.890]亲爱的，你只需答应我\n[02:31.890]Oh oh\n[02:44.080]我厌倦了等待\n[02:48.000]怀疑你是否会如期出现在我的面前\n[02:51.910]曾经坚定的信念开始动摇\n[02:56.770]当我在城郊与你相会\n[02:59.980]我说\n[03:01.160]罗密欧，救救我\n[03:03.260]孤独的感觉一直缠绕着我\n[03:05.240]我一直在等你，而你却沓然无踪\n[03:09.070]我的脑海里\n[03:10.850]一片空白\n[03:12.810]他跪在地上，并掏出一枚钻戒\n[03:16.600]对我说\n[03:17.300]嫁给我吧 朱丽叶，我不会再让你感到孤单\n[03:21.360]我知道我一直深爱着你\n[03:25.440]我和你的爸爸谈了\n[03:26.940]快去挑选一件洁白的婚纱\n[03:29.440]这是一个爱情故事\n[03:31.410]宝贝，你只需答应我\n[03:36.700]Oh oh oh\n[03:40.440]Oh oh oh oh\n[03:45.390]因为当我第一次见到你的时候我们都还很年轻"

    function extractLyric(lyric) {
      let res = {}
      let lyricArr = lyric.split('\n')
      lyricArr.forEach(item => {
        // [00:00.000] 作词 : Taylor Swift 正则匹配出时间, 歌词
        let data = /^\[(.*?)\](.*)$/ig.exec(item)
        // data 匹配不到时为null
        if (data) {
          // 把时间转为 Number
          let time = data[1].split(':').reverse().reduce((pre, current, index) => {
            return Number(pre) + Number(current) * Math.pow(60, index)
          })
          res[time.toFixed(2)] = data[2].trim()
        }
      })
      return res
    }

    let l1 = extractLyric(lyric)
    // 得到:
    {
      "0.00": "作词 : Taylor Swift",
      "1.00": "作曲 : Taylor Swift",
      "15.84": "We were both young when I first saw you",
      // ...
      "225.39": "'Cause we were both young when I first saw you"
    }

    let l2 = extractLyric(tlyric)
    // 得到:
    {
      "15.84": "第一次见到你的时候我们都还很年轻",
      // ...
      "225.39": "因为当我第一次见到你的时候我们都还很年轻"
    }
    let lyricTextArr = []
    // 转换|合并
    for (const key in l1) {
      let o = { time: Number(key), lyric: l1[key] }
      // 存在翻译就合并进来
      tlyric && Object.assign(o, { tlyric: l2[key] || '' })
      lyricTextArr.push(o)
    }
    console.log(lyricTextArr);
    // 这样就转换好了
    [
      { "time": 0, "lyric": "作词 : Taylor Swift", "tlyric": "" },
      { "time": 1, "lyric": "作曲 : Taylor Swift", "tlyric": "" },
      { "time": 15.84, "lyric": "We were both young when I first saw you", "tlyric": "第一次见到你的时候我们都还很年轻" },
      // 省略...
      { "time": 225.39, "lyric": "'Cause we were both young when I first saw you", "tlyric": "因为当我第一次见到你的时候我们都还很年轻" }
    ]
    ```
    - 根据传入的时间, 算出当前要高亮的歌词下标
    ```js
    function getIndex(time) {
      // 超过最后一个歌词的时间就是最后一个
      if (time >= lyricTextArr[lyricTextArr.length - 1].time) {
        return lyricTextArr.length - 1
      }
      // 找到在哪个位置
      let index = lyricTextArr.findIndex(i => i.time > time)
      if (index - 1 < 0) {
        return 0
      } else {
        return index - 1
      }
    }
    getIndex(15)
    ```
    - 监听高亮歌词下标, 每次触发时, 设置父容器的滚动高度(scrollTop), 使高亮歌词改变后也保持在中部
    - 当时间变化, 此时用户如果滑动查看歌词, 因为高亮歌词要保持垂直居中, 会导致歌词区域上下跳动, 使用定时器控制滚动操作, 如果触摸时, 清除定时器, 触摸离开后执行。同样的, 滑动离开后惯性滚动时也会有相似的情况。

1. 歌单评论
    - (新版评论接口貌似有些问题)待完善
1. 每日推荐
    - 与歌单详情页差不多
1. 歌单广场
    - 用轮播来显示对应的tab
    - 用对象数组来保存分页, 对应滚动高度
    - 轮播项切换时, 如果还未存在数据, 则加载, 每个轮播项上拉到底加载更多数据
    - 每次离开页面后返回, 每个轮播项滚动到离开前保留的位置
1. 搜索
    - 获取默认搜索关键词, 作为 placeholder
    - 默认搜索页面需要保留滚动高度
1. 移动端chrome, 滚动页面隐藏地址栏, 体验不太好, 可以添加到主屏幕
1. 使用```flex: 1;```时, 子元素```text-overflow: ellipsis;```不起作用, 可在```flex: 1;``` 所在元素设置 ```overflow: hidden;``` 或 ```width: 0;```
1. 因为设置了超出显示省略号, 出现了文字底部显示不全，可设置行高
![文字底部显示不全](./preview/文字底部显示不全.jpg)
1. 元素设置了```display: flex;```, 该元素不能同时设置 ```css``` 超出显示省略号, 因为设置后无效, 可以在里面套一个元素, 在里面设置超出显示省略号
    ```css
    /* 无效 */
    .text {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    ```
1. 如果浏览器在歌单页面关闭, 下次打开按导航返回没有效果, 用 ```sessionStorage``` 记录进去过的路由, 如果是第一个, 点返回直接回到 ```/home```
1. 因为设置了 ```keep-alive```, 在组件页里侦听 ```$route```, 处理函数在其他路由页也会触发, 可能会造成一些奇怪的问题, 比如处理函数里面有网络请求, 路由一改变也会触发里面的请求, 每次进入其它路由页就会发起请求, 造成重复请求, 需要设置一些限定条件
1. 使用弹出层组件时, v-model 绑定 vuex 的 state 值, 给 computed 设置 get set, 详细看 App.vue 的 showList


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
