"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { social } from "@/data/social";
import MediaPlaceholder from "./MediaPlaceholder";

const creatorWorks = [
  {
    number: "01",
    title: "拒绝穿搭内耗｜如何穿出 ins 感韩女味🤍 5/100",
    likes: "3162",
    cover: "/images/social/xiaohongshu-video-05-cover.jpg",
    video: "/videos/xiaohongshu-05.mp4?v=20260827-h264-mp42",
    href: "https://www.xiaohongshu.com/discovery/item/699063cc00000000280218c0?source=webshare&xhsshare=pc_web&xsec_token=ABHoY7gQp_aXlm_OyvUUYQWPM0ps2RA8yY-27uaZo7UF8=&xsec_source=pc_share",
  },
  {
    number: "02",
    title: "拒绝穿搭内耗｜如何穿出 ins 感韩女味💌 8/100",
    likes: "1065",
    cover: "/images/social/xiaohongshu-video-08-cover.jpg",
    video: "/videos/xiaohongshu-08.mp4?v=20260827-h264-mp42",
    href: "https://www.xiaohongshu.com/discovery/item/69999d22000000000e00da59?source=webshare&xhsshare=pc_web&xsec_token=ABmiLVP-x6RoPN-swQEQ_Om9Kpi4f3pV3adKrNAYmomEc=&xsec_source=pc_share",
  },
  {
    number: "03",
    title: "拒绝穿搭内耗｜如何穿出 ins 感韩女味✨ 1/100",
    likes: "868",
    cover: "/images/social/xiaohongshu-video-01-cover.jpg",
    video: "/videos/xiaohongshu-01.mp4?v=20260827-h264-mp42",
    href: "https://www.xiaohongshu.com/discovery/item/6985d80e000000001a02e784?source=webshare&xhsshare=pc_web&xsec_token=ABJGPQ4g5_toP14yvzCNeoYJsdUDSZqnK3zeApivOylZQ=&xsec_source=pc_share",
  },
] as const;

interface ProjectsProps {
  onStackActiveChange?: (active: boolean) => void;
}

