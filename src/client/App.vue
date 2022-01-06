<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

defineExpose({
  name: 'App',
})

const loading = ref("22");
const route = useRoute();
const router = useRouter();
console.log("route", route.path, route.params, route.query);
console.log("router", router);

</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
