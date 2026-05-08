"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { leadsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import AnimatedPage from "@/components/AnimatedPage";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiPlus, HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

export default function NewLeadPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await leadsAPI.create(data);
      toast.success("Lead created successfully!");
      router.push("/leads");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <Navbar title="Create New Lead" />

      <div style={{ padding: "clamp(14px, 4vw, 28px) clamp(16px, 5vw, 32px)" }}>

        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "24px" }}
        >
          <Link href="/leads" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226, 232, 240, 0.7)",
                color: "#6b7280",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#059669";
                e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.3)";
                e.currentTarget.style.backgroundColor = "rgba(5, 150, 105, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.7)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.88)";
              }}
            >
              <HiArrowLeft style={{ width: "15px", height: "15px" }} />
              Back to Leads
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "24px" }}
        >
          {/* Eyebrow label — matches LeadsPage "Pipeline" label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#059669",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#059669",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              New Entry
            </span>
          </div>

          {/* Main title — matches LeadsPage h1 style */}
          <h1
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
            }}
          >
            Add New Lead
          </h1>

          {/* Subtitle — matches LeadsPage subtitle style */}
          <p
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              fontWeight: 500,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Fill in the details to add a new lead to your pipeline
          </p>
        </motion.div>

        {/* ── Info Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            marginBottom: "28px",
            padding: "14px 20px",
            borderRadius: "10px",
            backgroundColor: "rgba(5, 150, 105, 0.05)",
            border: "1.5px solid rgba(5, 150, 105, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "520px",         // keeps it compact, not full-width
          }}
        >
          {/* Pulsing dot */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#059669",
              }}
            />
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                backgroundColor: "#059669",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "13px",
              color: "#059669",
              fontWeight: 500,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              lineHeight: 1.5,
            }}
          >
            Fields marked with{" "}
            <span style={{ color: "#dc2626", fontWeight: 700 }}>*</span>
            {" "}are required to create a lead
          </p>
        </motion.div>

        {/* ── Lead Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <LeadForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>

      </div>
    </AnimatedPage>
  );
}