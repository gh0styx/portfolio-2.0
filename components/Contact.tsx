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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

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

      const response = await fetch("https://formspree.io/f/mzzkajyo", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setShowModal(true);
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

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative z-10 w-full overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white/90 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.duration }}>
          {CONTACT_DATA.title}
        </motion.h2>

        <motion.p
          className="text-lg text-white/60 text-center mb-24 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: ANIMATION_CONFIG.delay,
          }}>
          {CONTACT_DATA.subtitle}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: ANIMATION_CONFIG.delay * 2,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold mb-8 tracking-tight text-white/90">Send me a message</h3>

            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                ❌ Failed to send message. Please try again or contact me directly.
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              method="POST"
              data-vercel="true"
              data-vercel-honeypot="bot-field"
              className="space-y-6">
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
                  className="block text-xs font-medium tracking-widest uppercase text-white/50 mb-3 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:ring-0 focus:border-white/50 transition-colors ${
                    errors.name ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500/80 ml-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium tracking-widest uppercase text-white/50 mb-3 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:ring-0 focus:border-white/50 transition-colors ${
                    errors.email ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500/80 ml-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium tracking-widest uppercase text-white/50 mb-3 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:ring-0 focus:border-white/50 transition-colors resize-y min-h-[150px] max-h-[300px] ${
                    errors.message ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="What's on your mind?"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500/80 ml-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black rounded-xl font-bold tracking-wide hover:bg-white/90 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            {/* Success Modal */}
            {showModal && (
              <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                  onClick={() => setShowModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-101 w-full max-w-md rounded-3xl border border-white/10 bg-background p-8 shadow-2xl text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <div className="mb-4 text-2xl font-bold text-white tracking-tight">
                    Message Sent
                  </div>
                  <p className="text-white/60 font-light mb-8">
                    Thanks for reaching out! I will get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full px-6 py-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: ANIMATION_CONFIG.delay * 3,
            }}
            className="flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold mb-8 tracking-tight text-white/90">Connections</h3>
            <div className="grid gap-4">
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
                    className="flex justify-between items-center p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-lg text-white/90 tracking-wide">{link.name}</span>
                    </div>
                    <div className="text-sm font-medium tracking-widest uppercase text-white/30 group-hover:text-white/70 transition-colors">
                      Connect
                    </div>
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
