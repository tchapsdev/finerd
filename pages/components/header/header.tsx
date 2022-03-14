import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BackButton() {
  return (
    <Stack spacing={2} direction="row" >
     
     <Button variant="text" >&lsaquo;</Button>
     <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
            Expenses

            </div>
    </Stack>
  );
}
