<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  setup(props, context) {
    const loading = ref("22");
    console.log(props, context);
    const route = useRoute();
    const router = useRouter();
    console.log("route", route.path, route.params, route.query);
    console.log("router", router);
    return {
      loading,
    };
  },
});
</script>

<template>
222
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
