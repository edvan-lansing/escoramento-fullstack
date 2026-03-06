import Typography, { type TypographyProps } from "@mui/material/Typography";
import theme from "@/styles/theme";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "base";

type TextProps = TypographyProps & {
  size?: TextSize;
  $muted?: boolean;
};

export default function Text({
  size = "base", // 👈 padrão global
  $muted,
  sx,
  color,
  ...props
}: TextProps) {
  const resolvedColor = color ?? ($muted ? "text.secondary" : "text.primary");

  return (
    <Typography
      component="p"
      color={resolvedColor}
      sx={{
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.text[size],
        ...sx,
      }}
      {...props}
    />
  );
}
