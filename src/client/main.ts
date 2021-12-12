import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';

const app = createApp(App) // 通过 createApp 初始化 app
app.use(router);
app.use(store);
app.mount('#app') // 将页面挂载到 app 节点
