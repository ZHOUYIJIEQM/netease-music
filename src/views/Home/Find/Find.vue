<template>
  <div class="find-page">
    <div style="padding: 1rem 0;">find</div>
    <div v-for="(item, index) in 60" :key="index">{{item}}</div>
  </div>
</template>

<script src="./Find.js"></script>
<style lang="scss" scoped src="./Find.scss"></style>