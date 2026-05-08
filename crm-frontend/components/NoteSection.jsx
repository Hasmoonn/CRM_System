"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notesAPI } from "@/lib/api";
import toast from "react-hot-toast";
import {
  HiChat,
  HiTrash,
  HiPaperAirplane,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const NOTES_PER_PAGE = 5;

export default function NoteSection({ leadId }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNotes();
  }, [leadId]);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getByLead(leadId);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setLoading(true);
    try {
      await notesAPI.create(leadId, { content: newNote });
      setNewNote("");
      fetchNotes();
      setCurrentPage(1); // Go to first page to see new note
      toast.success("Note added!");
    } catch {
      toast.error("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!confirm("Delete this note?")) return;
    try {
      await notesAPI.delete(noteId);
      fetchNotes();
      toast.success("Note deleted!");
      // If current page becomes empty after deletion, go back one page
      const remainingOnPage = paginatedNotes.length - 1;
      if (remainingOnPage === 0 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete note");
    }
  };

  // ── Pagination Logic ──
  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
  const endIndex = startIndex + NOTES_PER_PAGE;
  const paginatedNotes = notes.slice(startIndex, endIndex);
  const startItem = notes.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, notes.length);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        borderRadius: "14px",
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "2px solid rgba(226,232,240,0.7)",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
        padding: "28px",
      }}
    >
      {/* ── Section Header ── */}
      <div style={{ marginBottom: "24px" }}>
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
              width: "16px",
              height: "1px",
              backgroundColor: "#059669",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#059669",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Activity
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "9px",
              background:
                "linear-gradient(135deg, rgba(5,150,105,0.12), rgba(124,58,237,0.12))",
              border: "1.5px solid rgba(5,150,105,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HiChat
              style={{
                width: "16px",
                height: "16px",
                color: "#059669",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#111827",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Notes
            </h3>
            <motion.span
              key={notes.length}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#059669",
                backgroundColor: "rgba(5,150,105,0.08)",
                border: "1px solid rgba(5,150,105,0.2)",
                borderRadius: "20px",
                padding: "2px 8px",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {notes.length}
            </motion.span>
          </div>
        </div>
      </div>

      {/* ── Add Note Form ── */}
      <form onSubmit={handleAddNote} style={{ marginBottom: "24px" }}>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "rgba(248,250,252,0.9)",
            border: "1.5px solid rgba(226,232,240,0.7)",
            overflow: "hidden",
            transition: "border-color 0.2s ease",
          }}
        >
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note... (call update, meeting notes, follow-up)"
            rows={3}
            onFocus={(e) => {
              e.currentTarget.parentElement.style.borderColor =
                "rgba(5,150,105,0.4)";
              e.currentTarget.parentElement.style.boxShadow =
                "0 0 0 3px rgba(5,150,105,0.06)";
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement.style.borderColor =
                "rgba(226,232,240,0.7)";
              e.currentTarget.parentElement.style.boxShadow = "none";
            }}
            style={{
              width: "100%",
              padding: "14px 16px",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#111827",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              resize: "none",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderTop: "1px solid rgba(226,232,240,0.6)",
              backgroundColor: "rgba(248,250,252,0.6)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {newNote.length > 0
                ? `${newNote.length} characters`
                : "Press Enter to add a new line"}
            </span>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={loading || !newNote.trim()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "7px",
                backgroundColor:
                  !newNote.trim() || loading
                    ? "rgba(5,150,105,0.3)"
                    : "#059669",
                border: "none",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                cursor: !newNote.trim() || loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.03em",
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#ffffff",
                    }}
                  />
                  Saving...
                </>
              ) : (
                <>
                  <HiPaperAirplane
                    style={{
                      width: "12px",
                      height: "12px",
                      transform: "rotate(90deg)",
                    }}
                  />
                  Add Note
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* ── Notes List (Paginated) ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minHeight: notes.length > 0 ? "200px" : "auto",
        }}
      >
        <AnimatePresence mode="popLayout">
          {paginatedNotes.length > 0 ? (
            paginatedNotes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  x: -20,
                  height: 0,
                  marginBottom: 0,
                }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.3,
                }}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(248,250,252,0.8)",
                    border: "1.5px solid rgba(226,232,240,0.6)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.2)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(5,150,105,0.02)";
                    e.currentTarget.querySelector(
                      "[data-delete]",
                    ).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(226,232,240,0.6)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(248,250,252,0.8)";
                    e.currentTarget.querySelector(
                      "[data-delete]",
                    ).style.opacity = "0";
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#374151",
                      lineHeight: 1.65,
                      marginBottom: "12px",
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    {note.content}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(5,150,105,0.12)",
                          border: "1.5px solid rgba(5,150,105,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            color: "#059669",
                          }}
                        >
                          {note.createdBy?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#059669",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        {note.createdBy}
                      </span>

                      <span
                        style={{
                          color: "#d1d5db",
                          fontSize: "10px",
                        }}
                      >
                        •
                      </span>

                      <span
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        {new Date(note.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <motion.button
                      data-delete
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(note._id)}
                      style={{
                        opacity: 0,
                        padding: "5px 7px",
                        borderRadius: "6px",
                        backgroundColor: "transparent",
                        border: "1px solid transparent",
                        color: "#9ca3af",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        fontWeight: 500,
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#dc2626";
                        e.currentTarget.style.backgroundColor =
                          "rgba(220,38,38,0.08)";
                        e.currentTarget.style.borderColor =
                          "rgba(220,38,38,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <HiTrash
                        style={{
                          width: "12px",
                          height: "12px",
                        }}
                      />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "48px 24px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "rgba(248,250,252,0.6)",
                border: "1.5px dashed rgba(226,232,240,0.8)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, rgba(5,150,105,0.08), rgba(124,58,237,0.08))",
                  border: "1.5px solid rgba(5,150,105,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <HiChat
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#9ca3af",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginBottom: "4px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                No notes yet
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                Add your first note above to track updates
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Notes Pagination ── */}
      {notes.length > NOTES_PER_PAGE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1.5px solid rgba(226,232,240,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: showing info */}
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              fontWeight: 500,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            <span style={{ color: "#6b7280", fontWeight: 600 }}>
              {startItem}–{endItem}
            </span>{" "}
            of {notes.length}
          </p>

          {/* Center: page buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(226,232,240,0.7)",
                backgroundColor:
                  currentPage === 1
                    ? "rgba(248,250,252,0.5)"
                    : "rgba(255,255,255,0.9)",
                color: currentPage === 1 ? "#d1d5db" : "#6b7280",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
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
              <HiChevronLeft style={{ width: "14px", height: "14px" }} />
            </motion.button>

            {/* Pages */}
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span
                  key={`dots-${i}`}
                  style={{
                    padding: "0 3px",
                    fontSize: "12px",
                    color: "#9ca3af",
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
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    border:
                      currentPage === page
                        ? "1px solid rgba(5,150,105,0.3)"
                        : "1px solid transparent",
                    backgroundColor:
                      currentPage === page
                        ? "rgba(5,150,105,0.1)"
                        : "transparent",
                    color: currentPage === page ? "#059669" : "#6b7280",
                    fontSize: "12px",
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

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(226,232,240,0.7)",
                backgroundColor:
                  currentPage === totalPages
                    ? "rgba(248,250,252,0.5)"
                    : "rgba(255,255,255,0.9)",
                color: currentPage === totalPages ? "#d1d5db" : "#6b7280",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
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
              <HiChevronRight style={{ width: "14px", height: "14px" }} />
            </motion.button>
          </div>

          {/* Right: page X of Y */}
          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Page{" "}
            <span
              style={{
                color: "#059669",
                fontWeight: 700,
              }}
            >
              {currentPage}
            </span>{" "}
            of {totalPages}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
