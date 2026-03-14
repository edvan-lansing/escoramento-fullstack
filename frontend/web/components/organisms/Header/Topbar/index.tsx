"use client";

import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { NavLink } from "../../../atoms";
import theme from "../../../../styles/theme";

export default function Topbar() {
  const t = useTranslations("Topbar");
  const locale = useLocale();

  const baseUrl = `https://escoramento.com/${locale}`;

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.footer,
        color: theme.colors.surface,
        fontSize: theme.typography.text.md,
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
          py: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink href="tel:08000330327">{t("phone")}</NavLink>

        <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <NavLink href={`${baseUrl}/schedule/`}>
            {t("schedule")}
          </NavLink>
          <NavLink href={`${baseUrl}/app/?tab=credit-analysis`}>
            {t("register")}
          </NavLink>
          <NavLink href={`${baseUrl}/contact/`}>{t("contact")}</NavLink>
        </Box>
      </Box>
    </Box>
  );
}
