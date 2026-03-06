"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Button from "../../../atoms/Button";
import theme from "../../../../styles/theme";
import { LanguegeIcon, MessageIcon, PersonIcon, ShoppingCartIcon } from "../../../atoms/Icon";

export default function ActionsArea() {
  const t = useTranslations("Actions");
  const locale = useLocale();
  const pathname = usePathname();

  const baseUrl = `https://escoramento.com/${locale}`;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [languageExpanded, setLanguageExpanded] = useState(false);

  const pathWithoutLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  const linkForLocale = (locale: "pt" | "en") => `/${locale}${pathWithoutLocale || ""}`;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const currentLanguageLabel = locale === "en" ? t("languageEn") : t("languagePt");
  const otherLocale: "pt" | "en" = locale === "en" ? "pt" : "en";
  const otherLanguageLabel = otherLocale === "en" ? t("languageEn") : t("languagePt");

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: "6px",
          pr: "6px",
        }}
      >
        <IconButton
          aria-label={t("chat")}
          component={Link}
          href={`${baseUrl}/contact/`}
          sx={{
            color: theme.colors.textMuted,
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent", color: theme.colors.interactive },
          }}
        >
          <MessageIcon size={24} aria-label={t("chat")} />
        </IconButton>

        <IconButton
          aria-label={t("shop")}
          component={Link}
          href={`${baseUrl}/shop/rent/`}
          sx={{
            color: theme.colors.textMuted,
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent", color: theme.colors.interactive },
          }}
        >
          <ShoppingCartIcon size={24} aria-label={t("shop")} />
        </IconButton>

        <IconButton
          aria-label={t("account")}
          onClick={handleOpen}
          sx={{
            borderRadius: "999px",
            color: theme.colors.surface,
            backgroundColor: theme.colors.borderSearch,
            "&:hover": { backgroundColor: theme.colors.borderSearch },
          }}
        >
          <PersonIcon size={24} aria-label={t("account")} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          pl: "12px",
          gap: "10px",
          borderLeft: `1px solid ${theme.colors.border}`,
        }}
      >
        <IconButton
          aria-label={t("chat")}
          component={Link}
          href={`${baseUrl}/contact/`}
          sx={{
            color: theme.colors.textMuted,
            width: 40,
            height: 40,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.colors.interactive,
            },
          }}
        >
          <MessageIcon size={24} aria-label={t("chat")} />
        </IconButton>

        <Button
          component={Link}
          href={`${baseUrl}/shop/rent/`}
          variant="outlined"
          startIcon={<ShoppingCartIcon size={20} aria-label={t("shop")} />}
          sx={{
            borderColor: theme.colors.border,
            color: theme.colors.textMuted,
            fontWeight: 400,
            px: { md: "12px", lg: "16px" },
            py: "6px",
            borderRadius: "999px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            backgroundColor: "transparent",
            "& .MuiButton-startIcon": {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 0,
              marginLeft: 0,
              marginRight: 0,
            },
            "& .MuiButton-startIcon svg": {
              display: "block",
            },
            "&:hover": {
              color: theme.colors.interactive,
              borderColor: theme.colors.border,
              transform: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          {t("shopLabel")}
        </Button>

        <IconButton
          aria-label={t("account")}
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            color: theme.colors.surface,
            backgroundColor: theme.colors.borderSearch,
            "&:hover": {
              transform: "none",
              backgroundColor: theme.colors.borderSearch,
            },
          }}
        >
          <PersonIcon size={24} aria-label={t("account")} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setLanguageExpanded(false);
          handleClose();
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: "8px",
            borderRadius: theme.radius.sm,
            width: 115,
          },
        }}
        MenuListProps={{ "aria-label": t("account") }}
      >
        <MenuItem
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLanguageExpanded((prev) => !prev);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            fontSize: theme.typography.text.xxl,
          }}
        >
          <LanguegeIcon size={18} aria-label={t("account")} />
          {currentLanguageLabel}
          <Box
            sx={{
              ml: "auto",
              display: "inline-flex",
              alignItems: "center",
              color: theme.colors.textMuted,
              transform: languageExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 120ms ease",
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </Box>
        </MenuItem>

        {languageExpanded ? (
          <MenuItem
            component={Link}
            href={linkForLocale(otherLocale)}
            onClick={() => {
              setLanguageExpanded(false);
              handleClose();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
              fontSize: theme.typography.text.xxl,
            }}
          >
            <LanguegeIcon size={18} aria-label={t("account")} />
            {otherLanguageLabel}
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem
          component={Link}
          href={`${baseUrl}/app/`}
          onClick={handleClose}
          sx={{ whiteSpace: "nowrap", fontSize: theme.typography.text.xxl }}
        >
          {t("appClient")}
        </MenuItem>
      </Menu>
    </Box>
  );
}
