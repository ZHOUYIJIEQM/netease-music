<template>
  <div class="loader" v-if="show">
    <svg class="loader-circular" viewBox="25 25 50 50">
      <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
  </div>
</template>
<script>
  export default {
    name: 'Loading',
    props: {
      show: Boolean
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .loader {
    width: 0.5rem;
    height: 0.5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
  }

  .loader-path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  .loader-circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }

  @keyframes color {

    0%,
    100% {
      stroke: #ffbc00;
    }

    40% {
      stroke: #2588ff;
    }

    66% {
      stroke: #ff4600;
    }

    80%,
    90% {
      stroke: #2ed29d;
    }
  }
</style>
