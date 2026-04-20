import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  // Height classes for different sizes
  const imgHeight =
    size === "lg" ? 56 : size === "sm" ? 28 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center select-none"
      style={{ lineHeight: 0 }}
    >
      <img
        src="/makeathon-logo.png"
        alt="Make-a-Thon 7.0"
        height={imgHeight}
        style={{
          height: `${imgHeight}px`,
          width: "auto",
          objectFit: "contain",
          // The logo is black on transparent — invert makes it white for dark bg.
          // Drop shadow adds a subtle glow to improve visibility.
          filter: "invert(1) drop-shadow(0 0 6px rgba(255,255,255,0.25))",
          maxWidth: size === "lg" ? "320px" : size === "sm" ? "150px" : "220px",
        }}
      />
    </motion.div>
  );
}
