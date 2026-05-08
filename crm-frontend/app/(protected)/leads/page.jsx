"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { leadsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import LeadCard from "@/components/LeadCard";
import LeadTable from "@/components/LeadTable";
import AnimatedPage from "@/components/AnimatedPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  HiPlus,
  HiViewGrid,
  HiViewList,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const LEADS_PER_PAGE = 9;

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    leadSource: "",
    assignedSalesperson: "",
    search: "",
  });

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const fetchLeads = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.leadSource) params.leadSource = filters.leadSource;
      if (filters.assignedSalesperson)
        params.assignedSalesperson = filters.assignedSalesperson;
      if (filters.search) params.search = filters.search;

      const response = await leadsAPI.getAll(params);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await leadsAPI.delete(id);
      toast.success("Lead deleted!");
      fetchLeads();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  // ── Pagination Logic ──
  const totalPages = Math.ceil(leads.length / LEADS_PER_PAGE);
  const startIndex = (currentPage - 1) * LEADS_PER_PAGE;
  const endIndex = startIndex + LEADS_PER_PAGE;
  const paginatedLeads = leads.slice(startIndex, endIndex);
  const startItem = leads.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, leads.length);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AnimatedPage>
      <Navbar title="Leads" />

      <div style={{ padding: "clamp(14px, 4vw, 28px) clamp(16px, 5vw, 32px)" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "clamp(14px, 3vw, 24px)",
            gap: "clamp(10px, 3vw, 20px)",
            flexWrap: "wrap",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ minWidth: 0, flex: 1 }}
          >
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
                  width: "clamp(16px, 3vw, 24px)",
                  height: "1px",
                  backgroundColor: "#059669",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(10px, 2.2vw, 11px)",
                  fontWeight: 600,
                  color: "#059669",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Pipeline
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(20px, 5vw, 28px)",
                fontWeight: 600,
                color: "#111827",
                letterSpacing: "-0.01em",
                marginBottom: "4px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              All Leads ({leads.length})
            </h1>
            <p
              style={{
                fontSize: "clamp(12px, 2.5vw, 13px)",
                color: "#9ca3af",
                fontWeight: 500,
              }}
            >
              Manage your sales pipeline and track progress
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
            }}
          >
            {/* View Toggle */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                borderRadius: "10px",
                padding: "clamp(4px, 1vw, 6px)",
                border: "2px solid rgba(226,232,240,0.7)",
                gap: "clamp(2px, 0.5vw, 4px)",
              }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px)",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor:
                    viewMode === "grid"
                      ? "rgba(5,150,105,0.15)"
                      : "transparent",
                  color: viewMode === "grid" ? "#059669" : "#9ca3af",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "36px",
                }}
              >
                <HiViewGrid
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                  }}
                />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("table")}
                style={{
                  padding: "clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px)",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor:
                    viewMode === "table"
                      ? "rgba(5,150,105,0.15)"
                      : "transparent",
                  color: viewMode === "table" ? "#059669" : "#9ca3af",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "36px",
                }}
              >
                <HiViewList
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                  }}
                />
              </motion.button>
            </motion.div>

            {/* New Lead Button */}
            <Link href="/leads/new">
              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  padding: "clamp(10px, 2.5vw, 12px) clamp(14px, 4vw, 24px)",
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(5,150,105,0.2)",
                  letterSpacing: "0.05em",
                  minHeight: "44px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#047857";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(5,150,105,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(5,150,105,0.2)";
                }}
              >
                <HiPlus
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                  }}
                />
                <span className="hidden sm:inline">New Lead</span>
                <span className="sm:hidden">+</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── Filters ── */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* ── Leads Display ── */}
        {viewMode === "grid" ? (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(clamp(200px, 100vw, 280px), 1fr))",
              gap: "clamp(10px, 2.5vw, 16px)",
            }}
          >
            {paginatedLeads.map((lead, index) => (
              <LeadCard key={lead._id} lead={lead} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LeadTable leads={paginatedLeads} onDelete={handleDelete} />
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {leads.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              marginTop: "clamp(14px, 3vw, 28px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)",
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "2px solid rgba(226,232,240,0.7)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              gap: "clamp(8px, 2vw, 12px)",
              flexWrap: "wrap",
            }}
          >
            {/* Left: showing X–Y of Z */}
            <p
              style={{
                fontSize: "clamp(11px, 2.3vw, 13px)",
                color: "#6b7280",
                fontWeight: 500,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Showing{" "}
              <span style={{ color: "#111827", fontWeight: 700 }}>
                {startItem}–{endItem}
              </span>{" "}
              of{" "}
              <span style={{ color: "#111827", fontWeight: 700 }}>
                {leads.length}
              </span>
            </p>

            {/* Center: Page numbers */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(4px, 1vw, 6px)",
                overflowX: "auto",
              }}
            >
              {/* Prev button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 10px)",
                  borderRadius: "8px",
                  border: "1.5px solid rgba(226,232,240,0.7)",
                  backgroundColor:
                    currentPage === 1
                      ? "rgba(248,250,252,0.5)"
                      : "rgba(255,255,255,0.9)",
                  color: currentPage === 1 ? "#d1d5db" : "#6b7280",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  minHeight: "36px",
                  minWidth: "36px",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.3)";
                    e.currentTarget.style.color = "#059669";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)";
                  e.currentTarget.style.color =
                    currentPage === 1 ? "#d1d5db" : "#6b7280";
                }}
              >
                <HiChevronLeft
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                  }}
                />
              </motion.button>

              {/* Page numbers */}
              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span
                    key={`dots-${i}`}
                    style={{
                      padding: "0 clamp(2px, 0.5vw, 4px)",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      color: "#9ca3af",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    ···
                  </span>
                ) : (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToPage(page)}
                    style={{
                      minWidth: "36px",
                      minHeight: "36px",
                      borderRadius: "8px",
                      border:
                        currentPage === page
                          ? "1.5px solid rgba(5,150,105,0.3)"
                          : "1.5px solid transparent",
                      backgroundColor:
                        currentPage === page
                          ? "rgba(5,150,105,0.1)"
                          : "transparent",
                      color: currentPage === page ? "#059669" : "#6b7280",
                      fontSize: "clamp(11px, 2.3vw, 13px)",
                      fontWeight: currentPage === page ? 700 : 500,
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(248,250,252,0.9)";
                        e.currentTarget.style.borderColor =
                          "rgba(226,232,240,0.8)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    {page}
                  </motion.button>
                ),
              )}

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "1.5px solid rgba(226,232,240,0.7)",
                  backgroundColor:
                    currentPage === totalPages
                      ? "rgba(248,250,252,0.5)"
                      : "rgba(255,255,255,0.9)",
                  color: currentPage === totalPages ? "#d1d5db" : "#6b7280",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.3)";
                    e.currentTarget.style.color = "#059669";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)";
                  e.currentTarget.style.color =
                    currentPage === totalPages ? "#d1d5db" : "#6b7280";
                }}
              >
                <HiChevronRight style={{ width: "16px", height: "16px" }} />
              </motion.button>
            </div>

            {/* Right: per-page info */}
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                fontWeight: 500,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {LEADS_PER_PAGE} per page · Page{" "}
              <span style={{ color: "#059669", fontWeight: 700 }}>
                {currentPage}
              </span>{" "}
              of {totalPages}
            </p>
          </motion.div>
        )}

        {/* ── Empty State ── */}
        {leads.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "80px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(5,150,105,0.1), rgba(124,58,237,0.1))",
                border: "2px solid rgba(5,150,105,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "28px",
              }}
            >
              📭
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "6px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              No leads found
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                marginBottom: "24px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Try adjusting your filters or create a new lead
            </p>
            <Link href="/leads/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(5,150,105,0.2)",
                }}
              >
                Create Your First Lead
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
}
