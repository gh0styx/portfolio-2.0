// Навигация
export const NAVIGATION_ITEMS = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Experience", href: "#experience" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

// Главная секция
export const HERO_DATA = {
	title: "Alexey Chermalykh",
	subtitle: "Middle Software Engineer | React / Next.js / Node.js / Laravel",
	description:
		"Software Engineer with 3.5+ years of experience building production web applications, dashboard interfaces, API integrations, and reusable component systems.",
	ctaText: "Learn more",
	cvDownload: {
		text: "Download CV",
		href: "/alexey-fullstack.pdf",
	},
};

// О себе
export const ABOUT_DATA = {
	title: "About me",
	paragraphs: [
		"I'm a Middle Software Engineer focused on JavaScript and TypeScript product development across React, Next.js, Node.js, and Laravel.",
		"I build responsive dashboard screens, reusable UI components, form flows, API-connected frontend modules, and admin-facing functionality for production applications.",
		"My backend work covers REST API endpoints, CRUD logic, authentication flows, PostgreSQL/MySQL query optimization, and data flow between frontend and backend services.",
		"I also review pull requests, support junior developers, improve shared standards, and use AI-assisted workflows with OpenAI and Gemini APIs where they support the product.",
	],
	stats: [
		{
			label: "Years of Experience",
			value: "3.5+",
			description: "Production web apps, dashboards and client-facing features",
		},
		{
			label: "Core Stack",
			value: "React / Next / Node / Nest",
			description: "Frontend, backend, API integration and production fixes",
		},
		{
			label: "Product UI",
			value: "Dashboards & Forms",
			description:
				"Reusable components, admin panels and responsive interfaces",
		},
		{
			label: "Backend Work",
			value: "REST + CRUD",
			description: "Auth flows, API endpoints, PostgreSQL/MySQL data pipelines",
		},
		{
			label: "Quality",
			value: "Tests + CI/CD",
			description:
				"Playwright, Jest, Vitest, GitLab CI and deployment workflows",
		},
		{
			label: "AI Workflows",
			value: "Cursor / Claude",
			description:
				"AI-assisted product features where they support real use cases",
		},
	],
};

// Навыки
export const SKILLS_DATA = {
	title: "Skills",
	skills: [
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"Vue.js",
		"Nuxt.js",
		"HTML5",
		"CSS3",
		"Redux Toolkit",
		"Zustand",
		"Pinia",
		"Tailwind CSS",
		"shadcn/ui",
		"Radix UI",
		"TanStack Query",
		"React Hook Form",
		"Zod",
		"Responsive Design",
		"Frontend Architecture",
		"Node.js",
		"Express",
		"Laravel",
		"REST APIs",
		"GraphQL",
		"Authentication",
		"JWT",
		"WebSocket",
		"API Integration",
		"PostgreSQL",
		"MySQL",
		"MongoDB",
		"Prisma",
		"Redis",
		"Query Optimization",
		"Playwright",
		"Jest",
		"Vitest",
		"React Testing Library",
		"Unit Testing",
		"E2E Testing",
		"Docker",
		"GitHub Actions",
		"GitLab CI",
		"CI/CD",
		"Nginx",
		"Deployment Workflows",
		"C#",
		".NET",
		"OpenAI API",
		"Gemini API",
		"n8n",
		"AI-assisted Development",
		"Git",
		"Postman",
		"Swagger",
		"Jira",
		"Cursor",
	],
};

// Проекты
export interface Project {
	title: string;
	description: string;
	tech: string[];
	github?: string;
	demo?: string;
	image?: string;
}

