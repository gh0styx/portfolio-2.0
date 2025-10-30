# Portfolio 2.0

Современное портфолио разработчика на Next.js с TypeScript, Tailwind CSS, shadcn/ui и Framer Motion.

## 🚀 Технологии

- **Next.js 16** с App Router
- **TypeScript** для типизации
- **Tailwind CSS v4** для стилизации
- **shadcn/ui** для компонентов
- **Framer Motion** для анимаций
- **next-themes** для темной темы

## 📝 Редактирование контента

Все данные портфолио находятся в файле `lib/constants.ts`. Отредактируйте этот файл для изменения:

### Основная информация

```typescript
export const SITE_METADATA = {
  title: "Portfolio | Developer",
  description: "Портфолио разработчика",
  author: "Your Name",
  url: "https://yourportfolio.com",
  image: "/og-image.jpg",
};
```

### Главная секция

```typescript
export const HERO_DATA = {
  title: "Привет, я разработчик",
  subtitle: "Создаю современные веб-приложения...",
  ctaText: "Узнать больше",
};
```

### О себе

```typescript
export const ABOUT_DATA = {
  title: "О себе",
  paragraphs: ["Первый абзац...", "Второй абзац...", "Третий абзац..."],
};
```

### Навыки

```typescript
export const SKILLS_DATA = {
  title: "Навыки",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    // добавьте свои навыки
  ],
};
```

### Проекты

```typescript
export const PROJECTS_DATA = {
  title: "Проекты",
  projects: [
    {
      title: "Название проекта",
      description: "Описание проекта",
      tech: ["React", "TypeScript"],
      github: "https://github.com/username/repo",
      demo: "https://your-demo.com",
    },
    // добавьте свои проекты
  ],
};
```

### Контакты

```typescript
export const CONTACT_DATA = {
  title: "Контакты",
  subtitle: "Свяжитесь со мной...",
  socialLinks: [
    {
      name: "Email",
      href: "mailto:your.email@example.com",
      icon: "Mail",
    },
    {
      name: "GitHub",
      href: "https://github.com/username",
      icon: "Github",
    },
    // добавьте свои контакты
  ],
};
```

## 🎨 Настройка анимаций

В `lib/constants.ts` можно настроить анимации:

```typescript
export const ANIMATION_CONFIG = {
  duration: 0.6, // длительность анимации
  stagger: 0.1, // задержка между элементами
  delay: 0.2, // базовая задержка
};
```

### Анимированный фон Hero секции

```typescript
export const HERO_BACKGROUND_CONFIG = {
  enabled: true, // включить/выключить анимированный фон
  primaryGradient: {
    colors: ["#3b82f6", "#8b5cf6", "#ec4899"], // цвета основного градиента
    opacity: 0.2, // прозрачность
    duration: 8, // скорость анимации (секунды)
  },
  secondaryGradient: {
    colors: ["#06b6d4", "#3b82f6", "#4f46e5"], // цвета вторичного градиента
    opacity: 0.1,
    duration: 12,
  },
  floatingElements: {
    enabled: true, // включить плавающие элементы
    element1: {
      colors: ["#ec4899", "#8b5cf6"],
      size: "w-64 h-64", // размер
      position: "top-1/4 left-1/4", // позиция
      duration: 10, // скорость анимации
    },
    element2: {
      colors: ["#3b82f6", "#06b6d4"],
      size: "w-80 h-80",
      position: "bottom-1/4 right-1/4",
      duration: 14,
    },
  },
};
```

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

## 📁 Структура проекта

```
portfolio-2.0/
├── app/                    # App Router
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Основной layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── About.tsx         # Секция "О себе"
│   ├── Contact.tsx       # Секция "Контакты"
│   ├── Hero.tsx          # Главная секция
│   ├── Navigation.tsx    # Навигация
│   ├── Projects.tsx      # Секция "Проекты"
│   ├── Skills.tsx        # Секция "Навыки"
│   ├── ThemeProvider.tsx # Провайдер темы
│   └── ThemeToggle.tsx   # Переключатель темы
├── lib/                  # Утилиты и константы
│   ├── constants.ts      # Все данные портфолио
│   └── utils.ts          # Вспомогательные функции
└── public/               # Статические файлы
```

## 🎯 Особенности

- ✅ **Адаптивный дизайн** — работает на всех устройствах
- ✅ **Темная/светлая тема** — переключатель в навигации
- ✅ **Плавные анимации** — Framer Motion
- ✅ **SEO оптимизация** — метаданные и Open Graph
- ✅ **Типизация** — полная поддержка TypeScript
- ✅ **Производительность** — оптимизированный код

## 📝 Лицензия

MIT License
