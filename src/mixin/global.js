// 一些在组件共用的属性, 函数

export let global = {
  data() {
    return {};
  },
  computed: {
    // 获取登录状态
    loginStatus() {
      return this.$store.getters.loginStatus;
    },
  },
  methods: {
    // 去登录
    goLogin() {
      !this.loginStatus && this.$router.push({ name: "Login" });
    },
    // 退出登录
    logout() {
      this.$store.dispatch("userLogout");
    },
    // 菜单显示/隐藏
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    // 路由返回, 如果第一次进入的页面有导航返回键, go(-1), 是无效的, 把访问过的路由记录到 sessionStorage, 只有一个路由还点了返回键, 就直接跳到首页
    goBack() {
      let history = JSON.parse(window.sessionStorage.getItem('netMusicAppHistory')) || []
      if (history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({name: 'Find'})
      }
    },
    // 点击菜单字体图标
    clickMenu() {
      console.log("点击了菜单");
    },
    // 去搜索
    goSearch() {
      // console.log("前往搜索页");
      this.$router.push({name: 'Search'})
    },
    // 返回顶部
    toTop() {
      window.scroll({ top: 0, behavior: 'smooth'})
    },
    // 前往 歌单
    goPlaylist(id) {
      console.log("点击歌单:", id);
      this.$router.push({ name: "PlayListDetail", params: { id } });
    },
    clickSong(id) {
      console.log('歌曲', id);
      this.$store.commit('changeSongId', Number(id))
    },
    clickMvIcon(id) {
      console.log('mv', id);
      this.$store.commit('changeMvId', Number(id))
    },
    // 复制文本 value 
    copyText(value) {
      // 创建的input需要加到 body, 不然复制不到值
      let input = document.createElement('input')
      input.value = value
      input.style.position = 'absolute'
      input.style.left = '-10000px'
      input.style.top = '-10000px'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      this.$toast('复制成功! 快和小伙伴们分享吧!')
      document.body.removeChild(input)
    },
    // 已滚动高度
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },
    // 窗口可视高度
    getClientHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        0
      );
    },
    // 获取已滚动高度
    getScrollHeight() {
      return document.body.scrollHeight || document.documentElement.scrollHeight
    }
  },
};
