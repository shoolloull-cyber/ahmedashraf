"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Sparkles from "./Sparkles";
import TransparentImage from "./TransparentImage";

export default function LetterScene() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#45281a] overflow-hidden flex items-center justify-center py-20">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full paper-texture" />
      </div>

      {/* Parisian Lamp decoration on the left edge (flipped for RTL) */}
      <div className="absolute left-0 top-0 bottom-0 pointer-events-none flex items-end justify-start">
        <TransparentImage
          src="/assets/parisian-lamp.png"
          alt="مصباح"
          className="h-full w-auto max-w-none transform -translate-x-[25%] md:-translate-x-[15%] scale-x-[-1]"
        />
      </div>

      <Sparkles count={15} colors={["#D7B36A", "rgba(255,255,255,0.3)"]} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-4 w-full md:gap-16">
        {/* Envelope */}
        <motion.div
          layout
          className={`relative shrink-0 ${!isOpen ? "cursor-pointer" : ""}`}
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          onTap={() => {
            if (!isOpen) setIsOpen(true);
          }}
        >
          {/* Envelope body */}
          <motion.div
            className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px]"
            whileHover={!isOpen ? { scale: 1.03 } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Envelope image - realistic PNG */}
            <div className="w-full h-full relative overflow-visible">
              <Image
                src="/assets/envelope-transparent.png"
                alt="ظرف"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Wax seal overlay - disappears/breaks when opened */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-20"
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-[#cc0000] to-[#8B0000] shadow-lg flex items-center justify-center border-2 border-[#990000]">
                    <span className="text-[#D7B36A] text-xl font-[family-name:var(--font-cairo)] font-bold">♥</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>

        {/* Letter content - appears when envelope is opened */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              className="mt-8 md:mt-0 w-[95vw] max-w-[480px] md:max-w-[700px] md:w-[700px] relative shrink-0"
              initial={{ opacity: 0, x: -800, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: 800, rotate: 15, scale: 0.8 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Paper clip */}
              <div className="absolute -top-4 left-8 z-30">
                <svg width="30" height="60" viewBox="0 0 30 60">
                  <path
                    d="M15 0 L15 10 C15 15 25 15 25 22 L25 48 C25 55 5 55 5 48 L5 18 C5 13 15 13 15 18 L15 42"
                    fill="none"
                    stroke="#D7B36A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Letter paper */}
              <div className="paper-texture rounded-lg p-6 md:p-10 shadow-2xl relative overflow-hidden bg-[#fdfaf5]" dir="rtl">
                {/* Subtle fold line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#c9b896]/30" />
                
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-between text-sm md:text-lg text-[#8B6E5A]/70 font-[family-name:var(--font-cairo)] mb-6">
                    <span>من: <strong className="text-[#8B6E5A]">أحمد</strong></span>
                    <span>إلى: <strong className="text-[#8B6E5A]">نرمين</strong></span>
                  </div>
                </motion.div>

                {/* Letter body */}
                <motion.div
                  className="space-y-4 md:space-y-6 text-[#5a4a3a] font-[family-name:var(--font-cairo)] text-base md:text-xl leading-loose"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <p className="font-[family-name:var(--font-cairo)] font-bold text-xl md:text-3xl text-[#8B0A1E]">
                    يا أغلى إنسانة في حياتي ♥️
                  </p>
                  <p>
                    الحياة ساعات بتبعت هدايا مش مترتبلها ولا بتبقي عامل حسابها والهدية المرادي جت في إنسانة جميلة غيرت حياتي
                  </p>
                  <p>
                    اهتمت بكل تفاصيلي خلتني حاسس اني بملك الكون
                  </p>
                  <p>
                    شكرا انك بتهوني علي كل صعب
                  </p>
                  <p>
                    شكرا انك كنتي جزأ من رحلة نجاح لسه بنكملها سوا
                  </p>
                  <p>
                    شكرا انك بتستحملي عصبيتي
                  </p>
                  <p className="font-semibold text-[#8B0A1E]">
                    شكرا من كل قلبي علي كل لحظه حلوة عشناها سوا واي لحظه وحشه عدناها سوا ♥️
                  </p>
                </motion.div>

                {/* Decorative hearts */}
                <motion.div
                  className="absolute top-4 left-4 text-[#E9A5B5]/30 text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ♥
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
