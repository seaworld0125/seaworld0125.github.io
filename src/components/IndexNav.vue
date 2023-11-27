<script>
import octokit from "../plugins/octokit.js";
import {hasInvalidPatterns} from "../plugins/patternUtils.js";

export default {
  name: "IndexNav",
  props: {
    pathArray: {
      type: Array,
      default: [],
      required: false
    },
    path: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      hiddenChildPathBox: true,
      toggleIcon: '▸'
    }
  },
  methods: {
    getNextPathArray(pathArray, nextPath) {
      const nextPathArray = Array.from(pathArray)
      nextPathArray.push(nextPath)
      return nextPathArray
    },
    toggleHiddenChildPathBox() {
      this.hiddenChildPathBox = !this.hiddenChildPathBox;
      this.toggleIcon = this.hiddenChildPathBox ? '▸ ' : '▾ ';
    }
  },
  async setup(props) {
    const getPath = () => {
      return props.pathArray.join('/')
    }
    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'seaworld0125',
      repo: 'blog',
      path: getPath()
    })
    const fileList = []
    for(const i of res.data) {
      if(hasInvalidPatterns(i.name)) {
        continue
      }
      console.log("fileList = ", fileList)
      fileList.push({
        name: i.name,
        type: i.type
      })
    }
    return {fileList}
  },
}
</script>

<template>
  <div class="root-box">
    <div class="path-box" v-if="$props.pathArray.length" @click.prevent="toggleHiddenChildPathBox">{{toggleIcon}}{{$props.path}}</div>
    <div class="child-path-box" v-if="!hiddenChildPathBox || $props.pathArray.length === 0">
      <ul :class="{ 'no-margin-ul': ($props.pathArray.length === 0) }">
        <li v-for="file in fileList" class="index">
          <div v-if="file.type === 'dir'">
            <suspense>
              <template #fallback>
                ...loading
              </template>
              <template #default>
                <index-nav :path-array="getNextPathArray($props.pathArray, file.name)" :path="file.name"/>
              </template>
            </suspense>
          </div>
          <div v-else>{{file.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.root-box {
  margin: 0;
  text-align: left;
}
.no-margin-ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>