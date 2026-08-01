"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function FlowerBurstScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const stringY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Crumpled red paper background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/red-paper-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Subtle radial glow overlays */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(215,179,106,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(233,165,181,0.06) 0%, transparent 50%)"
        }}
      />

      {/* Decorative Cherries - Left side */}
      <motion.div
        className="absolute top-[40%] left-[2%] md:top-[30%] md:left-[5%] z-[3] pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: [-5, 5, -5] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/assets/cherries.png"
          alt="ديكور كرز"
          width={160}
          height={160}
          className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Decorative Flower Bouquet - Right side */}
      <motion.div
        className="absolute top-[45%] right-[2%] md:top-[35%] md:right-[5%] z-[3] pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: 15 }}
        whileInView={{ opacity: 1, scale: 1, rotate: [10, -2, 10] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6, rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/assets/flower-bouquet-deco.png"
          alt="ديكور باقة ورد"
          width={170}
          height={170}
          className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[210px] lg:h-[210px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen py-24 flex flex-col justify-center items-center">
        
        {/* Header and Camera Container */}
        <div className="relative w-full px-4 md:px-20 pt-16 md:pt-20 flex flex-col md:flex-row items-center justify-center md:justify-around gap-10 z-20">
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-cairo)] font-bold text-white/90"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              لحظاتنا الحلوة ♥️
            </h2>
            <p className="text-[#D7B36A] font-[family-name:var(--font-cairo)] mt-2 tracking-widest text-sm">
              أحمد و نرمين - ذكريات من القلب
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/flower-camera.png"
                alt="كاميرا بالورد"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Clothesline Container */}
        <motion.div 
          className="relative w-full max-w-[1280px] mx-auto mt-12 md:mt-16 pb-12"
          style={{ y: stringY }}
        >
          {/* Top String/Rope */}
          <svg className="absolute top-0 left-0 w-full h-24 pointer-events-none hidden md:block" preserveAspectRatio="none" viewBox="0 0 1000 120">
            <path d="M -20 10 Q 250 80 500 95 Q 750 80 1020 10" fill="none" stroke="#D7B36A" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
            <path d="M -20 12 Q 250 82 500 97 Q 750 82 1020 12" fill="none" stroke="#c9a050" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
          </svg>

          {/* Photos hanging from string */}
          <div className="relative w-full flex flex-wrap lg:flex-nowrap justify-center items-start px-2 sm:px-4 md:px-6 gap-6 sm:gap-8 md:gap-8 lg:gap-6 pt-4">
            
            {/* Photo 1 - الصورة الأولى */}
            <motion.div
              className="relative w-[230px] h-[300px] sm:w-[260px] sm:h-[340px] lg:w-[270px] lg:h-[350px] shrink-0 mt-2 lg:mt-4"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: -5, opacity: 0, y: -30 }}
              whileInView={{ rotate: [-2, 2, -2], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Wooden clothespin */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>
              
              {/* Polaroid frame */}
              <div className="w-full h-full bg-white p-3 pb-12 sm:p-4 sm:pb-16 shadow-2xl rounded-sm border border-gray-100 flex flex-col justify-between">
                <div className="w-full flex-1 bg-[#fdf5e6] rounded-sm overflow-hidden relative border border-gray-200">
                  <Image
                    src="/assets/photo1.jpg"
                    alt="أحمد ونرمين"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-center text-[#8B6E5A] font-[family-name:var(--font-cairo)] text-sm sm:text-base font-medium" dir="rtl">
                  أحلى ثنائي في الدنيا 💕
                </p>
              </div>
            </motion.div>

            {/* Photo 2 - الصورة الثانية */}
            <motion.div
              className="relative w-[230px] h-[300px] sm:w-[260px] sm:h-[340px] lg:w-[270px] lg:h-[350px] shrink-0 mt-2 lg:mt-12"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: 4, opacity: 0, y: -30 }}
              whileInView={{ rotate: [2, -2, 2], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Wooden clothespin */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>
              
              <div className="w-full h-full bg-white p-3 pb-12 sm:p-4 sm:pb-16 shadow-2xl rounded-sm border border-gray-100 flex flex-col justify-between">
                <div className="w-full flex-1 bg-[#fdf5e6] rounded-sm overflow-hidden relative border border-gray-200">
                  <Image
                    src="/assets/photo2.jpg"
                    alt="أحمد ونرمين"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-center text-[#8B6E5A] font-[family-name:var(--font-cairo)] text-sm sm:text-base font-medium" dir="rtl">
                  ليالي حلوة وضحكات ما تنتهيش 🌙
                </p>
              </div>
            </motion.div>

            {/* Photo 3 - الصورة الثالثة */}
            <motion.div
              className="relative w-[230px] h-[300px] sm:w-[260px] sm:h-[340px] lg:w-[270px] lg:h-[350px] shrink-0 mt-2 lg:mt-4"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: -3, opacity: 0, y: -30 }}
              whileInView={{ rotate: [-1, 2, -1], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, rotate: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Wooden clothespin */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>
              
              <div className="w-full h-full bg-white p-3 pb-12 sm:p-4 sm:pb-16 shadow-2xl rounded-sm border border-gray-100 flex flex-col justify-between">
                <div className="w-full flex-1 bg-[#fdf5e6] rounded-sm overflow-hidden relative border border-gray-200">
                  <Image
                    src="/assets/photo3.jpg"
                    alt="أحمد ونرمين"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-center text-[#8B6E5A] font-[family-name:var(--font-cairo)] text-sm sm:text-base font-medium" dir="rtl">
                  البحر والسما وانتي جنبي 🌊💙
                </p>
              </div>
            </motion.div>

            {/* Photo 4 - الصورة الرابعة */}
            <motion.div
              className="relative w-[230px] h-[300px] sm:w-[260px] sm:h-[340px] lg:w-[270px] lg:h-[350px] shrink-0 mt-2 lg:mt-10"
              style={{ transformOrigin: "top center" }}
              initial={{ rotate: 4, opacity: 0, y: -30 }}
              whileInView={{ rotate: [3, -1, 3], opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Wooden clothespin */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 scale-125">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <rect x="3" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="14" y="0" width="7" height="28" rx="2" fill="#c4a06a" />
                  <rect x="3" y="8" width="18" height="6" rx="1" fill="#a88050" />
                  <circle cx="12" cy="11" r="2" fill="#8a6030" />
                </svg>
              </div>
              
              <div className="w-full h-full bg-white p-3 pb-12 sm:p-4 sm:pb-16 shadow-2xl rounded-sm border border-gray-100 flex flex-col justify-between">
                <div className="w-full flex-1 bg-[#fdf5e6] rounded-sm overflow-hidden relative border border-gray-200">
                  <Image
                    src="/assets/photo4.jpg"
                    alt="أحمد ونرمين"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-center text-[#8B6E5A] font-[family-name:var(--font-cairo)] text-sm sm:text-base font-medium" dir="rtl">
                  مغامرات مع بعض لآخر الدنيا 🏔️✨
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
