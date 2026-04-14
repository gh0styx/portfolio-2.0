"use client";

import { motion } from "framer-motion";
import { EXPERIENCE_DATA, ANIMATION_CONFIG } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative z-10 w-full">
        
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white/90">
            {EXPERIENCE_DATA.title}
          </h2>
          <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
            {EXPERIENCE_DATA.subtitle}
          </p>
        </motion.div>

        <div className="space-y-32">
          {EXPERIENCE_DATA.sections.map((section) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="relative">
                
              {/* Section Header */}
              <motion.h3 
                variants={itemVariants}
                className="text-3xl font-bold tracking-tight text-white mb-16 flex items-center gap-4">
                {section.title}
                <span className="text-sm font-medium tracking-widest uppercase text-white/30 px-3 py-1 border border-white/10 rounded-full">
                  {section.items.length}
                </span>
              </motion.h3>

              {/* Section Items */}
              <div className="flex flex-col">
                {section.items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="border-t border-white/10 py-12 first:border-t-0 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16 transition-colors">
                    
                    {/* Left Column: Period & Company */}
                    <div>
                      <div className="text-sm font-medium tracking-widest uppercase text-white/40 mb-2">
                        {item.period}
                      </div>
                      <div className="text-lg text-white/80 font-medium">
                        {item.company}
                      </div>
                    </div>

                    {/* Right Column: Details */}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 mb-6 transition-colors flex items-center gap-3">
                        {item.title}
                      </h4>
                      
                      <p className="text-base md:text-lg font-light text-white/60 mb-8 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] px-3 py-1.5 bg-white/5 border border-white/5 rounded-md font-medium tracking-widest uppercase text-white/40 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
