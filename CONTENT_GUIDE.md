# 内容与素材替换指南

这个版本把页面结构、文字数据和素材路径分开，后续可以逐步替换真实内容。

## 修改文字和数据

- 个人定位、联系方式、技能：`data/profile.ts`
- 工作经历：`data/experience.ts`
- 三个案例：`data/projects.ts`
- 小红书数据与主页链接：`data/social.ts`
- 摄影作品顺序与比例：`data/photography.ts`

## 替换素材

保持文件名不变，直接把真实文件放到对应位置：

- 人像：`public/images/profile.jpg`
- 蔚来经历图：`public/images/experience/nio.jpg`
- 得物经历图：`public/images/experience/dewu.jpg`
- 新华日报经历图：`public/images/experience/xinhua.jpg`
- 项目封面：`public/images/projects/`
- 小红书主页截图：`public/images/social/xiaohongshu-profile.jpg`
- 摄影作品：`public/images/photo/01.jpg` 至 `06.jpg`
- 简历：`public/resume.pdf`

当前组件会在素材缺失时显示带路径提示的占位区域，不会展示虚假图片。

## 增加内容

- 增加经历：在 `data/experience.ts` 的数组中复制一项并修改。
- 增加案例：在 `data/projects.ts` 的数组中复制一项并修改。
- 增加摄影作品：在 `data/photography.ts` 中增加记录，并把图片放到对应目录。
- 启用小红书主页按钮：在 `data/social.ts` 的 `profileUrl` 中填写真实链接。

## 调整页面顺序

页面顺序集中在 `app/page.tsx`。移动组件的位置即可调整章节顺序。

## 开屏动画配置

开屏时间、文案轮换、矩阵行数和调试开关集中在 `data/intro.ts`。

- 开发环境默认每次刷新重播：`forceReplayInDevelopment: true`
- 改为 `false` 后，同一浏览会话只播放一次。
- 在任意环境临时强制重播：网址后添加 `?replay-intro=1`
- 强制检查完整动画：添加 `?replay-intro=1&full-motion=1`
- 强制检查减少动态效果：添加 `?replay-intro=1&reduced-motion=1`
