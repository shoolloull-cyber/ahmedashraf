"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import FlowerBurstScene from "@/components/FlowerBurstScene";
import ScrapbookScene from "@/components/ScrapbookScene";
import LetterScene from "@/components/LetterScene";
import ClosingScene from "@/components/ClosingScene";

export default function Home() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [showScenes, setShowScenes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Preload only critical first-screen images
    const images = [
      "/assets/gift-box-before.png",
      "/assets/lovebirds.png",
      "/assets/white-plaid-bg.jpg",
    ];

    let loaded = 0;
    images.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        loaded++;
        if (loaded >= images.length) {
          setTimeout(() => setIsLoading(false), 300);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= images.length) {
          setTimeout(() => setIsLoading(false), 300);
        }
      };
      img.src = src;
    });

    // Fallback timeout - don't wait longer than 1.5s
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleGiftOpened = () => {
    setGiftOpened(true);
    setTimeout(() => setShowScenes(true), 500);
  };

  return (
    <main className={`relative w-full ${!giftOpened ? 'h-screen overflow-hidden' : ''}`}>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0B2046] flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-cairo)] font-bold text-[#D7B36A] tracking-wide text-center px-4">
                تفاصيل ليلة لا تُنسى...
              </h2>
            </motion.div>
            <motion.p
              className="mt-5 text-white/70 text-sm md:text-base font-[family-name:var(--font-cairo)] tracking-[0.25em] font-medium"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              أحمد & نرمين
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 1: Hero with gift box */}
      <HeroScene onGiftOpened={handleGiftOpened} />

      {/* Remaining scenes */}
      <div className="w-full">
        {/* Scene 2: Flower burst wall */}
        <FlowerBurstScene />

        {/* Scene 3: Scrapbook collage */}
        <ScrapbookScene />

        {/* Scene 4: Letter reveal */}
        <LetterScene />

        {/* Scene 5: Closing with cats */}
        <ClosingScene />
      </div>
    </main>
  );
}
