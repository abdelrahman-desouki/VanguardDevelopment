"use client";

import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Unique Designs",
    desc: "We excel in delivering projects that combine architectural creativity with environmental sustainability.",
  },
  {
    title: "Specialized Expertise",
    desc: "Our team includes top experts in real estate development and architectural engineering.",
  },
  {
    title: "Commitment to Quality",
    desc: "We ensure our projects are executed according to the highest global quality standards.",
  },
  {
    title: "Future Vision",
    desc: "We believe in building communities that meet today's needs while preserving resources for the future.",
  },
];

export default function StickyCardsSection() {
  return (
    <section className="relative bg-[#fdfcf5] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Text Column */}
          <div className="lg:sticky lg:top-24">
            <div className="w-full space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                Why Choose Vanguard Development?
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                We solve problems through co–creating digital experiences that
                are as effective as they are enjoyable.
              </p>
            </div>
          </div>

          {/* Cards Column */}
          <div className="mt-12 lg:mt-0 space-y-6 md:space-y-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600 mt-2">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
