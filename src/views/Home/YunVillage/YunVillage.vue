<template>
  <div class="yun-village-page">
    <div style="padding: 1rem 0;">village</div>
    云村暂无api
    <div v-for="(item, index) in 60" :key="index">{{item}}</div>
  </div>
</template>
<script>
import { scrollPosition } from "@/mixin/scrollPosition.js";
export default {
  mixins: [scrollPosition]
}
</script>
<style lang="scss" scoped>
  
</style>