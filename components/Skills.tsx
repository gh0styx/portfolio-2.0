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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          {SKILLS_DATA.title}
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}>
          {SKILLS_DATA.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={itemVariants}
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-base font-medium text-foreground hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 transition-all duration-200 cursor-default"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
