# TypeScript Resources

## Knowledge

- [TypeScript Handbook — 官方文档](https://www.typescriptlang.org/docs/handbook/intro.html)
  最权威、最新的 TS 参考。用于：所有基础概念的第一手定义，遇到任何"这个语法到底啥意思"都优先查这里。
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
  官方为已有 JS 基础的人写的入门。用于：第一课的核心参考——TS 相对 JS 到底加了什么。
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
  官方文档中讲基础类型标注最系统的一节。用于：变量/函数/数组/对象类型标注。
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
  用于：后续讲 interface / type 对象结构时的权威参考。
- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
  用于：补齐用户"一般"水平的 class 语法 + TS 给 class 加的类型能力（访问修饰符、抽象类等）。
- [Beginner's TypeScript Tutorial — Total TypeScript (Matt Pocock)](https://www.totaltypescript.com/tutorials/beginners-typescript)
  免费、练习驱动的互动教程，18 节课，配视频讲解。用于：需要动手练习巩固时的补充材料，风格偏工程实战。
- [Using Vue with TypeScript — 官方文档](https://vuejs.org/guide/typescript/overview)
  用于：TS 基础打好后，把知识落地到用户实际的 Vue 项目场景（Composition API 的 props/emits 类型化等）。
- [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api)
  用于：Vue 项目里 `defineProps`/`defineEmits` 的类型写法，是本 mission 里"能上手敲项目"的关键一环。

## Wisdom (Communities)

- [r/typescript](https://reddit.com/r/typescript)
  用于：实战问题讨论、库选型、社区经验。
- TypeScript 官方 Discord（可从 [typescriptlang.org](https://www.typescriptlang.org/) 社区页面找到邀请链接）
  用于：遇到具体类型报错卡住时的实时求助。

## Gaps

- WebGIS 方向的 TS 类型用法：二维用 Mapbox GL JS（`@types/mapbox-gl` / 自带类型）和 OpenLayers（自带类型），三维用 CesiumJS（自带类型）——目前 mission 范围内不涉及，等 TS 基础扎实、进入具体项目阶段再补充资源。
- RAG/Agent 应用开发方向（如 LangChain.js、OpenAI/Anthropic SDK 的 TS 类型用法）——同上，留待后续 mission。
