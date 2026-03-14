import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import theme from "../../../styles/theme";
import SupportCard from "./SupportCard";
import FooterLinks from "./FooterLinks";
import BottomBar from "./BottomBar";

export default function Footer() {
  const t = useTranslations("Footer");

  const containerSx = {
    width: "100%",
    px: { xs: "16px", md: "24px" },
    "@media (min-width:1080px)": {
      maxWidth: "1200px",
      mx: "auto",
    },
  } as const;

  const linkSx = {
    color: theme.colors.surface,
    textDecoration: "none",
    fontSize: theme.typography.text.xl,
    lineHeight: 1.9,
    opacity: 0.95,
  } as const;

  const sectionTitleSx = {
    fontWeight: 700,
    color: theme.colors.surface,
  } as const;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.colors.footer,
        color: theme.colors.surface,
      }}
    >
      <SupportCard containerSx={containerSx} />
      <FooterLinks containerSx={containerSx} linkSx={linkSx} sectionTitleSx={sectionTitleSx} />
      <BottomBar
        containerSx={containerSx}
        copyrightText={t("copyright", { year: new Date().getFullYear() })}
      />
    </Box>
  );
}
