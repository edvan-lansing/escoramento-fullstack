import type { ReactNode } from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import theme from "@/styles/theme";

export type HeadingSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "displaySm"
  | "displayMd"
  | "displayLg"
  | "displayXl";

type HeadingProps = {
  children: ReactNode;
  size?: HeadingSize;
} & Omit<TypographyProps, "variant">;

export default function Heading({
  children,
  size = "displayLg",
  sx,
  ...props
}: HeadingProps) {
  return (
    <Typography
      {...props}
      sx={{
        fontFamily: theme.typography.headingFamily,
        fontSize: theme.typography.heading[size],
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
