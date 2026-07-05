# Mission: TypeScript

## Why
用户目前的技术栈：前端 Vue + JS + 二三维地图库（WebGIS），后端 FastAPI，数据库 PostGIS；之后计划学习 RAG/Agent 相关知识。想把前端从 JavaScript 升级到 TypeScript，让日常开发更"工程化"，作为求职（前端工程师）的技术准备，同时为后续在地图库和 RAG/Agent 应用里写类型安全的代码打地基。

## Success looks like
- 能把一个现有的 JS/Vue 组件改写成 TS，写出合理的类型标注，而不是到处用 `any`
- 能读懂并写出 interface/type、泛型（generics）、常用工具类型（utility types）
- 能读懂第三方库（未来可能是 Cesium、OpenAI SDK 等）的类型定义并正确使用
- 能独立搭建一个 TS 项目（tsconfig、构建工具集成），并在 Vue 项目里开启类型检查
- 能凭这些能力上手敲一个真实的小项目

## Constraints
- JS 基础：`Promise`/`async-await`、数组方法（map/filter/reduce）、模块化（import/export）很熟；解构赋值/展开运算符、`class` 语法只是一般水平，需要在学 TS 的同时补齐
- 现有技术栈：Vue + JS + 二三维地图库（前端）、FastAPI（后端）、PostGIS（数据库）——例子可以适当结合地图/地理数据场景，帮助落地
- 目标是能上手敲项目即可，不追求钻研语言设计细节
- 用中文讲解，代码示例用英文/TS 标准写法

## Out of scope（暂不深入）
- WebGIS 专属 API（具体地图库的类型用法）——等 TS 基础打好、有具体项目时再开新的学习方向
- RAG/Agent 相关 SDK 的类型用法——用户计划之后单独学习，作为后续方向
- FastAPI/PostGIS 后端部分——不在本 mission 范围内，本 mission 聚焦前端 TypeScript
- TypeScript 编译器内部原理、类型系统的学术细节
