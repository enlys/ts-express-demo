<script lang="ts" setup>
import { defineComponent, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

defineExpose({
  name: 'App',
})

const loading = ref("22");
const route = useRoute();
const router = useRouter();
console.log("route", route.path, route.params, route.query);
console.log("router", router);
const count = ref(0);
watch(count, (newX) => {
  console.log(`x is ${newX}`)
})
const double = computed(() => {
  console.log("double");
  return count.value * 2;
});

console.log('111double', double.value);
function  add() {
  count.value++;
  count.value++;
  count.value++;
  console.log('count', count['value']['value']['1111']);
}

add();
console.log('2double', double.value);
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
