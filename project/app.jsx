// app.jsx — main orchestrator + tweaks

const PALETTES = {
  manga: {
    label: "Manga",
    paper: "#f5f1e8", paper2: "#ebe5d6",
    ink: "#0a0a0a", ink2: "#2a2a2a", ink3: "#5a5a5a",
    accent: "#d62828", accent2: "#a51d1d",
  },
  classic: {
    label: "Classic Comic",
    paper: "#fdf6dc", paper2: "#f5e7a3",
    ink: "#0a1a3a", ink2: "#1b2952", ink3: "#4a5680",
    accent: "#e63946", accent2: "#a51d2d",
  },
  dark: {
    label: "Modern Dark",
    paper: "#0e0e10", paper2: "#1a1a1f",
    ink: "#f3f3f0", ink2: "#cfcfca", ink3: "#7a7a72",
    accent: "#ff2a55", accent2: "#cc1d40",
  },
  vintage: {
    label: "Vintage",
    paper: "#efe0c4", paper2: "#dec79e",
    ink: "#2a1b10", ink2: "#3b2a1c", ink3: "#6b5642",
    accent: "#b8412a", accent2: "#8a3020",
  },
};

const FONT_OPTIONS = {
  Anton:           { family: "'Anton', sans-serif", url: "Anton:wght@400" },
  Bungee:          { family: "'Bungee', sans-serif", url: "Bungee:wght@400" },
  Bangers:         { family: "'Bangers', cursive",   url: "Bangers:wght@400" },
  PermanentMarker: { family: "'Permanent Marker', cursive", url: "Permanent+Marker:wght@400" },
  Bebas:           { family: "'Bebas Neue', sans-serif", url: "Bebas+Neue:wght@400" },
};

const BORDER_STYLES = {
  clean:  { borderWidth: "3px", borderStyle: "solid", shadow: "6px 6px 0 var(--ink)", radius: "0" },
  sketch: { borderWidth: "3px", borderStyle: "solid", shadow: "5px 7px 0 var(--ink), -2px -1px 0 var(--ink)", radius: "10px 18px 8px 16px" },
  double: { borderWidth: "2px", borderStyle: "solid", shadow: "8px 8px 0 var(--ink)", radius: "0", outline: true },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "manga",
  "displayFont": "Anton",
  "borderStyle": "clean",
  "halftone": 0.22,
  "sfxOnScroll": true,
  "heroPose": "action"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply palette + fonts + borders as CSS vars
  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.manga;
    const root = document.documentElement;
    root.style.setProperty("--paper", p.paper);
    root.style.setProperty("--paper-2", p.paper2);
    root.style.setProperty("--ink", p.ink);
    root.style.setProperty("--ink-2", p.ink2);
    root.style.setProperty("--ink-3", p.ink3);
    root.style.setProperty("--accent", p.accent);
    root.style.setProperty("--accent-2", p.accent2);

    const font = FONT_OPTIONS[t.displayFont] || FONT_OPTIONS.Anton;
    root.style.setProperty("--font-display", font.family);

    root.style.setProperty("--halftone-opacity", t.halftone);
    root.style.setProperty("--halftone-dot",
      `${0.9 + Number(t.halftone) * 1.5}px`);

    const b = BORDER_STYLES[t.borderStyle] || BORDER_STYLES.clean;
    root.style.setProperty("--panel-border",
      `${b.borderWidth} ${b.borderStyle} var(--ink)`);
    root.style.setProperty("--panel-shadow", b.shadow);

    // border-style specific overrides for tiles/panels
    const styleId = "__border-override";
    let s = document.getElementById(styleId);
    if (!s) {
      s = document.createElement("style");
      s.id = styleId;
      document.head.appendChild(s);
    }
    let css = "";
    if (t.borderStyle === "sketch") {
      css = `
        .tile, .hero-art .frame, .origin-art, .contact-art, .tl-node .card,
        .tool, .contact-card, .social-pill, .cta, .panel {
          border-radius: ${b.radius} !important;
        }
        .tile { box-shadow: 5px 7px 0 var(--ink) !important; }
      `;
    } else if (t.borderStyle === "double") {
      css = `
        .tile, .hero-art .frame, .origin-art, .contact-art, .tl-node .card {
          outline: 2px solid var(--ink);
          outline-offset: 4px;
        }
        .tile, .hero-art .frame, .origin-art, .contact-art, .tl-node .card {
          border-width: 2px !important;
        }
      `;
    } else {
      css = "";
    }
    s.textContent = css;
  }, [t.palette, t.displayFont, t.borderStyle, t.halftone]);

  // load fonts dynamically
  React.useEffect(() => {
    const fams = Object.values(FONT_OPTIONS).map(f => f.url).join("&family=");
    const href = `https://fonts.googleapis.com/css2?family=${fams}&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Zen+Kaku+Gothic+New:wght@700;900&display=swap`;
    let link = document.getElementById("__google-fonts");
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = "__google-fonts";
      document.head.appendChild(link);
    }
    link.href = href;
  }, []);

  // active section tracking
  const activeSection = useActiveSection(["home", "portfolio", "origin", "experience", "contact"]);

  return (
    <>
      <ScrollSFX enabled={t.sfxOnScroll} />
      <Nav activeSection={activeSection} />
      <Hero heroPose={t.heroPose} />
      <Portfolio />
      <Origin />
      <Journey />
      <Contact />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Theme" value={t.palette}
          options={["manga", "classic", "dark", "vintage"]}
          onChange={(v) => setTweak("palette", v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Display font" value={t.displayFont}
          options={Object.keys(FONT_OPTIONS)}
          onChange={(v) => setTweak("displayFont", v)} />

        <TweakSection label="Panels" />
        <TweakRadio label="Border" value={t.borderStyle}
          options={["clean", "sketch", "double"]}
          onChange={(v) => setTweak("borderStyle", v)} />
        <TweakSlider label="Halftone" value={t.halftone}
          min={0.05} max={0.5} step={0.01}
          onChange={(v) => setTweak("halftone", v)} />

        <TweakSection label="Motion" />
        <TweakToggle label="SFX on scroll" value={t.sfxOnScroll}
          onChange={(v) => setTweak("sfxOnScroll", v)} />

        <TweakSection label="Hero" />
        <TweakRadio label="Pose" value={t.heroPose}
          options={["action", "portrait", "splash"]}
          onChange={(v) => setTweak("heroPose", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
