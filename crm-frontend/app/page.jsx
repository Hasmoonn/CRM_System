"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Zap,
  BarChart3,
  Target,
  Bell,
  Users,
  Smartphone,
  ArrowRight,
  ChevronDown,
  Star,
  Shield,
  Clock,
  TrendingUp,
  PieChart,
  Layers,
  GitBranch,
  Rocket,
  CheckCircle2,
  ArrowUpRight,
  Play,
  Globe,
  Lock,
  Mail,
} from "lucide-react";

// ══════════════════════════════════════════════════════════
// ── ANIMATED BACKGROUND ──
// ══════════════════════════════════════════════════════════
function AnimatedBackground() {
  const { scrollYProgress } = useScroll();

  // Smooth spring-based scroll for parallax
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax transforms for different layers
  const layer1Y = useTransform(smoothScroll, [0, 1], [0, -300]);
  const layer2Y = useTransform(smoothScroll, [0, 1], [0, -180]);
  const layer3Y = useTransform(smoothScroll, [0, 1], [0, -100]);
  const layer4Y = useTransform(smoothScroll, [0, 1], [0, -450]);

  // Opacity changes with scroll
  const topFade = useTransform(smoothScroll, [0, 0.1], [0.8, 0.3]);
  const midFade = useTransform(smoothScroll, [0.2, 0.5, 0.8], [0.3, 0.7, 0.3]);

  // Vertical lines configuration
  const verticalLines = [
    {
      left: "4%",
      height: "120vh",
      speed: layer1Y,
      opacity: 0.04,
      width: "1px",
      delay: 0,
    },
    {
      left: "8%",
      height: "140vh",
      speed: layer2Y,
      opacity: 0.06,
      width: "1px",
      delay: 0.3,
    },
    {
      left: "12%",
      height: "90vh",
      speed: layer3Y,
      opacity: 0.03,
      width: "1px",
      delay: 0.6,
    },
    {
      left: "18%",
      height: "160vh",
      speed: layer1Y,
      opacity: 0.05,
      width: "1px",
      delay: 0.2,
    },
    {
      left: "24%",
      height: "110vh",
      speed: layer4Y,
      opacity: 0.04,
      width: "1px",
      delay: 0.8,
    },
    {
      left: "30%",
      height: "130vh",
      speed: layer2Y,
      opacity: 0.06,
      width: "1px",
      delay: 0.1,
    },
    {
      left: "38%",
      height: "100vh",
      speed: layer3Y,
      opacity: 0.03,
      width: "1px",
      delay: 0.5,
    },
    {
      left: "44%",
      height: "150vh",
      speed: layer1Y,
      opacity: 0.05,
      width: "1px",
      delay: 0.7,
    },
    {
      left: "52%",
      height: "120vh",
      speed: layer4Y,
      opacity: 0.04,
      width: "1px",
      delay: 0.4,
    },
    {
      left: "58%",
      height: "140vh",
      speed: layer2Y,
      opacity: 0.06,
      width: "1px",
      delay: 0.9,
    },
    {
      left: "66%",
      height: "95vh",
      speed: layer3Y,
      opacity: 0.03,
      width: "1px",
      delay: 0.2,
    },
    {
      left: "72%",
      height: "160vh",
      speed: layer1Y,
      opacity: 0.05,
      width: "1px",
      delay: 0.6,
    },
    {
      left: "78%",
      height: "110vh",
      speed: layer4Y,
      opacity: 0.04,
      width: "1px",
      delay: 0.3,
    },
    {
      left: "84%",
      height: "130vh",
      speed: layer2Y,
      opacity: 0.06,
      width: "1px",
      delay: 0.8,
    },
    {
      left: "90%",
      height: "100vh",
      speed: layer3Y,
      opacity: 0.03,
      width: "1px",
      delay: 0.1,
    },
    {
      left: "96%",
      height: "145vh",
      speed: layer1Y,
      opacity: 0.05,
      width: "1px",
      delay: 0.5,
    },
  ];

  // Horizontal connector lines
  const horizontalLines = [
    {
      top: "15vh",
      left: "8%",
      width: "10%",
      speed: layer2Y,
      opacity: 0.04,
      delay: 1.0,
    },
    {
      top: "28vh",
      left: "30%",
      width: "14%",
      speed: layer3Y,
      opacity: 0.03,
      delay: 1.3,
    },
    {
      top: "42vh",
      left: "58%",
      width: "8%",
      speed: layer1Y,
      opacity: 0.05,
      delay: 1.6,
    },
    {
      top: "55vh",
      left: "18%",
      width: "12%",
      speed: layer4Y,
      opacity: 0.03,
      delay: 0.8,
    },
    {
      top: "68vh",
      left: "72%",
      width: "12%",
      speed: layer2Y,
      opacity: 0.04,
      delay: 1.1,
    },
    {
      top: "82vh",
      left: "44%",
      width: "10%",
      speed: layer3Y,
      opacity: 0.05,
      delay: 1.4,
    },
  ];

  // Intersection dots
  const dots = [
    { left: "8%", top: "15vh", speed: layer2Y, delay: 1.5 },
    { left: "18%", top: "55vh", speed: layer4Y, delay: 1.8 },
    { left: "30%", top: "28vh", speed: layer3Y, delay: 2.0 },
    { left: "44%", top: "82vh", speed: layer3Y, delay: 2.3 },
    { left: "52%", top: "42vh", speed: layer4Y, delay: 1.6 },
    { left: "58%", top: "42vh", speed: layer1Y, delay: 2.1 },
    { left: "72%", top: "68vh", speed: layer2Y, delay: 1.9 },
    { left: "84%", top: "35vh", speed: layer2Y, delay: 2.4 },
    { left: "90%", top: "75vh", speed: layer3Y, delay: 1.7 },
  ];

  // Floating data markers
  const markers = [
    { left: "6%", top: "22vh", text: "001", speed: layer1Y, delay: 2.5 },
    { left: "25%", top: "45vh", text: "024", speed: layer4Y, delay: 2.8 },
    { left: "48%", top: "18vh", text: "096", speed: layer2Y, delay: 3.0 },
    { left: "68%", top: "58vh", text: "042", speed: layer3Y, delay: 3.2 },
    { left: "88%", top: "32vh", text: "108", speed: layer1Y, delay: 3.4 },
    { left: "15%", top: "78vh", text: "073", speed: layer2Y, delay: 2.6 },
    { left: "75%", top: "85vh", text: "057", speed: layer4Y, delay: 3.1 },
    { left: "40%", top: "92vh", text: "089", speed: layer3Y, delay: 2.9 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Base gradient ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(180deg,
              rgba(250,251,252,1) 0%,
              rgba(241,245,249,0.6) 30%,
              rgba(248,250,252,0.8) 60%,
              rgba(241,245,249,0.6) 80%,
              rgba(250,251,252,1) 100%
            )
          `,
        }}
      />

      {/* ── Animated gradient orbs (parallax) ── */}
      <motion.div
        style={{ y: layer1Y }}
        animate={{ x: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            top: "-10%",
            right: "-15%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: layer2Y }}
        animate={{ x: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            top: "30%",
            left: "-10%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: layer3Y }}
        animate={{ x: [0, 20, -15, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            top: "65%",
            right: "15%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* ── Vertical lines with scroll parallax ── */}
      {verticalLines.map((line, i) => (
        <motion.div
          key={`vl-${i}`}
          style={{ y: line.speed }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 2,
            delay: line.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            style={{
              position: "absolute",
              left: line.left,
              top: "-10%",
              height: line.height,
              width: line.width,
              transformOrigin: "top",
              overflow: "hidden",
            }}
          >
            {/* Static gradient line */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg,
                  transparent 0%,
                  rgba(5,150,105,${line.opacity * 0.5}) 15%,
                  rgba(5,150,105,${line.opacity}) 30%,
                  rgba(5,150,105,${line.opacity}) 70%,
                  rgba(5,150,105,${line.opacity * 0.5}) 85%,
                  transparent 100%
                )`,
              }}
            />

            {/* Running shimmer pulse */}
            <motion.div
              animate={{ y: ["-120%", "220%"] }}
              transition={{
                duration: 5 + (i % 4) * 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: line.delay + 2,
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "20%",
                background: `linear-gradient(180deg,
                  transparent 0%,
                  rgba(5,150,105,${line.opacity * 4}) 40%,
                  rgba(5,150,105,${line.opacity * 6}) 50%,
                  rgba(5,150,105,${line.opacity * 4}) 60%,
                  transparent 100%
                )`,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* ── Horizontal connector lines ── */}
      {horizontalLines.map((line, i) => (
        <motion.div
          key={`hl-${i}`}
          style={{ y: line.speed }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: line.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            style={{
              position: "absolute",
              top: line.top,
              left: line.left,
              width: line.width,
              height: "1px",
              transformOrigin: "left",
              background: `linear-gradient(90deg,
                rgba(5,150,105,${line.opacity}) 0%,
                rgba(5,150,105,${line.opacity * 0.5}) 50%,
                transparent 100%
              )`,
            }}
          />
        </motion.div>
      ))}

      {/* ── Intersection dots ── */}
      {dots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          style={{ y: dot.speed }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: dot.delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <div
            style={{
              position: "absolute",
              left: dot.left,
              top: dot.top,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Breathing glow */}
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.25, 0, 0.25],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: "14px",
                height: "14px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                backgroundColor: "rgba(5,150,105,0.08)",
              }}
            />
            {/* Core dot */}
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                backgroundColor: "rgba(5,150,105,0.18)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* ── Data markers ── */}
      {markers.map((marker, i) => (
        <motion.div
          key={`marker-${i}`}
          style={{ y: marker.speed }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: marker.delay }}
        >
          <div
            style={{
              position: "absolute",
              left: marker.left,
              top: marker.top,
            }}
          >
            <motion.span
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "10px",
                fontFamily:
                  "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
                fontWeight: 500,
                color: "#059669",
                letterSpacing: "0.12em",
                userSelect: "none",
              }}
            >
              {marker.text}
            </motion.span>
          </div>
        </motion.div>
      ))}

      {/* ── Diamond shapes ── */}
      {[
        { left: "20%", top: "40vh", size: 6, speed: layer4Y, delay: 2.0 },
        { left: "65%", top: "25vh", size: 8, speed: layer2Y, delay: 2.5 },
        { left: "42%", top: "70vh", size: 5, speed: layer3Y, delay: 3.0 },
        { left: "85%", top: "55vh", size: 7, speed: layer1Y, delay: 2.2 },
        { left: "10%", top: "85vh", size: 6, speed: layer4Y, delay: 2.8 },
      ].map((diamond, i) => (
        <motion.div
          key={`diamond-${i}`}
          style={{ y: diamond.speed }}
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: 45 }}
          transition={{
            duration: 0.6,
            delay: diamond.delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <div
            style={{
              position: "absolute",
              left: diamond.left,
              top: diamond.top,
            }}
          >
            <motion.div
              animate={{ rotate: [45, 90, 45], scale: [1, 1.15, 1] }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: `${diamond.size}px`,
                height: `${diamond.size}px`,
                backgroundColor: "rgba(5,150,105,0.08)",
                border: "0.5px solid rgba(5,150,105,0.1)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* ── Cross markers ── */}
      {[
        { left: "35%", top: "20vh", speed: layer1Y, delay: 2.6 },
        { left: "55%", top: "60vh", speed: layer3Y, delay: 3.0 },
        { left: "80%", top: "45vh", speed: layer2Y, delay: 2.3 },
      ].map((cross, i) => (
        <motion.div
          key={`cross-${i}`}
          style={{ y: cross.speed }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 0.5, delay: cross.delay }}
        >
          <div
            style={{
              position: "absolute",
              left: cross.left,
              top: cross.top,
            }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="12"
                  stroke="#059669"
                  strokeWidth="0.8"
                />
                <line
                  x1="0"
                  y1="6"
                  x2="12"
                  y2="6"
                  stroke="#059669"
                  strokeWidth="0.8"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* ── Edge vignettes ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "150px",
          background:
            "linear-gradient(180deg, rgba(250,251,252,1) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "150px",
          background:
            "linear-gradient(0deg, rgba(250,251,252,1) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "80px",
          background:
            "linear-gradient(90deg, rgba(250,251,252,0.8) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "80px",
          background:
            "linear-gradient(270deg, rgba(250,251,252,0.8) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ── REUSABLE COMPONENTS ──
// ══════════════════════════════════════════════════════════

function SectionHeader({ eyebrow, title, highlight, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #059669)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#059669",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {eyebrow}
        </span>
        <div
          style={{
            width: "28px",
            height: "1px",
            background: "linear-gradient(90deg, #059669, transparent)",
          }}
        />
      </div>
      <h2
        style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: "clamp(26px, 5.5vw, 42px)",
          fontWeight: 600,
          color: "#0f172a",
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}
      >
        {title}{" "}
        {highlight && (
          <span
            style={{
              background: "linear-gradient(135deg, #059669 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p
          style={{
            fontSize: "clamp(14px, 2.8vw, 17px)",
            color: "#64748b",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        border: "1.5px solid rgba(226,232,240,0.6)",
        borderRadius: "18px",
        padding: "clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 28px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 25px 60px -12px rgba(5,150,105,0.12), 0 0 0 1px rgba(5,150,105,0.1)";
        e.currentTarget.style.borderColor = "rgba(5,150,105,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(226,232,240,0.6)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          borderRadius: "0 18px 0 100px",
          background:
            "linear-gradient(225deg, rgba(5,150,105,0.04), transparent)",
        }}
      />
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, rgba(5,150,105,0.1), rgba(124,58,237,0.06))",
          border: "1.5px solid rgba(5,150,105,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "22px",
        }}
      >
        <Icon size={22} strokeWidth={1.8} color="#059669" />
      </div>
      <h3
        style={{
          fontSize: "clamp(15px, 2.5vw, 17px)",
          fontWeight: 700,
          color: "#0f172a",
          marginBottom: "10px",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "clamp(12.5px, 2.2vw, 14px)",
          color: "#64748b",
          lineHeight: 1.75,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

function StatCard({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        textAlign: "center",
        padding: "clamp(20px, 4vw, 32px) clamp(12px, 3vw, 20px)",
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.75)",
        border: "1px solid rgba(226,232,240,0.5)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.95)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.75)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(5,150,105,0.1), rgba(124,58,237,0.06))",
          border: "1px solid rgba(5,150,105,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
        }}
      >
        <Icon size={18} strokeWidth={1.8} color="#059669" />
      </div>
      <p
        style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: "clamp(28px, 6vw, 38px)",
          fontWeight: 600,
          color: "#059669",
          marginBottom: "4px",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "clamp(11px, 2vw, 13px)",
          color: "#94a3b8",
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function TestimonialCard({ quote, name, role, company, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        border: "1.5px solid rgba(226,232,240,0.6)",
        borderRadius: "18px",
        padding: "clamp(24px, 4vw, 32px)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 50px -12px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill="#f59e0b"
            color="#f59e0b"
            strokeWidth={0}
          />
        ))}
      </div>
      <p
        style={{
          fontSize: "clamp(13px, 2.5vw, 15px)",
          color: "#334155",
          lineHeight: 1.75,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          marginBottom: "24px",
          fontStyle: "italic",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(226,232,240,0.6)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #059669 0%, #7c3aed 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
            {name}
          </p>
          <p style={{ fontSize: "11px", color: "#94a3b8" }}>
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BenefitItem({ text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "6px",
          backgroundColor: "rgba(5,150,105,0.1)",
          border: "1px solid rgba(5,150,105,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CheckCircle2 size={13} strokeWidth={2.5} color="#059669" />
      </div>
      <span
        style={{
          fontSize: "clamp(13px, 2.5vw, 15px)",
          color: "#334155",
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════
// ── MAIN PAGE ──
// ══════════════════════════════════════════════════════════
export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (user) return null;

  const features = [
    {
      icon: GitBranch,
      title: "Visual Pipeline",
      description:
        "Drag-and-drop lead management with customizable stages. See your entire sales funnel at a glance.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Live dashboards with conversion metrics, revenue forecasting, and team performance tracking.",
    },
    {
      icon: Target,
      title: "Smart Lead Scoring",
      description:
        "AI-powered lead prioritization based on engagement patterns, deal size, and source quality.",
    },
    {
      icon: Bell,
      title: "Intelligent Alerts",
      description:
        "Context-aware notifications for follow-ups, deal stage changes, and critical team updates.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Assign leads, share notes, and track performance across your entire sales organization.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Full-featured responsive design that works beautifully on every device. Manage from anywhere.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "2M+", label: "Leads Managed", icon: Layers },
    { value: "98%", label: "Satisfaction", icon: TrendingUp },
    { value: "3x", label: "Faster Closes", icon: Zap },
  ];

  const testimonials = [
    {
      quote:
        "CRM Pro transformed our pipeline. We closed 40% more deals in Q1. The analytics are incredibly actionable.",
      name: "Sarah Chen",
      role: "VP of Sales",
      company: "TechVision",
    },
    {
      quote:
        "The dashboard gives us insights we never had. Like having a data scientist embedded in our sales team.",
      name: "Marcus Rodriguez",
      role: "Sales Director",
      company: "GrowthLabs",
    },
    {
      quote:
        "Simple, beautiful, and powerful. Our team actually enjoys using this CRM — a first after five platforms.",
      name: "Emily Park",
      role: "CEO",
      company: "Skyward Inc",
    },
  ];

  const benefits = [
    "No credit card required to start",
    "Free 14-day trial with full features",
    "Import from any existing CRM",
    "Cancel anytime, no questions asked",
    "SOC 2 compliant & enterprise-ready",
    "Dedicated onboarding support",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafbfc",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ── Animated Background ── */}
      <AnimatedBackground />

      {/* ── All content sits above background ── */}
      <div style={{ position: "relative", zIndex: 5 }}>
        {/* ══ NAVBAR ══ */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0 clamp(12px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "10px auto 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px clamp(16px, 3vw, 28px)",
              borderRadius: "16px",
              backgroundColor: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(226,232,240,0.45)",
              boxShadow:
                "0 4px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#047857",
                    letterSpacing: "-0.02em",
                  }}
                >
                  CRM Pro
                </span>
              </div>
            </Link>

            <div
              className="nav-desktop"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(20px, 3vw, 36px)",
              }}
            >
              {["Features", "How it works", "Testimonials", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#64748b",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#059669")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#64748b")
                    }
                  >
                    {item}
                  </a>
                ),
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "9px",
                    border: "1.5px solid rgba(226,232,240,0.8)",
                    backgroundColor: "transparent",
                    color: "#334155",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.3)";
                    e.currentTarget.style.color = "#059669";
                    e.currentTarget.style.backgroundColor =
                      "rgba(5,150,105,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(226,232,240,0.8)";
                    e.currentTarget.style.color = "#334155";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/register" className="cta-desktop">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "9px",
                    border: "none",
                    background: "linear-gradient(135deg, #059669, #047857)",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    boxShadow: "0 2px 10px rgba(5,150,105,0.25)",
                  }}
                >
                  Get Started <ArrowRight size={14} strokeWidth={2.5} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* ══ HERO ══ */}
        <motion.section style={{ opacity: heroOpacity, y: heroY }}>
          <div
            style={{
              position: "relative",
              padding:
                "clamp(130px, 22vw, 200px) clamp(16px, 5vw, 48px) clamp(80px, 14vw, 140px)",
              textAlign: "center",
            }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 18px 7px 10px",
                borderRadius: "100px",
                backgroundColor: "rgba(5,150,105,0.06)",
                border: "1px solid rgba(5,150,105,0.12)",
                marginBottom: "28px",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#059669",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#059669",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                Now in Public Beta — Free to try
              </span>
              <ArrowUpRight size={13} color="#059669" strokeWidth={2.5} />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(34px, 7.5vw, 72px)",
                fontWeight: 600,
                color: "#0f172a",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                maxWidth: "860px",
                margin: "0 auto 24px",
              }}
            >
              The modern way to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #059669 0%, #7c3aed 50%, #059669 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                close deals
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                fontSize: "clamp(15px, 3vw, 19px)",
                color: "#64748b",
                lineHeight: 1.7,
                maxWidth: "580px",
                margin: "0 auto clamp(32px, 6vw, 44px)",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Manage leads, track conversions, and grow revenue — all in one
              beautifully crafted platform built for modern sales teams.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/register">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 12px 40px rgba(5,150,105,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "15px 34px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #059669, #047857)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    boxShadow:
                      "0 4px 20px rgba(5,150,105,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Start Free Trial <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  padding: "15px 30px",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(226,232,240,0.8)",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  color: "#334155",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Play
                  size={16}
                  strokeWidth={2}
                  color="#059669"
                  fill="rgba(5,150,105,0.15)"
                />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                marginTop: "clamp(44px, 8vw, 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill="#f59e0b"
                    color="#f59e0b"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <div
                className="trust-divider"
                style={{
                  width: "1px",
                  height: "16px",
                  backgroundColor: "rgba(226,232,240,0.8)",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  fontWeight: 500,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                Rated 4.9/5 from 2,000+ reviews
              </span>
              <div
                className="trust-divider"
                style={{
                  width: "1px",
                  height: "16px",
                  backgroundColor: "rgba(226,232,240,0.8)",
                }}
              />
              <div
                className="trust-badge"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Shield size={14} color="#059669" strokeWidth={2} />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    fontWeight: 500,
                  }}
                >
                  SOC 2 Compliant
                </span>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: "clamp(32px, 6vw, 48px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <ChevronDown size={20} color="#cbd5e1" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ══ STATS ══ */}
        <section
          style={{
            padding: "clamp(48px, 8vw, 80px) clamp(16px, 5vw, 48px)",
            backgroundColor: "rgba(248,250,252,0.6)",
            borderTop: "1px solid rgba(226,232,240,0.35)",
            borderBottom: "1px solid rgba(226,232,240,0.35)",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(clamp(140px, 30vw, 200px), 1fr))",
              gap: "clamp(12px, 3vw, 20px)",
            }}
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section
          id="features"
          style={{ padding: "clamp(64px, 12vw, 120px) clamp(16px, 5vw, 48px)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeader
              eyebrow="Features"
              title="Everything you need to"
              highlight="win more deals"
              description="Powerful, intuitive tools designed to help your team sell smarter — not harder."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(260px, 45vw, 330px), 1fr))",
                gap: "clamp(14px, 3vw, 20px)",
              }}
            >
              {features.map((f, i) => (
                <FeatureCard key={f.title} {...f} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section
          id="how-it-works"
          style={{
            padding: "clamp(64px, 12vw, 120px) clamp(16px, 5vw, 48px)",
            backgroundColor: "rgba(248,250,252,0.6)",
            borderTop: "1px solid rgba(226,232,240,0.35)",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <SectionHeader
              eyebrow="How it works"
              title="Get started in"
              highlight="three steps"
              description="From signup to closing deals — ridiculously simple."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(220px, 40vw, 280px), 1fr))",
                gap: "clamp(16px, 3vw, 24px)",
              }}
            >
              {[
                {
                  step: "01",
                  icon: Mail,
                  title: "Create your account",
                  description:
                    "Sign up in 30 seconds. No credit card. Import existing leads or start fresh.",
                },
                {
                  step: "02",
                  icon: PieChart,
                  title: "Build your pipeline",
                  description:
                    "Customize stages, add team members, configure your dashboard.",
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Start closing deals",
                  description:
                    "Track leads through your pipeline and watch conversion rates soar.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    border: "1.5px solid rgba(226,232,240,0.6)",
                    borderRadius: "18px",
                    padding: "clamp(28px, 5vw, 36px) clamp(20px, 4vw, 28px)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px -12px rgba(5,150,105,0.1)";
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(226,232,240,0.6)";
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "20px",
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "rgba(5,150,105,0.12)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {item.step}
                  </span>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, rgba(5,150,105,0.1), rgba(124,58,237,0.06))",
                      border: "1.5px solid rgba(5,150,105,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <item.icon size={24} strokeWidth={1.8} color="#059669" />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(15px, 2.8vw, 17px)",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "10px",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12.5px, 2.2vw, 14px)",
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section
          id="testimonials"
          style={{ padding: "clamp(64px, 12vw, 120px) clamp(16px, 5vw, 48px)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeader
              eyebrow="Testimonials"
              title="Trusted by teams"
              highlight="everywhere"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(270px, 45vw, 330px), 1fr))",
                gap: "clamp(14px, 3vw, 20px)",
              }}
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section
          id="pricing"
          style={{ padding: "clamp(48px, 10vw, 100px) clamp(16px, 5vw, 48px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              borderRadius: "28px",
              padding: "clamp(40px, 8vw, 72px) clamp(24px, 5vw, 56px)",
              background:
                "linear-gradient(135deg, rgba(5,150,105,0.05) 0%, rgba(124,58,237,0.03) 50%, rgba(5,150,105,0.05) 100%)",
              border: "2px solid rgba(5,150,105,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "clamp(80px, 15vw, 140px)",
                height: "clamp(80px, 15vw, 140px)",
                borderRadius: "28px 0 140px 0",
                background:
                  "linear-gradient(135deg, rgba(5,150,105,0.06), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "clamp(80px, 15vw, 140px)",
                height: "clamp(80px, 15vw, 140px)",
                borderRadius: "140px 0 28px 0",
                background:
                  "linear-gradient(315deg, rgba(124,58,237,0.06), transparent)",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(280px, 50%, 400px), 1fr))",
                gap: "clamp(32px, 6vw, 56px)",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "1px",
                      backgroundColor: "#059669",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#059669",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    Get started
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: 600,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: "16px",
                  }}
                >
                  Ready to supercharge your{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #059669, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    sales pipeline
                  </span>
                  ?
                </h2>
                <p
                  style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    color: "#64748b",
                    lineHeight: 1.7,
                    marginBottom: "28px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  Join thousands of teams already using CRM Pro to close more
                  deals.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  <Link href="/register">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 36px rgba(5,150,105,0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "14px 30px",
                        borderRadius: "11px",
                        border: "none",
                        background: "linear-gradient(135deg, #059669, #047857)",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        boxShadow: "0 4px 16px rgba(5,150,105,0.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Start Free Trial{" "}
                      <ArrowRight size={17} strokeWidth={2.5} />
                    </motion.button>
                  </Link>
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "14px 24px",
                        borderRadius: "11px",
                        border: "1.5px solid rgba(226,232,240,0.8)",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "#334155",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                      }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Lock size={12} color="#94a3b8" strokeWidth={2} /> No credit
                  card required — Cancel anytime
                </p>
              </div>
              <div>
                {benefits.map((b, i) => (
                  <BenefitItem key={b} text={b} delay={i * 0.08} />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer
          style={{
            borderTop: "1px solid rgba(226,232,240,0.45)",
            padding:
              "clamp(44px, 7vw, 64px) clamp(16px, 5vw, 48px) clamp(24px, 4vw, 32px)",
            backgroundColor: "rgba(255,255,255,0.35)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(160px, 30vw, 200px), 1fr))",
                gap: "clamp(24px, 4vw, 44px)",
                marginBottom: "clamp(32px, 5vw, 48px)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #059669, #047857)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(5,150,105,0.2)",
                    }}
                  >
                    <Zap size={15} color="white" strokeWidth={2.5} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    CRM Pro
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    lineHeight: 1.65,
                    maxWidth: "240px",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  Modern CRM for teams who want to close more deals with less
                  effort.
                </p>
              </div>
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "Integrations", "Changelog"],
                },
                {
                  title: "Company",
                  links: ["About", "Blog", "Careers", "Contact"],
                },
                {
                  title: "Legal",
                  links: [
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookie Policy",
                  ],
                },
              ].map((g) => (
                <div key={g.title}>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#0f172a",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "16px",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    {g.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {g.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        style={{
                          fontSize: "13px",
                          color: "#64748b",
                          textDecoration: "none",
                          transition: "color 0.2s",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#059669")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#64748b")
                        }
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(226,232,240,0.7), transparent)",
                marginBottom: "clamp(16px, 3vw, 24px)",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                © {new Date().getFullYear()} CRM Pro. All rights reserved.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[Globe, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "9px",
                      backgroundColor: "rgba(248,250,252,0.8)",
                      border: "1px solid rgba(226,232,240,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#059669";
                      e.currentTarget.style.borderColor =
                        "rgba(5,150,105,0.25)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(5,150,105,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.borderColor =
                        "rgba(226,232,240,0.6)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(248,250,252,0.8)";
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .cta-desktop { display: none !important; }
            .trust-divider { display: none !important; }
            .trust-badge { display: none !important; }
          }
        `}
      </style>
    </div>
  );
}
