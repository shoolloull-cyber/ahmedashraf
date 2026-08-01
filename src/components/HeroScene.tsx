"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "./Sparkles";

interface HeroSceneProps {
  onGiftOpened: () => void;
}

// ===================== FLOWER PARTICLES =====================
interface FlowerParticle {
  x: number;
  y: number;
  delay: number;
  active: boolean;
  imageIndex: number;
  targetX: number;
  targetY: number;
  ease: number;
  size: number;
  targetSize: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  vy: number;
}

function createFlowerParticle(
  x: number, y: number, delay: number, screenW: number, screenH: number
): FlowerParticle {
  return {
    x, y, delay, active: false,
    imageIndex: Math.floor(Math.random() * 3),
    targetX: (Math.random() - 0.5) * (screenW * 1.6) + screenW * 0.5,
    targetY: (Math.random() - 0.5) * (screenH * 1.6) + screenH * 0.5,
    ease: Math.random() * 0.04 + 0.02,
    size: 0,
    targetSize: Math.random() * 160 + 90,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
    opacity: 0,
    vy: 0,
  };
}

function updateFlowerParticle(p: FlowerParticle) {
  if (p.delay > 0) { p.delay--; return; }
  p.active = true;
  p.x += (p.targetX - p.x) * p.ease;
  p.y += (p.targetY - p.y) * p.ease;
  p.size += (p.targetSize - p.size) * 0.06;
  p.rotation += p.rotationSpeed;
  if (p.opacity < 1) p.opacity += 0.1;
}

// ===================== CONFETTI PARTICLES =====================
interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  drag: number;
  opacity: number;
  type: "ribbon" | "circle" | "star" | "streamer";
  wobble: number;
  wobbleSpeed: number;
  life: number;
  maxLife: number;
  scaleX: number;
  twistSpeed: number;
}

const CONFETTI_COLORS = [
  "#FF6B8A", "#FFD700", "#FF69B4", "#00CED1", "#FF4500",
  "#7B68EE", "#FF1493", "#32CD32", "#FF8C00", "#E6E6FA",
  "#F8E5B6", "#D7B36A", "#FF6347", "#87CEEB", "#FFB6C1",
  "#FFA07A", "#98FB98", "#DDA0DD", "#F0E68C", "#ADD8E6",
];

