import React, { lazy, Suspense } from 'react';
import { Controller } from 'react-hook-form';
import '../../../App.css';

const TextField = lazy(() => import('@mui/material/TextField'));

const TextFieldFallback = () => (
  <div style={{ height: 56, width: '100%', background: '#f0f0f0', borderRadius: 4 }} />
);

export default function MyTextField(props: any) {
    const {label, name, control} = props;
    
    return (
      <Controller 
        name={name}
        control={control}
        render={({
          field:{onChange, value},
          fieldState: {error},
        }) => (
          <Suspense fallback={<TextFieldFallback />}>
            <TextField 
              id="outlined-basic"
              onChange={onChange}
              value={value} 
              label={label} 
              variant="outlined" 
              className={"myForm"}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          </Suspense>
        )}
      />
    );
}