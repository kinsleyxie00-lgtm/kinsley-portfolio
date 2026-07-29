# KINSLEY XIE Portfolio Website Design

## 1. 项目目标

为谢可心（KINSLEY XIE）建立一个面向国内品牌营销、内容运营、新媒体运营与创意营销岗位的个人品牌网站。网站不是传统在线简历，而是一份具有国际创意工作室气质、能够快速传达商业意识、内容能力和视觉审美的数字作品集。

第一阶段只搭建完整框架，使用简历中的真实信息与真实数据。未提供的人像、项目图片、平台截图和摄影作品统一使用明确标注的占位区域，不生成虚假照片、项目截图或数据。

## 2. 品牌与语言策略

- 主品牌：KINSLEY XIE
- 中文姓名：谢可心
- 核心定位：Creative Marketer
- 能力标签：Brand Strategy / Content Creation / Social Media / Visual Storytelling
- 中文内容优先：经历说明、项目职责、成果与个人介绍使用中文，保证国内招聘方的阅读效率。
- 英文承担品牌塑造：导航、章节名、职业定位、关键词与行动按钮使用英文。
- 不增加语言切换，避免双语重复造成页面冗长。

## 3. 视觉方向

视觉语言来自国际创意工作室、独立杂志与品牌画册，而不是简历模板或 SaaS 官网。

- 纯白、暖灰与近黑组成主色体系。
- 使用超大无衬线标题、精细正文、宽字距小号标签形成排版层级。
- 大面积留白配合细边线、编号、纵向节奏和不对称网格。
- 不使用蓝紫渐变、玻璃拟态、发光效果或大量圆角卡片。
- 开屏视频只提供灵感：重复字排、居中构图、强黑白对比和机械式节奏；首屏本身不使用传统全屏视频背景。
- 所有素材占位区域使用灰阶色块、编号和清晰的替换提示，保持页面在无真实素材时仍然成立。

## 4. 页面结构

网站为单页滚动叙事：

1. Hero
2. Experience
3. Selected Work
4. Social Media
5. Visual Archive
6. About Me
7. Contact
8. Footer

内容顺序遵循“先成果、后人物”的叙事策略：招聘方首先看到品牌营销、内容运营与账号增长能力，再在页面后段了解个人定位。顶部导航固定或在滚动时保持轻量可达，通过锚点跳转到 WORK、SOCIAL、PHOTO、ABOUT 和 CONTACT。移动端使用简洁的菜单面板。

## 5. Hero

Hero 高度为 100vh，纯白背景。顶部左侧显示 KINSLEY XIE，右侧显示章节导航。

视觉中心为超大两行姓名：

KINSLEY  
XIE

姓名使用 `clamp(80px, 12vw, 220px)` 级别的响应式字号，并根据屏幕比例控制行高与字距。下方显示 CREATIVE MARKETER、中文名谢可心与四个能力标签。

进入动画由 Framer Motion 完成：

- 页面白底立即出现。
- 姓名从透明和轻微下移状态进入。
- 职业定位、能力标签、导航和底部信息依次延迟出现。
- 动画总时长控制在 0.8-1.5 秒。

滚动离场使用 GSAP ScrollTrigger：

- 标题轻微缩小、上移并降低透明度。
- 不锁定滚动，不制造过长的首屏停留。
- 尊重 `prefers-reduced-motion`。

底部三点信息为 BASED IN NANJING、SCROLL、AVAILABLE FOR OPPORTUNITIES。

## 6. Experience

经历区采用 Creative Agency Case Study 式的全宽条目，而不是卡片。

每个条目包含公司、职位、时间、领域标签、简要职责和关键成果。桌面端 Hover 时在指针附近或固定预览位显示项目素材占位；触屏设备直接显示缩略占位。

经历数据：

- 蔚来 / 区域市场营销 / 2026.06-2026.09
- 得物上海总部 / 时尚内容运营 / 2026.03-2026.06
- 新华日报南京分社 / 新媒体运营 / 2025.01-2025.03

所有描述只整理简历已有事实，不补写未经证实的转化率、销售额或曝光数据。

## 7. Selected Work

创建三个案例入口：

- CASE 01 / NIO Firefly Marketing Campaign
- CASE 02 / DEWU Fashion Content Operation
- CASE 03 / Xiaohongshu Personal Brand Growth

