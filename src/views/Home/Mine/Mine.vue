<template>
  <div class="mine-page">
    <div style="padding: 1rem 0;">mine</div>
    <div v-for="(item, index) in 60" :key="index">{{item}}</div>
  </div>
</template>
<script src="./Mine.js"></script>
<style lang="scss" scoped src="./Mine.scss"></style>