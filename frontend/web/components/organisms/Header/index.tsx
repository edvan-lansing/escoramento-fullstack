"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import theme from "../../../styles/theme";
import Topbar from "./Topbar";
import NavBar from "./NavBar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;

      const y = window.scrollY;
      const nextScrolled = scrolledRef.current ? y > 2 : y > 10;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 1200 }}>
      <Topbar />
      <Box
        sx={{
          backgroundColor: scrolled
            ? alpha(theme.colors.background, 0.8)
            : theme.colors.background,
          backdropFilter: "none",
          boxShadow: scrolled ? theme.shadow.sm : "none",
          transition: "background-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <Box
          sx={{
            width: "100%",
            px: { xs: "16px", md: "24px" },
            "@media (min-width:1080px)": {
              maxWidth: "1200px",
              mx: "auto",
            },
            py: { xs: "14px", md: "14px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: "10px", md: "14px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              minWidth: 0,
              flexShrink: 1,
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/logo.webp"
                alt="Escoramento"
                sx={{
                  height: "auto",
                  width: "auto",
                  maxHeight: { xs: 30, md: 44 },
                  maxWidth: { xs: 190, md: 240 },
                  objectFit: "contain",
                  display: "block",
                  transition: "all 0.15s ease",
                }}
              />
            </Box>
          </Box>
          <NavBar />
        </Box>
      </Box>
    </Box>
  );
}

