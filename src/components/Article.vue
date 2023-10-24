<script>
import {ref} from 'vue'
import markDown from "../plugins/markDown.js";
import axios from "../plugins/axios.js";

export default {
  props: {
    download_url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  async setup(props) {
    const res = await axios.get(props.download_url, {});
    const contentShow = ref(true);
    const renderData = markDown.render(res.data);
    let modifiedRenderData = renderData.replace(/<pre>/g, '<pre style="background-color:rgba(41,44,52,255); padding: 15px; border-radius: 10px">');
    return {modifiedRenderData, contentShow}
  }
}
</script>

<template>
  <div class="article">
    <button @click.self="contentShow = !contentShow">{{ title }} {{ contentShow ? "접기" : "보기" }}</button>
    <Transition name="content">
      <div v-show="contentShow" class="content" v-html="modifiedRenderData"/>
    </Transition>
  </div>
</template>

<style scoped>
.article {
  width: 100%;
  margin: 5px auto;
  text-align: left;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  transition: all 1s ease;
}
button {
  width: 100%;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.content {
  border: 20px solid rgba(0, 0, 0, 0);
  overflow: hidden;
}
.content-enter-active {
  transition: all 0.25s ease-out;
  max-height: 500px;
}
.content-leave-active {
  transition: all 0.2s ease-out;
  max-height: 500px;
}
.content-enter-from,
.content-leave-to {
  max-height: 0px;
}
</style>