import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export const AddTransaction = () => addTransaction() ; 
export  function addTransaction() {
  return (
    <div className="tabs tabs-boxed bg-white place-items-center"  >  
          <Button variant="contained"> + </Button>
    </div>
    
  );
}
