import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cpu, Zap, Trophy, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Make-a-Thon 7.0 — Final Registration" },
      {
        name: "description",
        content:
          "Register your team for the final round of Make-a-Thon 7.0, hosted by the ECE Department, SVCE.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pt-12 pb-8 text-center">
          <div className="font-mono-ui text-xs uppercase tracking-[0.3em] text-primary/80">
            ECE Department · SVCE
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glitch font-display text-5xl md:text-7xl font-bold mt-3 text-foreground"
          >
            MAKE-A-THON <span className="text-primary text-glow-cyan">7.0</span>
          </motion.h1>
          <p className="mt-3 font-mono-ui text-sm text-muted-foreground">
            Final Registration · 24-hour innovation challenge
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display font-semibold text-primary-foreground hover:opacity-90 ring-glow-cyan"
            >
              Register your team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-surface px-6 py-3 font-display font-semibold text-primary hover:bg-primary/10"
            >
              Already have an account
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Cpu, title: "Hardware · Software · Industry", desc: "Three battlegrounds, one prize." },
            { icon: Zap, title: "60 teams max", desc: "First-come, first-served slots." },
            { icon: Trophy, title: "ECE flagship", desc: "Hosted by the ECE Department, SVCE." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="panel rounded-xl p-5 corner-frame"
            >
              <f.icon className="h-5 w-5 text-amber" />
              <div className="mt-3 font-display font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16">
          <div className="panel rounded-xl p-6 text-sm text-muted-foreground">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary mb-2">
              Mission briefing
            </div>
            Registration is open to teams of <span className="text-foreground">4 to 6 members</span>{" "}
            from the same college. You'll need: team & member info, mentor details,
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
