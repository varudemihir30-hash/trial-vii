import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollBackground({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1],
    [0.12, 0.28, 0.2, 0.3, 0.22, 0.28, 0.15]
  );

  const streakOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.03, 0.06, 0.04, 0.05]
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#00020f]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(180deg, #00020f 0%, #0a1220 30%, #0d1522 50%, #0a0f1a 70%, #00020f 100%)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff97] blur-[140px]"
        style={{ opacity: glowOpacity }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00a4af]/10 to-transparent"
        style={{ opacity: streakOpacity }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}
