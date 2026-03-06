"use client";

import type { PropsWithChildren } from "react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f6f8fb" }}>
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#0f172a" }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            Escoramento CMS
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default AdminLayout;
