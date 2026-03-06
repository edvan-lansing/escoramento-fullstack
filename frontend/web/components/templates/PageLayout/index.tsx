import type { ReactNode } from "react";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";
import Box from "@mui/material/Box";
import theme from "../../../styles/theme";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: theme.layout.containerMaxWidth,
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

