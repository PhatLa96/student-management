import { TextField } from '@material-ui/core';
import { InputHTMLAttributes } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';

interface InputFieldsProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputFields({ name, control, label, ...inputProps }: InputFieldsProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      label={label}
      variant="outlined"
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
