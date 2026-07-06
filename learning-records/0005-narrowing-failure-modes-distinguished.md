# 区分了两种"没收窄"导致报错的机制

第三课练习一,用户故意删掉 `if (feature.kind === "point")` 收窄判断,直接写 `return feature.coordinates[0]`,报错是 `Type 'number | [number, number]' is not assignable to type 'string'.`——这和课文主例子(`config.sourceUrl` 报 `Property does not exist`)报错形式不一样,一开始没看懂为什么。

## Evidence
- 课文例子:`sourceUrl` 只存在于联合类型的一个分支上,不收窄直接访问,TS 直接报"属性不存在"。
- 用户练习:`coordinates` 在 `PointFeature` 和 `LineFeature` 上都存在,取 `[0]` 语法本身合法,但两个分支的元素类型不同(`number` vs `[number, number]`),不收窄时 TS 只能给出两者的联合类型 `number | [number, number]`,这个联合类型塞不进函数声明的 `string` 返回值,所以在"返回值类型不匹配"这一步报错,而不是"属性不存在"这一步。
- 经过对比讲解后,用户理解:两种报错本质都是"没收窄→用不到具体类型该有的保证",只是报错触发的位置不同(访问属性 vs 类型不兼容)。

## Implications
- 后续遇到 discriminated union 相关报错,不要预设报错一定长得像"属性不存在",也可能是"联合类型塞不进更具体的目标类型"这种形式,报错文案会不一样但根因相同。
- 这个练习本身是用户自己无意间构造出的一个更深入的案例,说明已经具备"举一反三验证收窄必要性"的能力,可以放心加大后续练习的开放度(不用把所有 corner case 都在课文里讲全)。
