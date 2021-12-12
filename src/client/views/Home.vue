<template>
  <div class="home">
    home {{ loading }}
    <div @click="toabout">about</div>
    <input type="text" v-model="loading" />
    <div @click="add">add</div>
    name {{ name }}
  </div>
  <div class="img"></div>
  <van-button type="primary">主要按钮</van-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapState, useStore } from "vuex";
import { Button } from 'vant';
import { hello } from '@/api/data';

export default defineComponent({
  name: "Home",
  components: {
    [Button.name]: Button,
  },
  setup(props, context) {
    const loading = ref("22");
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
    function add() {
      loading.value = loading.value + "111";
    }
    return {
      loading,
      toabout,
      add,
    };
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    "name",
  ]),
});
</script>

<style lang="less" scoped>
.img {
  width: 20px;
  height: 20px;
  display: flex;
  background: url('/logo.png');
}
</style>