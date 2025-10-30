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
  title: "Oleksii Chermalykh",
  subtitle: "Middle Frontend Developer",
  description:
    "Creating modern web applications with focus on user experience and performance. Based in Odesa, Ukraine.",
  ctaText: "Learn more",
  cvDownload: {
    text: "Download CV",
    href: "/cv-oleksii-chermalykh.pdf",
  },
};

// О себе
export const ABOUT_DATA = {
  title: "About me",
  paragraphs: [
    "I'm a Middle Frontend Developer with 2+ years of experience creating modern web applications. I specialize in React, Next.js, Vue.js, and TypeScript.",
    "My expertise includes performance optimization, state management with Redux Toolkit and Zustand, and building responsive UIs with Tailwind CSS and component libraries.",
    "I have experience with testing (Jest, React Testing Library), CI/CD pipelines, and REST API integration. Additionally, I have solid backend knowledge in TypeScript, C#, and Python for full-stack development.",
    "I'm based in Odesa, Ukraine and speak English at Intermediate+ level.",
  ],
  stats: [
    { label: "Years of Experience", value: "2+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies", value: "25+" },
    { label: "Languages", value: "2" },
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
    "Angular",
    "Redux Toolkit",
    "Zustand",
    "Tailwind CSS",
    "SCSS",
    "shadcn/ui",
    "Material UI",
    "Ant Design",
    "Jest",
    "React Testing Library",
    "Vitest",
    "Playwright",
    "Git",
    "GitHub",
    "CI/CD",
    "Node.js",
    "Express",
    "REST APIs",
    "JWT",
    "OAuth2",
    "HTML5",
    "CSS",
    "JSON",
    "Bootstrap",
    "Webpack",
    "Vite",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "GraphQL",
    "Firebase",
    "Figma",
    "Jira",
    "OOP",
    "React Hooks",
    "React Router",
    "Styled Components",
    "jQuery",
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
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      github: "https://github.com/gh0styx/codex",
      demo: "https://codex-demo.com",
    },
    {
      title: "Wandry-ui-kit",
      description:
        "Custom UI component library designed for consistent and scalable design systems. Includes reusable components with comprehensive documentation.",
      tech: ["React", "TypeScript", "Storybook", "SCSS"],
      github: "https://github.com/gh0styx/wandry-ui-kit",
    },
    {
      title: "CG site",
      description:
        "Corporate website for CG company featuring modern design, interactive elements, and optimized performance for better user experience.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      demo: "https://cg-site.com",
    },
    {
      title: "CG dealer",
      description:
        "Dealer management system with advanced features for inventory management, customer relations, and business analytics.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      demo: "https://cg-dealer.com",
    },
    {
      title: "Fernir.co",
      description:
        "Professional business website with modern design, responsive layout, and integrated contact forms. Built for optimal performance and SEO.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
  title: "Developer | Oleksii Chermalykh",
  description: "developer portfolio",
  author: "Oleksii Chermalykh",
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
  subtitle: "My development journey",
  sections: [
    {
      title: "Work Experience",
      items: [
        {
          id: "1",
          title: "Middle Frontend Developer",
          company: "Wandry",
          period: "06/2025 – Present",
          description:
            "Built and maintained cross-platform web applications using React (Next.js) and Vue (Nuxt.js). Optimized performance with code splitting, lazy loading, and component-level caching, improving load times and reducing bundle size.",
          skills: [
            "React",
            "Next.js",
            "Vue",
            "Nuxt.js",
            "Performance Optimization",
            "Code Splitting",
          ],
          type: "work" as const,
        },
        {
          id: "2",
          title: "Junior Frontend Developer",
          company: "Fernir",
          period: "01/2024 – 06/2025",
          description:
            "Implemented secure authentication and authorization systems using JWT and OAuth2, including refresh tokens and route protection. Set up and maintained CI/CD pipelines using GitLab, streamlining deployments and quality checks. Led the development of 3+ internal and client-facing projects.",
          skills: [
            "JWT",
            "OAuth2",
            "CI/CD",
            "GitLab",
            "Vitest",
            "Playwright",
            "Testing",
          ],
          type: "work" as const,
        },
        {
          id: "3",
          title: "Freelance Software Engineer",
          company: "Freelance",
          period: "2023 – 2024",
          description:
            "Implemented new UI features and improved existing components for better user experience. Enhanced UI accessibility and responsiveness using Tailwind CSS, SCSS, and modern design principles.",
          skills: [
            "UI/UX",
            "Tailwind CSS",
            "SCSS",
            "Accessibility",
            "Responsive Design",
          ],
          type: "work" as const,
        },
      ],
    },
    {
      title: "Education",
      items: [
        {
          id: "4",
          title: "Master's degree in Computer Science",
          company: "National University 'Odesa Polytechnic'",
          period: "2024 – 2026",
          description:
            "Advanced studies in computer science with focus on modern software development, artificial intelligence, and advanced algorithms. Specialized in computer science research and development methodologies.",
          skills: [
            "Computer Science",
            "Advanced Algorithms",
            "Artificial Intelligence",
            "Research Methods",
            "Software Architecture",
            "Machine Learning",
          ],
          type: "education" as const,
        },
        {
          id: "5",
          title: "Bachelor's degree in Computer Science",
          company: "IT STEP Computer Academy",
          period: "2019 – 2024",
          description:
            "Comprehensive education in software development, algorithms, data structures, and modern programming practices. Focused on web development, database design, and software engineering principles.",
          skills: [
            "Computer Science",
            "Algorithms",
            "Data Structures",
            "Software Engineering",
            "Web Development",
            "Database Design",
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
