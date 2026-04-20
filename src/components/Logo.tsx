import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize =
    size === "lg"
      ? "text-2xl md:text-3xl"
      : size === "sm"
        ? "text-sm"
        : "text-lg md:text-xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center select-none"
    >
      <span className={`font-display font-bold tracking-tight ${textSize}`}>
        <span className="text-foreground">MAKE-A-THON </span>
        <span className="text-spider text-glow-spider">7.0</span>
      </span>
    </motion.div>
  );
}
