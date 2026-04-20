import { COORDINATORS } from "@/lib/contacts";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60 bg-background/60">
      {/* Top: brand mission */}
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <div className="text-center">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-cyan-edge">
            Mission Directive · National Level Hackathon
          </div>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">
            MAKE-A-THON <span className="text-spider text-glow-spider">7.0</span>
          </h2>
          <p className="mt-2 text-xs font-mono-ui text-amber italic">
            "Anyone can wear the mask." — Miles Morales
          </p>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            The flagship innovation-driven hackathon of the Department of Electronics &amp; Communication
            Engineering, Sri Venkateswara College of Engineering — 24 hours, infinite possibilities,
            create beyond limits.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-4 text-[11px] font-mono-ui text-muted-foreground">
            <span><span className="text-spider font-semibold">500+</span> Participants</span>
            <span className="text-border">·</span>
            <span><span className="text-cyan-edge font-semibold">120</span> Projects</span>
            <span className="text-border">·</span>
            <span><span className="text-amber font-semibold">₹100K</span> Prize Pool</span>
            <span className="text-border">·</span>
            <span><span className="text-success font-semibold">10+</span> Internships</span>
          </div>
        </div>
      </div>

      {/* Middle: 4-column nav / contact / coords */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-4">
          {/* Quick links */}
          <div>
            <div className="font-display text-sm uppercase tracking-[0.2em] text-amber mb-3">
              Explore
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About Us", href: "https://make-a-thon-7.in/#about" },
                { label: "Timeline", href: "https://make-a-thon-7.in/#timeline" },
                { label: "Problem Statements", href: "https://make-a-thon-7.in/#problems" },
                { label: "Sponsors", href: "https://make-a-thon-7.in/#sponsorship" },
                { label: "The Crew", href: "https://make-a-thon-7.in/#team" },
                { label: "FAQ", href: "https://make-a-thon-7.in/#faq" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-cyan-edge transition-colors"
                  >
                    <ExternalLink size={11} /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinators */}
          <div className="md:col-span-2">
            <div className="font-display text-sm uppercase tracking-[0.2em] text-amber mb-3">
              Student Coordinators
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {COORDINATORS.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between gap-3 border-b border-border/40 py-1.5"
                >
                  <div className="text-foreground truncate">
                    {c.name}
                    {c.role && (
                      <span className="ml-1 text-[10px] font-mono-ui uppercase text-amber">
                        · {c.role}
                      </span>
                    )}
                  </div>
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="font-mono-ui text-[11px] text-cyan-edge hover:text-foreground inline-flex items-center gap-1 shrink-0"
                  >
                    <Phone size={11} /> {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-display text-sm uppercase tracking-[0.2em] text-amber mb-3">
              Contact Us
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
              <MapPin size={14} className="text-spider mt-1 shrink-0" />
              <div>
                Sri Venkateswara College of Engineering<br />
                Post Bag No.1, Pennalur Village<br />
                Chennai - Bengaluru Highways<br />
                Sriperumbudur (off Chennai) Tk. - 602 117<br />
                Tamil Nadu, India
              </div>
            </div>
            <a
              href="mailto:makeathon@svce.ac.in"
              className="mt-3 inline-flex items-center gap-1.5 font-mono-ui text-xs text-cyan-edge hover:text-foreground transition-colors"
            >
              <Mail size={13} />
              <span>makeathon@svce.ac.in</span>
            </a>
            <a
              href="https://make-a-thon-7.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-mono-ui text-xs text-amber hover:text-foreground transition-colors"
            >
              <ExternalLink size={13} />
              <span>make-a-thon-7.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Alliance section */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Organised by · The Alliance
            </div>
            <div className="mt-1 font-display text-sm text-foreground">
              Three associations united for innovation
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                name: "RACE",
                full: "Research Association for Innovative Design in Communication and Electronics",
                color: "text-spider",
                border: "border-spider/40",
              },
              {
                name: "IETE-SF",
                full: "Institution of Electronics and Telecommunication Engineers – Students' Forum",
                color: "text-cyan-edge",
                border: "border-cyan-edge/40",
              },
              {
                name: "ECEA",
                full: "Electronics & Communication Engineering Association",
                color: "text-amber",
                border: "border-amber/40",
              },
            ].map((club) => (
              <div
                key={club.name}
                className={`rounded-md border ${club.border} bg-surface/40 px-3 py-3 text-center`}
              >
                <div className={`font-display text-sm font-semibold ${club.color}`}>
                  {club.name}
                </div>
                <div className="mt-1 text-[11px] font-mono-ui text-muted-foreground leading-snug">
                  {club.full}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="font-mono-ui text-xs text-spider italic">
            "With great power comes great innovation."
          </div>
          <div className="font-mono-ui text-[11px] text-muted-foreground">
            © 2026 Make-a-Thon 7.0 · ECE Department, SVCE — All realities reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
