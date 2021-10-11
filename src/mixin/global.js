// 一些在组件共用的属性, 函数

export let global = {
  computed: {
    // 获取登录状态
    loginStatus() {
      return this.$store.getters.loginStatus
    },
  },
  methods: {
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