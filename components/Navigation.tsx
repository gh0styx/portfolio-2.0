"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAVIGATION_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants";

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [currentTime, setCurrentTime] = useState("");

	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > NAVIGATION_CONFIG.scrollThreshold);
	});

	useEffect(() => {
		const p = () => {
			const date = new Date();
			setCurrentTime(
				date.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: true,
				}),
			);
		};
		p();
		const inv = setInterval(p, 1000);
		return () => clearInterval(inv);
	}, []);

	const handleNavClick = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		setIsMobileMenuOpen(false);
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/80 backdrop-blur-md shadow-sm border-b border-white/5 text-white"
					: "bg-transparent text-white"
			}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-start lg:items-center justify-between py-6">
					<div className="flex items-center gap-4 text-sm font-medium tracking-wide">
						<motion.a
							href="#hero"
							onClick={(e) => {
								e.preventDefault();
								handleNavClick("#hero");
							}}
							whileHover={{ opacity: 0.7 }}
							className="font-bold flex gap-4"
						>
							<span>GH0STY</span>
							<span className="text-white/50 font-normal">dev</span>
						</motion.a>
					</div>

					<div className="hidden lg:flex items-start justify-center gap-12 flex-1 pt-1">
						{NAVIGATION_ITEMS.map((item) => (
							<motion.a
								key={item.name}
								href={item.href}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(item.href);
								}}
								className="text-[11px] font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors"
								whileHover={{ y: -1 }}
								whileTap={{ scale: 0.98 }}
							>
								{item.name}
							</motion.a>
						))}
					</div>

					<div className="flex items-start gap-6 text-[11px] font-medium tracking-widest uppercase text-white/50">
						<div className="hidden sm:block pt-1">
							<span className="text-white">●</span> {currentTime || "00:00:00"}
						</div>

						<motion.button
							className="relative -mt-2 p-2 max-lg:block lg:hidden group text-white hover:bg-white/10 rounded-lg transition-colors"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{isMobileMenuOpen ? (
								<X className="w-5 h-5 stroke-current" />
							) : (
								<Menu className="w-5 h-5 stroke-current" />
							)}
						</motion.button>
					</div>
				</div>
			</div>

			<motion.div
				initial={false}
				animate={{
					scaleY: isMobileMenuOpen ? 1 : 0,
					opacity: isMobileMenuOpen ? 1 : 0,
				}}
				style={{ originY: 0 }}
				transition={{
					duration: 0.4,
					ease: [0.22, 1, 0.36, 1],
				}}
				className={`max-lg:block lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl absolute top-full left-0 right-0 z-60 will-change-transform border-b border-white/10 ${
					isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
				}`}
			>
				<div className="container mx-auto px-4 py-8">
					<div className="space-y-4">
						{NAVIGATION_ITEMS.map((item, index) => (
							<motion.a
								key={item.name}
								href={item.href}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(item.href);
								}}
								className="block text-2xl font-medium tracking-wide text-white/50 hover:text-white transition-colors"
								initial={{ opacity: 0, y: 20 }}
								animate={{
									opacity: isMobileMenuOpen ? 1 : 0,
									y: isMobileMenuOpen ? 0 : 20,
								}}
								transition={{
									duration: 0.4,
									delay: isMobileMenuOpen ? index * 0.05 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								{item.name}
							</motion.a>
						))}
					</div>
				</div>
			</motion.div>
		</motion.nav>
	);
}
