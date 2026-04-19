import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg" ? "text-3xl md:text-5xl" : size === "sm" ? "text-base" : "text-xl md:text-2xl";
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 select-none"
    >
      <div className="relative">
        <div className="h-7 w-7 rounded-sm border-2 border-primary bg-background flex items-center justify-center font-display font-bold text-primary text-glow-cyan">
          M
        </div>
        <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber animate-pulse" />
      </div>
      <div className={`font-display font-bold tracking-tight ${sizeClass}`}>
        <span className="text-foreground">MAKE-A-THON </span>
        <span className="text-primary text-glow-cyan">7.0</span>
      </div>
    </motion.div>
  );
}
