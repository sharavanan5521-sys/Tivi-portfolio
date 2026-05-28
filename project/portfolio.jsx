// portfolio.jsx — selected works grid + lightbox

const WORKS = [
  { id: "w01", num: "01", cat: "Character", title: "Vermillion Knight", span: "t-hero",
    desc: "Original armored vigilante design. Studies in costume rendering, kinetic silhouette, and ink-and-tone shadow weight.",
    tags: ["Character", "Costume", "Ink"] },
  { id: "w02", num: "02", cat: "Sequential", title: "Chapter Zero", span: "t-tall",
    desc: "Eight-panel sequential study. Dynamic page layout, scene transitions and panel pacing.",
    tags: ["Comic", "Layout", "Pacing"] },
  { id: "w03", num: "03", cat: "Manga Study", title: "Line Weight Lab", span: "t-wide",
    desc: "Japanese manga rendering studies — focus on screentones, hatch density and expressive line weight.",
    tags: ["Manga", "Study", "Tone"] },
  { id: "w04", num: "04", cat: "Character", title: "Crow Sister", span: "t-med",
    desc: "Expressive facial design and silhouette study for a recurring antagonist.",
    tags: ["Character", "Face", "Silhouette"] },
  { id: "w05", num: "05", cat: "Print", title: "Festival Poster Series", span: "t-sm",
    desc: "Print-ready large-format work produced during Cresent Fastprint internship.",
    tags: ["Print", "Typography", "CMYK"] },
  { id: "w06", num: "06", cat: "Sequential", title: "Fight Scene Study", span: "t-wide2",
    desc: "Action choreography across a six-panel sequence — speed lines, impact frames, motion blur.",
    tags: ["Comic", "Action", "Motion"] },
];

const CATEGORIES = ["All", "Character", "Sequential", "Manga Study", "Print"];

function Portfolio() {
  const [activeCat, setActiveCat] = React.useState("All");
  const [lightboxIdx, setLightboxIdx] = React.useState(null);

  const filtered = activeCat === "All" ? WORKS : WORKS.filter(w => w.cat === activeCat);

  const open = (idx) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);
  const next = () => setLightboxIdx(i => (i + 1) % filtered.length);
  const prev = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);

  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, filtered.length]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <Section id="portfolio"
             eyebrow={<>02 — Selected Works</>}
             title="The Vault">

      <p style={{
        maxWidth: 560, marginTop: 8, fontSize: 17, lineHeight: 1.55,
        color: "var(--ink-2)", textWrap: "pretty",
      }}>
        A working sample of original character design, sequential art and manga studies.
        Tap any panel to open the splash view.
      </p>

      {/* category filter */}
      <div className="category-row">
        {CATEGORIES.map(c => (
          <button key={c}
                  className="cat-pill"
                  data-active={c === activeCat}
                  onClick={() => setActiveCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filtered.map((w, i) => (
          <article key={w.id} className={`tile ${w.span}`}>
            <span className="corner-num">№ {w.num}</span>
            <image-slot id={`work-${w.id}`}
                        shape="rect"
                        placeholder={`Drop ${w.title} art`}></image-slot>
            <button className="tile-expand" onClick={() => open(i)} aria-label="Open">
              {Icons.expand}
            </button>
            <div className="tile-meta">
              <div>
                <div className="tile-cat">{w.cat}</div>
                <h3 className="tile-title">{w.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="lightbox" onClick={close}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">×</button>
            <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">‹</button>
            <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">›</button>
            <div className="lightbox-art">
              <image-slot id={`work-${active.id}`}
                          shape="rect"
                          fit="contain"
                          placeholder={`Drop ${active.title} art`}></image-slot>
            </div>
            <div className="lightbox-meta">
              <div className="cat">№ {active.num} — {active.cat}</div>
              <h3>{active.title}</h3>
              <p className="desc">{active.desc}</p>
              <div className="tags">
                {active.tags.map(t => <span key={t} className="tag">#{t}</span>)}
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginTop: 10,
                paddingTop: 14, borderTop: "1.5px solid var(--ink)",
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--ink-3)",
              }}>
                <span>{lightboxIdx + 1} / {filtered.length}</span>
                <span>← / →</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

Object.assign(window, { Portfolio });
