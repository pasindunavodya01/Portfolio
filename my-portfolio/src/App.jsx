import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import data from "./data/portfolio.json";


// ─── Fade-in wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Experience", "Projects", "Contact"];
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-sm text-[#c8ff00] tracking-widest uppercase">
          {data.personal.name.split(" ")[0]}
          <span className="text-white/30">.</span>
        </span>
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${data.personal.email}`}
          className="text-xs font-mono px-4 py-2 border border-[#c8ff00]/40 text-[#c8ff00] hover:bg-[#c8ff00] hover:text-black transition-all duration-200 rounded-sm"
        >
          Contact Me
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { personal, about } = data;
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-6">
      {/* background grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(200,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c8ff00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-[#c8ff00] text-sm tracking-widest uppercase mb-6"
        >
          &gt; Hello, world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8"
        >
          {personal.name.split(" ").map((word, i) => (
            <span key={i} className={i % 2 === 1 ? "text-[#c8ff00]" : "text-white"}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="text-xl text-white/60 mb-2">{personal.title}</p>
          <p className="text-white/40 leading-relaxed">{personal.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 mt-10"
        >
          <a
            href="#projects"
            className="px-7 py-3 bg-[#c8ff00] text-black font-bold text-sm rounded-sm hover:bg-white transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="px-7 py-3 border border-white/20 text-white/70 text-sm rounded-sm hover:border-white/50 hover:text-white transition-all duration-200"
          >
            About Me
          </a>
        </motion.div>

        {/* social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex gap-6 mt-12"
        >
          {Object.entries(personal.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-white/30 hover:text-[#c8ff00] transition-colors duration-200 uppercase tracking-widest"
            >
              {platform}
            </a>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-[#c8ff00]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  const { about, skills, personal, education } = data;
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-[#c8ff00] text-xs tracking-widest uppercase mb-3">01 — About</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Who I Am</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16">
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg leading-relaxed mb-6">{about}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-white/30 font-mono">📍</span>
              <span className="text-white/50">{personal.location}</span>
            </div>
            {education.map((e) => (
              <div key={e.degree} className="mt-4 p-4 border border-white/10 rounded-sm">
                <p className="text-white font-semibold text-sm">{e.degree}</p>
                <p className="text-white/40 text-xs mt-1 font-mono">{e.school} · {e.period}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p className="text-[#c8ff00] font-mono text-xs tracking-widest uppercase mb-3">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-sm font-mono hover:border-[#c8ff00]/40 hover:text-white transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────────
function Experience() {
  const { experience } = data;
  const [active, setActive] = useState(0);
  const current = experience[active];

  return (
    <section id="experience" className="py-28 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-[#c8ff00] text-xs tracking-widest uppercase mb-3">02 — Experience</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Where I've Worked</h2>
        </Reveal>

        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          {/* Tabs */}
          <Reveal delay={0.1}>
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
              {experience.map((exp, i) => (
                <button
                  key={exp.id}
                  onClick={() => setActive(i)}
                  className={`text-left px-4 py-3 text-sm font-mono whitespace-nowrap border-l-2 transition-all duration-200 ${
                    active === i
                      ? "border-[#c8ff00] text-[#c8ff00] bg-[#c8ff00]/5"
                      : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/30"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{current.role}</h3>
                    <p className="text-[#c8ff00] font-mono text-sm">@ {current.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 font-mono text-xs">{current.period}</p>
                    <p className="text-white/30 font-mono text-xs">{current.location}</p>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-6">{current.description}</p>
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-[#c8ff00]/10 text-[#c8ff00] text-xs font-mono rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  const { projects } = data;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 4);
const rest = projects.slice(4);   

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-[#c8ff00] text-xs tracking-widest uppercase mb-3">03 — Projects</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Things I've Built</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <div className="group relative border border-white/10 rounded-sm overflow-hidden hover:border-[#c8ff00]/30 transition-all duration-300 bg-white/[0.02]">
                {/* image */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#c8ff00] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 shrink-0">
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white text-xs font-mono transition-colors">
                        GitHub ↗
                      </a>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-[#c8ff00]/60 hover:text-[#c8ff00] text-xs font-mono transition-colors">
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-0.5 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <Reveal delay={0.2}>
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 border border-white/20 text-white/60 text-sm font-mono hover:border-[#c8ff00]/40 hover:text-[#c8ff00] transition-all duration-200 rounded-sm"
              >
                {showAll ? "Show Less" : `Show ${rest.length} More Project${rest.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const { personal } = data;
  return (
    <section id="contact" className="py-28 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[#c8ff00] text-xs tracking-widest uppercase mb-3">04 — Contact</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Let's Work Together</h2>
          <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
            I'm currently open to new opportunities. Whether it's a project, a full-time role, or just a hello — my inbox is always open.
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="inline-block px-10 py-4 bg-[#c8ff00] text-black font-bold text-sm rounded-sm hover:bg-white transition-colors duration-200"
          >
            Say Hello →
          </a>

          <div className="flex justify-center gap-8 mt-14">
            {Object.entries(personal.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-white/30 hover:text-[#c8ff00] transition-colors duration-200 uppercase tracking-widest"
              >
                {platform}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <p className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} {data.personal.name}
        </p>
        <p className="font-mono text-xs text-white/20">
          Built with React + Vite + Tailwind
        </p>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}