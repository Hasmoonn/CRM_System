"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="flex flex-col items-center" style={{ gap: "16px" }}>
        <motion.div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #e2e8f0",
            borderTopColor: "#059669",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <p style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
