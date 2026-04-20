import { Link } from "@tanstack/react-router";

// Instagram SVG
const IgSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.523.99 4.08 4.08 0 01.99 1.524c.163.46.35 1.26.403 2.43.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.99 1.523 4.08 4.08 0 01-1.524.99c-.46.163-1.26.35-2.43.403-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.523-.99 4.08 4.08 0 01-.99-1.524c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.99-1.523A4.08 4.08 0 015.15 2.636c.46-.163 1.26-.35 2.43-.403C8.845 2.175 9.225 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.903.333 4.14.63a6.21 6.21 0 00-2.245 1.462A6.21 6.21 0 00.433 4.337C.136 5.1-.067 5.972.01 7.25.068 8.53.082 8.938.082 12.197c0 3.259.014 3.668.072 4.948.058 1.277.261 2.15.558 2.912a6.21 6.21 0 001.462 2.245 6.21 6.21 0 002.245 1.462c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.912-.558a6.21 6.21 0 002.245-1.462 6.21 6.21 0 001.462-2.245c.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a6.21 6.21 0 00-1.462-2.245A6.21 6.21 0 0019.86.435C19.1.138 18.227-.065 16.95.007 15.668.065 15.259.079 12 .079zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
  </svg>
);

// LinkedIn SVG
const LiSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Mail SVG
const MailSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const SocialIcons = ({ ig, li, mail }: { ig: string; li: string; mail: string }) => (
  <div style={{ display: "flex", gap: "8px" }}>
    <a href={ig} target="_blank" rel="noopener noreferrer" className="footer-social-icon footer-social-icon--ig" aria-label="Instagram">
      <IgSvg />
    </a>
    <a href={li} target="_blank" rel="noopener noreferrer" className="footer-social-icon footer-social-icon--li" aria-label="LinkedIn">
      <LiSvg />
    </a>
    <a href={`mailto:${mail}`} className="footer-social-icon footer-social-icon--mail" aria-label="Email">
      <MailSvg />
    </a>
  </div>
);

