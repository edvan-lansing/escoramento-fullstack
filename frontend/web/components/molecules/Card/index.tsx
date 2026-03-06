import type { ReactNode } from "react";
import Paper, { type PaperProps } from "@mui/material/Paper";
import theme from "../../../styles/theme";

type CardProps = PaperProps & {
	children?: ReactNode;
};

export default function Card({ children, sx, ...props }: CardProps) {
	return (
		<Paper
			variant="outlined"
			sx={[
				{ borderRadius: theme.radius.md },
				...(Array.isArray(sx) ? sx : sx ? [sx] : []),
			]}
			{...props}
		>
			{children}
		</Paper>
	);
}