function CreatorVideoPlayer({ work }: { work: typeof creatorWorks[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="creator-video__media" data-reveal="media">
      <video
        controls={false}
        disablePictureInPicture
        playsInline
        preload="metadata"
        poster={work.cover}
        aria-label={`播放视频：${work.title}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={work.video} type="video/mp4" />
      </video>
      {!playing && (
        <span
          className="creator-video__play"
          aria-hidden="true"
        >
          <i aria-hidden="true">▶</i>
        </span>
      )}
    </div>
  );
}

function MovingImagePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [useNativeControls, setUseNativeControls] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isSafari = /Safari/i.test(userAgent)
      && !/(Chrome|Chromium|CriOS|Edg|OPR|FxiOS)/i.test(userAgent);
    setUseNativeControls(isSafari);
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }

    try {
      await video.play();
    } catch {
      setPlaying(false);
      setStarted(false);
    }
  };

  return (
    <div
      className={`moving-image-player ${playing ? "is-playing" : ""} ${useNativeControls ? "has-native-controls" : ""}`}
      role={useNativeControls ? undefined : "button"}
      tabIndex={useNativeControls ? undefined : 0}
      aria-label="播放或暂停影片 Toxic Till the End"
      data-cursor={useNativeControls ? undefined : "PLAY"}
      data-reveal="media"
      onClick={useNativeControls ? undefined : () => { void togglePlayback(); }}
      onKeyDown={(event) => {
        if (useNativeControls) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        void togglePlayback();
      }}
    >
      <video
        ref={videoRef}
        controls={useNativeControls}
        disablePictureInPicture={!useNativeControls}
        playsInline
        preload="metadata"
        poster="/images/social/toxic-till-the-end-poster.jpg"
        onPlay={() => setPlaying(true)}
        onPlaying={() => setPlaying(true)}
        onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime > 0.05) setStarted(true);
        }}
        onPause={(event) => {
          setPlaying(false);
          if (event.currentTarget.currentTime <= 0.05) setStarted(false);
        }}
        onError={() => {
          setPlaying(false);
          setStarted(false);
        }}
        onEnded={() => {
          setStarted(false);
          setPlaying(false);
        }}
      >
        <source src="/videos/toxic-till-the-end.mp4?v=20260827-h264-mp42" type="video/mp4" />
      </video>
      {!useNativeControls && !started && (
        <img
          className="moving-image-player__poster"
          src="/images/social/toxic-till-the-end-poster.jpg"
          alt=""
          aria-hidden="true"
        />
      )}
      {!useNativeControls && (
        <span className="moving-image-player__action"><span data-attract="text"><i>▶</i> PLAY FILM →</span></span>
      )}
    </div>
  );
}

export default function Projects({ onStackActiveChange }: ProjectsProps) {
  const [focusedVideo, setFocusedVideo] = useState<number | null>(null);
  const [fireflyOpen, setFireflyOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const fireflyDialog = useRef<HTMLDivElement>(null);
  const invoker = useRef<HTMLButtonElement | null>(null);
  const stackedProjects = useRef<HTMLDivElement>(null);
  const firefly = projects[0];

  useEffect(() => {
    const stack = stackedProjects.current;
    const scroller = stack?.closest<HTMLElement>(".portfolio-overlay__content");
    if (!stack || !scroller || !onStackActiveChange) return;

    let active = false;
    const update = () => {
      const next = stack.getBoundingClientRect().top <= 0;
      if (next === active) return;
      active = next;
      onStackActiveChange(next);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", update);
      onStackActiveChange(false);
    };
  }, [onStackActiveChange]);

  useEffect(() => {
    if (!fireflyOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    fireflyDialog.current?.scrollTo({ top: 0 });
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFireflyOpen(false);
      if (event.key !== "Tab") return;

      const dialog = fireflyDialog.current;
      const controls = dialog?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      invoker.current?.focus();
    };
  }, [fireflyOpen]);

  return (
    <section id="work" className="precision-page precision-projects">
      <header className="precision-intro projects-intro" data-reveal-section>
        <div data-reveal="title">
          <p className="precision-kicker">Projects / 03</p>
          <h1 data-attract="text">Selected work.</h1>
        </div>
        <p data-reveal="body">Personal content, moving image and selected brand work.</p>
        <span data-reveal="body">Strategy<br />Content<br />Execution</span>
      </header>

      <div className="projects-showcase" ref={stackedProjects}>
        <section className="stacked-project-row stacked-project-row--creator">
          <header className="stacked-project-row__bar">
            <span>01 / Personal account</span>
            <h2>Share Life &amp; Insights</h2>
            <span>Video / Social</span>
          </header>
          <div className="stacked-project-row__content creator-project">
          <header className="creator-project__header">
            <div data-reveal="title">
              <p className="precision-kicker">01 — Xiaohongshu / Personal account</p>
              <h2 data-attract="text"><span>Share</span><span>Life &amp; Insights</span></h2>
            </div>
            <p data-reveal="body">围绕 ins 韩系穿搭进行内容策划与视觉表达，以「拒绝穿搭内耗」为系列主线，将趋势洞察转化为风格解析、单品搭配与场景化示范，持续建立统一的账号辨识度与用户互动。</p>
            <dl data-reveal="body">
              {social.stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
            </dl>
          </header>

          <div className="creator-project__profile-link-row">
            <a
              className="creator-project__link"
              href={social.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-reveal="body"
              aria-label={`打开 @${social.username} 的小红书主页`}
            >
              <span>查看小红书主页</span>
              <strong>@{social.username}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </div>

          <div
            className={`creator-videos ${focusedVideo !== null ? "has-focus" : ""}`}
            onPointerLeave={() => setFocusedVideo(null)}
          >
            {creatorWorks.map((work, index) => (
              <article
                className={`creator-video ${focusedVideo === index ? "is-focused" : ""}`}
                key={work.number}
                role="button"
                tabIndex={0}
                aria-label={`播放或暂停视频：${work.title}`}
                onClick={(event) => {
                  const video = event.currentTarget.querySelector("video");
                  if (!video) return;
                  if (video.paused) void video.play();
                  else video.pause();
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  const video = event.currentTarget.querySelector("video");
                  if (!video) return;
                  if (video.paused) void video.play();
                  else video.pause();
                }}
                onPointerEnter={() => setFocusedVideo(index)}
                onFocusCapture={() => setFocusedVideo(index)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedVideo(null);
                }}
              >
                <CreatorVideoPlayer work={work} />
                <div className="creator-video__caption" data-reveal="body">
                  <strong>{work.title}</strong>
                  <span className="creator-video__likes" aria-label={`${work.likes} 个赞`}>
                    <i aria-hidden="true">♥</i>
                    {work.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="stacked-project-row stacked-project-row--moving">
          <header className="stacked-project-row__bar">
            <span>02 / Moving image</span>
            <h2>In the Act of Becoming</h2>
            <span>Film / 4:3</span>
          </header>
          <div className="stacked-project-row__content moving-image-project">
          <div className="moving-image-project__copy" data-reveal="title">
            <p className="precision-kicker">02 — Moving image</p>
            <h2 data-attract="text">In the Act<br />of Becoming</h2>
            <p>Light, texture and transformation.</p>
          </div>

          <MovingImagePlayer />

          <dl className="moving-image-project__meta" data-reveal="body">
            <div><dt>Format</dt><dd>4:3</dd></div>
            <div><dt>Film</dt><dd>01</dd></div>
          </dl>

          <div className="moving-image-project__progress" aria-hidden="true" data-reveal="body">
            <span>00:00</span><i /><span>Full film</span>
          </div>
          </div>
        </section>

        <section className="stacked-project-row stacked-project-row--firefly">
          <header className="stacked-project-row__bar">
            <span>03 / Brand case</span>
            <h2>firefly Big Day</h2>
            <span>Campaign / Onsite</span>
          </header>
          <div className="stacked-project-row__content firefly-project">
          <div className="firefly-project__meta" data-reveal="title">
            <p className="precision-kicker">03 — Brand / Main case</p>
            <h2 data-attract="text">firefly<br />Big Day</h2>
            <button
              onClick={(event) => {
                invoker.current = event.currentTarget;
                setFireflyOpen(true);
              }}
              data-cursor="OPEN"
            >
              Open case ↗
            </button>
          </div>
          <div className="firefly-project__description" data-reveal="body">
            <p>以“萤光车队巡游 + 痛屋快闪”承接 halo 寻光系列嘉兴发布。</p>
            <dl>
              {firefly.metrics?.map((metric) => (
                <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>
              ))}
            </dl>
          </div>
          <div className="firefly-project__media" data-attract="image">
            <div data-reveal="media"><MediaPlaceholder label="CASE 03 / PRIMARY" path={firefly.cover} ratio="4 / 3" showImage /></div>
          </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {fireflyOpen && (
          <motion.div
            ref={fireflyDialog}
            className="project-detail project-detail--poster"
            role="dialog"
            aria-modal="true"
            aria-label="firefly Big Day 完整项目案例"
            onClick={(event) => {
              if (event.target === event.currentTarget) setFireflyOpen(false);
            }}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100%)" }}
            transition={{ duration: .7, ease: [0.22, 1, .36, 1] }}
          >
            <div className="project-detail__poster">
              <button
                ref={closeButton}
                className="project-detail__poster-close"
                onClick={() => setFireflyOpen(false)}
                aria-label="关闭 firefly Big Day 案例"
                data-cursor="CLOSE"
              />
              <img
                src="/images/projects/firefly-big-day-case-selected.png"
                alt="firefly Big Day 整合营销项目案例长图"
              />
            </div>
            <button
              className="project-detail__floating-close"
              onClick={() => setFireflyOpen(false)}
              aria-label="关闭 firefly Big Day 案例"
              data-cursor="CLOSE"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 5 19 19M19 5 5 19" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
