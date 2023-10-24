<script setup>

</script>

<template>
  <div class="shade">
    <div class="sk-chase bar">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </div>
</template>

<style scoped>
.shade {
  width: 100dvw;
  height: 100dvh;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(92, 99, 112, 0.7);
}
.sk-chase {
  z-index: 100;
}
.sk-chase-dot:before {
  background-color: #fff;
}
.bar {
  position: fixed;
  top: calc(50% - var(--sk-size));
  left: calc(50% - var(--sk-size));
}
</style>