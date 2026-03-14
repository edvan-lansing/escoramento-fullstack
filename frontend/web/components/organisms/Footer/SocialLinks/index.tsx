import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import theme from "../../../../styles/theme";
import Button from "@/components/atoms/Button";
import { InstagramIcon, LinkedInIcon, TikTokIcon, XIcon, YouTubeIcon } from "@/components/atoms/Icon";

type SocialLinksProps = {
  containerSx: SxProps;
};

export default function SocialLinks({ containerSx }: SocialLinksProps) {
  const iconButtonSx = {
    minWidth: 0,
    p: 0.5,
    color: theme.colors.surface,
    borderRadius: theme.radius.sm,
    lineHeight: 0,
  };

  return (
    <Box
      sx={{
        py: { xs: "12px", md: "16px" },
        backgroundColor: theme.colors.footer,
        borderEndEndRadius: theme.radius.xlg,
        borderEndStartRadius: theme.radius.xlg,
      }}
    >
      <Box sx={containerSx}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "8px", md: "12px" },
          }}
        >
          <Button component="a" href="https://twitter.com/escoramentoc" aria-label="Twitter" sx={iconButtonSx}>
            <XIcon size={24} />
          </Button>
          <Button
            component="a"
            href="https://www.youtube.com/@canalescoramento"
            aria-label="YouTube"
            sx={iconButtonSx}
          >
            <YouTubeIcon size={24} />
          </Button>
          <Button
            component="a"
            href="https://www.instagram.com/escoramento_com/"
            aria-label="Instagram"
            sx={iconButtonSx}
          >
            <InstagramIcon size={24} />
          </Button>
          <Button
            component="a"
            href="https://www.linkedin.com/company/escoramento-com/"
            aria-label="LinkedIn"
            sx={iconButtonSx}
          >
            <LinkedInIcon size={24} />
          </Button>
          <Button
            component="a"
            href="https://www.tiktok.com/@canalescoramento"
            aria-label="TikTok"
            sx={iconButtonSx}
          >
            <TikTokIcon size={24} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
