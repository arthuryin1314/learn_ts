# 复习日:前六课整体过关,两个具体细节生疏

用出题考核的方式复习了第 1-6 课核心概念(readonly 编译期擦除、联合类型收窄、class 访问修饰符与 super() 顺序、泛型约束、工具类型组合),5 道题里 3 道一次答对,2 道有具体生疏点,提醒后立刻理解正确,不是理解上的漏洞。

## Evidence
- 答对且理解扎实:1) `readonly` + `as any` 绕过检查后运行时可赋值(第一/二课);2) 判别字段收窄的机制、`RasterLayer`/`VectorLayer` 同级继承关系(第三/四课);3) 子类 constructor 里 `this` 必须在 `super()` 之后使用的规则,追加判断题也答对(第四课);4) `LayerGroup<VectorLayer>` vs `LayerGroup<MapLayer>` 的约束范围区别,这次没有再犯 [[0009-lesson5-generics-completed]] 记录过的"二选一"误解,说明那次纠正是真正巩固住了。
- 生疏点一:第三课 `PointGeometry.coordinates`(类型 `[number, number]`,单个坐标点如 `[116.4, 39.9]`)被错误描述成"`[1,2],[3,4]`这种"(即误认为是多个点组成的数组),和 `LineGeometry.coordinates`(`[number, number][]`,点数组)的形状搞混了。提醒后没有异议。
- 生疏点二:第六课 `Partial<Omit<LayerConfig, "sourceUrl">>`,`Omit` 这一步排除字段做对了,但漏掉了 `Partial` "把剩下字段变为可选(加 `?`)"这个效果,只写出 `{ name: string; visible: boolean; }` 而不是 `{ name?: string; visible?: boolean; }`。用户明确说是纯粹忘记了 `Partial` 的作用,不是没理解过。

## Implications
- 这两个点是纯记忆遗忘,不是概念性误解,所以不需要用反例纠正法(参考 [[0007-type-structure-vs-semantics-resolved]]、[[0008-lesson4-classes-completed]] 里那种"方向对但框架不精确"的模式),简单复述一次定义就足够重新激活。
- 后续如果再考到"单个坐标点 vs 点数组"或者"`Partial` 具体做了什么",可以直接引用这次的具体反例快速确认是否真的记住,而不用整段重新展开讲解。
- 前六课的整体知识框架(编译期 vs 运行时、收窄、class、泛型、工具类型)扎实,可以按计划继续第七课(类型断言与枚举)。
