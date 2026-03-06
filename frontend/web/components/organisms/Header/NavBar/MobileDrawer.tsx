"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import Button from "../../../atoms/Button";
import theme from "../../../../styles/theme";
import { LanguegeIcon, ShoppingCartIcon } from "../../../atoms/Icon";
import type { NavItem } from "./navItems";

type MobileDrawerProps = {
  navItems: NavItem[];
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({
  navItems,
  open,
  onClose,
}: MobileDrawerProps) {
  const t = useTranslations("MobileMenu");
  const tActions = useTranslations("Actions");
  const tFooter = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();
  const baseUrl = `https://escoramento.com/${locale}`;

  const [languageAnchorEl, setLanguageAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const languageMenuOpen = Boolean(languageAnchorEl);

  const pathWithoutLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  const linkForLocale = (nextLocale: "pt" | "en") =>
    `/${nextLocale}${pathWithoutLocale || ""}`;

  const currentLanguageLabel =
    locale === "en" ? tActions("languageEn") : tActions("languagePt");
  const otherLocale: "pt" | "en" = locale === "en" ? "pt" : "en";
  const otherLanguageLabel =
    otherLocale === "en" ? tActions("languageEn") : tActions("languagePt");

  const menuItemSx = {
    backgroundColor: "transparent",

    "& .MuiTypography-root": {
      fontSize: "14px",
      color: theme.colors.textMuted,
      fontWeight: 400,
      position: "relative",
      display: "inline-block",
    },

    "& .MuiTypography-root::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "0%",
      height: "1px",
      backgroundColor: theme.colors.textMuted,
      transition: "width ease",
    },

    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:hover .MuiTypography-root::after": {
      width: "100%",
    },
  } as const;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        setLanguageAnchorEl(null);
        onClose();
      }}
      PaperProps={{
        sx: {
          width: "75vw",
          maxWidth: "75vw",
        },
      }}
    >
      <Box sx={{ p: "18px", pt: "12px" }} role="presentation">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            aria-label={t("close")}
            onClick={onClose}
            sx={{ color: theme.colors.textPrimary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component={Link}
          href={`/${locale}`}
          onClick={onClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            width: "100%",
            py: "12px",
          }}
        >
          <Box
            component="img"
            src="/logo.webp"
            alt="Escoramento"
            sx={{
              display: "block",
              width: "100%",
              maxWidth: 260,
              height: "auto",
              maxHeight: 44,
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            variant="text"
            onClick={(event) => setLanguageAnchorEl(event.currentTarget)}
            endIcon={<ExpandMoreIcon fontSize="small" />}
            startIcon={
              <LanguegeIcon size={20} aria-label={tActions("account")} />
            }
            sx={{
              minWidth: 0,
              px: "14px",
              borderRadius: 0,
              color: theme.colors.textPrimary,
              fontWeight: 500,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "transparent", transform: "none", },
              "& .MuiButton-startIcon": { marginRight: "-4px" },
              "& .MuiButton-endIcon": { marginLeft: "-8px" },
            }}
          >
            {currentLanguageLabel}
          </Button>
          <Button
            component="a"
            href={`${baseUrl}/shop/rent/`}
            variant="outlined"
            startIcon={<ShoppingCartIcon size={20} aria-label={t("shop")} />}
            onClick={onClose}
            sx={{
              borderColor: theme.colors.border,
              color: theme.colors.textMuted,
              fontWeight: 400,
              justifyContent: "flex-start",
              px: "14px",
              py: "6px",
              borderRadius: "999px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              "&:hover": {
                color: theme.colors.interactive,
                borderColor: theme.colors.border,
                transition: "none",
              },
            }}
          >
            {tActions("shopLabel")}
          </Button>
        </Box>
        <Menu
          anchorEl={languageAnchorEl}
          open={languageMenuOpen}
          onClose={() => setLanguageAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              mt: "8px",
              borderRadius: theme.radius.sm,
              minWidth: 120,
            },
          }}
          MenuListProps={{ "aria-label": tActions("account") }}
        >
          <MenuItem
            disabled
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
              fontSize: theme.typography.text.xxl,
            }}
          >
            <LanguegeIcon size={18} aria-label={tActions("account")} />
            {currentLanguageLabel}
          </MenuItem>
          <MenuItem
            component={Link}
            href={linkForLocale(otherLocale)}
            onClick={() => {
              setLanguageAnchorEl(null);
              onClose();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
              fontSize: theme.typography.text.xxl,
            }}
          >
            <LanguegeIcon size={18} aria-label={tActions("account")} />
            {otherLanguageLabel}
          </MenuItem>
        </Menu>

        <List sx={{ pt: "16px" }}>
          {navItems.flatMap((nav) => [
            <Typography
              key={`${nav.label}-title`}
              sx={{
                px: "8px",
                pt: "12px",
                pb: "6px",
                fontWeight: 400,
                color: theme.colors.textPrimary,
                fontSize: theme.typography.text.base,
              }}
            >
              {nav.label}
            </Typography>,
            ...nav.items.map((item) => (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={onClose}
                disableRipple
                sx={menuItemSx}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            )),
          ])}

          <Typography
            key="app-client-title"
            sx={{
              px: "8px",
              pt: "12px",
              pb: "6px",
              fontWeight: 400,
              color: theme.colors.textPrimary,
              fontSize: theme.typography.text.base,
            }}
          >
            {tFooter("links.appClient")}
          </Typography>

          <ListItemButton
            key="app-client-budgets"
            component="a"
            href={`${baseUrl}/app/?tab=budgets`}
            onClick={onClose}
            disableRipple
            sx={menuItemSx}
          >
            <ListItemText primary={tFooter("links.budgets")} />
          </ListItemButton>

          <ListItemButton
            key="app-client-schedule"
            component="a"
            href={`${baseUrl}/schedule/`}
            onClick={onClose}
            disableRipple
            sx={menuItemSx}
          >
            <ListItemText primary={tFooter("links.onlineScheduling")} />
          </ListItemButton>

          <ListItemButton
            key="app-client-registration"
            component="a"
            href={`${baseUrl}/app/?tab=credit-analysis`}
            onClick={onClose}
            disableRipple
            sx={menuItemSx}
          >
            <ListItemText primary={tFooter("links.registration")} />
          </ListItemButton>

          <Typography
            key="support-channels-title"
            sx={{
              px: "8px",
              pt: "12px",
              pb: "6px",
              fontWeight: 400,
              color: theme.colors.textPrimary,
              fontSize: theme.typography.text.base,
            }}
          >
            {tFooter("links.supportChannels")}
          </Typography>

          <ListItemButton
            key="support-channels-chat"
            component="a"
            href="https://jivo.chat/1zu5Pw4Zji"
            onClick={onClose}
            disableRipple
            sx={menuItemSx}
          >
            <ListItemText primary={tFooter("links.chatWithExpert")} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