export const PROJECTS_DATA = {
	title: "Projects",
	projects: [
		{
			title: "Codex",
			description:
				"Modern web application built with cutting-edge technologies. A comprehensive platform featuring advanced functionality and responsive design.",
			tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
			demo: "https://codex.energy/",
		},
		{
			title: "Wandry-ui-kit",
			description:
				"Custom UI component library designed for consistent and scalable design systems. Includes reusable components with comprehensive documentation.",
			tech: [
				"React",
				"TypeScript",
				"Storybook",
				"Tailwind CSS",
				"Framer Motion",
				"Shadcn/ui",
			],
			github: "https://github.com/WandryDev/wandry-ui",
			demo: "https://ui.wandry.com.ua/",
		},
		{
			title: "CG site",
			description:
				"Corporate website for CG company featuring modern design, interactive elements, and optimized performance for better user experience.",
			tech: ["SCSS", "TypeScript", "Framer Motion", "Vue.js", "Nuxt.js"],
			demo: "https://crystaliaglass.com/",
		},
		{
			title: "CG dealer",
			description:
				"Access only for dealers. Dealer management system with advanced features for inventory management, customer relations, and business analytics.",
			tech: [
				"React",
				"Node.js",
				"MongoDB",
				"Express",
				"TypeScript",
				"Inertia.js",
				"Radix UI",
			],
		},
		{
			title: "Fernir.co",
			description:
				"Professional business website with modern design, responsive layout, and integrated contact forms. Built for optimal performance and SEO.",
			tech: ["React", "JavaScript", "SCSS"],
			demo: "https://fernir.co",
		},
	] as Project[],
};

// Контакты
export interface SocialLink {
	name: string;
	href: string;
	icon: string;
}

export const CONTACT_DATA = {
	title: "Contact",
	subtitle:
		"Get in touch if you want to discuss collaboration or just get to know each other",
	email: "nice140@icloud.com",
	phone: "+380 63 664 5358",
	location: "Odesa, Ukraine",
	socialLinks: [
		{
			name: "Email",
			href: "mailto:nice140@icloud.com",
			icon: "Mail",
		},
		{
			name: "GitHub",
			href: "https://github.com/gh0styx",
			icon: "Github",
		},
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/in/alexey-chermalykh",
			icon: "Linkedin",
		},
		{
			name: "Upwork",
			href: "https://www.upwork.com/freelancers/~01643d631289908fe5?mp_source=share",
			icon: "Upwork",
		},
	] as SocialLink[],
};

// Метаданные
export const SITE_METADATA = {
	title: "Software Engineer | Alexey Chermalykh",
	description:
		"Portfolio of Alexey Chermalykh, Middle Software Engineer specializing in React, Next.js, Node.js, and Laravel.",
	author: "Alexey Chermalykh",
	url: "https://github.com/gh0styx",
	image: "/og-image.jpg",
};

// Настройки анимаций
export const ANIMATION_CONFIG = {
	duration: 0.6,
	stagger: 0.1,
	delay: 0.2,
};

// Настройки анимированного фона Hero секции
export const HERO_BACKGROUND_CONFIG = {
	enabled: true,
	// Градиент адаптируется к теме
	lightTheme: {
		primaryGradient: {
			colors: ["#f8fafc", "#e2e8f0", "#c7d2fe", "#8b5cf6", "#7c3aed"], // более плавный переход
			opacity: 0.4,
			duration: 15,
		},
		secondaryGradient: {
			colors: ["#f1f5f9", "#e2e8f0", "#ddd6fe", "#a855f7", "#9333ea"], // более мягкие цвета
			opacity: 0.3,
			duration: 20,
		},
	},
	darkTheme: {
		primaryGradient: {
			colors: ["#0f172a", "#1e293b", "#334155", "#8b5cf6", "#7c3aed"], // более плавный переход
			opacity: 0.5,
			duration: 15,
		},
		secondaryGradient: {
			colors: ["#1e293b", "#334155", "#475569", "#a855f7", "#9333ea"], // более мягкие цвета
			opacity: 0.4,
			duration: 20,
		},
	},
	floatingElements: {
		enabled: true,
		element1: {
			colors: ["#8b5cf6", "#a855f7", "#c4b5fd"], // более мягкие фиолетовые оттенки
			size: "w-72 h-72",
			position: "top-1/4 left-1/4",
			duration: 12,
			opacity: 0.2,
		},
		element2: {
			colors: ["#7c3aed", "#9333ea", "#ddd6fe"], // более мягкие темно-фиолетовые оттенки
			size: "w-96 h-96",
			position: "bottom-1/4 right-1/4",
			duration: 16,
			opacity: 0.2,
		},
	},
};

