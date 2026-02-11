import { useRef } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data/services";
import ScrollBackground from "./ScrollBackground";
import ServiceSection from "./ServiceSection";
import Footer from "./Footer";

const introVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.15 },
  },
};

export default function ServicesJourney() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="services-journey relative min-h-screen">
      <ScrollBackground containerRef={containerRef} />

      <div className="relative z-10 pt-12 md:pt-16">
        <motion.div
          className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24"
          initial="hidden"
          animate="visible"
          variants={introVariants}
        >
          <motion.span
            className="mb-6 block text-lg font-medium uppercase tracking-[0.2em] text-[#00ff97] md:text-xl"
            variants={introVariants}
          >
            What we offer
          </motion.span>
          <motion.h1
            className="mb-8 font-bold tracking-tight text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 12vw, 10rem)",
              lineHeight: 1.05,
            }}
            variants={introVariants}
          >
            Services that accelerate your{" "}
            <span className="bg-gradient-to-r from-[#00a4af] to-[#00ff97] bg-clip-text text-transparent">
              career
            </span>
          </motion.h1>
          <motion.p
            className="text-2xl text-white/60 md:text-3xl lg:text-4xl"
            variants={introVariants}
          >
            Scroll to explore each offering — one focus at a time.
          </motion.p>
        </motion.div>

        {SERVICES.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}

        <motion.div
          className="relative z-10 border-t border-white/10 px-6 py-16 md:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 text-white/60">
              Ready to get started? We’re here to support your entire journey.
            </p>
            <a
              href="/contact.html"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2c32fe] via-[#00a4af] to-[#00ff97] px-8 py-4 text-sm font-semibold text-[#00020f] no-underline transition hover:opacity-95"
            >
              Contact us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
            </a>
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
}
