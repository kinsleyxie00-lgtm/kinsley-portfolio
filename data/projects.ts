export type ProjectItem = {
  number: string;
  title: string;
  category: string;
  background: string;
  role: string;
  execution: string;
  result: string;
  cover: string;
};

export const projects: ProjectItem[] = [
  {
    number: "CASE 01",
    title: "NIO Firefly Marketing Campaign",
    category: "BRAND MARKETING / CAMPAIGN",
    background: "围绕 firefly 萤火虫新车型上市节点展开区域传播与线下活动。",
    role: "内容策划、KOC 协作、供应商对接、线下执行",
    execution: "内容日历、合作 brief、多平台内容分发与“萤光车队巡游”现场支持。",
    result: "完成既定传播与活动执行；真实项目素材与详细复盘待补充。",
    cover: "/images/projects/nio-firefly.jpg",
  },
  {
    number: "CASE 02",
    title: "DEWU Fashion Content Operation",
    category: "CONTENT OPERATION / E-COMMERCE",
    background: "面向平台高端用户的时尚内容、专属会场与私域触达运营。",
    role: "内容策划、选品包装、视觉制作、数据复盘",
    execution: "每周主题规划、节日企划、定向推送与商品信息库优化。",
    result: "支持 Q2 内容运营与会场增长；真实页面截图与复盘待补充。",
    cover: "/images/projects/dewu-fashion.jpg",
  },
  {
    number: "CASE 03",
    title: "Xiaohongshu Personal Brand Growth",
    category: "SOCIAL MEDIA / PERSONAL BRAND",
    background: "从 0-1 运营个人时尚穿搭账号，建立稳定的视觉与内容方向。",
    role: "账号定位、内容策划、视觉创作、流量运营",
    execution: "围绕趋势与季节热点完成选题、造型、精修、标题和标签优化。",
    result: "1,500+ 粉丝，最高浏览 30,000+，单篇赞藏 3,000+。",
    cover: "/images/projects/xiaohongshu.jpg",
  },
];