// Профессиональный опыт
export interface ExperienceItem {
	id: string;
	title: string;
	company: string;
	period: string;
	description: string;
	skills: string[];
	type: "work" | "education" | "project";
}

export const EXPERIENCE_DATA = {
	title: "Professional Experience",
	subtitle:
		"Fullstack JavaScript development across production features, dashboards, APIs, databases, testing, and deployment workflows.",
	sections: [
		{
			title: "Work Experience",
			items: [
				{
					id: "1",
					title: "Middle Software Engineer",
					company: "Wandry",
					period: "07/2025 - Present",
					description:
						"Owned and delivered fullstack product features using React, TypeScript, Node.js and Laravel, covering frontend implementation, API integration, backend logic and production fixes. Built dashboard screens, reusable UI components, form flows and API-connected modules, created REST endpoints and authentication flows, optimized Core Web Vitals, improved PostgreSQL/MySQL data flows, reviewed pull requests and integrated AI-assisted features with OpenAI/Gemini APIs.",
					skills: [
						"React",
						"TypeScript",
						"Node.js",
						"Laravel",
						"REST APIs",
						"PostgreSQL",
						"MySQL",
						"OpenAI API",
					],
					type: "work" as const,
				},
				{
					id: "2",
					title: "Part-time Frontend Developer",
					company: "NDA SaaS Client",
					period: "04/2025 - 02/2026",
					description:
						"Developed production frontend features using React, TypeScript, Next.js and REST APIs. Built dashboard screens, reusable UI components, form flows and API-connected frontend modules, managed server state, validation, loading/error states and complex user interactions, and fixed performance and UX issues by reducing unnecessary re-renders and improving page responsiveness.",
					skills: [
						"React",
						"TypeScript",
						"Next.js",
						"REST APIs",
						"Server State",
						"Validation",
						"Performance",
					],
					type: "work" as const,
				},
				{
					id: "3",
					title: "Junior Fullstack Developer",
					company: "Fernir",
					period: "01/2024 - 07/2025",
					description:
						"Built and maintained web application features using React, TypeScript, Vue.js, Node.js and Laravel. Implemented responsive UI screens, reusable components, client-side state management and API-connected workflows, developed REST API integrations, CRUD flows, authentication-related logic and admin-facing functionality, improved database structure and SQL queries, and configured GitLab CI/CD pipelines.",
					skills: [
						"React",
						"TypeScript",
						"Vue.js",
						"Node.js",
						"Laravel",
						"REST APIs",
						"SQL",
						"GitLab CI",
					],
					type: "work" as const,
				},
				{
					id: "4",
					title: "Junior Frontend Developer",
					company: "Aura Digital",
					period: "2023 - 2024",
					description:
						"Built responsive landing pages, dashboard screens and reusable UI components using JavaScript, React and Tailwind CSS. Integrated frontend pages with REST APIs, handled loading, validation and error states, and improved layout consistency, cross-browser behavior and mobile responsiveness across client projects.",
					skills: [
						"JavaScript",
						"React",
						"Tailwind CSS",
						"REST APIs",
						"Responsive Design",
						"Cross-browser UI",
					],
					type: "work" as const,
				},
			],
		},
		{
			title: "Education",
			items: [
				{
					id: "5",
					title: "Master of Computer Science",
					company: "National University 'Odesa Polytechnic'",
					period: "2024 - Present",
					description:
						"Graduate studies in computer science with a focus on modern software development and engineering practices.",
					skills: [
						"Computer Science",
						"Software Development",
						"Engineering Practices",
					],
					type: "education" as const,
				},
				{
					id: "6",
					title: "Bachelor's degree",
					company: "IT STEP Computer Academy",
					period: "09/2019 - 07/2024",
					description:
						"Bachelor's degree completed in Odesa, Ukraine, covering software development foundations and practical web development.",
					skills: [
						"Software Development",
						"Web Development",
						"Programming Foundations",
					],
					type: "education" as const,
				},
			],
		},
	],
};

// Настройки навигации
export const NAVIGATION_CONFIG = {
	scrollThreshold: 50,
	mobileBreakpoint: "lg",
};
