<template>
  <div class="cloud-village-content">
    <div v-if="leaderBoard.length">
      <pre>
      {{leaderBoard}}
    </pre>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        leaderBoard: []
      }
    },
    created() {
      this.$loading.show();
      api.LeaderBoard()
        .then(res => {
          this.$loading.hide();
          console.log('排行榜')
          console.log(res)
          this.leaderBoard = res.list;
        })
    }
  }
</script>
<style lang="scss" scoped>
</style>
