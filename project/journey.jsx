// journey.jsx — vertical timeline

const JOURNEY = [
  {
    side: "left",
    year: "2025 — 2026",
    role: "Graphic Designer Intern",
    org: "Cresent Fastprint",
    tag: "INTERNSHIP",
    desc: "Client-facing design work and large-format print production. Delivered ready-for-press artwork across signage, banners and brand collateral while learning the floor.",
  },
  {
    side: "right",
    year: "2024 — 2026",
    role: "Diploma in Digital Creative Technology",
    org: "Politeknik Tuanku Syed Sirajuddin",
    tag: "EDUCATION",
    desc: "Three-year diploma covering graphic design fundamentals, digital media production, typography, and brand systems.",
  },
  {
    side: "left",
    year: "2018 — 2022",
    role: "Sijil Pelajaran Malaysia",
    org: "SMK Kampong Kastam",
    tag: "FOUNDATION",
    desc: "Secondary education — where the sketchbook habit started and never stopped.",
  },
];

function Journey() {
  return (
    <Section id="experience"
             eyebrow={<>04 — The Journey</>}
             title="Track Record">

      <p style={{
        maxWidth: 560, marginTop: 8, fontSize: 17, lineHeight: 1.55,
        color: "var(--ink-2)",
      }}>
        Studio time, classroom time, sketchbook time. The receipts.
      </p>

      <div className="timeline">
        {JOURNEY.map((j, i) => (
          <div key={i} className={`tl-node ${j.side}`}>
            <div className="dot" />
            <div className="card">
              <div className="year">{j.year}</div>
              <h4>{j.role}</h4>
              <div className="org">
                {j.org}
                <span className="tag">{j.tag}</span>
              </div>
              <p className="desc">{j.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Journey });
