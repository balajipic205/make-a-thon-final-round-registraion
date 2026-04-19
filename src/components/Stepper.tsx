import { Check } from "lucide-react";

const STEPS = [
  "Team",
  "Members",
  "Mentor",
  "Photos",
  "Payment",
  "Review",
];

export function Stepper({ current, completed }: { current: number; completed: number }) {
  return (
    <div className="sticky top-[57px] z-20 -mx-4 mb-6 border-b border-border/60 bg-background/85 backdrop-blur px-4 py-3">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-1 overflow-x-auto">
          {STEPS.map((label, i) => {
            const stepNo = i + 1;
            const isDone = stepNo <= completed;
            const isActive = stepNo === current;
            return (
              <div key={label} className="flex items-center min-w-fit">
                <div
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors ${
                    isActive
                      ? "bg-primary/15 border border-primary/50"
                      : isDone
                        ? "bg-surface-2 border border-success/40"
                        : "bg-surface border border-border"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-mono-ui ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isDone
                          ? "bg-success text-background"
                          : "bg-surface-2 text-muted-foreground"
                    }`}
                  >
                    {isDone && !isActive ? <Check className="h-3 w-3" /> : stepNo}
                  </div>
                  <span
                    className={`text-xs font-mono-ui hidden sm:inline ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="h-px w-3 bg-border mx-0.5" />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-2 sm:hidden font-mono-ui text-xs text-muted-foreground">
          Step {current} of 6 — {STEPS[current - 1]}
        </div>
      </div>
    </div>
  );
}
