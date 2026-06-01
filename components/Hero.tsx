"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, Suspense } from "react";
import { HERO_DATA } from "@/lib/constants";

// Dynamic import for 3D — no SSR
const GlassCube = dynamic(() => import("@/components/3d/GlassCube"), {
	ssr: false,
});

export default function Hero() {
	const [firstName, lastName] = HERO_DATA.title.split(" ");
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Smooth springs for 3d effect
	const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);

	const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
	const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { innerWidth, innerHeight } = window;
			const x = e.clientX / innerWidth - 0.5;
			const y = e.clientY / innerHeight - 0.5;
			mouseX.set(x);
			mouseY.set(y);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<section
			id="hero"
			className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background"
		>
			{/* 3D Glass Cube Background */}
			<Suspense
				fallback={
					<div className="absolute inset-0 z-0">
						{/* Fallback gradient blobs while 3D loads */}
						<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-80 animate-blob" />
						<div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-80 animate-blob animation-delay-2000" />
					</div>
				}
			>
				<GlassCube />
			</Suspense>

			{/* Subtle radial gradient overlay for depth */}
			<div className="absolute inset-0 z-[1] bg-radial-gradient pointer-events-none" />

			<div className="flex-1 flex items-center justify-center relative z-10 px-4">
				<motion.div
					style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
					className="text-center w-full max-w-5xl"
				>
					<motion.h1
						className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tight text-white leading-[1.1] md:leading-[1]"
						style={{ transform: "translateZ(50px)" }}
					>
						{firstName}
						<br />
						<span className="shimmer-text">
							{lastName}
						</span>
					</motion.h1>
					<motion.div
						style={{ transform: "translateZ(30px)" }}
						className="mt-8 flex flex-col items-center gap-8"
					>
						<p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto">
							{HERO_DATA.subtitle}
						</p>

						<motion.a
							href={HERO_DATA.cvDownload.href}
							download
							className="relative inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-bold tracking-widest uppercase text-white hover:bg-white/10 hover:border-white/40 transition-colors group overflow-hidden"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
						>
							<div className="absolute inset-0 bg-linear-to-r from-white/5 to-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<span className="relative z-10">{HERO_DATA.cvDownload.text}</span>
						</motion.a>
					</motion.div>
				</motion.div>
			</div>

			{/* Footer Info Matching Monopo Style */}
			<div className="relative z-10 w-full px-4 sm:px-8 pb-8 text-[11px] font-medium tracking-widest uppercase text-white/50 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0">
				{/* <div className="flex items-center gap-4 hidden md:flex">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
            G
          </div>
        </div> */}

				<div className="flex-1 flex flex-col md:grid md:grid-cols-3 max-w-4xl mx-auto gap-6 md:gap-8 w-full md:text-left text-center">
					<div>
						<span className="text-white block mb-1">Based in Odesa</span>
						Born in Ukraine
          </div>
          <div>
            <span className="text-white block mb-1">Software Engineer</span>
            React / Next.js / Node.js / Laravel
          </div>
					<div>
						<span className="text-white block mb-1">3.5+ years</span>
						Production dashboards, APIs and UI systems
					</div>
				</div>

				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="md:border-l md:border-white/20 md:pl-6 hidden md:block"
				>
					<ArrowDown className="w-5 h-5 text-white/70" />
				</motion.div>
			</div>
		</section>
	);
}
