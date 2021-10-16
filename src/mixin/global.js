// 一些在组件共用的属性, 函数

export let global = {
  data() {
    return {
    }
  },
  computed: {
    // 获取登录状态
    loginStatus() {
      return this.$store.getters.loginStatus
    },
  },
  methods: {
    // 去登录
    goLogin() {
      !this.loginStatus && this.$router.push({ name: "Login" });
    },
    // 退出登录
    logout() {
      this.$store.dispatch('userLogout')
    },
    // 菜单显示/隐藏
    toggleMenu() {
      this.$store.commit('toggleMenu')
    },
    // 路由返回
    goBack() {
      this.$router.go(-1)
    },
    // 点击菜单字体图标
    clickMenu() {
      console.log('点击了菜单');
    },
    // 点击搜索
    clickSearch() {
      console.log('前往搜索页');
    },
    // 前往 歌单
    goPlaylist(id) {
      console.log('点击歌单:', id);
    },
  },
}