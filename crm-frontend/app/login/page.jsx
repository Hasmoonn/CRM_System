"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = () => {
    setEmail("admin@example.com");
    setPassword("password123");
    toast.success("Credentials filled!");
  };

  const getInputStyle = (fieldName) => ({
    width: "100%",
    padding: "clamp(10px, 2.5vw, 12px) clamp(11px, 2.5vw, 14px)",
    backgroundColor: "#ffffff",
    border: `1px solid ${focusedField === fieldName ? "#059669" : "#e2e8f0"}`,
    borderRadius: "8px",
    color: "#111827",
    fontSize: "clamp(13px, 2.5vw, 14px)",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow:
      focusedField === fieldName ? "0 0 0 3px rgba(5,150,105,0.08)" : "none",
  });

  // Vertical lines same as register page
  const verticalLines = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i + 1) * (100 / 13)}%`,
    delay: i * 0.3,
    opacity: i % 3 === 0 ? 0.06 : 0.03,
  }));

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#f8fafc",
        padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 24px)",
      }}
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical Lines */}
        {verticalLines.map((line, i) => (
          <motion.div
            key={`vline-${i}`}
            className="absolute top-0 bottom-0"
            style={{
              left: line.left,
              width: "1px",
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                rgba(5,150,105,${line.opacity}) 5%,
                rgba(5,150,105,${line.opacity * 1.5}) 40%,
                rgba(5,150,105,${line.opacity}) 70%,
                transparent 100%
              )`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              delay: line.delay,
              duration: 1.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Light pulses traveling down major lines */}
        {[2, 5, 8, 11].map((lineIndex) => (
          <motion.div
            key={`pulse-${lineIndex}`}
            className="absolute"
            style={{
              left: `${(lineIndex + 1) * (100 / 13)}%`,
              width: "2px",
              height: "120px",
              background:
                "linear-gradient(to bottom, transparent, rgba(5,150,105,0.2), transparent)",
              filter: "blur(2px)",
            }}
            animate={{
              top: ["-120px", "calc(100% + 120px)"],
            }}
            transition={{
              duration: 6 + lineIndex * 0.5,
              repeat: Infinity,
              delay: lineIndex * 1.2,
              ease: "linear",
            }}
          />
        ))}

        {/* Horizontal accent lines */}
        {[25, 50, 75].map((top, i) => (
          <motion.div
            key={`hline-${i}`}
            className="absolute left-0 right-0"
            style={{
              top: `${top}%`,
              height: "1px",
              background: `linear-gradient(
                to right,
                transparent 0%,
                rgba(5,150,105,0.03) 20%,
                rgba(5,150,105,0.05) 50%,
                rgba(5,150,105,0.03) 80%,
                transparent 100%
              )`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: 0.8 + i * 0.2,
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Intersection dots */}
        {[2, 5, 8, 11].map((col) =>
          [25, 50, 75].map((row) => (
            <motion.div
              key={`dot-${col}-${row}`}
              className="absolute rounded-full"
              style={{
                left: `${(col + 1) * (100 / 13)}%`,
                top: `${row}%`,
                width: "3px",
                height: "3px",
                backgroundColor: "rgba(5,150,105,0.2)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: col * 0.3 + row * 0.01,
                ease: "easeInOut",
              }}
            />
          )),
        )}

        {/* Soft gradient blobs */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "-10%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            bottom: "-8%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.015,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="relative z-10 login-grid"
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(280px, 100vw, 450px), 1fr))",
          gap: "clamp(30px, 8vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* ===== LEFT COLUMN - BRANDING ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex flex-col"
          style={{ gap: "48px" }}
        >
          <div>
            {/* Brand tag */}
            <motion.div
              className="flex items-center"
              style={{ gap: "10px", marginBottom: "24px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "32px" }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{ height: "1px", backgroundColor: "#059669" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#059669",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                CRM Pro — Lead Management
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "44px",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Welcome Back
              <br />
              <span style={{ color: "#059669" }}>to Your Pipeline</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                fontSize: "16px",
                color: "#6b7280",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              Sign in to access your leads, track your pipeline, and pick up
              exactly where you left off.
            </motion.p>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              padding: "24px",
              backgroundColor: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "2px solid rgba(226,232,240,0.8)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "16px",
              }}
            >
              &ldquo;CRM Pro transformed how our team manages leads. The clarity
              and simplicity made adoption immediate.&rdquo;
            </p>
            <div className="flex items-center" style={{ gap: "10px" }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                M
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Michael Torres
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                  VP of Sales, Meridian Group
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===== RIGHT COLUMN - FORM ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "16px",
              padding: "48px 44px",
              boxShadow:
                "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
              border: "2px solid rgba(226,232,240,0.7)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "44px",
                right: "44px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, #059669, transparent)",
                opacity: 0.3,
                borderRadius: "0 0 2px 2px",
              }}
            />

            {/* Header */}
            <div style={{ marginBottom: "36px" }}>
              {/* Mobile logo */}
              <div
                className="lg:hidden flex items-center"
                style={{ gap: "10px", marginBottom: "24px" }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "#059669",
                  }}
                >
                  <svg
                    style={{ width: "18px", height: "18px", color: "white" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  CRM Pro
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                Sign In
              </h2>
              <p style={{ fontSize: "14px", color: "#9ca3af" }}>
                Enter your credentials to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  className="label-caps"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focusedField === "email" ? "#059669" : "#d1d5db",
                      pointerEvents: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle("email"), paddingLeft: "38px" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: "16px" }}>
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: "8px" }}
                >
                  <label className="label-caps">Password</label>
                  <button
                    type="button"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#059669",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#047857")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#059669")
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color:
                        focusedField === "password" ? "#059669" : "#d1d5db",
                      pointerEvents: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...getInputStyle("password"),
                      paddingLeft: "38px",
                      paddingRight: "44px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#d1d5db",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#6b7280")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#d1d5db")
                    }
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div
                className="flex items-center"
                style={{ gap: "8px", marginBottom: "32px" }}
              >
                <input type="checkbox" id="remember" />
                <label
                  htmlFor="remember"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  Keep me signed in
                </label>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.005 }}
                whileTap={{ scale: loading ? 1 : 0.995 }}
                type="submit"
                disabled={loading}
                className="flex items-center justify-center"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: loading ? "#d1fae5" : "#059669",
                  color: loading ? "#6b7280" : "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 14px rgba(5,150,105,0.2)",
                  gap: "8px",
                  marginBottom: "20px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#047857";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(5,150,105,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#059669";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(5,150,105,0.2)";
                  }
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #d1fae5",
                        borderTopColor: "#059669",
                        borderRadius: "50%",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div
                className="flex items-center"
                style={{ gap: "12px", marginBottom: "20px" }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, #e2e8f0, transparent)",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    color: "#d1d5db",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontWeight: 600,
                  }}
                >
                  or
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, #e2e8f0, transparent)",
                  }}
                />
              </div>

              {/* Quick fill button */}
              <motion.button
                type="button"
                onClick={fillCredentials}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="flex items-center"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  gap: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    minWidth: "30px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(5,150,105,0.08)",
                    border: "1px solid rgba(5,150,105,0.12)",
                  }}
                >
                  <svg
                    style={{ width: "14px", height: "14px", color: "#059669" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#6b7280",
                      marginBottom: "1px",
                    }}
                  >
                    Fill test credentials
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#d1d5db",
                      fontFamily: "monospace",
                    }}
                  >
                    admin@example.com / password123
                  </p>
                </div>
                <svg
                  style={{ width: "14px", height: "14px", color: "#d1d5db" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </motion.button>
            </form>

            {/* Register link */}
            <div
              style={{
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                Don&apos;t have an account?
              </p>
              <Link
                href="/register"
                className="flex items-center"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#059669",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  gap: "4px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#047857")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#059669")}
              >
                Create an Account
                <svg
                  style={{ width: "14px", height: "14px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#d1d5db",
              marginTop: "20px",
              letterSpacing: "0.3px",
            }}
          >
            © {new Date().getFullYear()} CRM Pro — Enterprise Lead Management
          </p>
        </motion.div>
      </main>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .login-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
