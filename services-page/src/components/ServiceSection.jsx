import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import ServiceIcon from "./ServiceIcon";

const sectionVariants = {
  inactive: {
    opacity: 0.35,
    scale: 0.98,
    y: 24,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
  },
};

const titleVariants = {
  inactive: { opacity: 0, y: 40 },
  active: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 },
  },
};

const descVariants = {
  inactive: { opacity: 0, y: 20 },
  active: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 },
  },
};

const iconVariants = {
  inactive: { opacity: 0, scale: 0.8 },
  active: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.5 + i * 0.18,
    },
  }),
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

const arrowVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.85,
    transition: {
      pathLength: { duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.25 },
      opacity: { duration: 0.2, delay: 0.2 },
    },
  },
  exit: {
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const supportTextVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 1.15 },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.25 } },
};

/** Curved arrow from title area down toward images — hand-drawn style */
function CurvedArrow({ visible }) {
  return (
    <motion.div
      className="relative my-10 flex justify-center md:my-14"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    >
      <svg
        width="100"
        height="64"
        viewBox="0 0 100 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M50 0 C50 22 48 38 50 52 L50 58 M50 52 L46 56 M50 52 L54 56"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={arrowVariants}
          initial="hidden"
          animate={visible ? "visible" : "exit"}
        />
      </svg>
    </motion.div>
  );
}

export default function ServiceSection({ service, isActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25, once: false });
  const isFocused = isActive ?? inView;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x * 8);
    mouseY.set(y * 8);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const images = service.images || [];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] w-full items-center justify-center px-6 py-24 md:px-12 md:py-32"
      aria-labelledby={`service-${service.id}-title`}
    >
      <motion.div
        className="relative flex max-w-5xl flex-col items-center text-center"
        variants={sectionVariants}
        initial="inactive"
        animate={isFocused ? "active" : "inactive"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="mb-8 flex justify-center"
          variants={iconVariants}
          style={{
            x: isFocused ? springX : 0,
            y: isFocused ? springY : 0,
          }}
        >
          <ServiceIcon name={service.icon} />
        </motion.div>

        <motion.h2
          id={`service-${service.id}-title`}
          className="mb-6 font-bold tracking-tight text-white md:mb-8"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: 1.1,
            textShadow: isFocused
              ? "0 0 40px rgba(0, 255, 151, 0.2)"
              : "none",
          }}
          variants={titleVariants}
        >
          <a
            href={service.href}
            className="text-white no-underline transition hover:text-[#00ff97] focus:outline-none focus:ring-2 focus:ring-[#00ff97]/50 focus:ring-offset-2 focus:ring-offset-[#00020f]"
          >
            {service.name}
          </a>
        </motion.h2>

        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          variants={descVariants}
        >
          {service.description}
        </motion.p>

        {isFocused && (
          <motion.a
            href={service.href}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#00ff97]/50 bg-[#00ff97]/10 px-6 py-3 text-sm font-medium text-[#00ff97] no-underline transition hover:border-[#00ff97] hover:bg-[#00ff97]/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        )}

        {/* Arrow + images block: reveal on scroll */}
        {images.length > 0 && (
          <>
            <CurvedArrow visible={isFocused} />
            {/* Instagram-style feed: mixed sizes & aspect ratios, big and clear */}
            <div className="mt-6 flex flex-wrap items-end justify-center gap-4 md:gap-6">
              {images.map((src, i) => {
                const feedSizes = [
                  { width: "clamp(280px, 34vw, 420px)", aspectRatio: "1/1" },
                  { width: "clamp(260px, 32vw, 400px)", aspectRatio: "4/5" },
                  { width: "clamp(240px, 28vw, 380px)", aspectRatio: "1/1" },
                ];
                const style = feedSizes[i];
                const offsetY = i === 1 ? "translateY(1.25rem)" : undefined;
                return (
                  <motion.div
                    key={`${service.id}-img-${i}`}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30"
                    style={{
                      width: style.width,
                      aspectRatio: style.aspectRatio,
                      transform: offsetY,
                    }}
                    variants={imageVariants}
                    initial="hidden"
                    animate={isFocused ? "visible" : "exit"}
                    custom={i}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>
            <motion.p
              className="mt-8 max-w-md text-sm font-medium uppercase tracking-[0.15em] text-white/50"
              variants={supportTextVariants}
              initial="hidden"
              animate={isFocused ? "visible" : "exit"}
            >
              See how we deliver
            </motion.p>
          </>
        )}
      </motion.div>
    </section>
  );
}