每个案例展示封面占位、背景、职责、执行与结果。第一阶段在页面内展开摘要，不新增独立详情页。所有项目图像使用可替换占位，真实项目素材到位后可无须修改组件结构直接替换。

## 8. Social Media

重点展示小红书时尚穿搭账号的 0-1 运营成果，采用创作者主页式布局，但不仿制平台 UI。

真实数据：

- 1,500+ Followers
- 30,000+ 最高浏览
- 3,000+ 单篇赞藏
- 14,000+ 累计赞藏

账号截图使用占位区域。`VIEW PROFILE ↗` 在未提供真实主页链接前显示为不可跳转的预留按钮，并设置清晰提示，避免虚构链接。

## 9. Visual Archive

摄影区使用响应式 Masonry Grid。首期提供一组不同宽高比的灰阶占位块，路径预留为 `/images/photo/`。

交互包括：

- Hover 轻微缩放与编号显示。
- 点击打开全屏 Lightbox。
- 键盘 Escape 关闭，左右方向键切换。
- 移动端支持触摸浏览。
- 占位内容不会伪装成真实摄影作品。

## 10. About Me

About Me 放在经历、案例、社媒成果与视觉作品之后，承担“补充人物定位”的作用，不承担简历开场功能。

采用不对称双栏布局。左侧为 `/images/profile.jpg` 人像占位，右侧为中文自我介绍：

> KINSLEY XIE is a creative marketer focusing on brand marketing, content operation and visual storytelling.
>
> 拥有汽车品牌市场营销、互联网内容运营及个人账号运营经验，能够完成从策略规划、内容制作到传播运营的完整流程。

下方仅以紧凑信息行展示：

- Skills：内容策划、品牌传播、视频制作、视觉设计、数据复盘、AI 工作流
- Tools：Codex、剪映、DaVinci Resolve、Premiere Pro、Photoshop、PowerPoint
- Contact：邮箱、电话、南京

网站不出现学校、专业、学历层级或在读时间，避免教育背景抢占职业能力的叙事权重。

## 11. Contact

整屏近黑背景，与前面白色内容形成明确收尾。

主标题：

LET'S CREATE  
MEANINGFUL  
CONTENT.

辅助文案为 “Looking for opportunities. Let's connect.”，并展示：

- EMAIL / 13382085646@163.com
- PHONE / 13382085646
- LOCATION / NANJING

`SEND EMAIL ↗` 使用 `mailto:`。`DOWNLOAD RESUME ↓` 指向公开目录中的简历副本。

## 12. 技术架构

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP ScrollTrigger

页面组件：

- `components/Hero.tsx`
- `components/Navigation.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/SocialMedia.tsx`
- `components/Photography.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`

内容数据：

- `data/profile.ts`
- `data/experience.ts`
- `data/projects.ts`
- `data/social.ts`
- `data/photography.ts`

组件只负责布局和交互，内容由数据文件提供。素材路径也放入数据层，方便后续替换。

## 13. 响应式与可访问性

- 桌面端强调横向网格、超大标题和 Hover 预览。
- 平板端缩减边距与标题字号，保持内容层级。
- 手机端改为单列，菜单折叠，案例和经历图片始终可见。
- 所有按钮、导航和 Lightbox 支持键盘操作。
- 图片配置有意义的替代文本。
- 黑白配色满足基本对比度要求。
- 动画尊重系统减少动态效果设置。

## 14. SEO

- 页面标题：KINSLEY XIE — Creative Marketer
- 描述覆盖 Brand Marketing、Content Operation、Social Media 和 Visual Storytelling。
- 使用语义化章节、正确的标题层级和个人信息结构化数据。
- 配置 Open Graph 基础信息；不使用虚假项目图片作为社交预览。

## 15. 验证标准

- 生产构建成功。
- 桌面端和移动端内容完整，无横向溢出。
- 导航锚点、邮件链接、简历下载、Lightbox 与菜单可用。
- 无虚假素材、虚假链接和简历之外的虚构成果。
- 关闭 JavaScript 动画或启用减少动态效果后，正文仍可正常阅读。
- 项目数据、图片路径和文本可独立替换，无需重写页面组件。

## 16. 第一阶段交付说明

最终交付应包含：

1. 项目结构。
2. 已完成页面和交互。
3. 每类素材的替换目录与数据入口。
4. 本地运行方式。
5. 添加真实内容的方法。
6. 可访问的部署链接，除非用户明确要求只保留本地版本。
