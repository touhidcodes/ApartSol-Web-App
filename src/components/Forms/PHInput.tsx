import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode;
  select?: boolean;
};

const PHInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  children,
  select = false,
}: TInputProps) => {
  const { control } = useFormContext();
  const isNumberType = type === "number";
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          inputProps={
            isNumberType ? { inputMode: "numeric", pattern: "[0-9]*" } : {}
          }
          select={select}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default PHInput;
