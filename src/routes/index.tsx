import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cpu, Zap, Trophy, ArrowRight, Code2, Factory } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Makeathon 7.0 — Final Registration · ECE Department, SVCE" },
      {
        name: "description",
        content:
          "National-level 24-hour hardware & software hackathon. Register your team for the final round of Makeathon 7.0, hosted by the ECE Department, SVCE.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 chip-spider rounded-full px-3 py-1 font-mono-ui text-[10px] uppercase tracking-[0.3em]">
            <span className="h-1.5 w-1.5 rounded-full bg-spider animate-pulse" />
            ECE Department · SVCE · Final Registration
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glitch font-display text-5xl md:text-7xl font-bold mt-5 text-foreground"
          >
            MAKEATHON <span className="text-spider text-glow-spider">7.0</span>
          </motion.h1>
          <p className="mt-3 font-mono-ui text-sm text-cyan-edge tracking-widest uppercase">
            A 24-Hour Hackathon
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground">
            National-level hardware &amp; software creation sprint. Three battlegrounds, sixty teams,
            one final standing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="btn-spider inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-display font-semibold ring-glow-spider"
            >
              Register your team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan-edge/40 bg-surface px-6 py-3 font-display font-semibold text-cyan-edge hover:bg-cyan-edge/10"
            >
              Already have an account
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Cpu, title: "Hardware", desc: "Build with circuits, sensors and silicon.", color: "text-spider", border: "border-spider/30" },
            { icon: Code2, title: "Software", desc: "Ship code that solves real problems.", color: "text-cyan-edge", border: "border-cyan-edge/30" },
            { icon: Factory, title: "Industry", desc: "Tackle sponsor-defined challenges.", color: "text-amber", border: "border-amber/30" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`panel rounded-xl p-5 corner-frame ${f.border}`}
            >
              <f.icon className={`h-6 w-6 ${f.color}`} />
              <div className="mt-3 font-display font-semibold text-lg">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, k: "60", v: "Max teams", color: "text-cyan-edge" },
            { icon: Trophy, k: "₹350", v: "Per member", color: "text-amber" },
            { icon: Cpu, k: "24h", v: "Build sprint", color: "text-spider" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface/50 p-5 flex items-center gap-4">
              <s.icon className={`h-7 w-7 ${s.color}`} />
              <div>
                <div className={`font-display text-2xl font-bold ${s.color}`}>{s.k}</div>
                <div className="font-mono-ui text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16">
          <div className="panel-cyan rounded-xl p-6 text-sm text-muted-foreground corner-frame">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-cyan-edge mb-2">
              Mission briefing
            </div>
            Registration is open to teams of <span className="text-foreground">4 to 6 members</span>{" "}
            from the same college. You'll need: team &amp; member info, mentor details,
            passport-style member photos, and a payment of{" "}
            <span className="text-amber font-semibold">₹350 per member</span>. The portal
            auto-saves your progress at every step.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
