import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import FloatingParticlesWrapper from "@/components/3d/FloatingParticlesWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <FloatingParticlesWrapper />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
