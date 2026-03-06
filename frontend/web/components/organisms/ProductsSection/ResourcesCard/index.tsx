import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../../atoms/Button";
import Heading from "../../../atoms/Heading";
import Text from "../../../atoms/Text";
import theme from "../../../../styles/theme";
import type { PromoBlock } from "../types";

type ResourcesCardProps = {
	block: PromoBlock;
};

export default function ResourcesCard({ block }: ResourcesCardProps) {
	return (
		<Box key={block.title} sx={{ px: "24px" }}>
			<Heading
				sx={{
					mb: "12px",
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
					overflow: "hidden",
					borderRadius: theme.radius.md,
                    border: `1px solid ${theme.colors.borderSearch}`,
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "1fr 0.7fr" },
					minHeight: { xs: 300, md: 390 }
				}}
			>
				<Box
					sx={{
						order: { xs: 1, md: 1 },
						display: "flex",
						alignItems: "center",
						justifyContent: { xs: "flex-start", md: "flex-start" },
					}}
				>
					<Box
						sx={{
							px: "16px",
							py: "16px",
							display: "grid",
							gap: "18px",
						}}
					>
						<Text
							$muted
							sx={{
								letterSpacing: "0.14em",
								fontWeight: 700,
								fontSize: theme.typography.text.md,
							}}
						>
							{block.label ?? block.subtitle}
						</Text>
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
						<Text $muted sx={{
                            fontSize: theme.typography.text.base,
                            lineHeight: 1.5,
                            color: theme.colors.textPrimary,
                            }}>
							{block.description}
						</Text>
						<Box sx={{ mt: "4px" }}>
							<Button
								component="a"
								href={block.href}
								sx={{
                                    backgroundColor: theme.colors.footer,
                                    color: theme.colors.surface,
									textTransform: "uppercase",
									fontWeight: 500,
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
				<Box
					sx={{
						order: { xs: 2, md: 2 },
						position: "relative",
						minHeight: { xs: 300, md: 390 }
					}}
				>
					<Box
						component="img"
						src={block.imageSrc}
						alt={block.imageAlt}
						sx={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							display: "block",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}
