"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS_DATA, ANIMATION_CONFIG } from "@/lib/constants";

function ProjectCard({ project, index, isInView }: {
  project: typeof PROJECTS_DATA.projects[number];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;
    
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Specular highlight follows cursor
    glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    glareRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    glareRef.current.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        delay: index * ANIMATION_CONFIG.stagger,
      }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card-3d bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-[border-color] duration-500 group flex flex-col justify-between h-full relative overflow-hidden"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}>
          
        {/* Specular glare overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300"
        />
        
        {/* Subtle gradient hover effect on cards */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Edge glow — silver chrome */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_30px_rgba(200,210,230,0.04)]" />

        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-2xl font-bold mb-4 tracking-wide text-white">{project.title}</h3>
          <p className="text-white/60 mb-8 leading-relaxed font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-white/40 text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-auto" style={{ transform: "translateZ(30px)" }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}>
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}>
              <ExternalLink className="w-4 h-4" />
              URL
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center tracking-tight text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          {PROJECTS_DATA.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
