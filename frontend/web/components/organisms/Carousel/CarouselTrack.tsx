import Box from "@mui/material/Box";

type Props = {
  index: number;
  children: React.ReactNode;
};

export default function CarouselTrack({ index, children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        transform: `translateX(-${index * 100}%)`,
        transition: "transform 300ms ease",
      }}
    >
      {children}
    </Box>
  );
}