import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import Text from "../../../atoms/Text";
import theme from "@/styles/theme";
import SocialLinks from "../SocialLinks";
import { useLocale } from "next-intl";

type BottomBarProps = {
  containerSx: SxProps;
  copyrightText: string;
};

export default function BottomBar({
  containerSx,
  copyrightText,
}: BottomBarProps) {
  const locale = useLocale();

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.bottomBar,
      }}
    >
        <SocialLinks />
      <Box
        sx={{
          ...containerSx,
          py: { xs: "12px", md: "16px" },
          px: { xs: "16px", md: "24px" },
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            flexWrap: "wrap",
            gap: { xs: "8px", md: "16px" },
          }}
        >
            
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              flexShrink: 0,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Box
              component="img"
              src="/logoFooter.webp"
              alt="Escoramento"
              sx={{
                height: "32px",
                width: "180px",
                display: "block",
                opacity: 0.95,
                objectFit: "contain",
              }}
            />
          </Box>
          <Text
            size="xs"
            sx={{
              color: theme.colors.surface,
              opacity: 0.9,
              textAlign: "center",
              flex: 1,
              minWidth: { xs: "100%", md: "auto" },
            }}
          >
            {copyrightText}
          </Text>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: { xs: "100%", md: "auto" },
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Box
              component="a"
              href={`https://escoramento.com/${locale}/sitemap.xml`}
              sx={{
                color: theme.colors.surface,
                textDecoration: "none",
                fontSize: theme.typography.text.xs,
                opacity: 0.9,

                "&:hover": {
                  opacity: 1,
                  textDecoration: "underline",
                },
              }}
            >
              Sitemap
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
