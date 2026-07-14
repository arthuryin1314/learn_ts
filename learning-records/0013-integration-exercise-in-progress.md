# 综合练习一(图层管理器)进行中 —— 逐点纠错进度记录

对应练习文件:`exercises/0001-layer-manager-integration.html`。用户在 TypeScript Playground 里手写了一份整合前七课概念的实现,提交后发现 6 类问题,按用户要求"一个一个过、不用一次全改完"逐点讲解。本文件记录当前进度,方便换设备/换会话后继续,不用重新对齐。

## 用户原始代码的 6 类问题(按练习要求 1-7 对应)

1. **enum 语法错误** —— `enum LayerKind = {vector:'vector',raster:'Raster'}` 写成了对象字面量语法,应为 `enum LayerKind { Vector = "vector", Raster = "raster" }`。
   **状态:✅ 已讲解,用户当场理解("语法细节")。**

2. **MapLayer 抽象父类** —— constructor 参数(`name`、`kind`)没加访问修饰符,导致没有变成真正的实例字段;`render(): void {}` 写了空方法体,和"抽象方法"的意图矛盾,应为 `abstract render(): void;`(无方法体)。
   **状态:✅ 已讲解,经过多轮追问后用户完整理解,包括:**
   - 参数属性修饰符可以是 public/private/protected,取决于想要的访问范围,不只是 public;
   - "变成真正存在的实例字段"具体指什么(没加修饰符时 `this.name` 是 `undefined`,加了之后才真正存在);
   - 这和继承的关系——子类方法访问 `this.xxx`,前提是父类构造函数确实把这个值存成了字段,继承不会凭空创造字段,只是让子类能访问父类已经存起来的东西;
   - 为什么类级别 `abstract`(禁止 `new` 实例化)和方法级别 `abstract`(强制子类实现,且要求类本身也必须是 abstract)两者都需要,缺一不可。
   - 用户最终总结里有一处用词被纠正:"变成真正可以调用的参数" → 更准确的说法是"变成真正存在的实例字段,让父类和子类的方法都能通过 `this` 访问"(不是子类"调用"参数,而是访问一个已经存在的字段)。

3. **VectorLayer/RasterLayer 子类** —— 同样缺少参数属性(`sourceUrl`/`opacity`,原代码里还把 `opacity` 拼成了 `opcity`),也都没有实现 `render()`(因为父类 `render` 应该是抽象方法,必须被子类实现)。
   **状态:⏭️ 已跳过 —— 和第 2 点是同一个模式(参数属性 + abstract 方法实现),用户已确认理解原理,决定不重复讲,留到实际跑代码报错时再回头看。**

4. **LayerGroup 泛型分组容器** —— 原代码大致是:
   ```ts
   class LayerGroup<T> {
     layers = [];
     add(layer: T) { ... }
     renderAll(layer: T) {
       for layer in layers:
         layer.render();
     }
   }
   ```
   已知问题(尚未系统讲完):`layers = []` 没有类型标注(应为 `private layers: T[] = []`);`renderAll` 不应该接收参数(应该无参,遍历内部状态);`for layer in layers:` 是 Python 风格的非法语法(应为 `for (const layer of this.layers)`);`renderAll` 内部访问 `layers` 时漏了 `this.` 前缀。另外 `T` 应该加约束 `T extends MapLayer`(练习要求)。
   **状态:🔄 进行中 —— 我已经把原始错误代码贴给用户看,并提问"你觉得哪里不对、为什么",等待用户回复,尚未开始逐条纠正。**

5. **printLayer 判断函数** —— 原代码用 `typeof kind == 'VectorLayer'` 判断具体子类,这是无效写法(`typeof` 对 class 实例只会返回 `"object"`,不会返回类名),应该用 `instanceof VectorLayer` 或者判别字段(`kind === LayerKind.Vector`)判断。
   **状态:⬜ 未开始讲解。**

6. **loadConfigFromSource 加载函数** —— 原代码 `loadConfigFromSource(layerconfig:LayerConfig):unknown { return layerconfig }` 把逻辑方向写反了:应该是函数本身不接收参数、内部返回模拟数据(类型是 `unknown`),`as LayerConfig` 断言应该在**调用处**做,而不是在函数内部。
   **状态:⬜ 未开始讲解。**

## 下次继续的入口点

直接从第 4 点(LayerGroup)接着讲,用户已经看到原始错误代码和引导性提问,等待用户先说出"哪里不对、为什么"再展开纠正。讲完第 4 点后依次进入第 5、6 点。

## 相关记录
- [[0012-lesson7-type-assertion-enum-completed]] —— 第七课(as/enum)完成记录,练习基于此课延伸。
- 练习创建背景:用户完成前七课后主动要求一个整合性练习,写完后自评"感觉自己是不是根本没学会"——目前 6 类问题均为语法/细节层面错误,不是概念性理解问题,已在过程中反复确认并安抚。
