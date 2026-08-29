export type PhotographyItem = {
  id: string;
  title: string;
  location: string;
  season: string;
  year: string;
  memory: string;
  src: string;
  ratio: string;
};

export const photography: PhotographyItem[] = [
  { id: "01", title: "Summer on Film", location: "镰仓", season: "Summer", year: "2025", memory: "七月的镰仓，海面亮得像一卷刚洗出的胶片。江之岛在远处，夏天在近处。", src: "./images/photography/01-kamakura.jpg", ratio: "4 / 5" },
  { id: "02", title: "One More Second", location: "南京", season: "Autumn", year: "2025", memory: "南京的午后被收进取景框。镜头停下以后，拥抱还多留了一秒。", src: "./images/photography/02-nanjing-mv.jpg", ratio: "4 / 3" },
  { id: "03", title: "Petals, After Rain", location: "上海", season: "Spring", year: "2026", memory: "花期没有真正结束，只是从枝头落进了上海的雨水里。", src: "./images/photography/03-shanghai-petals.jpg", ratio: "3 / 4" },
  { id: "04", title: "A Pale Blue Day", location: "釜山", season: "Winter", year: "2026", memory: "釜山的冬日把海调成很淡的蓝。风很冷，阳光却一直落在水面上。", src: "./images/photography/04-busan.jpg", ratio: "3 / 2" },
  { id: "05", title: "Before the Sound", location: "上海 PSA", season: "Summer", year: "2026", memory: "在 PSA 的暗处，影像先于声音抵达。站了一会儿，城市的节奏也慢了下来。", src: "./images/photography/05-shanghai-psa.jpg", ratio: "4 / 5" },
  { id: "06", title: "A Small Summer", location: "上海荣宅", season: "Summer", year: "2026", memory: "荣宅的夏天藏在浓绿与白色廊柱之间。一个小小的身影，让旧建筑忽然有了轻盈的尺度。", src: "./images/photography/06-shanghai-rongzhai.jpg", ratio: "2 / 3" },
];
