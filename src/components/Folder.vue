<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    prevPath: {
      type: Array,
      required: true
    }
  },
  methods: {
    routerPush: async function() {
      let path = "/page/";
      if(this.prevPath.length) {
        path += this.prevPath.join('/') + '/' + this.title;
      } else {
        path += this.title;
      }
      console.log("path = " + path);
      await this.$router.push({ path: path });
      window.location.reload(true);
    }
  }
}
</script>

<template>
  <button class="folder" @click="routerPush">
    <div>/{{ title }}</div>
  </button>
</template>

<style scoped>
button {
  border-radius: 0px;
}
.folder {
  height: 50px;
  flex-grow: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}
img {
  width: 120px;
  height: 120px;
}
</style>