import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
// import styleImport from 'vite-plugin-style-import';
import styleImport, {
  VantResolve,
} from 'vite-plugin-style-import'
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root:'./src/client',
  base: '/demo/assets/',
  server: {
    port: 3809
  },
  publicDir: './assets',
  //样式表插件
  css:{
    postcss:{
      plugins:[
        require('autoprefixer')(
          {
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'not ie <= 11',  //不考虑IE浏览器
              'ff >= 30', //仅新版本用“ff>=30
              '> 1%',//  全球统计有超过1%的使用率使用“>1%”;
              'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true ,// 开启grid布局的兼容(浏览器IE除外其他都能兼容grid，可以关闭开启)
          }
        ),
        require('cssnano')({
          preset: 'default',
        }),
      ],
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/client")
    }
  },
  plugins: [
    vue(),
    styleImport({
      // resolves: [
      //   VantResolve(),
      // ],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          // Vant 从 3.3.2 版本之后 ../es/${name}/style/index  之前 vant/es/${name}/style
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    }),
  ],
})
