import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

type ButtonProps = MuiButtonProps;

export default function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}
