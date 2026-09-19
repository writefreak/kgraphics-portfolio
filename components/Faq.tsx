"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQS = [
  {
    question: "Do you work with both new and existing brands?",
    answer:
      "Yes. We work with both new businesses building their brand from the ground up and existing brands that need to refine, reposition or strengthen their visual presence and communication.",
  },
  {
    question: "How do you approach a design project?",
    answer:
      "Every project begins with understanding the client's goals, audience, brand and specific challenge. From there, we develop the appropriate creative direction, explore concepts and refine the design based on the project requirements. For digital product projects, the process can also include research, user flows, wireframing, interface design and prototyping.",
  },
  {
    question: "What do I need to provide before we begin?",
    answer:
      "The requirements depend on the project, but generally we need information about your business, goals, target audience, existing brand assets and the specific problem you want the design to solve. For digital product projects, additional information about the product, users and functionality may be required.",
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Yes. Not every business needs the same combination of services, so we can create a tailored package based on the scope, goals and requirements of the project.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines vary depending on the type and scope of the work. A simple design project may take a few days, while branding and digital product projects typically require more time because of the strategy, development and refinement involved. A clear timeline will be provided before the project begins.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="pb-26 md:pb-27">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-balance text-center text-3xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Frequently Asked Questions
        </motion.h2>

        <Accordion
          type="single"
          collapsible
          className="mt-12 flex flex-col gap-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="overflow-hidden rounded-xl bg-ink px-6 transition-colors duration-200 hover:border-ink/30 data-[state=open]:border-ink/30"
              >
                <AccordionTrigger className="py-5 text-left md:text-base text-sm font-semibold text-white hover:no-underline [&>svg]:text-white [&>svg]:h-5 [&>svg]:w-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-xs md:text-sm leading-relaxed text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
