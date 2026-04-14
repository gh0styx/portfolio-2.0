"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_DATA, ANIMATION_CONFIG } from "@/lib/constants";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative z-10 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center tracking-tight text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          {ABOUT_DATA.title}
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-2 gap-16 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}>
          {/* About Text */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tight text-white/90">Who I am</h3>
            <div className="space-y-6 text-white/70 font-light text-lg">
              {ABOUT_DATA.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 place-content-center">
            {ABOUT_DATA.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-colors group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}>
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium tracking-widest uppercase text-white/50">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
