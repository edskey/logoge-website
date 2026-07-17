"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { LanguageSwitch } from "./components/language-switch";
import { getTranslations, localizedPath } from "./i18n";
import { useLocale } from "./i18n-client";

const sections = [
  { id: "branding", label: "Брендинг" },
  { id: "smm", label: "SMM" },
  { id: "academy", label: "Академия" },
  { id: "event-reels", label: "Event Reels" },
  { id: "web", label: "Web Development" },
];

const slideIds = ["intro", ...sections.map((section) => section.id)];

function PackageCards({ items, service, destination, moreLabel, chooseLabel }: { items: readonly (readonly string[])[]; service: string; destination?: string; moreLabel: string; chooseLabel: string }) {
  return (
    <div className="package-grid">
      {items.map(([name, detail, extra], index) => (
        <a className="package-card magnetic" href={destination ?? `/contacts?service=${encodeURIComponent(service)}&package=${encodeURIComponent(name)}`} aria-label={`${destination ? moreLabel : chooseLabel} ${name} — ${service}`} key={name}>
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

function HeroVideo({ src, mobileSrc, className, poster }: { src: string; mobileSrc?: string; className: string; poster?: string }) {
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
      {mobileSrc && <source src={mobileSrc} media="(max-width: 899px)" type="video/mp4" />}
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

const dockItems = [
  { id: "intro", label: "Начало", icon: "spark", description: "Начало" },
  { id: "branding", label: "Брендинг", icon: "magazine", description: "Брендинг" },
  { id: "smm", label: "SMM", icon: "camera", description: "SMM" },
  { id: "academy", label: "Академия", icon: "cap", description: "Академия" },
  { id: "event-reels", label: "Event Reels", icon: "phone", description: "Event Reels" },
  { id: "web", label: "Web Development", icon: "laptop", description: "Web Development" },
];

export default function Home() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const homePath = localizedPath(locale);
  const pagePath = (path: string) => localizedPath(locale, path);
  const whatsappText = locale === "ka" ? "გამარჯობა! ვესტუმრე LOGOGE-ის საიტს და მსურს პროექტის განხილვა." : locale === "en" ? "Hello! I visited the LOGOGE website and would like to discuss a project." : "Здравствуйте! Я посетил(а) сайт LOGOGE и хочу обсудить проект.";
  const localizedWhatsapp = `https://wa.me/995550001182?text=${encodeURIComponent(whatsappText)}`;
  const localizedDockItems = dockItems.map((item, index) => ({ ...item, label: t.home.dock[index], description: t.home.dock[index] }));
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [utilityScene, setUtilityScene] = useState<"about" | "contacts" | null>(null);
  const wheelLocked = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
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
        <button className="wordmark" onClick={() => goTo("intro")} aria-label={t.common.home}>
          <span className="brand-mark" aria-hidden="true" />
          <span>LOGOGE</span>
        </button>
        <div className="header-center">
          <span>{active === "intro" ? t.common.marketingAgency : localizedDockItems[activeIndex]?.label}</span>
        </div>
        <div className="header-actions">
          <LanguageSwitch />
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? t.common.menuClose : t.common.menuOpen}
            aria-expanded={menuOpen}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <nav
        className={`scene-dock ${["intro", "academy", "event-reels"].includes(active) ? "is-light" : ""} ${menuOpen || utilityScene ? "is-hidden" : ""}`}
        aria-label={t.common.sectionsNavigation}
        style={{ "--dock-progress": activeIndex / (dockItems.length - 1) } as CSSProperties}
      >
        <span className="dock-progress" aria-hidden="true" />
        {localizedDockItems.map((item, index) => (
          <button
            className={index === activeIndex ? "is-active" : ""}
            style={{ "--dock-position": `${(index / (dockItems.length - 1)) * 100}%` } as CSSProperties}
            onClick={() => goTo(item.id)}
            aria-label={`${t.common.goTo}: ${item.label}`}
            aria-current={index === activeIndex ? "page" : undefined}
            key={item.id}
          >
            <span className="dock-marker" aria-hidden="true" />
            <small>{item.description}</small>
          </button>
        ))}
      </nav>

      <nav className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-list">
          <div className="menu-services">
            <button onClick={() => setServicesOpen((value) => !value)} aria-expanded={servicesOpen}>
              <small>01</small>{t.common.nav.services}
            </button>
            <div className={servicesOpen ? "service-links is-open" : "service-links"}>
              <a href={`${homePath}#branding`} onClick={() => setMenuOpen(false)}>{t.common.services.branding}</a>
              <a href={`${homePath}#smm`} onClick={() => setMenuOpen(false)}>SMM</a>
              <a href={`${homePath}#academy`} onClick={() => setMenuOpen(false)}>{t.common.services.academy}</a>
              <a href={`${homePath}#event-reels`} onClick={() => setMenuOpen(false)}>Event Reels</a>
              <a href={`${homePath}#web`} onClick={() => setMenuOpen(false)}>Web Development</a>
            </div>
          </div>
          <button onClick={() => goTo("about")}><small>02</small>{t.common.nav.about}</button>
          <a className="menu-main-link" href={pagePath("/we")}><small>03</small>{t.common.nav.we}</a>
          <button onClick={() => goTo("contacts")}><small>04</small>{t.common.nav.contacts}</button>
          <div className="menu-legal" aria-label={t.common.legal.label}>
            <a href={pagePath("/privacy")}>{t.common.legal.privacy}</a>
            <a href={pagePath("/cookies")}>{t.common.legal.cookies}</a>
            <a href={pagePath("/terms")}>{t.common.legal.terms}</a>
          </div>
        </div>
        <div className="menu-meta">
          <span>GE · RU · EN</span>
        </div>
      </nav>

      <section className={sceneClass("intro", "hero")} id="intro">
        <div className="hero-art" aria-hidden="true">
          <HeroVideo src="/assets/hero-video-3.mp4" mobileSrc="/assets/hero-video-3-mobile.mp4" className="hero-video" poster="/assets/hero-hq.png" />
          <div className="liquid liquid-one" />
          <div className="liquid liquid-two" />
          <div className="halo" />
          <div className="light-sweep" />
          <div className="grain" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{t.home.labels.hero}</p>
          <h1>{t.home.hero.sloganTop}<br /><em>{t.home.hero.sloganAccent}</em></h1>
          <a className="hero-about" href={pagePath("/we")}>{t.home.hero.about} <i className="ui-arrow" aria-hidden="true" /></a>
        </div>
        <p className="hero-note">
          {t.home.hero.note}
        </p>
        <button className="scroll-cue" onClick={() => goTo("branding")}>
          <span>{t.home.hero.scroll}</span>
          <b><i className="ui-arrow ui-arrow-down" aria-hidden="true" /></b>
        </button>
      </section>

      <section className={sceneClass("branding", "service-scene branding")} id="branding">
        <div className="brand-atmosphere" aria-hidden="true" />
        <div className="brand-orbits" aria-hidden="true"><i /><i /><b /></div>
        <div className="scene-number">02</div>
        <div className="section-copy">
          <p className="eyebrow">{t.home.labels.branding}</p>
          <h2>{t.home.branding.title}</h2>
          <p className="lead">{t.home.branding.description}</p>
          <div className="tag-list">
            {t.home.branding.tags.map((tag, index) => <span style={{ "--tag-index": index } as CSSProperties} key={tag}><small>0{index + 1}</small>{tag}</span>)}
          </div>
        </div>
        <p className="brand-side-note" aria-hidden="true">{t.home.labels.brandSide}</p>
        <SectionObject type="magazine" />
        <a className="text-cta academy-cta brand-cta aligned-service-cta magnetic" href={localizedWhatsapp} target="_blank" rel="noreferrer">{t.home.branding.cta}</a>
      </section>

      <section className={sceneClass("smm", "service-scene smm")} id="smm">
        <div className="smm-video-art" aria-hidden="true">
          <CrossfadeVideo src="/assets/smm-video-1.mp4" className="smm-video loop-video" />
        </div>
        <div className="scene-number">03</div>
        <div className="section-heading">
          <p className="eyebrow">{t.home.labels.smm}</p>
          <h2>SMM</h2>
          <p>{t.home.smm.description}</p>
        </div>
        <PackageCards items={t.home.smm.packages} service="SMM" destination={pagePath("/smm")} moreLabel={t.home.ariaPackageMore} chooseLabel={t.home.ariaPackageChoose} />
        <SectionObject type="camera" />
        <a className="text-cta smm-more" href={pagePath("/smm")}>{t.home.smm.more}</a>
      </section>

      <section className={sceneClass("academy", "service-scene academy")} id="academy">
        <div className="academy-architecture" aria-hidden="true"><i /><i /><i /><span>{t.home.labels.academyOrbit}</span></div>
        <div className="scene-number">04</div>
        <div className="section-heading">
          <p className="eyebrow">{t.home.labels.academy}</p>
          <h2>{t.home.academy.title}</h2>
          <div className="academy-focus" aria-label={t.home.academy.principles}>
            {t.home.academy.focuses.map((focus) => <span key={focus}>{focus}</span>)}
          </div>
          <p>{t.home.academy.description}</p>
        </div>
        <SectionObject type="cap" />
        <a className="text-cta academy-cta aligned-service-cta" href={pagePath("/academy/apply")}>{t.home.academy.cta} <b><i className="ui-arrow" aria-hidden="true" /></b></a>
      </section>

      <section className={sceneClass("event-reels", "service-scene event")} id="event-reels">
        <div className="scene-number">05</div>
        <div className="section-heading event-heading">
          <p className="eyebrow">{t.home.labels.event}</p>
          <h2>Event <em>Reels</em></h2>
          <p>{t.home.event.description}</p>
        </div>
        <SectionObject type="phone" />
        <a className="text-cta academy-cta event-cta" href="https://www.instagram.com/eventreels.ge" target="_blank" rel="noreferrer">{t.home.event.cta}</a>
        <div className="event-includes">
          {t.home.event.includes}
        </div>
      </section>

      <section className={sceneClass("web", "service-scene web")} id="web">
        <div className="scene-number">06</div>
        <div className="section-heading">
          <p className="eyebrow">{t.home.labels.web}</p>
          <h2>Web<br />Development</h2>
          <p>{t.home.web.description}</p>
        </div>
        <SectionObject type="laptop" />
        <a className="text-cta academy-cta web-cta magnetic" href={`${pagePath("/contacts")}?service=Web%20Development`}>{t.home.web.cta}</a>
      </section>

      <section className={`content-section utility-scene about-section ${active === "about" ? "is-active" : ""}`} id="about">
        <p className="eyebrow">{t.home.about.eyebrow}</p>
        <h2>{t.home.about.title}</h2>
        <div className="about-grid">
          <p>{t.home.about.p1}</p>
          <p>{t.home.about.p2}</p>
        </div>
      </section>

      <footer className={`content-section utility-scene contact-section ${active === "contacts" ? "is-active" : ""}`} id="contacts">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">{t.home.contacts.eyebrow}</p>
            <h2>{t.home.contacts.title}<br /><em>{t.home.contacts.titleAccent}</em></h2>
            <p className="contact-note">{t.home.contacts.note}</p>
            <a className="contact-button magnetic" href={localizedWhatsapp} target="_blank" rel="noreferrer">{t.home.contacts.whatsapp} <span className="ui-arrow" aria-hidden="true" /></a>
            <div className="contact-details">
              <a href="tel:+995550001182"><small>{t.home.contacts.phone}</small><span>+995 550 00 11 82</span></a>
              <a href="mailto:info.logoge@gmail.com"><small>Email</small><span>info.logoge@gmail.com</span></a>
              <div className="contact-socials">
                <small>{t.home.contacts.socials}</small>
                <span className="social-links"><a href="https://www.instagram.com/logoge.marketing" target="_blank" rel="noreferrer"><i>◎</i>Instagram</a><a href="https://www.facebook.com/share/1EWu7wu7zo/" target="_blank" rel="noreferrer"><i>f</i>Facebook</a></span>
              </div>
            </div>
          </div>
          <div className="contact-visual" aria-hidden="true">
            <span>{t.home.labels.contactVisual.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</span>
            <small>{t.home.labels.hero}</small>
          </div>
        </div>
        <div className="contact-footer">
          <div className="partners-strip"><span>{t.home.contacts.partners}</span><b>{t.home.contacts.updating}</b></div>
          <div className="footer-line"><span>© 2026 LOGOGE</span><span>Vazisubani 2/10 · Tbilisi</span><span>GE · RU · EN</span></div>
        </div>
      </footer>
    </main>
  );
}
