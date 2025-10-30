# Email Setup Instructions

## Варианты настройки отправки email

### 1. EmailJS (Рекомендуется для быстрого старта)

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте email service (Gmail, Outlook, etc.)
3. Создайте email template
4. Получите Service ID, Template ID, и Public Key

```bash
npm install @emailjs/browser
```

Обновите `components/Contact.tsx`:

```typescript
import emailjs from "@emailjs/browser";

// В handleSubmit замените fetch на:
const result = await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  "YOUR_PUBLIC_KEY"
);
```

### 2. Resend (Современный сервис)

1. Зарегистрируйтесь на [Resend](https://resend.com/)
2. Получите API ключ
3. Добавьте домен

```bash
npm install resend
```

Обновите `app/api/contact/route.ts`:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "contact@yourdomain.com",
  to: ["your-email@example.com"],
  subject: `New message from ${name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

### 3. Nodemailer с SMTP

```bash
npm install nodemailer
npm install @types/nodemailer
```

Обновите `app/api/contact/route.ts`:

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: "your-email@example.com",
  subject: `New message from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
});
```

### 4. SendGrid

```bash
npm install @sendgrid/mail
```

Обновите `app/api/contact/route.ts`:

```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: "your-email@example.com",
  from: "contact@yourdomain.com",
  subject: `New message from ${name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

## Переменные окружения

Создайте файл `.env.local`:

```env
# Для Resend
RESEND_API_KEY=your_resend_api_key

# Для Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Для SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Ваш email для получения сообщений
CONTACT_EMAIL=your-email@example.com
```

## Рекомендации

1. **EmailJS** - самый простой для начала, работает на клиенте
2. **Resend** - современный, надежный, хорошая документация
3. **Nodemailer** - если у вас есть собственный SMTP сервер
4. **SendGrid** - для enterprise решений

Выберите подходящий вариант и следуйте инструкциям выше!
