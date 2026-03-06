"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import theme from "../../../../styles/theme";
import DesktopNavigation from "./DesktopNavigation";
import ActionsArea from "./ActionsArea";
import MobileDrawer from "./MobileDrawer";
import { getDefaultNavItems, type NavItem } from "./navItems";

type NavBarProps = {
  navItems?: NavItem[];
};

export default function NavBar({ navItems }: NavBarProps) {
  const rawLocale = useLocale();
  const locale: "pt" | "en" = rawLocale === "en" ? "en" : "pt";

  const t = useTranslations("Nav");
  const tActions = useTranslations("Actions");
  const resolvedNavItems = navItems ?? getDefaultNavItems(locale, t);

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpen = (key: string) => (event: React.MouseEvent<HTMLElement>) => {
    setOpenKey(key);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenKey(null);
    setAnchorEl(null);
  };

  const toggleMobile = (value: boolean) => () => setMobileOpen(value);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: { xs: "6px", md: "12px", lg: "16px" },
        }}
      >
        <DesktopNavigation
          navItems={resolvedNavItems}
          openKey={openKey}
          anchorEl={anchorEl}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <ActionsArea />
        <IconButton
          aria-label={tActions("openMenu")}
          onClick={toggleMobile(true)}
          sx={{
            display: { xs: "inline-flex", md: "none" },
            color: theme.colors.textMuted,
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <MobileDrawer navItems={resolvedNavItems} open={mobileOpen} onClose={toggleMobile(false)} />
    </>
  );
}
