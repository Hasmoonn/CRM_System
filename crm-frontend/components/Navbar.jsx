"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "2px solid rgba(226, 232, 240, 0.7)",
        padding: "clamp(12px, 4vw, 20px) clamp(16px, 5vw, 40px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(8px, 3vw, 16px)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "clamp(20px, 5vw, 26px)",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.02em",
              marginBottom: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              fontSize: "clamp(11px, 2.5vw, 13px)",
              color: "#6b7280",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 14px)",
          }}
        >
          {/* Notification Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              padding: "clamp(8px, 2vw, 10px) clamp(9px, 2.5vw, 12px)",
              borderRadius: "10px",
              backgroundColor: "transparent",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              minWidth: "44px",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f9ff";
              e.currentTarget.style.borderColor = "#bfdbfe";
              e.currentTarget.style.color = "#0284c7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            <svg
              style={{
                width: "clamp(16px, 4vw, 18px)",
                height: "clamp(16px, 4vw, 18px)",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#059669",
                boxShadow: "0 0 8px rgba(5, 150, 105, 0.6)",
              }}
            />
          </motion.button>

          {/* User Profile */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              padding:
                "clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 16px) clamp(6px, 1.5vw, 8px) clamp(6px, 1.5vw, 8px)",
              borderRadius: "12px",
              border: "1.5px solid #e2e8f0",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              minHeight: "44px",
            }}
            whileHover={{
              backgroundColor: "rgba(5, 150, 105, 0.08)",
              borderColor: "#a7f3d0",
            }}
            onClick={handleLogout}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(28px, 6vw, 32px)",
                height: "clamp(28px, 6vw, 32px)",
                minWidth: "clamp(28px, 6vw, 32px)",
                borderRadius: "8px",
                backgroundColor: "#059669",
                color: "white",
                fontSize: "clamp(11px, 3vw, 13px)",
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div style={{ display: "none", minWidth: 0 }} className="md:block">
              <p
                style={{
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  fontWeight: 600,
                  color: "#111827",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name}
              </p>
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 11px)",
                  color: "#059669",
                  fontWeight: 500,
                }}
              >
                Click to logout
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
