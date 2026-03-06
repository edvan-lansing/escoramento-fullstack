import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../../atoms/Button";
import Heading from "../../../atoms/Heading";
import Text from "../../../atoms/Text";
import theme from "../../../../styles/theme";
import type { PromoBlock } from "../types";

type PromoCardProps = {
  block: PromoBlock;
};

export default function PromoCard({ block }: PromoCardProps) {
  return (
    <Box>
      <Heading
        sx={{
          mb: "16px",
          pl: "24px",
          ml: { xs: theme.layout.containerPadding, md: 0 },
          fontSize: {
            xs: theme.typography.heading.displaySm,
            md: theme.typography.heading.displayLg,
          },
        }}
      >
        {block.title}
      </Heading>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.4fr 0.9fr" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "auto",
            display: "flex",
          }}
        >
          <Box
            component="img"
            src={block.imageSrc}
            alt={block.imageAlt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            mt: { xs: "-18px", md: 0 },
            px: { xs: "18px", md: 0 },
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.lg,
              border: `2px solid ${theme.colors.borderSearch}`,
              p: { xs: "18px", md: "24px" },
              display: "grid",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: theme.typography.heading.lg,
                  md: theme.typography.heading.xxl,
                },
                lineHeight: 1.15,
              }}
            >
              {block.cardTitle ?? block.title}
            </Typography>
            <Text
              $muted
              sx={{
                fontSize: theme.typography.text.base,
                lineHeight: 1.5,
              }}
            >
              {block.description}
            </Text>
            <Box>
              <Button
                component="a"
                href={block.href}
                sx={{
                  backgroundColor: theme.colors.footer,
                  color: theme.colors.surface,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  "&:hover": {
                    backgroundColor: theme.colors.bottomBar,
                    transform: "none",
                  },
                }}
              >
                {block.ctaLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
