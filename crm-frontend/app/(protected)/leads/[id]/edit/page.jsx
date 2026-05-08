"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { leadsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import AnimatedPage from "@/components/AnimatedPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import Link from "next/link";
import { HiArrowLeft, HiPencil } from "react-icons/hi";

export default function EditLeadPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await leadsAPI.getById(id);
      setLead(response.data);
    } catch {
      toast.error("Lead not found");
      router.push("/leads");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await leadsAPI.update(id, data);
      toast.success("Lead updated successfully!");
      router.push(`/leads/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!lead) return null;

  return (
    <AnimatedPage>
      <Navbar title="Edit Lead" />

      <div style={{ padding: "clamp(14px, 4vw, 28px) clamp(16px, 5vw, 32px)" }}>
        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "24px" }}
        >
          <Link href={`/leads/${id}`} style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226,232,240,0.7)",
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
                e.currentTarget.style.borderColor = "rgba(5,150,105,0.3)";
                e.currentTarget.style.backgroundColor = "rgba(5,150,105,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.88)";
              }}
            >
              <HiArrowLeft style={{ width: "15px", height: "15px" }} />
              Back to Lead
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "28px" }}
        >
          {/* Eyebrow */}
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
              Edit Entry
            </span>
          </div>

          {/* Title */}
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
            Edit Lead
          </h1>

          {/* Subtitle with lead name highlighted */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                fontWeight: 500,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Updating details for
            </p>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#059669",
                backgroundColor: "rgba(5,150,105,0.08)",
                border: "1px solid rgba(5,150,105,0.2)",
                borderRadius: "6px",
                padding: "2px 10px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {lead.leadName}
            </span>
          </div>
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
            backgroundColor: "rgba(217,119,6,0.05)",
            border: "1.5px solid rgba(217,119,6,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "520px",
          }}
        >
          {/* Pulsing dot */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#d97706",
              }}
            />
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                backgroundColor: "#d97706",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <HiPencil
              style={{ width: "13px", height: "13px", color: "#d97706" }}
            />
            <p
              style={{
                fontSize: "13px",
                color: "#d97706",
                fontWeight: 500,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                lineHeight: 1.5,
              }}
            >
              You are editing an existing lead — changes will be saved
              immediately
            </p>
          </div>
        </motion.div>

        {/* ── Lead Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <LeadForm
            initialData={lead}
            onSubmit={handleSubmit}
            loading={saving}
          />
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
