"use client";

import { ArrowUpRight, Palette, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const contactLinks = [
  {
    label: "Email",
    value: "estheramuleya3@gmail.com",
    href: "mailto:estheramuleya3@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "(+234) 812 946 0632",
    href: "tel:+2348129460632",
    icon: Phone,
  },
  {
    label: "Instagram",
    value: "instagram.com/kgraphics",
    href: "https://instagram.com",
    icon: Palette,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.description) return;
    setSent(true);
    setForm({ name: "", email: "", description: "" });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink pb-16 pt-0 sm:py-24 md:pb-28 md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[100px]"
      />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger()}
          className="relative"
        >
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-16">
            {/* Left */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-2xl font-bold tracking-tight text-paper sm:text-4xl md:text-5xl"
              >
                Let&apos;s talk about what you&apos;re building.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-md text-sm text-paper/65 md:text-base"
              >
                Tell us about your brand, your event, or your idea, and
                we&apos;ll bring it to life.
              </motion.p>

              <motion.ul
                variants={fadeUp}
                className="mt-8 space-y-4 sm:mt-10 sm:space-y-5"
              >
                {contactLinks.map(({ label, value, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-3 sm:gap-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/20 sm:h-10 sm:w-10">
                        <Icon
                          className="h-4 w-4 text-accent"
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs text-paper/45">{label}</span>
                        <span className="truncate font-display text-sm text-paper transition-colors group-hover:text-accent sm:text-base">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-paper/40 opacity-0 transition-opacity group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right — form */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest text-paper/50">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-paper/10 bg-paper/5 px-4 py-3 text-sm text-paper outline-none transition-colors duration-300 placeholder:text-paper/20 focus:border-accent/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest text-paper/50">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-paper/10 bg-paper/5 px-4 py-3 text-sm text-paper outline-none transition-colors duration-300 placeholder:text-paper/20 focus:border-accent/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-widest text-paper/50">
                  Project Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Tell me what you're building..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-paper/10 bg-paper/5 px-4 py-3 text-sm text-paper outline-none transition-colors duration-300 placeholder:text-paper/20 focus:border-accent/50"
                />
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent"
                >
                  Got it! We&apos;ll get back to you soon.
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                whileTap={{ scale: 0.97 }}
                className="mt-2 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-paper"
              >
                {sent ? "Message sent!" : "Send Message"}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
