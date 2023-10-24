<script>
import {Octokit} from "@octokit/core";
import githubSecret from "../plugins/githubSecret.js";
import Article from "./Article.vue";
import Folder from "./Folder.vue";
import {ref} from "vue";
import Shader from "./Shader.vue";

export default {
  props: {
    path: {
      type: Array,
      default: []
    }
  },
  components: {Shader, Folder, Article},
  async setup(props) {
    const octokit = new Octokit({ auth: githubSecret.data().github});
    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'seaworld0125',
      repo: 'blog',
      path: props.path.join('/')
    });
    const invalidPatterns = [
        ".gitignore",
        ".png",
        ".jpg",
    ];
    const dataMap = {
      folders: [],
      files: []
    }
    const hasInvalidPatterns = (target) => {
      for (let pattern of invalidPatterns) {
        if(target.includes(pattern)) {
          return true;
        }
      }
      return false;
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
    }
    const loadingDone = ref(false);
    return {dataMap, loadingDone}
  },
  async mounted() {
    await this.$nextTick(() => {
      this.stopProgressBar();
    });
  },
  methods: {
    stopProgressBar: function() {
      this.loadingDone = true;
    }
  }
}
</script>

<template>
  <div class="border-line">
    <div class="folder-box">
      <Folder v-for="folder in dataMap.folders" :title="folder.title" :prev-path="folder.prevPath"/>
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