"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const whatsapp =
  "https://wa.me/995550001182?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D0%BF%D0%BE%D1%81%D0%B5%D1%82%D0%B8%D0%BB%28%D0%B0%29%20%D1%81%D0%B0%D0%B9%D1%82%20LOGOGE%20%D0%B8%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82.";

const sections = [
  { id: "branding", label: "Branding" },
  { id: "smm", label: "SMM" },
  { id: "academy", label: "Academy" },
  { id: "event-reels", label: "Event Reels" },
  { id: "web", label: "Web Development" },
  { id: "team", label: "Team" },
];

const slideIds = ["intro", ...sections.map((section) => section.id)];

const smmPackages = [
  ["Start", "Базовое ведение и создание контента."],
  ["Business", "Продвижение с таргетированной рекламой."],
  ["Premium", "Полное маркетинговое сопровождение бренда."],
];

const academyPackages = [
  ["Start", "Основы SMM, контент-план, мобильная съёмка и монтаж Reels."],
  ["Pro", "Стратегия, продающий контент, таргетинг, аналитика и практика."],
  ["Mentorship", "Индивидуальная программа, консультации и сопровождение проекта."],
];

const eventPackages = [
  ["Essential", "3 Reels", "Ключевые моменты события в лаконичной серии."],
  ["Story", "5 Reels", "Развёрнутая история события с разными сценариями."],
  ["Full Event", "8 Reels", "Полное контент-сопровождение и максимум атмосферы."],
];

const webPackages = [
  ["Landing", "Одностраничный сайт для услуги, продукта или кампании."],
  ["Business", "Многостраничный сайт с услугами, кейсами и заявками."],
  ["Custom", "Интерактивный сайт с анимациями, языками и интеграциями."],
];

function PackageCards({ items, service, destination }: { items: string[][]; service: string; destination?: string }) {
  return (
    <div className="package-grid">
      {items.map(([name, detail, extra], index) => (
        <a className="package-card magnetic" href={destination ?? `/contacts?service=${encodeURIComponent(service)}&package=${encodeURIComponent(name)}`} aria-label={`${destination ? "Подробнее о" : "Выбрать"} пакет ${name} — ${service}`} key={name}>
          <span className="card-index">0{index + 1}</span>
          <h3>{name}</h3>
          <strong>{detail}</strong>
          {extra && <p>{extra}</p>}
        </a>
      ))}
    </div>
  );
}

function SectionObject({ type }: { type: "magazine" | "camera" | "cap" | "phone" | "laptop" }) {
  return (
    <div className={`scene-object object-${type}`} aria-hidden="true">
      {type === "magazine" && (
        <div className="magazine-stack">
          <i className="magazine-page page-back" />
          <i className="magazine-page page-middle" />
          <i className="magazine-page page-front"><span>LOGO<br />COLOR<br />TYPE</span></i>
          <div className="magazine-cover"><small>LOGOGE / BRANDING</small><b>BRAND<br />FORM</b><span>01 / 26</span></div>
        </div>
      )}
      {type === "camera" && (
        <div className="camera-model">
          <div className="camera-top"><i /><b /></div>
          <div className="camera-body"><span className="camera-lens"><i /></span><em>REC</em></div>
        </div>
      )}
      {type === "cap" && (
        <div className="cap-model"><div className="cap-top" /><div className="cap-band" /><i className="cap-tassel" /></div>
      )}
      {type === "phone" && (
        <div className="phone-rig">
          <div className="phone-model"><div className="phone-screen"><i /><i /><i /><i /></div><b /></div>
          <div className="tripod"><i /><i /><i /></div>
        </div>
      )}
      {type === "laptop" && (
        <div className="laptop-model">
          <div className="laptop-lid">
            <div className="laptop-camera-dot" />
            <div className="laptop-screen">
              <div className="laptop-toolbar"><i /><i /><i /><b>logoge.studio</b></div>
              <div className="laptop-web-preview"><small>Digital studio</small><strong>Ideas<br />in motion.</strong><span>LOGOGE / WEB</span></div>
            </div>
          </div>
          <div className="laptop-base">
            <div className="laptop-keyboard">{Array.from({ length: 15 }).map((_, index) => <i key={index} />)}</div>
            <span className="laptop-trackpad" />
          </div>
        </div>
      )}
    </div>
  );
}

