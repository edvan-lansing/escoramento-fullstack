import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../atoms/Button";
import Link from "next/link";
import theme from "../../../../styles/theme";
import { NavItem } from "./navItems";

type Props = {
  navItems: NavItem[];
  openKey: string | null;
  anchorEl: HTMLElement | null;
  handleOpen: (key: string) => (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
};

export default function DesktopNavigation({
  navItems,
  openKey,
  anchorEl,
  handleOpen,
  handleClose,
}: Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      {navItems.map((nav) => (
        <Box key={nav.label}>
          <Button
            variant="text"
            endIcon={<ExpandMoreIcon fontSize="small" />}
            onClick={handleOpen(nav.label)}
            sx={{
              color: theme.colors.textPrimary,
              fontSize: { md: theme.typography.text.xxl, lg: theme.typography.text.base },
              fontWeight: 400,
              px: { md: "4px", lg: "6px" },
              py: "6px",
              textTransform: "none",
              backgroundColor: "transparent",
              whiteSpace: "nowrap",
              minWidth: "auto",
              "& .MuiButton-endIcon": {
                marginLeft: "2px",
                marginRight: 0,
              },
              "& .MuiButton-endIcon .MuiSvgIcon-root": {
                color: theme.colors.textMuted,
              },
              "&:hover": {
                color: theme.colors.interactive,
                transform: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
              },
              "&:hover .MuiButton-endIcon .MuiSvgIcon-root": {
                color: theme.colors.textMuted,
              },
            }}
          >
            {nav.label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openKey === nav.label}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            MenuListProps={{
              "aria-label": nav.label,
            }}
            PaperProps={{
              sx: {
                width: 200,
              },
            }}
          >
            {nav.items.map((item) => (
              <MenuItem key={item.href} component={Link} href={item.href} onClick={handleClose}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
