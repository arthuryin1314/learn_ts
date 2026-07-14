# 第六课(工具类型)完成,一处"字面定义 vs 使用场景"的审题误解被纠正

第六课覆盖 Partial/Required/Pick/Omit/Readonly/Record 及组合使用,小测验和动手练习全部通过。

## Evidence
- 动手练习三项全部正确:1) `Pick<LayerConfig, "name" | "visible">` 少写一个字段触发 `Property 'visible' is missing` 报错,确认 Pick 出来的字段本身不会自动变可选;2) `Readonly<LayerConfig>` 修改字段触发和普通 `readonly` 一致的报错;3) 准确区分 `Partial<Pick<LayerConfig, "visible" | "sourceUrl">>`(先筛选子集再整体可选)和 `Partial<LayerConfig>`(全部字段可选)的范围差异。
- 小测验第三题(`Record<string, unknown>` 最适合什么场景)第一次选错。误解根因:题目问的是"适合什么场景"(键名不固定但值类型统一,比如 GeoJSON properties),用户当时只复述了 `Record<string, unknown>` 的字面类型定义(键是 string、值是 unknown)本身没错,但没有把这个字面定义翻译成"这对应什么实际使用场景"去匹配选项——即把"审题:选项问的是什么"和"我知道这个语法的字面含义"这两件事搞混了。经过展开字面定义如何对应到 GeoJSON properties 场景后,用户没有异议,直接理解正确。

## Implications
- 这是一个新的误解类型,不同于前几课"方向对但用词不精确"(见 [[0008-lesson4-classes-completed]]、[[0009-lesson5-generics-completed]]),而是"知道语法字面意思,但选择题问的是应用场景匹配"——以后遇到"某个类型工具/语法最适合什么场景"这类题目,如果用户答错,可以先确认是不是把"字面定义"和"场景匹配"搞混了,再针对性纠正,而不是重新讲一遍语法本身。
- 用户对纯语法机制类的题目(Pick 报错、Readonly 报错、组合范围区分)全部一次做对,说明工具类型的核心机制已经扎实,只是"选择题审题"这个薄弱点值得留意。
- 第六课 lessons/0006 的"下一课"目前是"待定",需要和用户确认下一课主题(比如枚举 enum、类型断言 as、模块与命名空间,或者进入更高阶的条件类型/映射类型)。
