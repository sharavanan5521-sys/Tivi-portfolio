// hero.jsx — opening hook

function Hero({ heroPose }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // hero pose variants — affect the placeholder caption + tag
  const poses = {
    "action":   { tag: "PG. 01 — DEBUT",       sfx1: "DRAW!",  sfx2: "INK", caption: "Drop hero illustration" },
    "portrait": { tag: "PG. 01 — PORTRAIT",    sfx1: "STARE",  sfx2: "...", caption: "Drop self-portrait" },
    "splash":   { tag: "PG. 01 — SPLASH",      sfx1: "BOOM!",  sfx2: "POW", caption: "Drop splash page" },
  };
  const p = poses[heroPose] || poses.action;

  return (
    <section id="home" className="hero">
      {/* corner annotations */}
      <div className="hero-corner-mark">
        Vol.01 — Tiviyan Magendhran — 2026
      </div>
      <div className="hero-jp">グラフィックデザイナー</div>

      {/* SFX floating */}
      <span className="sfx hero-sfx-1">{p.sfx1}</span>

      <div className="hero-text">
        <div className="hero-eyebrow">
          <span className="pulse" />
          OPEN FOR COMMISSIONS — 2026
        </div>

        <h1 className="hero-title">
          <span style={{ display: "block" }}>Tiviyan</span>
          <span className="line-2">Magendhran</span>
        </h1>

        <p className="hero-subtitle">
          Graphic Designer
          <span className="pipe">/</span>
          Character Illustrator
          <span className="pipe">/</span>
          Visual Storyteller.
          <br/>
          Building <strong>narrative-driven worlds</strong> at the intersection of
          ink, pixel and print.
        </p>

        <div className="cta-row">
          <button className="cta cta--primary" onClick={() => scrollTo("portfolio")}>
            Explore My Worlds
            <span className="arrow">{Icons.arrow}</span>
          </button>
          <button className="cta" onClick={() => scrollTo("contact")}>
            Let's Collaborate
          </button>
        </div>

        {/* tiny stats row */}
        <div style={{
          display: "flex", gap: "32px", marginTop: "44px",
          paddingTop: "20px", borderTop: "2px solid var(--ink)",
          maxWidth: "520px",
        }}>
          {[
            { n: "60+", l: "Original\nCharacters" },
            { n: "12", l: "Comic Pages\nDrafted" },
            { n: "3yr", l: "Studio\nExperience" },
          ].map(s => (
            <div key={s.l}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 36, lineHeight: 1,
                letterSpacing: "0.02em",
              }}>{s.n}</div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--ink-3)",
                marginTop: 4, whiteSpace: "pre-line", lineHeight: 1.3,
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* hero art panel */}
      <div className="hero-art">
        <span className="sfx hero-sfx-2">{p.sfx2}</span>
        <div className="frame">
          <span className="corner-tag">{p.tag}</span>
          <image-slot id="hero-character"
                      shape="rect"
                      placeholder={p.caption}></image-slot>
        </div>
      </div>

      <div className="scroll-cue">scroll</div>
    </section>
  );
}

Object.assign(window, { Hero });
