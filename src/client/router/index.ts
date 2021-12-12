import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// createRouter 创建路由实例
const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
      {
        path: '/demo/assets/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/demo/assets/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "data" */ '../views/About.vue')
      },
    ]
  })
  
  export default router