# 综合练习一(图层管理器)完成 —— 逐点纠错全部结束

对应练习文件:`exercises/0001-layer-manager-integration.html`。承接 [[0013-integration-exercise-in-progress]],本次会话把剩余的第 4、5、6 点逐一讲完,并在最后做了一次整体拼接检查,发现一处回退问题,修正后全部通过。

## 本次收获的知识点

1. **字段声明 vs 构造函数参数属性,是两种不同规则**:
   - 类体里直接声明的普通字段(如 `private layers: T[] = []`),修饰符从来都是可选的,不加默认就是 public,加不加不影响它"是不是真正的字段"。
   - 只有构造函数参数属性简写(`constructor(public name: string, kind: LayerKind)`)才存在"不加修饰符就不会变成 `this.xxx` 字段"的规则。
   - 用户之前把这两种场景的规则搞混了,这次单独拆开讲清楚。

2. **字段不需要值时不用写 constructor**:`layers` 这种"不依赖外部输入、类自己决定初始值"的字段,直接用字段初始化器 `layers: T[] = []` 就够,不需要占用 constructor。constructor 存在的意义是"处理外部传入的值"。

3. **for...of vs for...in vs 下标循环**:三者是不同场景。下标遍历用经典 `for(let i=0;...)`;只要元素本身、不要下标用 `for...of`;`for...in` 遍历的是键(对象的属性名,或数组的下标字符串),在数组上一般不推荐。用户最早写的 `for layer in layers:` 是 Python 语法误用,现已分清楚三者。

4. **构造函数按位置传参,不能带键名**:用户一度写成 `new VectorLayer(name:'vector', ...)`,这其实还是对象字面量思路只是去掉了外层 `{}`。按位置传参是完全不写键名,靠参数顺序对应,如 `new VectorLayer('vector', LayerKind.Vector, '/.1')`。

5. **`typeof` 对 class 实例没用,要用 `instanceof`**:`typeof` 对任何 `new`出来的对象只返回 `"object"`,不会返回类名。判断"这个变量具体是哪个子类"要用 `instanceof ClassName`,或者判别字段(如 `kind === LayerKind.Vector`)。这是用户本次第一次接触 `instanceof`。

6. **展开运算符是"后面覆盖前面",不是"合并"**:`{...current, ...changes}` 的语义是先铺开 `current`,再用 `changes` 里有的字段覆盖同名字段,`changes` 没提到的字段保持 `current` 原值。顺序反过来会让 `changes` 完全失效。用户一度把这理解成"字段自动合并",已纠正为"顺序 + 覆盖"的准确说法。

7. **`Partial<T>` 复习**:把 `T` 的所有字段变为可选,用于表达"只需要传一部分字段"。用户一度用 `updateConfig(config, config)` 传两份完整对象,没体现 `Partial` 的意义,后改为 `updateConfig(config, { visible: false })` 才是典型用法。

## 过程中的一次回退

最后整体拼接代码检查时,发现 `renderAll` 又变回带参数的 `renderAll(layer: T): void`,和 for 循环内的 `const layer` 撞名(TS 不报错,因为作用域遮蔽,但外层参数完全未使用,是死代码)。提醒后用户能理解"遍历内部状态不需要外部传参"的原因,预期会改回 `renderAll(): void`。

## 综合练习最终覆盖情况

| 序号 | 内容 | 状态 |
|---|---|---|
| 1 | enum 语法 | ✅ |
| 2 | MapLayer 抽象类 + 参数属性修饰符 | ✅ |
| 3 | VectorLayer/RasterLayer 子类同模式 | ⏭️ 跳过(已确认理解) |
| 4 | LayerGroup 泛型容器 | ✅(需改回无参 renderAll) |
| 5 | printLayer + instanceof 判断 | ✅ |
| 6 | LayerConfig + updateConfig + loadConfigFromSource + as 断言 | ✅ |

## Implications

- 前七课 + 综合练习一的知识链条(interface/type、联合类型收窄、class/抽象类、泛型、工具类型、类型断言、enum)已经能组合使用,不再是孤立的语法点。本次错误全部是语法/细节层面(修饰符规则混淆、循环语法、传参方式、判断方法选错、展开运算符理解),没有出现新的概念性理解障碍。
- 用户学习模式:偏好"给提示不给答案,自己试错后再纠正",效果稳定,历次都是这样推进的,包括本次。
- 下一步可以问用户想继续学什么新主题(比如条件类型、映射类型等更进阶的工具类型,或者转向 Vue + TS 的实际项目落地,呼应 MISSION.md 里"能上手敲项目"的目标)。
