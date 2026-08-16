# Projects Stacked Rows 滚动设计

## 目标

Projects 页改为 FMRG Studio 式的 stacked project bars / accordion-like scroll reveal。页面中同时存在三条独立项目横条；每条横条属于自己的项目，不是全站导航，也不是把完整详情页作为一张大卡片上下移动。

项目顺序保持不变：

1. `01 — Share Life & Insights`
2. `02 — In the Act of Becoming`
3. `03 — firefly Big Day`

滚动时，当前项目横条停在 viewport 顶部；下一条项目横条从下方出现并覆盖、替换上一条。项目内容仅在所属横条下方自然展开。

## 页面层级

Projects 开场 `Selected work` 保持自然文档流。开场滚出视口后进入 stacked rows 区域。

每个项目使用相同结构：

```text
project-row
├── project-row__header  // sticky 项目横条
└── project-row__content // 对应项目内容
```

三条 project row 按 DOM 顺序排列。每条 header 使用 `position: sticky; top: 0`，并拥有高于自身内容的 z-index 和不透明暖白背景。后一个 row 在文档流中到达顶部时，自然覆盖前一个 sticky header；不同时堆出三条永久可见的 tab。

## 滚动关系

- 第一条 header 到达 viewport 顶部后停住。
- 第一条内容继续在 header 下方滚动与展开。
- 第二条 header 从 viewport 下方进入，逐步覆盖第一条内容。
- 第二条 header 到达顶部时覆盖并替换第一条 header。
- 第三条重复相同关系。
- 向上滚动时顺序自然反转。

核心滚动由原生 sticky 与正常文档流完成。不得对完整 project content 使用整体 `translateY`，不得创建单项目 0%/30%/70% reveal stage。

不使用 opacity fade、自动播放、scale、snap、强视差或 ScrollTrigger pin spacer。必要的 ScrollTrigger 仅用于协调全站导航可见性和测量状态，不驱动项目内容位移。

## 项目横条视觉

每条横条约为一行标题高度，桌面端目标高度约 72–84px，使用网站暖白 `#fffef9`。横条内容包含：

- 左侧项目编号与类别。
- 中部项目名称。
- 右侧精简 metadata 或状态提示。

横条之间不使用卡片圆角、厚边框或明显阴影。可使用极轻的发丝线帮助文字对齐，但滚动层级主要依靠背景覆盖和项目内容变化体现。

横条文字必须在常见桌面宽度下完整显示。移动端可压缩 metadata，但项目编号和名称必须保留。

## 三个项目内容

### 01 — Share Life & Insights

保留账号介绍、待补指标、主页链接状态及三个 3:4 视频位。桌面端继续使用已确认的中等间距和一大两小交互；移动端继续横向滑动。

### 02 — In the Act of Becoming

保留文案 `Light, texture and transformation.`、单支 4:3 Moving Image、格式 metadata 和播放入口。不增加暗色遮罩或放大效果。

### 03 — firefly Big Day

保留主视觉、描述、标签及 `Open case` 详情弹层。弹层仍由用户点击触发，不参与 sticky stacking。

## 与全站导航的关系

全站 `K.X / About / Experience / Projects / Photography` 导航与项目横条是两个系统。

- Projects 开场区域仍显示全站导航。
- 第一条项目 header 到达 viewport 顶部时，项目横条覆盖并取代全站导航。
- stacked rows 区域内仅显示当前 sticky project header。
- 离开 stacked rows 区域后，全站导航恢复。
- Contact 区域继续隐藏全站导航。

全站导航的隐藏／恢复由滚动状态控制，不改变 active view，也不触发页面切换。

## 与 Progressive Reveal 的关系

三个 project row 及其 header/content 从通用 `data-reveal-section` opacity reveal 中排除，避免 opacity 和 transform 干扰 sticky 定位。

Projects 开场可以保留原有轻微 scroll reveal。三个项目内部不再使用统一 fade-up；项目内容通过标题条下方的自然滚动与裁切关系出现。

其他 About、Experience、Photography 和 Contact 页面继续使用现有 progressive reveal，不受此次修改影响。

## 响应式与 Reduced Motion

桌面端 header sticky 在 viewport 顶部。移动端使用更紧凑的 header，并与现有 68px 移动导航高度协调；进入 stacked rows 后同样覆盖全站导航。

`prefers-reduced-motion: reduce` 下保留 sticky 文档结构，因为它不依赖时间动画；关闭非必要的颜色和状态 transition。所有项目内容仍可正常阅读与操作。

## 实现边界

- 优先使用 CSS `position: sticky` 和正常文档流。
- 不添加 smooth-scroll 库。
- 不使用 ScrollTrigger `pin`、snap 或整体详情页 transform。
- React 中新增的滚动状态监听必须作用于 `.portfolio-overlay__content`，并在卸载／切页时清理。
- 不重构 Hero、其他页面、Contact 闪图或项目详情弹层。
- 保留工作区现有修改，不覆盖无关文件。

## 验收标准

1. Projects 页存在三条独立项目横条，而非一条全站导航控制一张详情页。
2. 当前项目横条到达顶部后保持 sticky，项目内容从其下方自然滚动。
3. 下一条横条从下方进入并覆盖、替换上一条横条。
4. 向上滚动时 stacked 顺序自然反转。
5. 不出现完整详情页整体 translate、opacity fade、自动播放或单项目分段演示。
6. stacked rows 区域覆盖全站导航；离开后全站导航恢复；Contact 仍无导航。
7. 三个项目内容、顺序、比例、弹层和移动端视频滑动保持可用。
8. 其他页面的 progressive reveal 不受影响。
9. TypeScript 与生产构建通过。
