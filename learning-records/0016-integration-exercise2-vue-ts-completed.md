# 综合练习二(图层列表 Vue + TS)完成 —— 设计问题:位置信息不该进领域类型

对应练习文件:`exercises/0002-layer-list-vue-integration.html`。目标是巩固第八课 `defineProps`/`defineEmits`/共享类型模式,在父子组件之间多写几遍。练习本身顺利完成,但过程中暴露了一个典型的设计判断失误,值得单独记录。

## Evidence

- `LayerItem` interface 正确拆到 `src/types/layer.ts`,`App.vue` 和 `LayerCard.vue` 都用 `import type` 引用,共享类型放哪的判断标准用对了。
- `defineProps<LayerItem>()`、`ref<LayerItem[]>()`、`defineEmits<{ 'toggle-visible': [value: boolean] }>()` 语法全部写对,说明第八课的模式写熟了一些。
- 为了解决"父组件不知道是哪张卡片被点击"的问题,用户把 `index` 加进了 `LayerItem` interface,同时当成 prop 传给子组件,子组件 emit 时带上 index 一起传回来。功能上跑通了,但设计有问题——`index` 是"这个图层在当前列表里排第几",是渲染层面的位置信息,不是"图层"这个业务概念本身的属性。把它塞进领域类型会导致:数据被筛选/排序后 index 和实际位置脱节;任何用到 `LayerItem` 类型的地方都被迫带上一个跟业务无关的字段。
- 纠正方法:用内联箭头函数在父组件模板里"捕获" `v-for` 的 `index`,子组件完全不需要知道自己排第几。最终写法:`@toggle-visible="(value: boolean) => handleToggleVisible(value, index)"`。用户理解后能准确描述原因:"value 是子组件 emit 给的,index 是父组件 v-for 给的,内联函数负责把两个来源不同的值合并起来一起传给 handleToggleVisible"。

## 新知识点

**内联箭头函数**:不给函数起名字、直接在需要用到"一个函数"的地方当场写的匿名函数。和 `function` 写法等价,只是语法更短。用在事件监听器里,是因为需要"中间层"把两个来源不同的值(子组件传来的 + 父组件作用域里的)合并转发,而这个函数只用一次,没必要单独命名。

## 关键结论:TS 的整体定位

用户在本次练习中得出了一个总结:"TS 就是 JS,只不过在运行前多了个编译检查(类型等),其他还是老样子(父传子、响应式等)"。这个方向是对的,补充了一处例外:大多数 TS 类型概念(interface、泛型标注、`Props` 类型等)编译后被完全擦除,运行时 JS 和纯 JS 一样;但 `enum` 是例外,编译后会变成真实存在的 JS 对象。所以准确说法是"TS 大多数时候是纯编译期的一层检查,少数概念(目前只有 enum)会往运行时代码里加东西"。

## Implications

- 领域类型 vs 渲染/视图层概念的混入,是实际项目里很常见的初学者判断失误。`index`(位置)、`isSelected`(UI 状态)、`isLoading` 这类"属于当前视图场景的状态",不该塞进描述业务实体的 interface 里。以后出现类似情况可以直接复用这次的纠正路径。
- 综合练习二的完成,加上第八课的动手练习,说明 `defineProps`/`defineEmits`/共享类型这套模式已经能独立完成,不再是"似懂非懂"的状态。下一步可以进入新主题(Vue composables + TS,或者直接上手一个更真实的小项目)。
