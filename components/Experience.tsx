"use client";

import { motion, useInView, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { EXPERIENCE_DATA, ANIMATION_CONFIG } from "@/lib/constants";
import { Briefcase, GraduationCap, Code, ChevronRight } from "lucide-react";

const getIcon = (type: string) => {
  switch (type) {
    case "work":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "project":
      return Code;
    default:
      return Briefcase;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "work":
      return "bg-blue-500";
    case "education":
      return "bg-green-500";
    case "project":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const getSectionIcon = (sectionTitle: string) => {
  switch (sectionTitle) {
    case "Work Experience":
      return Briefcase;
    case "Education":
      return GraduationCap;
    default:
      return Code;
  }
};

const getSectionColor = (sectionTitle: string) => {
  switch (sectionTitle) {
    case "Work Experience":
      return "from-blue-500/20 to-blue-600/10";
    case "Education":
      return "from-green-500/20 to-green-600/10";
    default:
      return "from-purple-500/20 to-purple-600/10";
  }
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: number;
  }>({});

  // Card appearance on scroll for each section
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      const newVisibleSections: { [key: string]: number } = {};

      EXPERIENCE_DATA.sections.forEach((section, sectionIndex) => {
        const totalCards = section.items.length;

        // Much simpler logic - show all cards when section is in view
        const sectionStart = sectionIndex * 0.4; // 0, 0.4, 0.8

        let visibleCount = 0;
        if (latest >= sectionStart) {
          // Show all cards in this section when it comes into view
          visibleCount = totalCards;
        }

        newVisibleSections[section.title] = visibleCount;
      });

      setVisibleSections(newVisibleSections);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/30 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {EXPERIENCE_DATA.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {EXPERIENCE_DATA.subtitle}
          </p>
        </motion.div>

        <div className="space-y-20">
          {EXPERIENCE_DATA.sections.map((section, sectionIndex) => {
            const SectionIcon = getSectionIcon(section.title);
            const sectionColor = getSectionColor(section.title);
            const visibleCards = visibleSections[section.title] || 0;

            return (
              <motion.div
                key={section.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: ANIMATION_CONFIG.duration,
                  delay: sectionIndex * 0.3,
                }}>
                {/* Section Header */}
                <div
                  className={`relative mb-12 p-6 rounded-2xl bg-linear-to-r ${sectionColor} border border-border/50`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <SectionIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {section.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1 w-8 bg-primary rounded-full" />
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {section.items.length}{" "}
                          {section.items.length === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Items */}
                <div className="space-y-8">
                  {section.items.map((item, itemIndex) => {
                    const Icon = getIcon(item.type);
                    const isVisible = itemIndex < visibleCards;

                    return (
                      <motion.div
                        key={item.id}
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={
                          isVisible
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 50 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: itemIndex * 0.2,
                        }}>
                        <div className="bg-card border border-border rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/20">
                          {/* Header and icon */}
                          <div className="flex items-start gap-4 mb-6">
                            <div
                              className={`p-3 rounded-xl ${getTypeColor(
                                item.type
                              )} text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-foreground mb-1">
                                {item.title}
                              </h4>
                              <p className="text-base text-muted-foreground font-medium">
                                {item.company}
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                {item.period}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-4">
                            {item.skills.map((skill) => (
                              <motion.span
                                key={skill}
                                className="text-base px-4 py-3 bg-muted rounded-full font-medium hover:bg-primary/10 transition-colors"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                  isVisible
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.8 }
                                }
                                transition={{
                                  duration: 0.3,
                                  delay: itemIndex * 0.1 + 0.5,
                                }}>
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
