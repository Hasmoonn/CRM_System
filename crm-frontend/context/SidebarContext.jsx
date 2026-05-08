"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCompactScreen, setIsCompactScreen] = useState(false);

  // Track breakpoint changes only
  const lastModeRef = useRef(null);

  const checkScreen = useCallback(() => {
    const width = window.innerWidth;
    const compact = width < 1024; 

    setIsCompactScreen(compact);

    const mode = compact ? "compact" : "desktop";

    if (lastModeRef.current !== mode) {
      lastModeRef.current = mode;
      setCollapsed(compact); 
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [checkScreen]);

  const sidebarWidth = collapsed ? "60px" : "250px";

  const contentOffset = isCompactScreen ? "60px" : sidebarWidth;

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        sidebarWidth,
        contentOffset,
        isCompactScreen,
        mounted,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
