---
title: 第八课(tsconfig 与 Vue + TypeScript 集成)完成,defineProps/defineEmits 实战中踩了几个真实的坑
---

第八课覆盖 tsconfig 关键字段、`<script setup lang="ts">` 里 `defineProps`/`defineEmits` 的类型化写法、共享类型放哪。这课是第一次真正在 Vue 项目里(`learn_ts_project`)写代码、跑 `vue-tsc`,不是纯语法练习,过程中暴露了几个之前语法课没覆盖到的实际问题。

## Evidence

- 写 `LayerCard.vue` 时,`defineEmits<{ toggle-visible: boolean }>()` 报语法错误,原因是属性名带 `-`(减号),TS 会把它解析成减法运算符,必须写成字符串字面量 `'toggle-visible'`。同时把值类型 `boolean` 错写成了非元组形式,应为 `[value: boolean]`。
- 由此暴露一个更底层的概念漏洞:**没有分清数组类型和元组类型**。`boolean[]` 是"同类型、数量不定的列表";`[value: boolean]` 是"固定位置、固定类型的参数列表",两者语法都用 `[]` 但语义完全不同。用户确认这是第一次重视到这个区别,之前一直没意识到。
- `interface Props` vs `interface props`:提醒了 TS 社区惯例(类型用 PascalCase),用户当时是小写,虽然不报错(类型和值是两个独立命名空间,`interface props` 和 `const props` 不冲突)但容易读混。
- `App.vue` 里使用 `<LayerCard>` 时报错,原因是 `name`/`visible` 两个必填 prop 没传;修好后按练习要求故意写 `visible="true"`(不加 `:`)制造类型错误,IDE 立刻标红"类型 string 的参数不能赋给类型 boolean 的参数",验证了编译期类型检查在编辑器里实时生效(不用等 `vue-tsc` 命令行跑完)。
- 最后额外追问了一次 `:visible="true"` 的 `:` 到底为什么要加。用户最初的猜测是"因为子传父修改了 visible 所以要加 `:`"——这个因果是错的,已纠正:`:` 是 v-bind 简写,只和"传的值是不是字符串"有关,和子传父/emit 完全无关。规律是:除了字符串字面量,其他类型的值(boolean/number/变量/对象等)一律要加 `:`,这个规则在写 `Props` interface 定义类型的那一刻就已经决定了,和后续 emit 逻辑是两件独立的事。

## Implications

- 用户主动反馈"这节课有些似懂非懂,感觉比纯 JS 写起来麻烦",这是真实存在的成本而非错觉——TS+Vue 把错误从"运行时才发现"提前到"编辑器输入时标红",代价是写的时候要多想几步(interface 定义、宏泛型标注、`:` 判断)。已告知用户这是正常的权衡,不是学得不够,建议后续用新组件反复练习巩固,而不是纠结这一课有没有"完全学懂"。
- 这是第一次从纯语法课(第 1-7 课 + 综合练习)进入真实项目环境([[0014-integration-exercise-completed]] 是上一次里程碑),踩的坑类型也变了:不再是"概念理解错误",而是"具体 API 语法细节(元组语法、属性名转义)+ 编辑器/构建链路实际报错信息怎么读"。以后再带新 API(比如 Vue 其他组合式函数的 TS 用法),可以预期类似模式:先给最小可跑通示例,再让用户自己写、自己跑、自己看报错,比纯讲解更容易暴露这类细节坑。
- 数组 vs 元组的区分,是继 [[0006-nested-tuple-arrays-and-type-vs-semantics]](嵌套元组/数组)之后第二次在元组相关话题上卡住,可以确认这是用户类型系统里相对薄弱的一点,后续如果再遇到元组场景(比如函数多返回值、其他 emit 定义),可以主动多留意确认理解,不要假设一次讲清楚就完全掌握。
</content>
