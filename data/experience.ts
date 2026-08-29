export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  tags: string[];
  summary: string;
  highlights: string[];
  image: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "蔚来 NIO",
    role: "区域市场营销",
    period: "2026.06 — 2026.09",
    tags: ["Brand Marketing", "Campaign", "KOC Collaboration", "Offline Event"],
    summary:
      "围绕区域品牌传播与 firefly 萤火虫新车型上市节点，参与内容策划、供应商协作、多平台分发和线下活动执行。",
    highlights: [
      "完成选题、脚本、视频剪辑与图文排版，覆盖小红书、抖音和视频号。",
      "参与 big day 内容日历规划，对接本地 KOC 并跟进内容交付。",
      "参与“萤光车队巡游”全流程，支持物料、路线、UGC 互动区与现场执行。",
    ],
    image: "./images/experience/nio.jpg",
  },
  {
    company: "得物 DEWU",
    role: "时尚内容运营",
    period: "2026.03 — 2026.06",
    tags: ["Content Operation", "User Growth", "E-commerce", "CRM"],
    summary:
      "负责高端用户内容运营与尊享导购服务，参与时尚内容生产、私域触达、专属会场运营与商品信息库建设。",
    highlights: [
      "依据用户购买数据和平台大盘数据选品，持续更新选题与创意主题。",
      "每周进行 3-4 次定向触达，策划母亲节、520 等节日内容。",
      "定期复盘运营效果，优化选品、内容类别与用户服务流程。",
    ],
    image: "./images/experience/dewu.jpg",
  },
  {
    company: "新华日报南京分社",
    role: "新媒体运营",
    period: "2025.01 — 2025.03",
    tags: ["Media Content", "Video Production"],
    summary: "参与媒体内容生产，积累从拍摄到成片的全流程制作经验。",
    highlights: ["拍摄与素材整理", "视频剪辑与内容包装", "媒体内容生产流程"],
    image: "./images/experience/xinhua.jpg",
  },
];
