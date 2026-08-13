# 滚动驱动的渐进式内容揭示设计

## 目标

为 About、Experience、Projects、Photography 和 Contact 视图中的所有主要内容区块加入克制、可逆的渐进式揭示效果。动画进度必须始终与作品集浮层的原生滚动位置绑定，让滚动体验像是在逐层揭开内容，而不是触发一次性的入场动画。

Hero、导航、路由模型、已确认的内容层级和项目顺序均保持不变。

## 架构

`PortfolioOverlay` 已持有滚动容器 `.portfolio-overlay__content`，也将统一负责 reveal 动画的生命周期。当前视图挂载后，由一个小型客户端 reveal 控制器初始化 GSAP ScrollTrigger 时间线。所有 ScrollTrigger 都明确使用浮层内容元素作为 `scroller`，不读取 `window` 的滚动位置。

页面组件通过语义化 data attribute 标记动画意图：

- `data-reveal-section`：标记一组独立进行 scrub 的内容。
- `data-reveal="media"`：标记图片、视频画框或大型视觉元素。
- `data-reveal="title"`：标记该组的主标题或索引标签。
- `data-reveal="body"`：标记正文、metadata、说明和辅助信息。

控制器仅查询当前已挂载的浮层内部，因此选择器不会影响 Hero 或其他视图。浮层卸载或切换视图时，GSAP context 会清理时间线、动画内联样式和 ScrollTrigger。

## 覆盖范围与分组

Reveal 系统覆盖全部主要区块：

- About：介绍与人像组合，以及补充的个人介绍内容。
- Experience：开场编辑区块，以及每条经历索引或经历组合。
- Projects：开场区块、个人账号展示、适合独立处理的三个视频项、Moving Image、Firefly Big Day 及其辅助信息。
- Photography：landing 组合和 preview 图片选择区；打开后的明信片查看器属于交互状态，不参与滚动 reveal。
- Contact：标题、辅助文案和联系方式／操作入口。

大型 section 可以包含嵌套 reveal group。父级不能把已属于嵌套 group 的元素再次作为整体动画目标；每个元素只归属于距离它最近的 reveal section。

弹层和详情层由用户主动操作触发，并可能锁定底层滚动，因此不纳入 scroll scrub。

## 动效模型

每个 reveal section 都有独立的 GSAP timeline 和 ScrollTrigger：

- 当区块顶部到达浮层视口约 `88%` 位置时开始。
- 当区块顶部到达浮层视口约 `35%` 位置时完成；特别高的区块可适当调整。
- 使用约 `0.8–1.2` 秒的数字型 scrub，形成柔和的追随感。
- 仅动画化对合成性能友好的 `opacity` 和 `transform`。
- 初始位移约为 `y: 48px`，位于要求的 40–60px 范围内。
- 不使用弹跳、弹性、夸张缩放、pinning 或强烈视差。

每组内部按“媒体 → 标题 → 正文／metadata”的顺序推进。各阶段轻微重叠，形成克制的 stagger，而不是彼此割裂的动画段。ScrollTrigger 控制整条时间线的 playhead；向上滚动时，时间线会自然反向回退。

Reveal tween 使用平滑、不夸张的 easing。由于 ScrollTrigger 会 scrub 整条时间线，柔和感主要来自交错的时间线位置和轻微的数字型 scrub 延迟，同时仍保持动画与滚动进度的直接联系。

内容离开主要阅读区域上方后可以轻微变淡，但必须维持足够可读性，不能打断正常阅读。渐进式入场是核心要求；若退场淡化损害可用性，则不添加退场效果。

## 布局与留白

现有布局和已确认的页面设计保持不变。可以通过作用域明确的 CSS 适量增加主要 reveal group 之间的纵向距离，为滚动区间提供呼吸感，但不得引入固定画面、全屏 pin、scroll-jacking，也不得恢复此前已否决的交叉淡入淡出呈现。

桌面端可以使用更充裕的留白。移动端保留同样的编辑节奏，但不能制造过多空屏，也不能影响项目和媒体的横向交互。

## 减少动态效果与渐进增强

当 `prefers-reduced-motion: reduce` 匹配时：

- 不创建 reveal ScrollTrigger 或 scrub timeline。
- 所有 reveal 目标立即完整显示，并且没有位移。
- 保留原生滚动和全部内容交互。

如果 JavaScript 未能初始化，内容默认保持可见。隐藏状态仅由 GSAP 在成功初始化后写入，避免服务端渲染内容不可见。

## 刷新与生命周期

视图挂载后以及影响布局的媒体加载完成后，刷新 ScrollTrigger 的测量。刷新次数必须受控，不能在滚动过程中持续执行。尺寸变化和屏幕方向变化使用 ScrollTrigger 的标准刷新机制。

切换视图时，浮层滚动位置归零，并为新挂载的内容创建一套全新的、作用域隔离的 reveal 系统。清理过程必须防止 trigger 继续引用已经脱离 DOM 的节点。

## 性能

- 只动画化 opacity 和 transform。
- `will-change` 仅应用于实际参与 reveal 的目标，并通过 cleanup 清除或还原。
- 每个有意义的内容组使用一条 timeline，而不是给每个文本节点建立一个 ScrollTrigger。
- 不在每一帧滚动回调中交替读取和写入布局。
- 保留浮层原生滚动，不引入 smooth-scroll 库或 scroller proxy。

## 验收标准

满足以下条件时视为实现完成：

1. About、Experience、Projects 三个项目区、Photography landing/preview 和 Contact 都会随滚动渐进显现。
2. 每组内部依次呈现媒体、标题、正文／metadata。
3. 动画进度明显跟随滚动位置，并在向上滚动时自然回退。
4. 不出现突然触发的一次性 AOS 式动画。
5. 桌面端和移动端都由浮层的嵌套滚动容器正确驱动所有 trigger。
6. 开启减少动态效果后，全部内容立即可见，交互保持正常。
7. Hero、导航、明信片查看器、项目详情弹层和现有鼠标交互继续正常工作。
8. TypeScript 检查和生产构建通过。
