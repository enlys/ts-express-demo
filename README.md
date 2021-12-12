# Vue 3 + Typescript + Vite + Express

## 目录结构

```bash
----public                   // 公共文件
----src
    ----client              // 前端代码
    ----common              // 工具
        ----constants.ts    // 常量
        ----decorator.ts    // 自定义注解
        ----util.ts         // 简单工具函数
    ----config              // 配置
        ----config.yml      // 开发环境配置文件
    ----controllers         // 控制器
    ----middlewares         // 中间件
        ----log.ts          // 日志中间件
    ----routes              // 路由
    ----schedule            // 定时器
    ----service             // 服务业务逻辑
    ----app.ts              // express启动配置
    ----server.ts           // express服务入口
----.gitignore
----package.json
----package-lock.json
----README.md
----tslint.json
----vite.config.ts
```

## vant 配置按需导入
https://github.com/anncwb/vite-plugin-style-import/blob/HEAD/README.zh_CN.md
