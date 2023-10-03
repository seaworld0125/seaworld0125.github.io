<script>
import {ref} from 'vue'
import axios from "axios";
import Markdown from "vue3-markdown-it";

export default {
  components: {Markdown},
  props: {
    articleName: {
      type: String,
      required: true,
      default: '404.md'
    }
  },
  async setup(props) {
    const markdownData = ref('게시물을 불러오지 못했어요 ㅠㅠ');
    try {
      const res = await axios.get('/Brain/' + props.articleName)
      markdownData.value = res.data
    } catch (err) {
      console.error(err)
    }
    return {markdownData}
  }
}
</script>

<template>
 <div class="article">
   <Markdown :source="markdownData" />
 </div>
</template>

<style scoped>
.article {
  text-align: left;
}
</style>