<template>
  <div class="home">
    {{message}}
  </div>
  <van-button type="primary" @click="toabout" size="mini">about</van-button>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapState, useStore } from "vuex";
import { Button as VanButton } from 'vant';
import { hello } from '@/api/data';

defineExpose({
  name: 'Home',
})

const message = ref("hello world!");
console.log(111, window.document.querySelector('meta[name="csrf-token"]'));
const route = useRoute();
const router = useRouter();
const store = useStore();
console.log("route", route.path, route.params, route.query);
console.log("router", router);
console.log('store', store);
function toabout() {
  router.push({
    name: "About",
  });
}
hello();
</script>

<style lang="less" scoped>
.img {
  width: 20px;
  height: 20px;
  display: flex;
}
</style>