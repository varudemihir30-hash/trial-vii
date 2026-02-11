import { motion } from "framer-motion";

const NAV = [
  { label: "Home", href: "index.html" },
  { label: "About Us", href: "about.html" },
  { label: "Services", href: "service.html" },
  { label: "Contact Us", href: "contact.html" },
];

export default function PageHeader() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8">
        <a
          href="index.html"
          className="flex items-center gap-3 text-white no-underline transition hover:opacity-90"
        >
          <img
            src="assets/img/logo/vertex-tech-logo.svg"
            alt="Vertex Tech Io"
            className="h-8 w-auto md:h-9"
          />
          <span className="hidden h-6 w-px bg-white/50 sm:block" aria-hidden />
          <span className="text-xl font-semibold tracking-tight">
            Vertex Tech io
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 no-underline transition hover:text-[#00ff97]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <a
            href="index.html"
            className="text-sm font-medium text-white/90 no-underline"
          >
            Menu
          </a>
        </div>
      </div>
    </motion.header>
  );
}
