<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '알 수 없음'
  }
});
</script>

<template>
  <div class="article">
    <div>{{ props.title }}</div>
  </div>
</template>

<style scoped>
.article {
  text-align: left;
}
</style>