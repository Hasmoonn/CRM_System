"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        style={{ width: "18px", height: "18px" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    name: "All Leads",
    href: "/leads",
    icon: (
      <svg
        style={{ width: "18px", height: "18px" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    name: "New Lead",
    href: "/leads/new",
    icon: (
      <svg
        style={{ width: "18px", height: "18px" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { collapsed, toggleCollapsed, sidebarWidth, isCompactScreen } =
    useSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: sidebarWidth,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        overflow: "hidden",
        boxShadow:
          isCompactScreen && !collapsed
            ? "8px 0 30px rgba(15, 23, 42, 0.12)"
            : "none",
      }}
    >
      {/* ===== LOGO ===== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: collapsed ? "18px 0" : "20px 24px",
          borderBottom: "1px solid #f1f5f9",
          minHeight: "68px",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            width: collapsed ? "32px" : "36px",
            height: collapsed ? "32px" : "36px",
            minWidth: collapsed ? "32px" : "36px",
            borderRadius: collapsed ? "8px" : "10px",
            backgroundColor: "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg
            style={{
              width: collapsed ? "16px" : "20px",
              height: collapsed ? "16px" : "20px",
              color: "white",
              transition: "all 0.3s ease",
            }}
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

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h1
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                CRM Pro
              </h1>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Lead Manager
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== NAV LABEL ===== */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "20px 24px 8px" }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#d1d5db",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Navigation
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NAV ITEMS ===== */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "12px 8px" : "8px 14px",
          display: "flex",
          flexDirection: "column",
          gap: collapsed ? "2px" : "4px",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ x: collapsed ? 0 : 3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: collapsed ? "10px 0" : "11px 14px",
                  borderRadius: collapsed ? "8px" : "8px",
                  cursor: "pointer",
                  justifyContent: "center",
                  ...(collapsed ? {} : { justifyContent: "flex-start" }),
                  backgroundColor: isActive ? "#f0fdf4" : "transparent",
                  border: isActive
                    ? "1px solid #dcfce7"
                    : "1px solid transparent",
                  color: isActive ? "#059669" : "#6b7280",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#111827";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6b7280";
                  }
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: "absolute",
                      ...(collapsed
                        ? {
                            left: "50%",
                            bottom: "-1px",
                            transform: "translateX(-50%)",
                            width: "16px",
                            height: "2px",
                          }
                        : {
                            left: "-14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "3px",
                            height: "20px",
                          }),
                      borderRadius: "2px",
                      backgroundColor: "#059669",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div
                  style={{
                    minWidth: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title={collapsed ? item.name : undefined}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* ===== BOTTOM ===== */}
      <div
        style={{
          padding: collapsed ? "12px 8px" : "16px 14px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {/* Expanded user info */}
        <AnimatePresence>
          {!collapsed && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    borderRadius: "8px",
                    backgroundColor: "#059669",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed user avatar */}
        {collapsed && user && (
          <div
            title={`${user.name}\n${user.email}`}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "7px",
              backgroundColor: "#059669",
              color: "white",
              fontSize: "12px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              cursor: "default",
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={logout}
          title={collapsed ? "Sign Out" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: collapsed ? "9px 0" : "11px 14px",
            borderRadius: "8px",
            width: "100%",
            justifyContent: "center",
            ...(collapsed ? {} : { justifyContent: "flex-start" }),
            backgroundColor: "transparent",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fef2f2";
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          <svg
            style={{
              width: collapsed ? "16px" : "20px",
              height: collapsed ? "16px" : "20px",
              minWidth: collapsed ? "16px" : "20px",
              transition: "all 0.3s ease",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Expand" : "Collapse"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: collapsed ? "6px" : "8px",
            borderRadius: "7px",
            backgroundColor: "transparent",
            border: "1px solid #f1f5f9",
            color: "#d1d5db",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#d1d5db";
            e.currentTarget.style.borderColor = "#f1f5f9";
          }}
        >
          <svg
            style={{
              width: "14px",
              height: "14px",
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </motion.aside>
  );
}
