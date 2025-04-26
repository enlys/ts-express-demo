import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';
import { createMonitor, vue3Plugin } from './monitor';

// 初始化监控
createMonitor({
  serverUrl: `${document.baseURI}api/monitor/report`,
  debug: false,
  useImg: false,
});

const app = createApp(App) // 通过 createApp 初始化 app
// 注册 vue3 插件
app.use(vue3Plugin)
app.use(router);
app.use(store);
app.mount('#app') // 将页面挂载到 app 节点
