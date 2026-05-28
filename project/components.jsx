// components.jsx — shared comic-style components

// Halftone overlay (positioned absolutely inside parents)
function Halftone({ className = "", style = {}, variant = "ink" }) {
  const cls = variant === "red" ? "halftone-red" : "halftone";
  return <div className={`${cls} ${className}`} style={style} aria-hidden="true" />;
}

// Speech bubble component
function SpeechBubble({ children, tail = "bottom-left", style = {}, rotate = 0 }) {
  const tailStyles = {
    "bottom-left":  { left: "16px",  bottom: "-14px", borderRight: true,  borderBottom: true },
    "bottom-right": { right: "16px", bottom: "-14px", borderLeft: true,   borderBottom: true },
    "top-left":     { left: "16px",  top: "-14px",    borderLeft: true,   borderTop: true },
  };
  const t = tailStyles[tail] || tailStyles["bottom-left"];
  return (
    <div style={{
      position: "relative",
      display: "inline-block",
      background: "var(--paper)",
      border: "3px solid var(--ink)",
      boxShadow: "5px 5px 0 var(--ink)",
      padding: "12px 18px",
      fontFamily: "var(--font-sfx)",
      fontSize: "18px",
      letterSpacing: "0.04em",
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}>
      {children}
      <span style={{
        position: "absolute",
        ...t,
        width: 16, height: 16,
        background: "var(--paper)",
        borderRight: t.borderRight ? "3px solid var(--ink)" : "none",
        borderBottom: t.borderBottom ? "3px solid var(--ink)" : "none",
        borderLeft: t.borderLeft ? "3px solid var(--ink)" : "none",
        borderTop: t.borderTop ? "3px solid var(--ink)" : "none",
        transform: "rotate(45deg)",
      }} />
    </div>
  );
}

// Sticky NAV
function Nav({ activeSection }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "origin", label: "Origin" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];
  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" onClick={(e) => onClick(e, "home")} className="nav-logo">
          <span className="dot" />
          Tiviyan<span style={{ color: "var(--accent)" }}>•</span>Arts
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`}
                 className={activeSection === l.id ? "active" : ""}
                 onClick={(e) => onClick(e, l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Section wrapper with title
function Section({ id, eyebrow, title, halftone = true, children, style = {} }) {
  return (
    <section id={id} className="section" style={style}>
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      {title && (
        <h2 className="section-title">
          {halftone && <span className="halftone-bg halftone" />}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

// SVG icons (tool icons + UI)
const Icons = {
  arrow: <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  expand: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 5V1H5M13 5V1H9M1 9V13H5M13 9V13H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 1H7L8.5 5L6.5 6.5C7.5 8.5 9 10 11 11L12.5 9L16 10.5V13.5C16 14.3 15.3 15 14.5 15C7 14.5 1.5 9 1 1.5C1 0.7 1.7 0 2.5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" stroke="currentColor" strokeWidth="2"/><path d="M1 4L8 9L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  instagram: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="4" r="1" fill="currentColor"/></svg>,
  // tool icons
  illustrator: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="var(--ink)"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="18" fill="#ff9a00">Ai</text>
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="var(--ink)"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="18" fill="#31a8ff">Ps</text>
    </svg>
  ),
  coreldraw: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <circle cx="16" cy="16" r="13" fill="var(--ink)"/>
      <text x="16" y="21" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="13" fill="#9aff3a">CDR</text>
    </svg>
  ),
  animate: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="var(--ink)"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="18" fill="#ff6cc0">An</text>
    </svg>
  ),
  aftereffects: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="var(--ink)"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="18" fill="#cf96fd">Ae</text>
    </svg>
  ),
  indesign: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="var(--ink)"/>
      <text x="16" y="22" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="18" fill="#ff3d8a">Id</text>
    </svg>
  ),
};

// Sound-effect burst layer (scroll-triggered)
function ScrollSFX({ enabled }) {
  const [bursts, setBursts] = React.useState([]);
  const lastY = React.useRef(0);
  const cooldown = React.useRef(0);

  React.useEffect(() => {
    if (!enabled) return;
    const words = ["POW!", "BAM!", "WHAM!", "BOOM!", "ZOOM!", "WHOOSH", "CRACK!", "BANG!", "SLAM!", "ZAP!"];
    const onScroll = () => {
      const now = Date.now();
      if (now < cooldown.current) return;
      const dy = Math.abs(window.scrollY - lastY.current);
      if (dy < 280) return;
      lastY.current = window.scrollY;
      cooldown.current = now + 700;
      const id = Math.random().toString(36).slice(2);
      const word = words[Math.floor(Math.random() * words.length)];
      const top = 20 + Math.random() * 60; // %
      const left = 10 + Math.random() * 70; // %
      const rot = -14 + Math.random() * 28;
      const size = 40 + Math.random() * 50;
      const red = Math.random() < 0.45;
      setBursts(b => [...b, { id, word, top, left, rot, size, red }]);
      setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 1400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="scroll-sfx-layer" aria-hidden="true">
      {bursts.map(b => (
        <span key={b.id} className="scroll-sfx"
              style={{
                top: `${b.top}%`,
                left: `${b.left}%`,
                fontSize: `${b.size}px`,
                color: b.red ? "var(--accent)" : "var(--paper)",
                ["--r"]: `${b.rot}deg`,
                WebkitTextStroke: "2.5px var(--ink)",
              }}>
          {b.word}
        </span>
      ))}
    </div>
  );
}

// Active-section hook (uses IntersectionObserver)
function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5] });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

Object.assign(window, {
  Halftone, SpeechBubble, Nav, Section, Icons, ScrollSFX, useActiveSection,
});
