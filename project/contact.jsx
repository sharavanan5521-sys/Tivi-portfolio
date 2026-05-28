// contact.jsx — finale section + footer

function Contact() {
  return (
    <Section id="contact"
             eyebrow={<>05 — The Finale</>}
             title={<>Let's Create<br/>Something <span style={{ color: "var(--accent)" }}>Epic</span></>}>

      <div className="contact">
        <div className="contact-art">
          <div className="bubble">PSST… OVER HERE!</div>
          <image-slot id="contact-character"
                      shape="rect"
                      placeholder="Drop pointing character"></image-slot>
          <div style={{
            position: "absolute",
            bottom: 14, right: 14,
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            padding: "6px 12px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>END // PAGE</div>
        </div>

        <div>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)",
            maxWidth: 480, margin: "0 0 24px",
          }}>
            Got a character that needs a face? A book that needs covers? A brand
            that needs an identity? <strong>Let's draw it up.</strong>
          </p>

          <div className="contact-grid">
            <a className="contact-card" href="tel:0175589371">
              <div className="ico">{Icons.phone}</div>
              <div>
                <div className="lab">Phone</div>
                <div className="val">017-558-9371</div>
              </div>
            </a>
            <a className="contact-card" href="mailto:mahentiviyan13@gmail.com">
              <div className="ico">{Icons.mail}</div>
              <div>
                <div className="lab">Email</div>
                <div className="val">mahentiviyan13@gmail.com</div>
              </div>
            </a>
          </div>

          <div style={{
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--ink-3)",
          }}>
            Follow the Studio →
          </div>
          <div className="socials">
            <a className="social-pill" href="https://instagram.com/tiviyanarts" target="_blank" rel="noreferrer">
              {Icons.instagram} @tiviyanarts
            </a>
            <a className="social-pill" href="https://instagram.com/_.tiviyan._" target="_blank" rel="noreferrer">
              {Icons.instagram} @_.tiviyan._
            </a>
          </div>

          {/* response time card */}
          <div style={{
            marginTop: 32,
            padding: "18px 22px",
            border: "2.5px dashed var(--ink)",
            background: "var(--paper)",
            display: "flex", alignItems: "center", gap: 16,
            maxWidth: 460,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 0 4px rgba(214,40,40,0.25)",
              animation: "pulse 1.6s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <div style={{ fontSize: 13.5, lineHeight: 1.5 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 18, textTransform: "uppercase", letterSpacing: "0.02em", display: "block" }}>
                Currently Available
              </strong>
              Replying within 24h. Open for commissions, freelance &amp; full-time roles.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© 2026 <b>Tiviyan Magendhran</b></div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span>End of Volume 01</span>
          <span style={{ color: "var(--accent)" }}>◆</span>
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            ↑ Back to Page 1
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
