<template>
  <div class="end">
    <span>{{content}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      content: {
        type: String,
        default: '到底啦!~'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .end {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .2rem 0;

    span {
      color: grey;
      font-size: .12rem;
    }
  }
</style>
