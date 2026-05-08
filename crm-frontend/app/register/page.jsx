"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = () => {
    const len = formData.password.length;
    if (len === 0) return { level: 0, label: "", color: "#e2e8f0" };
    if (len < 4) return { level: 1, label: "Weak", color: "#dc2626" };
    if (len < 6) return { level: 2, label: "Fair", color: "#d97706" };
    if (len < 10) return { level: 3, label: "Good", color: "#0891b2" };
    return { level: 4, label: "Strong", color: "#059669" };
  };

  const strength = getStrength();
  const passwordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsMismatch =
    formData.confirmPassword && formData.password !== formData.confirmPassword;

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

  // Generate vertical line positions
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
        {/* Vertical Lines - evenly spaced */}
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

        {/* Light pulse traveling down each major line */}
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

        {/* Horizontal accent lines at intersections */}
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

        {/* Intersection dots where major lines cross horizontal lines */}
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

        {/* Soft gradient blobs behind content */}
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

        {/* Very subtle noise grain */}
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
        className="relative z-10 register-grid"
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
        {/* ===== LEFT COLUMN ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex flex-col"
          style={{ gap: "40px" }}
        >
          <div>
            {/* Brand tag */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center"
              style={{ gap: "10px", marginBottom: "24px" }}
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
              Elevate Your
              <br />
              <span style={{ color: "#059669" }}>Sales Pipeline</span>
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
              A sophisticated platform designed for sales teams who prioritize
              clarity, precision, and consistent growth.
            </motion.p>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
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
            {/* Card inner accent line */}
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
                Create Your Account
              </h2>
              <p style={{ fontSize: "14px", color: "#9ca3af" }}>
                Fill in your details to get started.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  className="label-caps"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focusedField === "name" ? "#059669" : "#d1d5db",
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Johnathan Doe"
                    required
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle("name"), paddingLeft: "38px" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  className="label-caps"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Work Email
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle("email"), paddingLeft: "38px" }}
                  />
                </div>
              </div>

              {/* Password Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    Password
                  </label>
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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

                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    Confirm
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: passwordsMatch
                          ? "#059669"
                          : passwordsMismatch
                            ? "#dc2626"
                            : focusedField === "confirm"
                              ? "#059669"
                              : "#d1d5db",
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
                        {passwordsMatch ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        )}
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      onFocus={() => setFocusedField("confirm")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...getInputStyle("confirm"),
                        paddingLeft: "38px",
                        borderColor: passwordsMismatch
                          ? "#fca5a5"
                          : passwordsMatch
                            ? "#6ee7b7"
                            : focusedField === "confirm"
                              ? "#059669"
                              : "#e2e8f0",
                        boxShadow: passwordsMismatch
                          ? "0 0 0 3px rgba(220,38,38,0.06)"
                          : passwordsMatch
                            ? "0 0 0 3px rgba(5,150,105,0.06)"
                            : focusedField === "confirm"
                              ? "0 0 0 3px rgba(5,150,105,0.08)"
                              : "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginBottom: "16px" }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: "3px", marginBottom: "4px" }}
                  >
                    {[1, 2, 3, 4].map((bar) => (
                      <motion.div
                        key={bar}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: bar * 0.08 }}
                        style={{
                          flex: 1,
                          height: "3px",
                          borderRadius: "2px",
                          backgroundColor:
                            strength.level >= bar ? strength.color : "#e2e8f0",
                          transition: "background-color 0.3s ease",
                          transformOrigin: "left",
                        }}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "11px",
                        color: strength.color,
                        fontWeight: 600,
                        minWidth: "40px",
                      }}
                    >
                      {strength.label}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Match indicator */}
              {formData.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center"
                  style={{ gap: "5px", marginBottom: "16px" }}
                >
                  <svg
                    style={{
                      width: "13px",
                      height: "13px",
                      color: passwordsMatch ? "#059669" : "#dc2626",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    {passwordsMatch ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    )}
                  </svg>
                  <span
                    style={{
                      fontSize: "12px",
                      color: passwordsMatch ? "#059669" : "#dc2626",
                      fontWeight: 500,
                    }}
                  >
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords don't match"}
                  </span>
                </motion.div>
              )}

              {/* Terms */}
              <div
                className="flex"
                style={{
                  gap: "10px",
                  alignItems: "flex-start",
                  marginBottom: "28px",
                }}
              >
                <input type="checkbox" id="terms" required />
                <label
                  htmlFor="terms"
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    lineHeight: 1.5,
                    cursor: "pointer",
                  }}
                >
                  I agree to the{" "}
                  <span style={{ color: "#059669", fontWeight: 600 }}>
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "#059669", fontWeight: 600 }}>
                    Privacy Policy
                  </span>
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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
            </form>

            {/* Sign in */}
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
                Already have an account?
              </p>
              <Link
                href="/login"
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
                Sign In to Dashboard
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
          .register-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
