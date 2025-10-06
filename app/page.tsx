"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LetterGlitch from "./components/LetterGlitch";

// Typewriter effect texts
const typewriterTexts = [
  "Learn to code for free",
  "Learn to code with ease",
  "Learn to code for fun",
  "Learn to code to make money",
  "Learn to code to code",
];

const Typewriter = () => {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[textIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length + 1));
      }, 70);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length - 1));
      }, 40);
    } else if (!isDeleting && displayed.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIdx((prev) => (prev + 1) % typewriterTexts.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIdx]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const SlideTabsExample = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Matrix background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      {/* Navbar stays unchanged */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <SlideTabs />
      </div>
      {/* Main landing content */}
      <main
        className="flex flex-col items-start justify-center px-8 md:px-24"
        style={{
          minHeight: "calc(100vh - 100px)",
          position: "relative",
          zIndex: 1,
          marginTop: "120px",
        }}
      >
        <div className="flex items-center bg-white/80 rounded-full px-6 py-2 mb-8 shadow text-gray-800 font-medium text-base">
          <span>🟢 learn coding with ease</span>
        </div>
        {/* Headline */}
        <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Meet Crynox
        </h1>
        {/* Typewriter effect */}
        <h2 className="text-white text-3xl md:text-5xl font-semibold mb-6 h-16">
          <Typewriter />
        </h2>
        <button
          className="px-8 py-4 rounded-xl bg-green-500 text-white font-bold text-xl shadow-md hover:bg-green-600 transition"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          Get Started
        </button>
      </main>
    </div>
  );
};

export default SlideTabsExample;

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav
      className="w-full flex justify-between items-center pt-8 px-8"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
    >
      <div
        className="relative flex w-fit rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-lg p-2"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1px solid rgba(255,255,255,0.18)' }}
      >
        <ul
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
          className="flex gap-2 md:gap-4"
        >
          <Tab setPosition={setPosition}>Home</Tab>
          <Tab setPosition={setPosition}>Pricing</Tab>
          <Tab setPosition={setPosition}>Features</Tab>
          <Tab setPosition={setPosition}>Blog</Tab>
          <Cursor position={position} />
        </ul>
      </div>
      <div className="flex gap-3 items-center">
        <button
          className="px-5 py-2 rounded-xl bg-white/20 text-white font-semibold backdrop-blur-md border border-white/30 shadow-md hover:bg-white/30 transition"
          style={{ boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.17)', border: '1px solid rgba(255,255,255,0.18)' }}
        >
          Log In
        </button>
        <button
          className="px-5 py-2 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-md border border-white/30 shadow-lg hover:bg-green-500 hover:text-white transition"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
}

const Tab = ({ children, setPosition }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-md bg-black md:h-12"
    />
  );
};