export function Footer() {
  return (
    <>
      <style>{`
        .footer-section {
          padding: 4rem 0 2rem;
          background: #080a10;
          border-top: 2px solid rgba(0, 240, 255, 0.15);
          position: relative;
          overflow: hidden;
        }
        .footer-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(217,0,255,0.06) 0%, rgba(0,240,255,0.03) 40%, transparent 70%);
          pointer-events: none;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: flex-start;
          text-align: left;
        }
        .footer-heading {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: var(--color-foreground, #f5f5ff);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: 2px 2px 0 oklch(0.58 0.22 25);
          margin-bottom: 0.2rem;
          white-space: nowrap;
        }
        .footer-heading .text-cyan {
          color: oklch(0.86 0.16 200);
        }
        .footer-subtitle {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: 0.85rem;
          color: var(--color-foreground, #f5f5ff);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .footer-desc {
          font-size: 0.85rem;
          color: oklch(0.72 0.025 250);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .footer-map-wrapper {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .footer-subheading {
          font-family: var(--font-display, "Space Grotesk", sans-serif);
          font-size: 1rem;
          color: oklch(0.86 0.16 200);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px rgba(0,240,255,0.3);
          width: 100%;
          border-bottom: 1px solid oklch(0.86 0.16 200);
          padding-bottom: 0.5rem;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        .footer-links-grid a {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-weight: 600;
          font-size: 0.9rem;
          color: oklch(0.72 0.025 250);
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-links-grid a:hover {
          color: oklch(0.86 0.16 200);
          transform: translateX(4px);
        }
        .footer-coord-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          text-align: left;
          width: 100%;
        }
        .footer-coord-name {
          font-family: var(--font-sans, "Inter", sans-serif);
          color: var(--color-foreground, #f5f5ff);
          font-size: 0.85rem;
          margin-bottom: 2px;
        }
        .footer-coord-phone {
          font-family: var(--font-mono, "IBM Plex Mono", monospace);
          font-size: 0.85rem;
          font-weight: 700;
        }
        .footer-coord-phone--red { color: oklch(0.58 0.22 25); }
        .footer-coord-phone--magenta { color: #d900ff; }
        .footer-coord-phone--cyan { color: oklch(0.86 0.16 200); }
        .footer-address {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-size: 0.9rem;
          color: oklch(0.72 0.025 250);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .footer-orgs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          width: 100%;
        }
        .footer-org-block {
          padding-left: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-org-name {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
          font-weight: 600;
        }
        .footer-org-name--red { color: oklch(0.58 0.22 25); border-left: 2px solid oklch(0.58 0.22 25); padding-left: 12px; margin-left: -12px; }
        .footer-org-name--magenta { color: #d900ff; border-left: 2px solid #d900ff; padding-left: 12px; margin-left: -12px; }
        .footer-org-name--cyan { color: oklch(0.86 0.16 200); border-left: 2px solid oklch(0.86 0.16 200); padding-left: 12px; margin-left: -12px; }
        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: oklch(0.72 0.025 250);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-social-icon:hover { transform: translateY(-3px) scale(1.1); }
        .footer-social-icon--ig:hover { color: #e1306c; border-color: #e1306c; background: rgba(225,48,108,0.1); box-shadow: 0 0 12px rgba(225,48,108,0.4); }
        .footer-social-icon--li:hover { color: #0077b5; border-color: #0077b5; background: rgba(0,119,181,0.1); box-shadow: 0 0 12px rgba(0,119,181,0.4); }
        .footer-social-icon--mail:hover { color: oklch(0.86 0.16 200); border-color: oklch(0.86 0.16 200); background: rgba(0,240,255,0.1); box-shadow: 0 0 12px rgba(0,240,255,0.4); }
        .footer-bottom {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 1rem;
        }
        .footer-tagline {
          font-family: var(--font-sans, "Inter", sans-serif);
          font-weight: 700;
          font-size: 1rem;
          font-style: italic;
          color: oklch(0.72 0.025 250);
          margin-bottom: 0.5rem;
        }
        .footer-copyright {
          font-family: var(--font-mono, "IBM Plex Mono", monospace);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-orgs-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-coord-grid { grid-template-columns: 1fr; }
          .footer-links-grid { grid-template-columns: 1fr; }
          .footer-orgs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="footer-section" aria-label="Footer">
        <div className="footer-inner">
          <div className="footer-grid">

            {/* LEFT — Event Info & Map */}
            <div className="footer-col">
              <h3 className="footer-heading">
                MAKEATHON <span className="text-cyan">7.0</span>
              </h3>
              <h4 className="footer-subtitle">A 24-HOUR HACKATHON</h4>
              <p className="footer-desc">
                National level 24-hour hardware &amp; software creation sprint organized by the Department of
                Electronics &amp; Communication Engineering.
              </p>
              <div className="footer-map-wrapper">
                <iframe
                  src="https://maps.google.com/maps?q=Sri+Venkateswara+College+of+Engineering+Sriperumbudur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="160"
                  style={{ border: 0, display: "block", opacity: 0.6, filter: "grayscale(1) invert(1) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SVCE Location"
                />
              </div>
            </div>

            {/* CENTER — Quick Links & Coordinators */}
            <div className="footer-col" style={{ justifyContent: "space-between", gap: "2rem" }}>
              <div style={{ width: "100%" }}>
                <h4 className="footer-subheading">QUICK LINKS</h4>
                <ul className="footer-links-grid">
                  <li><a href="https://make-a-thon-7.in/#hero">Home</a></li>
                  <li><a href="https://make-a-thon-7.in/#about">About</a></li>
                  <li><a href="https://make-a-thon-7.in/#timeline">Timeline</a></li>
                  <li><a href="https://make-a-thon-7.in/#problems">Problem Statements</a></li>
                  <li><a href="https://make-a-thon-7.in/#sponsorship">Sponsors</a></li>
                  <li><a href="https://make-a-thon-7.in/#gallery">Gallery</a></li>
                  <li><a href="https://make-a-thon-7.in/#team">Team</a></li>
                  <li><a href="https://make-a-thon-7.in/#faq">FAQ</a></li>
                </ul>
              </div>

              <div style={{ width: "100%" }}>
                <h4 className="footer-subheading">STUDENT COORDINATORS</h4>
                <div className="footer-coord-grid">
                  <div>
                    <p className="footer-coord-name">Roshan M</p>
                    <p className="footer-coord-phone footer-coord-phone--red">98410 92274</p>
                  </div>
                  <div>
                    <p className="footer-coord-name">Adarsh S</p>
                    <p className="footer-coord-phone footer-coord-phone--red">73059 70106</p>
                  </div>
                  <div>
                    <p className="footer-coord-name">Yaaminy S K</p>
                    <p className="footer-coord-phone footer-coord-phone--magenta">63809 89594</p>
                  </div>
                  <div>
                    <p className="footer-coord-name">Roobuck Rao C</p>
                    <p className="footer-coord-phone footer-coord-phone--magenta">81482 04922</p>
                  </div>
                  <div>
                    <p className="footer-coord-name">Mohammed Raeef</p>
                    <p className="footer-coord-phone footer-coord-phone--cyan">91501 58647</p>
                  </div>
                  <div>
                    <p className="footer-coord-name">Harinee V T</p>
                    <p className="footer-coord-phone footer-coord-phone--cyan">73581 20955</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Contact Details & Socials */}
            <div className="footer-col">
              <h4 className="footer-subheading">CONTACT US</h4>
              <p className="footer-address">
                Sri Venkateswara College of Engineering<br />
                Post Bag No.1, Pennalur Village<br />
                Chennai - Bengaluru Highways<br />
                Sriperumbudur (off Chennai) Tk. - 602 117<br />
                Tamil Nadu, India
              </p>

              <div className="footer-orgs-grid">
                {/* RACE */}
                <div className="footer-org-block">
                  <h5 className="footer-org-name footer-org-name--red">RACE</h5>
                  <SocialIcons
                    ig="https://www.instagram.com/race_svce/"
                    li="https://www.linkedin.com/in/raic-svce/"
                    mail="race@svce.ac.in"
                  />
                </div>
                {/* IETE-SF */}
                <div className="footer-org-block">
                  <h5 className="footer-org-name footer-org-name--magenta">IETE-SF</h5>
                  <SocialIcons
                    ig="https://www.instagram.com/ietesf_svce/"
                    li="https://www.linkedin.com/in/iete-sf-svce-3199351b7/"
                    mail="ietesf@svce.ac.in"
                  />
                </div>
                {/* ECEA */}
                <div className="footer-org-block">
                  <h5 className="footer-org-name footer-org-name--cyan">ECEA</h5>
                  <SocialIcons
                    ig="https://www.instagram.com/eceasvce/"
                    li="https://www.linkedin.com/in/ecea-svce-2b49062b7/"
                    mail="ecea@svce.ac.in"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-tagline">"With great power comes great innovation."</p>
            <p className="footer-copyright">© 2026 Makeathon 7.0 — All realities reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
