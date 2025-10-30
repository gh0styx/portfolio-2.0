"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, Briefcase } from "lucide-react";
import { CONTACT_DATA, ANIMATION_CONFIG } from "@/lib/constants";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formElement = formRef.current;
      if (!formElement) {
        throw new Error("Form not found");
      }
      const formDataToSend = new FormData(formElement);

      // POST to the same route – Vercel Forms will capture it (data-vercel="true")
      const response = await fetch("/", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setShowModal(true);
        // auto-close modal after 4s
        setTimeout(() => setShowModal(false), 4000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          {CONTACT_DATA.title}
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: ANIMATION_CONFIG.delay,
          }}>
          {CONTACT_DATA.subtitle}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: ANIMATION_CONFIG.delay * 2,
            }}>
            <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

            {/* Status Messages */}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
                ❌ Failed to send message. Please try again or contact me
                directly.
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              // stay on page; Vercel Forms captures POST
              method="POST"
              data-vercel="true"
              data-vercel-honeypot="bot-field"
              className="space-y-6">
              {/* Vercel Forms: form name and honeypot */}
              <input type="hidden" name="formName" value="contact" />
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-card border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-card border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-card border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${
                    errors.message ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Tell me about your project or just say hello!"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
            {/* Success Modal */}
            {showModal && (
              <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-101 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
                  <div className="mb-4 text-xl font-semibold">
                    Thanks for submitting!
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Your message has been sent successfully. I will get back to
                    you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: ANIMATION_CONFIG.delay * 3,
            }}>
            <h3 className="text-2xl font-bold mb-6">Or reach out directly</h3>
            <div className="space-y-4">
              {CONTACT_DATA.socialLinks.map((link) => {
                const Icon =
                  link.icon === "Github"
                    ? Github
                    : link.icon === "Linkedin"
                    ? Linkedin
                    : link.icon === "Upwork"
                    ? Briefcase
                    : Mail;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
