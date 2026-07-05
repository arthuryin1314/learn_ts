# readonly 是编译期约定,不是运行时冻结

用户在第二课小测验里误选"readonly 会让属性在运行时自动冻结"，暴露出一个具体化的误解：把 `readonly` 和 JS 真正的运行时冻结机制 `Object.freeze()` 搞混了。这其实是 [[0003-compile-time-vs-runtime-understood]] 里已经建立的"编译时 vs 运行时"心智模型在新场景下的应用——`readonly` 和其他类型标注一样，编译后被擦除，运行时没有任何保护，除非用 `as any` 之类的方式绕过 TS 检查，绕过后确实能在运行时改成功。

## Implications
- 以后讲不可变数据结构/frozen state 相关内容时，要明确区分"TS 的 readonly（编译期）"和"JS 的 Object.freeze()（运行时）"，这是一个即使有经验的开发者也容易犯的坑。
- 说明"编译时 vs 运行时"这个心智模型已经能迁移到新概念（这次是 readonly），是个好信号，可以放心在后续课程（泛型、工具类型）里默认用户已具备这层理解。
