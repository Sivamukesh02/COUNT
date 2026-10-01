import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../assets/Style/style.css";
import theme1 from "../assets/Image/theme1.mp4";
import theme2 from "../assets/Image/theme2.mp4";

const START = 10;
const R = 70;
const C = 2 * Math.PI * R;

function Proj() {
  const [count, setCount] = useState(START);
  const [running, setRunning] = useState(true);
  const [showSoon, setShowSoon] = useState(false);

  // 1 second-ku oru dhadava count kuraiyum
  useEffect(() => {
    if (!running || count === 0) return;
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [running, count]);

  // count 0 aanadhum 0.9s kazhichu Coming Soon-ku pogum
  useEffect(() => {
    if (count !== 0) return;
    const id = setTimeout(() => setShowSoon(true), 900);
    return () => clearTimeout(id);
  }, [count]);

  const reset = () => {
    setCount(START);
    setRunning(true);
    setShowSoon(false);
  };

  const spin = (duration, reverse = false) => ({
    animate: { rotate: reverse ? -360 : 360 },
    transition: { duration, repeat: Infinity, ease: "linear" },
  });

  const finished = count === 0;

  return (
    <div className="nc-root">
      {/* Background video: page-ku thagunda maari maarum, infinite loop */}
      <video
        key={showSoon ? "theme2" : "theme1"}
        className="nc-video"
        src={showSoon ? theme2 : theme1}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="nc-overlay" />

      {showSoon ? (
        /* ---------- COMING SOON PAGE (theme2) ---------- */
        <motion.div
          className="cs-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="cs-title cs-cyan">COMING</h1>
          <h1 className="cs-title cs-pink">SOON</h1>
          <p className="cs-text">
            System synchronization complete. The next phase is initializing.
          </p>
          <button className="cs-btn" onClick={reset}>
            ↺ RE-INITIALIZE SYSTEM
          </button>
        </motion.div>
      ) : (
        /* ---------- COUNTDOWN PAGE (theme1) ---------- */
        <div className="lc-card">
          <h1 className="lc-title">LOADER COUNTDOWN</h1>
          <p className="lc-sub">NEURAL TIMER SUBSYSTEM</p>

          <div className="lc-ring-wrap">
            {/* Layer 1: outer cyan arc + top dot (clockwise, slow) */}
            <motion.svg className="lc-ring" viewBox="0 0 200 200" {...spin(12)}>
              <circle cx="100" cy="100" r="96" className="lc-thin" strokeDasharray="140 470" />
              <circle cx="100" cy="4" r="3.5" className="lc-dot" />
            </motion.svg>

            {/* Layer 2: faint full ring + 2 pink dots (anti-clockwise) */}
            <motion.svg className="lc-ring" viewBox="0 0 200 200" {...spin(9, true)}>
              <circle cx="100" cy="100" r="88" className="lc-faint" />
              <circle cx="12" cy="100" r="3" className="lc-dot lc-dot-pink" />
              <circle cx="140" cy="176" r="3" className="lc-dot lc-dot-pink" />
            </motion.svg>

            {/* Layer 3: pink arc (clockwise, medium) */}
            <motion.svg className="lc-ring" viewBox="0 0 200 200" {...spin(6)}>
              <circle cx="100" cy="100" r="82" className="lc-thin lc-pink" strokeDasharray="70 445" />
            </motion.svg>

            {/* Layer 4: inner small arc + dot (anti-clockwise, fast) */}
            <motion.svg className="lc-ring" viewBox="0 0 200 200" {...spin(4, true)}>
              <circle cx="100" cy="100" r="61" className="lc-thin lc-inner" strokeDasharray="60 323" />
              <circle cx="161" cy="100" r="2.5" className="lc-dot" />
            </motion.svg>

            {/* Layer 5: progress ring with gradient */}
            <svg className="lc-ring lc-progress-svg" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="lcGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r={R} className="lc-track" />
              <motion.circle
                cx="100"
                cy="100"
                r={R}
                className="lc-progress"
                stroke="url(#lcGrad)"
                strokeDasharray={C}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: C * (1 - count / START) }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            </svg>

            {/* Glowing head dot at the end of progress arc */}
            <motion.div
              className="lc-head"
              animate={{ rotate: 360 * (count / START) }}
              transition={{ duration: 0.9, ease: "linear" }}
            >
              <span className="lc-head-dot" />
            </motion.div>

            {/* center number */}
            <div className="lc-center">
              <motion.span
                key={count}
                className={`lc-number ${finished ? "lc-done" : ""}`}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {count}
              </motion.span>
            </div>
          </div>

          <div className="lc-btns">
            <button
              className="lc-btn"
              onClick={() => setRunning((r) => !r)}
              disabled={finished}
            >
              {running ? "❚❚ PAUSE" : "▶ RESUME"}
            </button>
            <button className="lc-btn lc-btn-reset" onClick={reset}>
              ↺ RESET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proj;