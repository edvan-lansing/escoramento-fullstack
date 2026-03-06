import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useLocale, useTranslations } from "next-intl";
import Button from "../../../atoms/Button";
import theme from "../../../../styles/theme";
import { SearchIcon } from "@/components/atoms/Icon";

type SearchBarProps = {
	action?: string;
	method?: "GET" | "POST";
	target?: string;
	placeholder?: string;
};

export default function SearchBar({
	action,
	method = "GET",
	target = "_blank",
	placeholder,
}: SearchBarProps) {
	const t = useTranslations("Products");
	const locale = useLocale();
	const resolvedAction = action ?? `https://escoramento.com/${locale}/shop/rent/`;
	const resolvedPlaceholder = placeholder ?? t("searchPlaceholder");
	const searchLabel = t("searchButton");

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
                mt: { xs: "24px", md: "48px" },
				px: { xs: "24px", md: 0 },
			}}
		>
			<Box
				component="form"
				action={resolvedAction}
				method={method}
				target={target}
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: { xs: "12px", md: "16px" },
					width: { xs: "100%", md: "60%" },
					alignItems: { xs: "stretch", md: "center" },
				}}
			>
				<TextField
					id="products-search"
					name="q"
					size="small"
					placeholder={resolvedPlaceholder}
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: theme.colors.textMuted }}>
									<SearchIcon size={24} />
								</Box>
							</InputAdornment>
						),
					}}
					sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: theme.radius.xsm,
                            minHeight: 44,
                            "& fieldset": {
                            borderWidth: 3,
                            borderColor: theme.colors.borderSearch,
                            },
                            "&:hover fieldset": {
                            borderColor: theme.colors.textPrimary,
                            },
                            "&.Mui-focused fieldset": {
                            borderColor: theme.colors.interactive,
                            },
                        },
                        }}
				/>
				<Button
					type="submit"
					sx={{
						width: { xs: "100%", md: "auto" },
						px: "16px",
						minHeight: "44px",
						textTransform: "uppercase",
						fontWeight: 400,
						letterSpacing: "0.04em",
						backgroundColor: theme.colors.accent,
						color: theme.colors.surface,
						borderRadius: theme.radius.xsm,
						fontSize: theme.typography.text.xl,
						"&:hover": {
							transform: "none",
							filter: "brightness(0.95)",
							backgroundColor: theme.colors.bottomBar,
						},
					}}
				>
					{searchLabel}
				</Button>
			</Box>
		</Box>
	);
}
