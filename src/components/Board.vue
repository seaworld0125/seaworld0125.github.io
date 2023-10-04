<script>
import {Octokit} from "@octokit/core";
import githubSecret from "../plugins/githubSecret.js";
import Article from "./Article.vue";
import Folder from "./Folder.vue";

export default {
  components: {Folder, Article},
  async setup() {
    const octokit = new Octokit({ auth: githubSecret.data().github});
    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'seaworld0125',
      repo: 'blog',
      path: ''
    });
    console.log(res)
    return {res}
  }
}
</script>

<template>
  <div class="article">
    <div v-for="data in res.data">
      <Folder v-if="data.type === 'dir'" :title="data.name"/>
    </div>
    <div v-for="data in res.data">
      <Article v-if="data.type === 'file'" :article-url="data.download_url"/>
    </div>
  </div>
</template>

<style scoped>
.article {
  text-align: left;
}
</style>