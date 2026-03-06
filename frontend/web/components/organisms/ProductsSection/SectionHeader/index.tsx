import Box from "@mui/material/Box";
import Heading from "../../../atoms/Heading";
import Text from "../../../atoms/Text";
import theme from "@/styles/theme";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: "10px",        
        px: "24px",
        pt: "36px",
      }}
    >
      <Heading
        sx={{
          fontSize: {
            xs: theme.typography.heading.displaySm,
            md: theme.typography.heading.displayLg,
          },
          fontWeight: 700,
        }}
      >
        {title}
      </Heading>
      <Text $muted sx={{ fontSize: "19.2px", color: theme.colors.textPrimary }}>
        {subtitle}
      </Text>
    </Box>
  );
}
