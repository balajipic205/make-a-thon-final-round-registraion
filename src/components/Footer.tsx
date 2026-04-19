import { COORDINATORS } from "@/lib/contacts";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60 bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-display text-xl font-bold text-foreground">
            MAKEATHON <span className="text-primary text-glow-spider">7.0</span>
          </div>
          <div className="mt-1 font-mono-ui text-[11px] uppercase tracking-[0.25em] text-cyan-edge">
            A 24-Hour Hackathon
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            National-level 24-hour hardware &amp; software creation sprint organized by the
            Department of Electronics &amp; Communication Engineering, SVCE.
          </p>
        </div>

        {/* Coordinators */}
        <div>
          <div className="font-display text-sm uppercase tracking-[0.2em] text-amber mb-3">
            Student Coordinators
          </div>
          <ul className="space-y-1.5 text-sm">
            {COORDINATORS.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-3 border-b border-border/40 py-1.5">
                <div className="text-foreground">
                  {c.name}
                  {c.role && (
                    <span className="ml-1 text-[10px] font-mono-ui uppercase text-amber">
                      · {c.role}
                    </span>
                  )}
                </div>
                <a
                  href={`tel:${c.phone.replace(/\s+/g, "")}`}
                  className="font-mono-ui text-[11px] text-cyan-edge hover:text-foreground inline-flex items-center gap-1"
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

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { name: "RACE", color: "text-spider", border: "border-spider/40" },
              { name: "IETE-SF", color: "text-cyan-edge", border: "border-cyan-edge/40" },
              { name: "ECEA", color: "text-amber", border: "border-amber/40" },
            ].map((club) => (
              <div
                key={club.name}
                className={`rounded-md border ${club.border} bg-surface/40 px-2 py-2 text-center`}
              >
                <div className={`font-display text-xs font-semibold ${club.color}`}>
                  {club.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="font-mono-ui text-xs text-spider italic">
            "With great power comes great innovation."
          </div>
          <div className="font-mono-ui text-[11px] text-muted-foreground">
            © 2026 Makeathon 7.0 — All realities reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
