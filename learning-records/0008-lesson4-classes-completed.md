# 第四课(class 语法与 TS 类型能力)顺利完成

第四课覆盖 JS class 基础、TS 访问修饰符、参数属性、抽象类、implements,小测验和动手练习全部一次通过,过程中还自己总结出了一个关键洞察。

## Evidence
- 3 道小测验全部答对(private 编译期擦除、参数属性等价写法、抽象类不能实例化的原因)。
- 动手练习自己扩展了 `RasterLayer extends MapLayer`,正确使用参数属性 `private sourceUrl`、正确调用 `super(name, visible)`、正确实现抽象方法 `render()`。
- 主动预判并解释了三个练习报错点:1) 漏写 `render` 报 `does not implement inherited abstract member`；2) 类外部访问 `private sourceUrl` 报错；3) 自己触发这两个报错并准确复述原因,不是照抄提示。
- 提出了一个自己总结的类比:"第三课可辨识联合是 if 现场判断分别执行逻辑,第四课抽象类是每个方法提前写好直接调用"——这个类比方向是对的,经过提炼后引出了"多态(polymorphism)"这个正式术语:可辨识联合是调用者自己判断类型选逻辑,抽象类/多态是调用者不用关心具体类型、由运行时自动分派到对应子类的实现。
- 另外主动追问了两个容易忽略的细节且理解到位:1) 子类不写 constructor 时 JS 会自动生成透传 super() 的默认 constructor,只有子类自己写 constructor 才需要手动调用 super()；2) `implements` 和 `extends`/抽象类的区别——interface 是纯形状零实现、可以同时 implements 多个,抽象类可以混有已实现的普通方法、但只能单继承。

## Implications
- "调用者是否需要知道具体类型"这个视角(可辨识联合 vs 多态)已经建立,后续如果涉及策略模式/多态相关场景,可以直接复用这个框架,不用重新解释。
- 用户习惯先给出一个自己的类比/理解,即使方向对但表述不够精确,直接指出" categoriy 不准确的点+给出标准术语"就能快速对齐(这次是"现场写 vs 提前写好"被纠正为"判断逻辑放在哪、调用者要不要知道类型"),沿用 [[0007-type-structure-vs-semantics-resolved]] 里"给具体反例/精确说法纠正"的有效模式。
- 下一课已排定为泛型入门(见 lessons/0004 nav-links),可以直接进入,不需要额外过渡。
