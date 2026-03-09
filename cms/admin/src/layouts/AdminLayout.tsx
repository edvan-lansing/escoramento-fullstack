"use client";

import type { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const redirectToLogin = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const handleSwitchUser = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f6f8fb" }}>
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#0f172a" }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Escoramento CMS
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={handleSwitchUser}
              sx={{
                borderColor: "rgba(255,255,255,0.55)",
                color: "#ffffff",
                minWidth: 140,
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Trocar usuario
            </Button>
            <Button
              variant="contained"
              onClick={redirectToLogin}
              sx={{
                backgroundColor: "#dc2626",
                color: "#ffffff",
                minWidth: 100,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
            >
              Logoff
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default AdminLayout;
