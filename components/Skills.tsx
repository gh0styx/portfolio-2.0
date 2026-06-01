"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS_DATA } from "@/lib/constants";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-background overflow-hidden"
    >
      {/* Liquid metal ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(180,180,200,0.06)_0%,transparent_70%)] blur-[60px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white/90">
            {SKILLS_DATA.title}
          </h2>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 lg:gap-3 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {SKILLS_DATA.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: 0.2 + Math.min(i * 0.012, 0.5),
                ease: "easeOut",
              }}
              className="skill-badge relative inline-flex items-center px-4 py-2 text-[11px] sm:text-[11px] font-bold tracking-widest uppercase cursor-default select-none"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
