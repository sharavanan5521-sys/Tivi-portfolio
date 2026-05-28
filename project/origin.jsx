// origin.jsx — about + arsenal

function Origin() {
  const tools = [
    { ico: Icons.illustrator, nm: "Illustrator", sub: "Vector / Logo" },
    { ico: Icons.photoshop,   nm: "Photoshop",   sub: "Illustration / Color" },
    { ico: Icons.coreldraw,   nm: "CorelDRAW",   sub: "Print / Layout" },
  ];

  const focus = [
    { label: "Typography", hl: true },
    { label: "Brand Identity" },
    { label: "Print-Ready Production", hl: true },
    { label: "Color Theory" },
    { label: "Character Design", hl: true },
    { label: "Sequential Art" },
  ];

  return (
    <Section id="origin"
             eyebrow={<>03 — Origin Story</>}
             title="The Artist">

      <div className="origin">
        <div className="origin-art">
          <image-slot id="origin-selfie"
                      shape="rect"
                      placeholder="Drop self-portrait or photo"></image-slot>
          <div className="label">SELF // PORTRAIT</div>
        </div>

        <div className="narrative">
          <p>
            I'm Tiviyan — a designer who treats every brief like a comic page:
            structure, rhythm, weight, a moment of impact. My work lives in the
            overlap between <span className="accent-text">narrative-driven illustration</span>
            {' '}and the disciplined craft of print design.
          </p>

          <p className="pull">
            Worlds first. Characters second. Everything else is service to the story.
          </p>

          <p>
            Trained in digital creative tech and seasoned on a print-shop floor,
            I bridge the gap between expressive ink work and production-ready
            artwork that survives the press. Currently obsessing over manga
            line-weight, screentone density, and getting the silhouette right
            before any detail goes down.
          </p>

          <div className="arsenal-title">The Arsenal</div>
          <div className="tools">
            {tools.map(t => (
              <div key={t.nm} className="tool">
                <div className="ico">{t.ico}</div>
                <div className="nm">{t.nm}</div>
                <div className="sub">{t.sub}</div>
              </div>
            ))}
          </div>

          <div className="arsenal-title">Design Focus</div>
          <ul className="focus-list">
            {focus.map(f => (
              <li key={f.label} className={f.hl ? "hl" : ""}>{f.label}</li>
            ))}
          </ul>

          <div className="teaser">
            <div className="badge">NEXT ARC</div>
            <div className="body">
              <strong>Motion is coming.</strong>
              Currently building animation chops in
              <b> Adobe Animate</b> and <b> After Effects</b> — expect moving
              characters in the next chapter.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Origin });
