"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

function LayoutContent({ children }) {
  const { contentOffset, mounted, collapsed, isCompactScreen } = useSidebar();

  const verticalLines = [
    { left: "8%", height: "35%", top: "10%", opacity: 0.06, delay: 0 },
    { left: "16%", height: "50%", top: "25%", opacity: 0.04, delay: 0.5 },
    { left: "24%", height: "30%", top: "5%", opacity: 0.07, delay: 1.0 },
    { left: "35%", height: "65%", top: "15%", opacity: 0.03, delay: 1.5 },
    { left: "45%", height: "40%", top: "35%", opacity: 0.05, delay: 2.0 },
    { left: "55%", height: "55%", top: "8%", opacity: 0.04, delay: 0.8 },
    { left: "65%", height: "35%", top: "40%", opacity: 0.06, delay: 1.2 },
    { left: "75%", height: "45%", top: "20%", opacity: 0.03, delay: 1.8 },
    { left: "85%", height: "30%", top: "50%", opacity: 0.05, delay: 0.3 },
    { left: "92%", height: "55%", top: "5%", opacity: 0.04, delay: 2.2 },
  ];

  const accentDots = [
    { left: "16%", top: "25%", delay: 0.5 },
    { left: "35%", top: "80%", delay: 1.5 },
    { left: "55%", top: "8%", delay: 0.8 },
    { left: "75%", top: "65%", delay: 1.8 },
    { left: "45%", top: "35%", delay: 2.0 },
    { left: "85%", top: "50%", delay: 0.3 },
  ];

  // Only show background effects on expanded sidebar (desktop)
  const showBgEffects = mounted && !collapsed;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(241,245,249,0.8) 50%, rgba(248,250,252,1) 100%)",
          }}
        />

        {showBgEffects &&
          verticalLines.map((line, i) => (
            <motion.div
              key={`line-${i}`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                duration: 1.8,
                delay: line.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                left: line.left,
                top: line.top,
                height: line.height,
                width: "1px",
                transformOrigin: "top",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(5,150,105,${line.opacity}) 20%,
                    rgba(5,150,105,${line.opacity * 1.5}) 50%,
                    rgba(5,150,105,${line.opacity}) 80%,
                    transparent 100%)`,
                }}
              />
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{
                  duration: 6 + i * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: line.delay + 2,
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "30%",
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(5,150,105,${line.opacity * 3}) 50%,
                    transparent 100%)`,
                }}
              />
            </motion.div>
          ))}

        {showBgEffects &&
          [
            { top: "25%", left: "16%", width: "19%", delay: 1.2 },
            { top: "50%", left: "45%", width: "10%", delay: 2.0 },
            { top: "65%", left: "65%", width: "10%", delay: 1.5 },
            { top: "35%", left: "35%", width: "10%", delay: 0.8 },
          ].map((c, i) => (
            <motion.div
              key={`conn-${i}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: c.delay + 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                top: c.top,
                left: c.left,
                width: c.width,
                height: "1px",
                transformOrigin: "left",
                background:
                  "linear-gradient(90deg, rgba(5,150,105,0.06) 0%, rgba(5,150,105,0.03) 50%, transparent 100%)",
              }}
            />
          ))}

        {showBgEffects &&
          accentDots.map((dot, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: dot.delay + 1.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                position: "absolute",
                left: dot.left,
                top: dot.top,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  backgroundColor: "rgba(5,150,105,0.08)",
                }}
              />
              <div
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(5,150,105,0.15)",
                }}
              />
            </motion.div>
          ))}

        {showBgEffects &&
          [
            { left: "12%", top: "18%", text: "01", delay: 2.0 },
            { left: "42%", top: "72%", text: "02", delay: 2.5 },
            { left: "78%", top: "30%", text: "03", delay: 3.0 },
            { left: "60%", top: "85%", text: "04", delay: 3.5 },
          ].map((m, i) => (
            <motion.div
              key={`marker-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: m.delay }}
              style={{ position: "absolute", left: m.left, top: m.top }}
            >
              <motion.span
                animate={{ opacity: [0.04, 0.08, 0.04] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.7,
                }}
                style={{
                  fontSize: "11px",
                  color: "#059669",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  userSelect: "none",
                  letterSpacing: "0.1em",
                }}
              >
                {m.text}
              </motion.span>
            </motion.div>
          ))}

        {/* Vignettes */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            zIndex: 1,
            background:
              "linear-gradient(0deg, rgba(248,250,252,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main Content ── */}
      <main
        style={{
          marginLeft: mounted ? contentOffset : "250px",
          minHeight: "100vh",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
