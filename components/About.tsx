"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import DepthCarousel, { type DepthCarouselItem } from "./DepthCarousel";
import TextType from "./TextType";

const aboutCopy = [
  "关注 Market Trends、Consumer Insights 与 Brand Communication，参与从 Campaign Planning、内容传播到线下活动执行的完整流程。",
  "在跨平台协作与项目复盘中持续积累经验，用更清晰的 Strategy 与 Content，提升品牌触达和用户感知。",
];

const portraitItems: DepthCarouselItem[] = [
  { image: "./images/about-carousel/kinsley-01.jpg", alt: "Kinsley Xie 在创意拍摄现场工作" },
  { image: "./images/about-carousel/kinsley-02.jpg", alt: "Kinsley Xie 在海边街道" },
  { image: "./images/about-carousel/kinsley-03.jpg", alt: "Kinsley Xie 在城市街道" },
  { image: "./images/about-carousel/kinsley-04.jpg", alt: "Kinsley Xie 的旅行生活照" },
  { image: "./images/about-carousel/kinsley-05.jpg", alt: "Kinsley Xie 在林间阳光下" },
];

export default function About() {
  const [activePortrait, setActivePortrait] = useState(0);

  return (
    <section id="about" className="precision-page precision-about" data-reveal-section>
      <div className="precision-about__portrait" data-cursor="VIEW" data-attract="image">
        <div data-reveal="media">
          <DepthCarousel items={portraitItems} onChange={setActivePortrait} />
        </div>
        <span data-reveal="body">PORTRAIT / {String(activePortrait + 1).padStart(2, "0")}</span>
      </div>

      <div className="precision-about__copy">
        <p className="precision-kicker">01 / Profile</p>
        <div data-reveal="title">
          <h1 className="precision-about__handwritten" data-attract="text">
            <img src="./images/type/about-me-handwritten-cutout-v3.png" alt="about me" />
          </h1>
        </div>
        <div data-reveal="body">
          <TextType text={aboutCopy} />
          <a href={profile.resume} download data-cursor="OPEN">Download resume ↗</a>
        </div>
      </div>

      <div className="precision-about__leaf" aria-hidden="true"><i /><i /></div>
    </section>
  );
}
