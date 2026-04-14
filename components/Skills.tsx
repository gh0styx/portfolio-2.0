"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS_DATA, ANIMATION_CONFIG } from "@/lib/constants";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section id="skills" ref={ref} className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-background overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white/90">
            {SKILLS_DATA.title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}>
          {SKILLS_DATA.skills.map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="relative"
              style={{ perspective: 1000 }}>
              
              <motion.span
                className="relative inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white/70 transition-all duration-300 cursor-default shadow-sm"
                >
                {skill}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
