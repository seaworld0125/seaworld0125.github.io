<script setup>
import 'spinkit/spinkit.min.css'
import 'highlight.js/styles/github-dark.css'
import Shader from "./components/Shader.vue";
</script>

<template>
  <div id="container">
    <header>
      this is header section
    </header>
    <aside>
      this is aside section
    </aside>
    <main>
      <section>
        <suspense>
          <template #fallback>loading...</template>
          <router-view></router-view>
        </suspense>
      </section>
    </main>
  </div>
</template>
<style scoped>
#container {
  width: 100dvw;
  height: 100dvh;
  position: relative;
  left: calc(-50vw + 50%);
}
header {
  width: 100%;
  height: 150px;
  background-color: #261a0e;
}
nav {
  width: 100%;
  height: 60px;
  background-color: #26221e;
}
aside {
  width: 20%;
  height: 100%;
  margin-left: 0;
  float: left;
  background-color: #282c34;
}
main {
  width: 80%;
  height: calc(100% - 150px - 60px);
  margin: 0 auto;
  float: left
}
section {
  width: calc(100% - 80px);
  height: 100%;
  padding: 40px;
}
button {
  background-color: rgba(0, 0, 0, 0);
}
@media all and (max-width: 850px) {
  aside {
    width: 0%;
  }
  main {
    width: 100%;
  }
}
</style>
