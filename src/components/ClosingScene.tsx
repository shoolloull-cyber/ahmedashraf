"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ClosingScene() {
  return (
    <section className="relative w-full min-h-screen bg-[#f7f5f0] flex flex-col items-center justify-center py-20 px-4 overflow-hidden" dir="ltr">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/white-plaid-bg.jpg"
          alt="خلفية"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Nick on the left edge - Original Position */}
      <motion.div
        className="absolute left-0 bottom-0 w-[40vw] md:w-[25vw] max-w-[350px] z-10 pointer-events-none"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image src="/assets/nick-left.png" alt="نيك" width={400} height={600} className="w-full h-auto object-contain drop-shadow-xl" />
      </motion.div>

      {/* Judy on the right edge - Original Position */}
      <motion.div
        className="absolute right-0 bottom-0 w-[40vw] md:w-[25vw] max-w-[350px] z-10 pointer-events-none"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <Image src="/assets/judy-right.png" alt="جودي" width={400} height={600} className="w-full h-auto object-contain drop-shadow-xl" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col items-center pb-20" dir="rtl">
        {/* Main text */}
        <motion.div
          className="text-center mt-8 md:mt-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-cairo)] font-bold text-[#b92b3a] flex items-center justify-center">
            <span>أحمد</span>
            <motion.svg
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 mx-3 text-[#b92b3a] inline-block drop-shadow-[0_2px_10px_rgba(185,43,58,0.5)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
            <span>نرمين</span>
          </h2>
          <p className="text-xl md:text-2xl font-[family-name:var(--font-cairo)] text-[#5A3E2B] mt-4">
            دايماً وأبداً مع بعض 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
