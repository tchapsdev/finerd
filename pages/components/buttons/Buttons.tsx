import * as React from 'react';
import Button from '@mui/material/Button';
export const AddTransaction = () => addTransaction() ; 
export  function addTransaction() {
  return (
  
    <div>
      <div className="stat w-full place-items-center  ">
          <div className="tabs tabs-boxed b "  >  
            <Button variant="contained"> + </Button>
          </div>
      </div>
    </div>
  );
}
