import TextField, { type TextFieldProps } from "@mui/material/TextField";

type InputProps = Omit<TextFieldProps, "id" | "label" | "variant"> & {
  id: string;
  label: string;
};

export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  ...props
}: InputProps) {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      type={type}
      variant="outlined"
      size="small"
      {...props}
    />
  );
}
