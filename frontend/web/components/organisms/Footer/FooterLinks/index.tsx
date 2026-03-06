import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useLocale, useTranslations } from "next-intl";
import Text from "../../../atoms/Text";
import theme from "@/styles/theme";

type FooterLinksProps = {
  containerSx: SxProps;
  linkSx: {
    color: string;
    textDecoration: string;
    fontSize: string;
    lineHeight: number;
    opacity: number;
  };
  sectionTitleSx: {
    fontWeight: 700;
    color: string;
  };
};

export default function FooterLinks({
  containerSx,
  linkSx,
  sectionTitleSx,
}: FooterLinksProps) {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const baseUrl = `https://escoramento.com/${locale}`;

  return (
    <Box sx={{ pt: 0, pb: "28px", backgroundColor: theme.colors.footer}}>
      <Box sx={containerSx}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr 0.9fr 1fr 1fr" },
            gap: { xs: "18px", md: "24px" },
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "grid", gap: "8px" }}>
            <Text sx={sectionTitleSx}>{t("links.equipment")}</Text>
            <Box component="a" href={`${baseUrl}/shop/rent/`} sx={linkSx}>
              {t("links.rent")}
            </Box>
            <Box component="a" href={`${baseUrl}/shop/buy/`} sx={linkSx}>
              {t("links.buy")}
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Text sx={sectionTitleSx}>{t("links.technicalMaterial")}</Text>
            <Box component="a" href={`${baseUrl}/catalogs/`} sx={linkSx}>
              {t("links.catalogs")}
            </Box>
            <Box component="a" href="https://blog.escoramento.com/" sx={linkSx}>
              {t("links.blog")}
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Text sx={sectionTitleSx}>{t("links.about")}</Text>
            <Box component="a" href={`${baseUrl}/about/`} sx={linkSx}>
              {t("links.company")}
            </Box>
            <Box
              component="a"
              href={`${baseUrl}/privacy-policy/`}
              sx={linkSx}
            >
              {t("links.privacyPolicy")}
            </Box>
            <Box component="a" href={`${baseUrl}/terms-of-use/`} sx={linkSx}>
              {t("links.termsOfUse")}
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Text sx={sectionTitleSx}>{t("links.appClient")}</Text>
            <Box
              component="a"
              href={`${baseUrl}/app/?tab=budgets`}
              sx={linkSx}
            >
              {t("links.budgets")}
            </Box>
            <Box component="a" href={`${baseUrl}/schedule/`} sx={linkSx}>
              {t("links.onlineScheduling")}
            </Box>
            <Box
              component="a"
              href={`${baseUrl}/app/?tab=credit-analysis`}
              sx={linkSx}
            >
              {t("links.registration")}
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Text sx={sectionTitleSx}>{t("links.supportChannels")}</Text>
            <Box component="a" href="https://jivo.chat/1zu5Pw4Zji" sx={linkSx}>
              {t("links.chatWithExpert")}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
