import React, { lazy, Suspense } from 'react';
import { Controller } from 'react-hook-form';
import { ROLES_OPTIONS } from '../../../FullStack/Core/constants/Options';

const OutlinedInput = lazy(() => import('@mui/material/OutlinedInput'));
const InputLabel = lazy(() => import('@mui/material/InputLabel'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));
const FormControl = lazy(() => import('@mui/material/FormControl'));
const Select = lazy(() => import('@mui/material/Select'));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Simple fallback for MUI components
const MuiFallback = () => <div style={{ height: 56, width: 400 }} />;

export default function RolesSelect(props: any) {
  const { label, name, control, rules } = props;

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <Suspense fallback={<MuiFallback />}>
          <FormControl sx={{ width: 400 }} error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value || ""}
              onChange={onChange}
              label={label}
              input={<OutlinedInput label={label} />}
              MenuProps={MenuProps}
            >
              <MenuItem value="">
                <em>Select a role...</em>
              </MenuItem>
              {ROLES_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Suspense>
      )}
    />
  );
}