import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import Text from "../../../atoms/Text";
import theme from "../../../../styles/theme";

type SupportCardProps = {
  containerSx: SxProps;
};

export default function SupportCard({ containerSx }: SupportCardProps) {
  const t = useTranslations("Footer");

  return (
    <Box
      sx={{
        mt: { xs: "-40px", md: "-64px" },
        pb: "28px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box sx={containerSx}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "auto",
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.footer}`,
              position: "relative",
              p: { xs: "16px", md: "18px" },
              pl: { xs: "84px", md: "104px" },
            }}
          >
            <Box
              component="img"
              src="/suporteTecnico.webp"
              alt={t("support.imageAlt")}
              sx={{
                position: "absolute",
                width: "100px",
                height: "107px",
                objectFit: "cover",
                bottom: 0,
                left: 0,
                borderEndStartRadius: theme.radius.md,
              }}
            />
            <Box sx={{ display: "grid", gap: "2px" }}>
              <Text
                size="xs"
                sx={{
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: theme.colors.textMuted,
                  textAlign: { xs: "center", md: "left" },
                  justifySelf: { xs: "center", md: "start" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                {t("support.kicker")}
              </Text>
              <Text
                size="base"
                sx={{
                  fontWeight: 900,
                  textAlign: { xs: "right", md: "left" },
                  justifySelf: { xs: "end", md: "start" },
                }}
              >
                {t("support.title")}
              </Text>
              <Text
                $muted
                size="xl"
                sx={{
                  textAlign: { xs: "right", md: "left" },
                  justifySelf: { xs: "end", md: "start" },
                }}
              >
                {t("support.callPrefix")}{" "}
                <Box
                  component="a"
                  href="tel:08000330327"
                  sx={{
                    fontWeight: 900,
                    color: theme.colors.accent,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  0800 033 0327
                </Box>{" "}
                {t("support.callSuffix")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
