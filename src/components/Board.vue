<script>
import Article from "./Article.vue";
import Folder from "./Folder.vue";
import Shader from "./Shader.vue";
import octokit from "../plugins/octokit.js";
import {hasInvalidPatterns} from "../plugins/patternUtils.js";
import IndexNav from "./IndexNav.vue";

export default {
  props: {
    path: {
      type: Array,
      default: []
    }
  },
  components: {IndexNav, Shader, Folder, Article},
  async setup(props) {
    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'seaworld0125',
      repo: 'blog',
      path: props.path.join('/')
    });
    console.log(res)
    const dataMap = {
      folders: [],
      files: [],
      indexes: []
    }
    for(const i of res.data) {
      if(hasInvalidPatterns(i.name)) {
        continue;
      }
      if(i.type === "file") {
        dataMap.files.push({
          title: i.name,
          download_url: i.download_url
        });
      } else if(i.type === "dir") {
        dataMap.folders.push({
          title: i.name,
          prevPath: props.path
        });
      }
      dataMap.indexes.push(i.name)
    }
    return {dataMap}
  }
}
</script>

<template>
  <div class="border-line">
    <div class="folder-box">
      <suspense>
        <template #fallback>
          ...loading
        </template>
        <template #default>
          <IndexNav/>
        </template>
      </suspense>
<!--      <Folder v-for="folder in dataMap.folders" :title="folder.title" :prev-path="folder.prevPath"/>-->
    </div>
    <div class="article-box">
      <suspense>
        <template #fallback>
          <Shader/>
        </template>
        <template #default>
          <Article v-for="file in dataMap.files" :title="file.title" :download_url="file.download_url"/>
        </template>
      </suspense>
    </div>
  </div>
</template>

<style scoped>
.border-line {
  border: 10px solid rgba(255, 255, 255, 0);
}
.folder-box {
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
  justify-content: space-between;
}
.article-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: stretch;
  justify-content: space-between;
}
</style>