const dockItems = [
  { id: "intro", label: "Начало", icon: "spark" },
  { id: "branding", label: "Branding", icon: "magazine" },
  { id: "smm", label: "SMM", icon: "camera" },
  { id: "academy", label: "Academy", icon: "cap" },
  { id: "event-reels", label: "Event Reels", icon: "phone" },
  { id: "web", label: "Web Development", icon: "laptop" },
  { id: "team", label: "Team", icon: "team" },
];

function HeroVideo({ src, className, poster }: { src: string; className: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <video
      className={className}
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function CrossfadeVideo({ src, className, poster }: { src: string; className: string; poster?: string }) {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const activeLayerRef = useRef(0);
  const switching = useRef(false);
  const fadeTimer = useRef<number | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);

  const crossfade = (fromIndex: number) => {
    if (fromIndex !== activeLayerRef.current || switching.current) return;
    const current = videos.current[fromIndex];
    const nextIndex = fromIndex === 0 ? 1 : 0;
    const next = videos.current[nextIndex];
    if (!current || !next) return;

    switching.current = true;
    next.currentTime = 0;
    next.play().then(() => {
      activeLayerRef.current = nextIndex;
      setActiveLayer(nextIndex);
      fadeTimer.current = window.setTimeout(() => {
        current.pause();
        current.currentTime = 0;
        switching.current = false;
      }, 1450);
    }).catch(() => {
      switching.current = false;
    });
  };

  const monitor = (index: number) => {
    const video = videos.current[index];
    if (video && Number.isFinite(video.duration) && video.duration - video.currentTime <= 1.5) {
      crossfade(index);
    }
  };

  useEffect(() => () => {
    if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
  }, []);

  return (
    <>
      {[0, 1].map((index) => (
        <video
          className={`${className} ${activeLayer === index ? "is-visible" : ""}`}
          ref={(element) => { videos.current[index] = element; }}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          poster={poster}
          onTimeUpdate={() => monitor(index)}
          onEnded={() => crossfade(index)}
          key={index}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [utilityScene, setUtilityScene] = useState<"about" | "contacts" | null>(null);
  const wheelLocked = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const teamGalleryRef = useRef<HTMLDivElement>(null);
  const active = utilityScene ?? slideIds[activeIndex];
  const sceneClass = (id: string, classes: string) => {
    const sceneIndex = slideIds.indexOf(id);
    const position = active === id ? "is-active" : sceneIndex < activeIndex ? "is-before" : "is-after";
    return `scene ${classes} ${position}`;
  };

  useEffect(() => {
    const syncWithHash = () => {
      const requestedSlide = window.location.hash.slice(1);
      const requestedIndex = slideIds.indexOf(requestedSlide);
      if (requestedIndex >= 0) {
        setUtilityScene(null);
        setActiveIndex(requestedIndex);
      } else if (requestedSlide === "about" || requestedSlide === "contacts") {
        setUtilityScene(requestedSlide);
      }
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  useEffect(() => {
    if (menuOpen || utilityScene) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slideIds.length);
    }, activeIndex === 0 ? 9000 : 7000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, menuOpen, utilityScene]);

  useEffect(() => {
    if (active !== "team") return;
    const centerOwner = () => {
      const gallery = teamGalleryRef.current;
      const owner = gallery?.querySelector<HTMLElement>(".owner-card");
      if (!gallery || !owner || window.innerWidth > 760) return;
      gallery.scrollTo({
        left: owner.offsetLeft - (gallery.clientWidth - owner.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };
    const frame = window.requestAnimationFrame(centerOwner);
    window.addEventListener("resize", centerOwner);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", centerOwner);
    };
  }, [active]);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      const movementX = (event.clientX / window.innerWidth - 0.5) * 18;
      const movementY = (event.clientY / window.innerHeight - 0.5) * 14;
      document.documentElement.style.setProperty("--move-x", `${movementX}px`);
      document.documentElement.style.setProperty("--move-y", `${movementY}px`);
      document.documentElement.style.setProperty("--move-x-neg", `${-movementX}px`);
      document.documentElement.style.setProperty("--move-y-neg", `${-movementY}px`);
      document.documentElement.style.setProperty(
        "--tilt-x",
        `${(event.clientX / window.innerWidth - 0.5) * 14}deg`,
      );
      document.documentElement.style.setProperty(
        "--tilt-y",
        `${(event.clientY / window.innerHeight - 0.5) * -14}deg`,
      );
      document.documentElement.style.setProperty(
        "--team-tilt-x",
        `${(event.clientX / window.innerWidth - 0.5) * 2.8}deg`,
      );
      document.documentElement.style.setProperty(
        "--team-tilt-y",
        `${(event.clientY / window.innerHeight - 0.5) * -2.8}deg`,
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const changeSlide = (direction: number) => {
      if (wheelLocked.current || menuOpen || utilityScene) return;
      wheelLocked.current = true;
      setActiveIndex((current) => (current + direction + slideIds.length) % slideIds.length);
      window.setTimeout(() => { wheelLocked.current = false; }, 900);
    };
    const onWheel = (event: WheelEvent) => {
      const scrollArea = event.target instanceof Element ? event.target.closest<HTMLElement>(".smm-comparison") : null;
      if (scrollArea && scrollArea.scrollHeight > scrollArea.clientHeight) {
        const canScrollDown = event.deltaY > 0 && scrollArea.scrollTop + scrollArea.clientHeight < scrollArea.scrollHeight - 2;
        const canScrollUp = event.deltaY < 0 && scrollArea.scrollTop > 2;
        if (canScrollDown || canScrollUp) return;
      }
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      changeSlide(event.deltaY > 0 ? 1 : -1);
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) changeSlide(1);
      if (["ArrowUp", "PageUp"].includes(event.key)) changeSlide(-1);
      if (event.key === "Escape" && utilityScene) setUtilityScene(null);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0]?.clientX ?? 0;
      touchStartY.current = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const distanceX = touchStartX.current - endX;
      const distanceY = touchStartY.current - endY;
      if (Math.abs(distanceY) > 45 && Math.abs(distanceY) > Math.abs(distanceX) * 1.15) {
        changeSlide(distanceY > 0 ? 1 : -1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [menuOpen, utilityScene]);

  const goTo = (id: string) => {
    const slideIndex = slideIds.indexOf(id);
    if (slideIndex >= 0) {
      setUtilityScene(null);
      setActiveIndex(slideIndex);
    } else if (id === "about" || id === "contacts") {
      setUtilityScene(id);
    }
    window.history.replaceState(null, "", id === "intro" ? window.location.pathname : `#${id}`);
    setMenuOpen(false);
  };

  return (
    <main>
      <div aria-hidden="true" className="cursor-light" />
      <header className={`site-header ${!menuOpen && ["intro", "academy", "event-reels", "about", "contacts"].includes(active) ? "header-light" : "header-dark"}`}>
        <button className="wordmark" onClick={() => goTo("intro")} aria-label="В начало">
          <span className="brand-mark" aria-hidden="true" />
          <span>LOGOGE</span>
        </button>
        <div className="header-center">
          <span>{active === "intro" ? "Creative studio" : active.replace("-", " ")}</span>
        </div>
        <div className="header-actions">
          <a className="whatsapp-link" href={whatsapp} target="_blank" rel="noreferrer">
            Try Now
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <nav
        className={`scene-dock ${["intro", "academy", "event-reels"].includes(active) ? "is-light" : ""} ${menuOpen || utilityScene ? "is-hidden" : ""}`}
        aria-label="Навигация по разделам"
        style={{ "--dock-progress": activeIndex / (dockItems.length - 1) } as CSSProperties}
      >
        <span className="dock-progress" aria-hidden="true" />
        {dockItems.map((item, index) => (
          <button
            className={index === activeIndex ? "is-active" : ""}
            style={{ "--dock-position": `${(index / (dockItems.length - 1)) * 100}%` } as CSSProperties}
            onClick={() => goTo(item.id)}
            aria-label={`Перейти: ${item.label}`}
            aria-current={index === activeIndex ? "page" : undefined}
            key={item.id}
          >
            <span className="dock-marker" aria-hidden="true" />
          </button>
        ))}
      </nav>

      <nav className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-list">
          {[
            ["branding", "Услуги"],
            ["about", "О компании"],
            ["contacts", "Контакты"],
          ].map(([id, label], index) => (
            <button key={id} onClick={() => goTo(id)}>
              <small>0{index + 1}</small>
              {label}
            </button>
          ))}
          <div className="menu-legal" aria-label="Юридическая информация">
            <a href="/privacy">Политика конфиденциальности</a>
            <a href="/cookies">Политика Cookie</a>
            <a href="/terms">Пользовательское соглашение</a>
          </div>
        </div>
        <div className="menu-meta">
          <span>RU · GE · EN</span>
        </div>
      </nav>

      <section className={sceneClass("intro", "hero")} id="intro">
        <div className="hero-art" aria-hidden="true">
          <HeroVideo src="/assets/hero-video-3.mp4" className="hero-video" poster="/assets/hero-hq.png" />
          <div className="liquid liquid-one" />
          <div className="liquid liquid-two" />
          <div className="halo" />
          <div className="light-sweep" />
          <div className="grain" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Branding · Marketing · Digital</p>
          <h1>Там, где идея<br />становится <em>брендом</em></h1>
        </div>
        <p className="hero-note">
          Создаём бренды, контент и цифровые решения для бизнеса в Грузии и за её пределами.
        </p>
        <button className="scroll-cue" onClick={() => goTo("branding")}>
          <span>Прокрутите</span>
          <b><i className="ui-arrow ui-arrow-down" aria-hidden="true" /></b>
        </button>
        <div className="hero-counter">01 / 07</div>
      </section>

      <section className={sceneClass("branding", "service-scene branding")} id="branding">
        <div className="brand-atmosphere" aria-hidden="true" />
        <div className="brand-orbits" aria-hidden="true"><i /><i /><b /></div>
        <div className="scene-number">02</div>
        <div className="section-copy">
          <p className="eyebrow">Identity / Packaging / Print</p>
          <h2>Branding</h2>
          <p className="lead">Создаём цельную визуальную систему, которая превращает бизнес в узнаваемый бренд.</p>
          <div className="tag-list">
            {[
              "Логотип",
              "Идентичность",
              "Цветовая система",
              "Типографика",
              "Печатные материалы",
              "Упаковка",
            ].map((tag, index) => <span style={{ "--tag-index": index } as CSSProperties} key={tag}><small>0{index + 1}</small>{tag}</span>)}
          </div>
        </div>
        <p className="brand-side-note" aria-hidden="true">LOGO · COLOR · TYPE · FORM</p>
        <SectionObject type="magazine" />
        <a className="round-cta brand-cta magnetic" href={whatsapp} target="_blank" rel="noreferrer"><span>Обсудить<br />бренд</span><i className="ui-arrow" aria-hidden="true" /></a>
      </section>

      <section className={sceneClass("smm", "service-scene smm")} id="smm">
        <div className="smm-video-art" aria-hidden="true">
          <CrossfadeVideo src="/assets/smm-video-1.mp4" className="smm-video loop-video" />
        </div>
        <div className="scene-number">03</div>
        <div className="section-heading">
          <p className="eyebrow">Strategy / Content / Performance</p>
          <h2>SMM</h2>
          <p>Продвижение, которое говорит голосом вашего бренда.</p>
        </div>
        <PackageCards items={smmPackages} service="SMM" destination="/smm" />
        <SectionObject type="camera" />
        <a className="text-cta smm-more" href="/smm">Подробнее / More</a>
      </section>

      <section className={sceneClass("academy", "service-scene academy")} id="academy">
        <div className="academy-architecture" aria-hidden="true"><i /><i /><i /><span>LEARN · CREATE · GROW</span></div>
        <div className="scene-number">04</div>
        <div className="section-heading">
          <p className="eyebrow">Online & Offline · Georgia</p>
          <h2>Academy</h2>
          <p>Практические знания для самостоятельного создания контента и продвижения брендов.</p>
        </div>
        <PackageCards items={academyPackages} service="Academy" />
        <p className="academy-principle" aria-hidden="true"><span>01</span> Практика <i /> <span>02</span> Система <i /> <span>03</span> Результат</p>
        <SectionObject type="cap" />
        <a className="text-cta academy-cta" href="/academy/apply">Оставить заявку на обучение <b><i className="ui-arrow" aria-hidden="true" /></b></a>
      </section>

      <section className={sceneClass("event-reels", "service-scene event")} id="event-reels">
        <div className="scene-number">05</div>
        <div className="section-heading event-heading">
          <p className="eyebrow">Real moments / Cinematic rhythm</p>
          <h2>Event<br /><em>Reels</em></h2>
          <p>Ловим эмоции события и превращаем их в динамичные Reels.</p>
        </div>
        <PackageCards items={eventPackages} service="Event Reels" />
        <SectionObject type="phone" />
        <div className="event-includes">
          Съёмка · трендовый монтаж · Stories в день события · обработка · исходники
        </div>
      </section>

      <section className={sceneClass("web", "service-scene web")} id="web">
        <div className="scene-number">06</div>
        <div className="section-heading">
          <p className="eyebrow">Design / Motion / Development</p>
          <h2>Web<br />Development</h2>
          <p>Сайты с характером бренда — выразительные, быстрые и удобные на любом экране.</p>
        </div>
        <PackageCards items={webPackages} service="Web Development" />
        <SectionObject type="laptop" />
      </section>

      <section className={sceneClass("team", "service-scene team")} id="team">
        <div className="scene-number">07</div>
        <div className="section-copy team-copy">
          <p className="eyebrow">People behind the ideas</p>
          <h2>Team</h2>
          <p className="lead">Стратеги, дизайнеры и создатели контента, которые превращают идеи в узнаваемые истории.</p>
          <div className="team-caption"><span>05</span> человек · одна творческая система</div>
        </div>
        <div className="team-gallery" ref={teamGalleryRef}>
          <figure className="member-card owner-card">
            <img src="/assets/team-mariana.jpg" alt="Mariana — команда LOGOGE" />
            <figcaption><span>Mariana</span></figcaption>
          </figure>
          <figure className="member-card member-two">
            <img src="/assets/team-amanda.jpg" alt="Amanda — команда LOGOGE" />
            <figcaption><span>Amanda</span></figcaption>
          </figure>
          <figure className="member-card member-three">
            <img src="/assets/team-asy.jpg" alt="Asy — команда LOGOGE" />
            <figcaption><span>Asy</span></figcaption>
          </figure>
          <figure className="member-card member-four">
            <img src="/assets/team-sophi.jpg" alt="Sofia — команда LOGOGE" />
            <figcaption><span>Sofia</span></figcaption>
          </figure>
          <figure className="member-card member-five">
            <img src="/assets/team-sveta.jpg" alt="Sveta — команда LOGOGE" />
            <figcaption><span>Sveta</span></figcaption>
          </figure>
        </div>
        <div className="game-teaser" aria-label="Будущая интерактивная игра">
          <div className="case-handle" />
          <div className="case-lid"><span>LOGOGE</span></div>
          <div className="case-body"><span>Creative<br />toolkit</span></div>
          <p>Interactive game · soon</p>
        </div>
      </section>

      <section className={`content-section utility-scene about-section ${active === "about" ? "is-active" : ""}`} id="about">
        <p className="eyebrow">О компании</p>
        <h2>Создаём визуальный язык, который помогает бизнесу расти.</h2>
        <div className="about-grid">
          <p>Объединяем стратегию, брендинг, контент и веб-дизайн в единую систему.</p>
          <p>Работаем с компаниями и личными брендами в Грузии и за её пределами.</p>
        </div>
      </section>

      <footer className={`content-section utility-scene contact-section ${active === "contacts" ? "is-active" : ""}`} id="contacts">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Контакты · LOGOGE</p>
            <h2>Обсудим<br /><em>вашу идею.</em></h2>
            <p className="contact-note">Расскажите о задаче — мы предложим подходящий формат работы.</p>
            <a className="contact-button magnetic" href={whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp <span className="ui-arrow" aria-hidden="true" /></a>
            <div className="contact-details">
              <a href="tel:+995550001182"><small>Телефон</small><span>+995 550 00 11 82</span></a>
              <a href="mailto:info.logoge@gmail.com"><small>Email</small><span>info.logoge@gmail.com</span></a>
              <div className="contact-socials">
                <small>Социальные сети</small>
                <span className="social-links"><a href="https://www.instagram.com/logoge.marketing" target="_blank" rel="noreferrer"><i>◎</i>Instagram</a><a href="https://www.facebook.com/share/1EWu7wu7zo/" target="_blank" rel="noreferrer"><i>f</i>Facebook</a></span>
              </div>
            </div>
          </div>
          <div className="contact-visual" aria-hidden="true">
            <span>IDEA<br />TO<br />IMPACT</span>
            <small>Branding · Marketing · Digital</small>
          </div>
        </div>
        <div className="contact-footer">
          <div className="partners-strip"><span>Партнёры</span><b>Список обновляется</b></div>
          <div className="footer-line"><span>© 2026 LOGOGE</span><span>Vazisubani 2/10 · Tbilisi</span><span>RU · GE · EN</span></div>
        </div>
      </footer>
    </main>
  );
}
