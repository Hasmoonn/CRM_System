"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dashboardAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AnimatedPage from "@/components/AnimatedPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { StatusPieChart, SourceBarChart } from "@/components/DashboardCharts";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const statCards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
      color: "blue",
    },
    {
      title: "New Leads",
      value: stats?.newLeads || 0,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      ),
      color: "cyan",
    },
    {
      title: "Qualified",
      value: stats?.qualifiedLeads || 0,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          />
        </svg>
      ),
      color: "purple",
    },
    {
      title: "Won Deals",
      value: stats?.wonLeads || 0,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "green",
    },
    {
      title: "Lost Deals",
      value: stats?.lostLeads || 0,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "red",
    },
    {
      title: "Total Value",
      value: `Rs.${(stats?.totalDealValue || 0).toLocaleString()}`,
      icon: (
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "amber",
    },
  ];

  return (
    <AnimatedPage>
      <Navbar title="Dashboard" />

      <div
        style={{
          padding: "clamp(16px, 4vw, 28px) clamp(12px, 4vw, 32px)",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        {/* ── Welcome Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "clamp(16px, 3vw, 28px)" }}
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
                fontSize: "clamp(9px, 2vw, 11px)",
                fontWeight: 600,
                color: "#059669",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Overview
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "clamp(20px, 5vw, 28px)",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            Sales Dashboard
          </h1>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div
          style={{
            display: "grid",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(16px, 3vw, 28px)",
          }}
          className="stats-grid"
        >
          {statCards.map((card, i) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* ── Won Deal Value ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2px solid rgba(226, 232, 240, 0.7)",
            borderRadius: "clamp(10px, 2vw, 14px)",
            padding: "clamp(16px, 4vw, 28px)",
            marginBottom: "clamp(16px, 3vw, 28px)",
            boxShadow:
              "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent corner */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "clamp(60px, 15vw, 120px)",
              height: "clamp(60px, 15vw, 120px)",
              borderRadius: "0 14px 0 120px",
              backgroundColor: "rgba(5, 150, 105, 0.04)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "clamp(10px, 2.2vw, 12px)",
                  color: "#9ca3af",
                  marginBottom: "clamp(4px, 1vw, 8px)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                Total Won Deal Value
              </p>
              <p
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(22px, 6vw, 36px)",
                  fontWeight: 600,
                  color: "#059669",
                  lineHeight: 1,
                }}
              >
                Rs.{(stats?.wonDealValue || 0).toLocaleString()}
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(44px, 10vw, 60px)",
                height: "clamp(44px, 10vw, 60px)",
                borderRadius: "clamp(10px, 2vw, 14px)",
                backgroundColor: "rgba(5,150,105,0.1)",
                border: "2px solid rgba(5,150,105,0.2)",
                color: "#059669",
                flexShrink: 0,
              }}
            >
              <svg
                style={{
                  width: "clamp(20px, 5vw, 28px)",
                  height: "clamp(20px, 5vw, 28px)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Charts ── */}
        <div
          style={{
            display: "grid",
            gap: "clamp(12px, 3vw, 20px)",
            marginBottom: "clamp(16px, 3vw, 28px)",
          }}
          className="charts-grid"
        >
          <StatusPieChart data={stats?.leadsByStatus} />
          <SourceBarChart data={stats?.leadsBySource} />
        </div>

        {/* ── Recent Leads ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2px solid rgba(226, 232, 240, 0.7)",
            borderRadius: "clamp(10px, 2vw, 14px)",
            padding: "clamp(14px, 3vw, 24px)",
            boxShadow:
              "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "clamp(12px, 3vw, 24px)",
              right: "clamp(12px, 3vw, 24px)",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(5,150,105,0.2), transparent)",
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "clamp(12px, 3vw, 20px)",
              gap: "12px",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(13px, 3vw, 15px)",
                fontWeight: 600,
                color: "#111827",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Recent Leads
            </h3>
            <Link href="/leads" style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ x: 2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "clamp(10px, 2.2vw, 12px)",
                  fontWeight: 600,
                  color: "#059669",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                View All
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
              </motion.span>
            </Link>
          </div>

          {/* Leads List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {stats?.recentLeads?.map((lead, index) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Link
                  href={`/leads/${lead._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 16px)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(5, 150, 105, 0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    className="lead-row"
                  >
                    {/* Left: avatar + info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(8px, 2vw, 12px)",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(30px, 8vw, 36px)",
                          height: "clamp(30px, 8vw, 36px)",
                          minWidth: "clamp(30px, 8vw, 36px)",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(124, 58, 237, 0.15))",
                          border: "1.5px solid rgba(5, 150, 105, 0.2)",
                          color: "#059669",
                          fontSize: "clamp(10px, 2.5vw, 12px)",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {lead.leadName?.charAt(0)?.toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p
                          style={{
                            fontSize: "clamp(12px, 2.8vw, 13px)",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "1px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                          }}
                        >
                          {lead.leadName}
                        </p>
                        <p
                          style={{
                            fontSize: "clamp(10px, 2.2vw, 12px)",
                            color: "#9ca3af",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                          }}
                        >
                          {lead.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Right: value + status */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(8px, 2vw, 16px)",
                        flexShrink: 0,
                      }}
                      className="lead-row-right"
                    >
                      <span
                        style={{
                          fontSize: "clamp(12px, 2.8vw, 14px)",
                          fontWeight: 600,
                          color: "#059669",
                          fontFamily: "'Noto Serif', Georgia, serif",
                          whiteSpace: "nowrap",
                        }}
                        className="lead-value"
                      >
                        Rs.{lead.estimatedDealValue?.toLocaleString() || 0}
                      </span>
                      <div className="lead-status">
                        <StatusBadge status={lead.status} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {(!stats?.recentLeads || stats.recentLeads.length === 0) && (
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(24px, 6vw, 40px) 0",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  No leads yet
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Responsive Styles ── */}
      <style>{`
        /* Stats grid */
        .stats-grid {
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        /* Charts grid */
        .charts-grid {
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Lead rows */
        .lead-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        /* On small screens: stack value + status below name */
        @media (max-width: 480px) {
          .lead-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 6px !important;
          }

          .lead-row-right {
            padding-left: clamp(38px, 10vw, 48px);
            width: 100%;
          }

          .lead-value {
            font-size: 12px !important;
          }
        }

        /* On very small screens: hide status badge */
        @media (max-width: 360px) {
          .lead-status {
            display: none;
          }
        }
      `}</style>
    </AnimatedPage>
  );
}
