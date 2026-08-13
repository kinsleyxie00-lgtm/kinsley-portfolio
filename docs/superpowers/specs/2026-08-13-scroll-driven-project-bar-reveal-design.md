# 滚动驱动的项目条 Reveal 设计

## 目标

顶部项目条不是普通 sticky navbar，而是页面揭示结构中的固定上层。用户进入 About、Experience、Projects 或 Photography 页面时，项目条始终贴在 viewport 顶部；页面首屏内容位于其后方，并随着滚动从项目条底部逐渐“抽出”。

动画进度必须与滚动距离 1:1 对应，不自动播放，不使用淡入淡出，不让项目条随内容移动。进入 Contact 后，项目条完全隐藏，Contact 保持纯黑全屏。

## 层级结构

页面采用三个明确层级：

1. 项目条：固定在 viewport 顶部，处于最高内容层级。
2. Reveal stage：承载当前页面的首屏内容，位于项目条后方。
3. 后续页面内容：首屏 reveal 完成后继续自然纵向滚动。

项目条不会参与 reveal 位移。它的位置、字号、栏目和当前激活状态保持稳定。

## 首屏 Reveal

每个非 Contact 页面进入时：

- 初始只完整显示项目条。
- 首屏内容层从项目条下方开始，初始向下偏移约一个可用内容视口高度。
- 用户向下滚动时，内容层按相同像素距离向上移动。
- 内容从项目条下边缘逐渐露出，形成“从项目条后方抽出页面”的视觉关系。
- 达到指定滚动距离后，内容层回到正常位置，后续页面进入自然纵向滚动。
- 向上滚动时过程完全可逆，内容重新收回项目条下方。

Reveal 段使用 ScrollTrigger `scrub: true` 与 `ease: none`，确保滚动位置和位移进度直接对应。不使用数字型 scrub 延迟、opacity、scale、弹跳或自动时间线播放。

## 项目条视觉

项目条使用网站正文同款暖白背景基调 `#fffef9`，保持约 78px 的现有桌面高度。它作为遮挡层覆盖 reveal 内容，因此下方内容在尚未露出时不可见。

本轮的重点是层级 reveal，而不是玻璃拟态。项目条不使用明显边框、阴影或厚重的磨毛面板。项目条的左右安全区必须保证 `K.X / About / Experience / Projects / Photography` 全部完整显示。

移动端继续使用现有菜单结构；桌面项目条 reveal 不能破坏移动菜单的开合和点击。

## 与现有 Progressive Reveal 的关系

当前页面首屏不再参与原有的 opacity + translateY 渐进式 reveal，以免两套动画同时控制首屏 transform。

- 首屏只参与项目条 reveal stage 的垂直位移。
- 首屏内部图片、标题、正文在 reveal 过程中保持完整，不再分别淡入。
- 首屏之后的主要区块继续使用现有 ScrollTrigger progressive reveal：媒体 → 标题 → 正文／metadata。
- Contact 的内部文字 reveal 可保留，但不得影响项目条隐藏逻辑。

## Contact 状态

当 Contact 顶部进入内容视口时，项目条整体隐藏，Contact 占满完整 viewport：

- 不在 Contact 上方保留项目条背景、文字或磨毛层。
- 不改变 Contact 的纯黑背景、两行大标题和点击闪图跳转。
- 向上滚动离开 Contact 时，项目条恢复。
- 隐藏与恢复可以使用极短的 opacity 过渡，但不能形成独立的自动播放场景；状态仍由 Contact 与滚动位置决定。

## 技术实现

`PortfolioOverlay` 继续持有 `.portfolio-overlay__content` 作为唯一滚动容器。新增一个作用域隔离的 scroll reveal 控制器：

- 所有 ScrollTrigger 明确使用该内部滚动容器作为 `scroller`。
- Reveal stage 的 timeline 使用 `scrub: true` 和 `ease: none`。
- 项目条由既有 Navigation 渲染，不使用 ScrollTrigger pin；它继续通过 fixed 定位保持不动。
- Contact 可见状态由滚动容器中的 Contact trigger 驱动，并传给 Navigation 作为隐藏状态。
- 页面切换和组件卸载时清理全部 trigger、timeline 和内联 transform。
- 图片加载或布局变化后进行受控 refresh，不在每帧滚动中读取和写入布局。

## Reduced Motion

当 `prefers-reduced-motion: reduce` 匹配时：

- 取消首屏抽出位移和 scrub timeline。
- 页面内容直接位于正常位置。
- 项目条仍固定显示，并在 Contact 区域隐藏。
- 保留正常滚动、导航点击和 Contact 交互。

## 验收标准

1. 非 Contact 页面初始只突出显示固定项目条，首屏内容被其遮住。
2. 向下滚动时项目条基本不动，首屏内容从其底部逐渐露出。
3. 内容位移与滚动距离 1:1 绑定，没有自动播放、淡入淡出或延迟追随。
4. 反向滚动时首屏内容可自然收回。
5. Reveal 完成后其余内容保持正常纵向滚动，后续 progressive reveal 继续工作。
6. 到达 Contact 时项目条完全消失，离开 Contact 时恢复。
7. Contact 标题和四个导航栏目均完整显示，不发生裁切。
8. 桌面、移动端和 reduced-motion 模式下交互可用。
9. TypeScript 与生产构建通过。