function createConfettiPiece(centerX: number, centerY: number): ConfettiPiece {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const speedMultiplier = isMobile ? 0.6 : 1.0;

  const angle = Math.random() * Math.PI * 2;
  const speed = (8 + Math.random() * 18) * speedMultiplier;
  const types: ConfettiPiece["type"][] = ["ribbon", "ribbon", "ribbon", "circle", "star", "streamer"];

  return {
    x: centerX + (Math.random() - 0.5) * 60,
    y: centerY + (Math.random() - 0.5) * 40,
    vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
    vy: Math.sin(angle) * speed - (6 + Math.random() * 10) * speedMultiplier,
    width: 4 + Math.random() * 10,
    height: 8 + Math.random() * 18,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3,
    gravity: (0.12 + Math.random() * 0.08) * speedMultiplier,
    drag: 0.98 + Math.random() * 0.015,
    opacity: 1,
    type: types[Math.floor(Math.random() * types.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.05 + Math.random() * 0.1,
    life: 0,
    maxLife: 150 + Math.random() * 90,
    scaleX: 1,
    twistSpeed: 0.08 + Math.random() * 0.12,
  };
}

function updateConfettiPiece(p: ConfettiPiece): boolean {
  p.life++;
  if (p.life > p.maxLife) return false;

  p.vy += p.gravity;
  p.vx *= p.drag;
  p.vy *= p.drag;

  p.wobble += p.wobbleSpeed;
  p.x += p.vx + Math.sin(p.wobble) * 1.5;
  p.y += p.vy;

  p.rotation += p.rotationSpeed;

  p.scaleX = Math.sin(p.life * p.twistSpeed);

  if (p.life > p.maxLife * 0.7) {
    p.opacity = 1 - ((p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
  }

  return true;
}

function drawConfettiPiece(ctx: CanvasRenderingContext2D, p: ConfettiPiece) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.opacity);
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(p.scaleX, 1);

  switch (p.type) {
    case "ribbon":
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width * 0.4, p.height);
      break;

    case "circle":
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.arc(-p.width * 0.15, -p.width * 0.15, p.width * 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "star": {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const spikes = 5;
      const outerR = p.width * 0.6;
      const innerR = p.width * 0.25;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / spikes - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "streamer":
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -p.height);
      ctx.quadraticCurveTo(p.width * 2, -p.height * 0.3, 0, p.height * 0.5);
      ctx.quadraticCurveTo(-p.width * 1.5, p.height, 0, p.height * 1.5);
      ctx.stroke();
      break;
  }

  ctx.restore();
}

// ===================== COMPONENT =====================
export default function HeroScene({ onGiftOpened }: HeroSceneProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showHappyBirthday, setShowHappyBirthday] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [boxFading, setBoxFading] = useState(false);
  const [boxHidden, setBoxHidden] = useState(false);

  // Elegant text
  const FULL_TYPING_TEXT = "لسه بختارك كل يوم";
  const [typedText, setTypedText] = useState("");

  // Flower refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowerParticlesRef = useRef<FlowerParticle[]>([]);
  const flowerAnimRef = useRef<number>(0);
  const flowerImagesRef = useRef<HTMLImageElement[]>([]);
  const isFallingRef = useRef(false);

  // Confetti refs
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const confettiAnimRef = useRef<number>(0);
  const confettiFiredRef = useRef(false);

  const TOTAL_TYPING_TIME = (FULL_TYPING_TEXT.length * 120) + 300;

  // Connected Arabic Typewriter effect
  useEffect(() => {
    if (!showHappyBirthday) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= FULL_TYPING_TEXT.length) {
        setTypedText(FULL_TYPING_TEXT.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [showHappyBirthday]);

  // Show initial title text
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Preload ALL images in advance instantly to guarantee ZERO first-tap lag/freeze on mobile!
  useEffect(() => {
    const srcs = [
      "/assets/flower1.png",
      "/assets/flower2.png",
      "/assets/flower3.png",
      "/assets/gift-box-after.png",
      "/assets/gift-box-before.png"
    ];
    const loaded: HTMLImageElement[] = [];
    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      loaded.push(img);
    });
    flowerImagesRef.current = loaded.slice(0, 3);
  }, []);

  // Canvas resize for flowers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Canvas resize for confetti
  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Flower explosion animation loop
  const animateFlowers = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles = flowerParticlesRef.current;
    const images = flowerImagesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      updateFlowerParticle(p);
      if (isFallingRef.current) {
        p.vy += 0.8 + Math.random() * 0.5;
        p.y += p.vy;
      }
      if (!p.active) continue;
      ctx.save();
      ctx.globalAlpha = Math.min(p.opacity, 1);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const img = images[p.imageIndex];
      if (img && img.complete) ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
    flowerAnimRef.current = requestAnimationFrame(animateFlowers);
  }, []);

  // Confetti animation loop
  const animateConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pieces = confettiRef.current;
    confettiRef.current = pieces.filter((p) => updateConfettiPiece(p));

    for (const p of confettiRef.current) {
      drawConfettiPiece(ctx, p);
    }

    if (confettiRef.current.length > 0) {
      confettiAnimRef.current = requestAnimationFrame(animateConfetti);
    }
  }, []);

  // Fire confetti burst
  const fireConfetti = useCallback(() => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.55;

    const isMobile = window.innerWidth < 768;
    const burstCount = isMobile ? 80 : 150;

    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < burstCount; i++) {
      pieces.push(createConfettiPiece(centerX, centerY));
    }
    confettiRef.current = pieces;
    animateConfetti();
  }, [animateConfetti]);

  // Trigger confetti when cat appears
  useEffect(() => {
    if (showCat) {
      fireConfetti();
    }
  }, [showCat, fireConfetti]);

  // Show lovebirds after typing finishes
  useEffect(() => {
    if (!showHappyBirthday) return;
    const timer = setTimeout(() => setShowCat(true), TOTAL_TYPING_TIME);
    return () => clearTimeout(timer);
  }, [showHappyBirthday, TOTAL_TYPING_TIME]);

  const handleGiftClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    const boxEl = document.getElementById("hero-gift-box");
    const startX = boxEl
      ? boxEl.getBoundingClientRect().left + boxEl.getBoundingClientRect().width / 2
      : window.innerWidth / 2;
    const startY = boxEl
      ? boxEl.getBoundingClientRect().top + boxEl.getBoundingClientRect().height / 2
      : window.innerHeight / 2;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // RICH & FULL FLOWER EXPLOSION (500 dense beautiful flowers!)
    const particleCount = 500;

    const particles: FlowerParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createFlowerParticle(startX, startY, Math.floor(Math.random() * 50), screenW, screenH));
    }
    flowerParticlesRef.current = particles;
    animateFlowers();

    // Start fading box and make flowers fall at 3.8s
    setTimeout(() => {
      setBoxFading(true);
      isFallingRef.current = true;
    }, 3800);

    // Hide flowers and box at 4.8s, THEN start typing
    setTimeout(() => {
      setBoxHidden(true);
      cancelAnimationFrame(flowerAnimRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setShowHappyBirthday(true);
    }, 4800);

    setTimeout(() => {
      onGiftOpened();
      setTimeout(() => {
        const scrollOffset = window.innerWidth < 768 ? 50 : 250;
        window.scrollTo({ top: window.innerHeight + scrollOffset, behavior: "smooth" });
      }, 100);
    }, 4800 + TOTAL_TYPING_TIME + 600);
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B2046]">
      <Sparkles count={20} colors={["rgba(215,179,106,0.4)", "rgba(255,255,255,0.2)"]} />

      {/* Canvas for flower explosion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 30 }}
      />

      {/* Canvas for confetti explosion */}
      <canvas
        ref={confettiCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 50 }}
      />

      {/* Original Interactive Gift Box (before -> after opening effect) */}
      {!boxHidden && (
        <div
          className="relative z-20 cursor-pointer flex flex-col items-center w-full px-2"
          onClick={handleGiftClick}
          style={{
            opacity: boxFading ? 0 : 1,
            transform: boxFading ? "translateY(100vh)" : "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.2s ease-in",
          }}
        >
          {/* Box Image that opens from before to after */}
          <motion.img
            id="hero-gift-box"
            src={isClicked ? "/assets/gift-box-after.png" : "/assets/gift-box-before.png"}
            alt="صندوق الهدايا"
            className="w-[210px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto object-contain relative drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
            animate={
              !isClicked
                ? { x: [1, -2, -4, 4, 2, -2, -4, 4, -2, 2, 2], y: [1, -3, 0, 3, -2, 3, 2, 2, -2, 3, -3], rotate: [0, -1, 2, 0, 2, -1, 0, -2, 2, 0, -1] }
                : { scale: [0.9, 1], y: [10, 0] }
            }
            transition={
              !isClicked
                ? { duration: 1.5, repeat: Infinity, ease: "linear" }
                : { duration: 0.5, ease: "backOut" }
            }
          />
        </div>
      )}

      {/* Arabic Hero Text with Elegant Pulsing Heart SVG */}
      <AnimatePresence>
        {showText && !isClicked && (
          <motion.h1
            className="mt-6 md:mt-10 text-3xl sm:text-5xl md:text-6xl font-[family-name:var(--font-cairo)] text-white/95 text-center w-full px-4 z-20 font-bold flex items-center justify-center"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span>أحمد</span>
            {/* Ultra Elegant Red Glowing Heart SVG */}
            <motion.svg
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 mx-3 text-[#ff2a5f] inline-block drop-shadow-[0_0_15px_rgba(255,42,95,0.8)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
            <span>نرمين</span>
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Connected Typewriter text - Arabic */}
      <AnimatePresence>
        {showHappyBirthday && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
              {/* Connected Arabic Typewriter text: "أجمل حكاية حب ♥️" */}
              <div
                className="text-3xl sm:text-5xl md:text-6xl font-[family-name:var(--font-cairo)] font-bold text-[#f8e5b6] text-center"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
                dir="rtl"
              >
                <span>{typedText}</span>
                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-[3px] h-[0.9em] bg-[#f8e5b6] mr-1.5 align-middle"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>

               {/* Lovebirds image & today's date */}
              <AnimatePresence>
                {showCat && (
                  <motion.div
                    className="flex flex-col justify-center items-center relative"
                    initial={{ opacity: 0, scale: 0, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 120,
                      damping: 10,
                    }}
                  >
                    {/* Glow behind lovebirds */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
                        width: "280px", height: "280px",
                      }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <img
                      src="/assets/lovebirds.png"
                      alt="عصافير الحب"
                      className="w-[130px] h-auto sm:w-[160px] md:w-[210px] lg:w-[250px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative z-10"
                    />
                    {/* Today's Date */}
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-cairo)] font-bold text-[#D7B36A] tracking-[0.25em] mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] z-10 relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      ٠١ . ٠٨ . ٢٠٢٦
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
