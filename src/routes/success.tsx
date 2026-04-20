import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Copy, Check, Loader2 } from "lucide-react";

type SubmitResult = {
  success: boolean;
  reference_id: string;
  team_id: string;
  team_number: number;
  members_with_ids: { member_order: number; full_name: string; unique_member_id: string }[];
};

export const Route = createFileRoute("/success")({
  component: SuccessPage,
  head: () => ({ meta: [{ title: "Registration Submitted — Make-a-Thon 7.0" }] }),
});

function SkeletonSuccess() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col items-center">
        <div className="h-14 w-14 rounded-full bg-surface-2" />
        <div className="h-8 w-64 bg-surface-2 rounded mt-6" />
        <div className="h-4 w-80 bg-surface-2 rounded mt-3" />
      </div>

      <div className="rounded-lg border border-border bg-surface-2/30 p-8">
        <div className="h-3 w-32 bg-surface-2 rounded mx-auto mb-4" />
        <div className="h-10 w-56 bg-surface-2 rounded mx-auto" />
        <div className="h-3 w-16 bg-surface-2 rounded mx-auto mt-4" />
      </div>

      <div className="space-y-4 text-left">
        <div className="h-3 w-24 bg-surface-2 rounded" />
        <div className="rounded-md border border-border p-4 space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex gap-4">
              <div className="h-4 w-4 bg-surface-2 rounded" />
              <div className="h-4 flex-1 bg-surface-2 rounded" />
              <div className="h-4 w-24 bg-surface-2 rounded" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-4 w-full bg-surface-2 rounded mt-6" />
      <div className="h-10 w-32 bg-surface-2 rounded mx-auto mt-6" />
    </div>
  );
}

function SuccessPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [leaderEmail, setLeaderEmail] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [stage, setStage] = useState<"checking" | "skeleton" | "ready">("checking");

  useEffect(() => {
    const raw = sessionStorage.getItem("mat7_result");
    if (!raw) {
      // Recheck after a small delay
      const t = window.setTimeout(() => {
        const recheck = sessionStorage.getItem("mat7_result");
        if (!recheck) {
          navigate({ to: "/" });
        } else {
          init(recheck);
        }
      }, 500);
      return () => window.clearTimeout(t);
    } else {
      init(raw);
    }
  }, [navigate]);

  const init = (raw: string) => {
    try {
      const parsed = JSON.parse(raw) as SubmitResult;
      setResult(parsed);
      setLeaderEmail(sessionStorage.getItem("mat7_leader_email") || "");
      // Start skeleton phase
      setStage("skeleton");
      // Hold skeleton for 6 seconds as requested
      setTimeout(() => setStage("ready"), 6000);
    } catch {
      navigate({ to: "/" });
    }
  };

  useEffect(() => {
    if (stage !== "ready" || !result) return;

    // ── Realistic Firecracker "Sky Shot" sound ──
    const playSkyShot = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const now = ctx.currentTime;

        // 1. Initial "Thump/Bang" (Low frequency)
        const boom = ctx.createOscillator();
        const boomGain = ctx.createGain();
        boom.type = "sine";
        boom.frequency.setValueAtTime(150, now);
        boom.frequency.exponentialRampToValueAtTime(40, now + 0.1);
        boomGain.gain.setValueAtTime(0.5, now);
        boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        boom.connect(boomGain);
        boomGain.connect(ctx.destination);
        boom.start(now);
        boom.stop(now + 0.2);

        // 2. Main Sharp Pop (White Noise)
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(1200, now);
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        
        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start(now);

        // 3. Crackling After-effect (High frequency pulses)
        for(let i = 0; i < 15; i++) {
          const t = now + 0.1 + (Math.random() * 0.4);
          const crackle = ctx.createOscillator();
          const crackleGain = ctx.createGain();
          crackle.type = "square";
          crackle.frequency.setValueAtTime(2000 + (Math.random() * 3000), t);
          crackleGain.gain.setValueAtTime(0.05, t);
          crackleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
          crackle.connect(crackleGain);
          crackleGain.connect(ctx.destination);
          crackle.start(t);
          crackle.stop(t + 0.03);
        }

        setTimeout(() => { try { ctx.close(); } catch {} }, 2000);
      } catch { /* ignore */ }
    };

    // Play the Sky Shot
    playSkyShot();

    // ── Confetti — exactly as per provided reference ──
    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({
        ...opts,
        particleCount: Math.floor(200 * ratio),
        origin: { y: 0.4 },
        zIndex: 9999, // Ensure it's on top
      });

    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#E63946", "#00F5FF", "#FFB800"] });
    fire(0.2, { spread: 60, colors: ["#E63946", "#00F5FF"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#FFB800", "#E63946"] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ["#00F5FF"] });

    return () => {
      // Confetti doesn't need explicit clear in this pattern
    };
  }, [stage, result]);

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.reference_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-12">
          {stage === "checking" ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground font-mono-ui">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-spider" />
              Finalising your registration...
            </div>
          ) : (
            <div className={`panel rounded-2xl p-6 sm:p-8 corner-frame text-center transition-all duration-700 ${stage === "ready" ? "opacity-100 scale-100" : "opacity-90 blur-[1px]"}`}>
              {stage === "skeleton" ? (
                <SkeletonSuccess />
              ) : result && (
                <>
                  <div className="mx-auto h-14 w-14 rounded-full bg-success/15 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-success" />
                  </div>
                  <h1 className="mt-4 font-display text-3xl">Registration submitted</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Welcome to Make-a-Thon 7.0. Your team is now in the system.
                  </p>

                  <div className="mt-6 rounded-lg border border-primary/40 bg-primary/5 p-4 shadow-glow-cyan/10">
                    <div className="font-mono-ui text-xs uppercase tracking-wider text-muted-foreground">
                      Team reference ID
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-3">
                      <span className="font-mono-ui text-2xl font-semibold text-primary text-glow-cyan transition-all">
                        {result.reference_id}
                      </span>
                      <button
                        onClick={copy}
                        className="rounded-md border border-primary/40 px-2 py-1 text-xs hover:bg-primary/10 transition-colors"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="mt-2 text-xs font-mono-ui text-muted-foreground">
                      Team #{String(result.team_number).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-6 text-left">
                    <div className="font-mono-ui text-xs uppercase tracking-wider text-primary mb-2">
                      Member IDs
                    </div>
                    <div className="rounded-md border border-border overflow-hidden bg-surface/50">
                      <table className="w-full text-sm font-mono-ui">
                        <thead className="bg-surface-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <tr>
                            <th className="text-left px-4 py-2.5">#</th>
                            <th className="text-left px-4 py-2.5">Name</th>
                            <th className="text-left px-4 py-2.5">Unique ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {result.members_with_ids.map((m) => (
                            <tr key={m.unique_member_id} className="hover:bg-primary/5 transition-colors">
                              <td className="px-4 py-3 text-muted-foreground">
                                {m.member_order}
                              </td>
                              <td className="px-4 py-3 font-sans text-foreground">{m.full_name}</td>
                              <td className="px-4 py-3 font-semibold text-amber">
                                {m.unique_member_id}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-muted-foreground">
                    Your registration has been received. The organizing team will contact you via
                    email at{" "}
                    <span className="text-foreground font-medium">{leaderEmail || "your team leader's college email"}</span>.
                  </p>

                  <Link
                    to="/"
                    className="mt-6 inline-block rounded-md border border-border bg-surface-2 px-6 py-2.5 text-sm font-medium hover:bg-spider hover:text-white transition-all shadow-sm"
                  >
                    Back to home
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

