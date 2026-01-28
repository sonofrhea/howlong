import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Controller } from 'react-hook-form';

const IconButton = lazy(() => import('@mui/material/IconButton'));
const OutlinedInput = lazy(() => import('@mui/material/OutlinedInput'));
const InputLabel = lazy(() => import('@mui/material/InputLabel'));
const InputAdornment = lazy(() => import('@mui/material/InputAdornment'));
const FormControl = lazy(() => import('@mui/material/FormControl'));
const FormHelperText = lazy(() => import('@mui/material/FormHelperText'));
const Visibility = lazy(() => import('@mui/icons-material/Visibility'));
const VisibilityOff = lazy(() => import('@mui/icons-material/VisibilityOff'));

const MuiFallback = () => <div style={{ height: 56 }} />;

export default function MyPassField(props: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {label, name, control, rules} = props;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({
        field:{onChange, value},
        fieldState: {error},
      }) => (
        <Suspense fallback={<MuiFallback />}>
          <FormControl className={"myForm"} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              onChange={onChange}
              value={value}
              error={!!error}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide password' : 'show password'}
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
            />
            <FormHelperText sx={{color:"#d32f2f"}}>{error?.message}</FormHelperText>
          </FormControl>
        </Suspense>
      )}
    />
  );
}